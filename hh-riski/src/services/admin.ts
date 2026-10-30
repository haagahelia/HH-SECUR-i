import { authenticatedFetch } from "../util/authenticatedFetch";

const backendUrl =
    import.meta.env.VITE_BACKEND_URL ||
    "https://hh-secur-be-git-main-hh-secur-i-backend.2.rahtiapp.fi";

export type AdminResource = "users" | "countries" | "organizations";

export type AdminRecord = Record<string, string | number | null | undefined>;
const mutationResources = new Set<AdminResource>(["users"]);

const getRecords = (data: unknown, resource: AdminResource): AdminRecord[] => {
    if (Array.isArray(data)) return data.filter(isRecord);
    if (typeof data !== "object" || data === null) return [];

    const value = (data as Record<string, unknown>)[resource];
    return Array.isArray(value) ? value.filter(isRecord) : [];
};

const isRecord = (value: unknown): value is AdminRecord =>
    typeof value === "object" && value !== null && !Array.isArray(value);

const normalizeRecord = (
    resource: AdminResource,
    record: AdminRecord,
): AdminRecord => {
    if (
        resource === "organizations" &&
        typeof record.name === "object" &&
        record.name !== null &&
        !Array.isArray(record.name)
    ) {
        const name = record.name as Record<string, unknown>;
        return {
            ...record,
            fi: typeof name.fi === "string" ? name.fi : "",
            en: typeof name.en === "string" ? name.en : "",
            country_code: record.countryId ?? record.country_code,
        };
    }

    return record;
};

async function request(
    token: string,
    resource: AdminResource,
    method: "GET" | "POST" | "PATCH" | "DELETE",
    id?: string,
    body?: AdminRecord,
): Promise<AdminRecord[]> {
    if (method !== "GET" && !mutationResources.has(resource)) {
        throw new Error(`${resource.toUpperCase()}_MUTATIONS_NOT_SUPPORTED`);
    }

    const response = await authenticatedFetch(
        `${backendUrl}/${resource}${id ? `/${encodeURIComponent(id)}` : ""}`,
        token,
        {
            method,
            headers: { "Content-Type": "application/json" },
            body: body ? JSON.stringify(body) : undefined,
        },
    );

    if (!response.ok) {
        throw new Error(`${resource.toUpperCase()}_REQUEST_FAILED_${response.status}`);
    }

    if (method === "DELETE") return [];
    const data: unknown = await response.json();
    return getRecords(data, resource).map((record) =>
        normalizeRecord(resource, record),
    );
}

export const getAdminRecords = async (
    token: string,
    resource: AdminResource,
): Promise<AdminRecord[]> => request(token, resource, "GET");

export const createAdminRecord = (
    token: string,
    resource: AdminResource,
    payload: AdminRecord,
) => request(token, resource, "POST", undefined, payload);

export const updateAdminRecord = (
    token: string,
    resource: AdminResource,
    id: string,
    payload: AdminRecord,
) => request(token, resource, "PATCH", id, payload);

export const deleteAdminRecord = (
    token: string,
    resource: AdminResource,
    id: string,
) => request(token, resource, "DELETE", id);
