import type { Country, CountryApiResponse, Options, Organization, Question, User } from "../types";
import { authenticatedFetch } from "./authenticatedFetch";

const backendUrl = import.meta.env.VITE_BACKEND_URL || 'https://hh-secur-be-git-main-hh-secur-i-backend.2.rahtiapp.fi';

const isRecord = (value: unknown): value is Record<string, unknown> => {
    return typeof value === "object" && value !== null && !Array.isArray(value);
};

const toOrganization = (value: unknown): Organization | null => {
    if (!isRecord(value)) {
        return null;
    }

    if (
        (typeof value.id === "string" || typeof value.id === "number") &&
        isRecord(value.name) &&
        typeof value.name.fi === "string" &&
        typeof value.name.en === "string" &&
        typeof value.countryId === "string"
    ) {
        return {
            id: String(value.id),
            name: { fi: value.name.fi, en: value.name.en },
            countryId: value.countryId,
        };
    }

    if (
        (typeof value.id === "string" || typeof value.id === "number") &&
        typeof value.fi === "string" &&
        typeof value.en === "string" &&
        typeof value.country_code === "string"
    ) {
        return {
            id: String(value.id),
            name: { fi: value.fi, en: value.en },
            countryId: value.country_code,
        };
    }

    return null;
};

const isUser = (value: unknown): value is User => {
    return (
        isRecord(value) &&
        (typeof value.id === "string" || typeof value.id === "number") &&
        typeof value.username === "string" &&
        (value.name === undefined || typeof value.name === "string")
    );
};

const requiredOptionsDataKeys = ["name", "hhrole", "consortium", "history", "organizationtype", "contract", "collaborationtype", "funding", "liability", "personalinformation", "dualuse", "ethics", "duration", "additionalinformation"];


export const fetchOrganizations = async (token: string): Promise<Organization[]> => {
    const response = await authenticatedFetch(`${backendUrl}/organizations`, token, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    if (!response.ok) {
        throw new Error(`ORGANIZATIONS_REQUEST_FAILED_${response.status}`);
    }

    const data: unknown = await response.json();
    if (
        !isRecord(data) || !Array.isArray(data.organizations)
    ) {
        throw new Error("INVALID_ORGANIZATIONS_RESPONSE");
    }
    const organizations = data.organizations.map(toOrganization);
    if (organizations.some((organization): organization is null => organization === null)) {
        throw new Error("INVALID_ORGANIZATIONS_RESPONSE");
    }
    return organizations.filter(
        (organization): organization is Organization => organization !== null,
    );
}

export const fetchUsers = async (token: string): Promise<User[]> => {
    const response = await authenticatedFetch(`${backendUrl}/users`, token, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    if (!response.ok) {
        throw new Error(`USERS_REQUEST_FAILED_${response.status}`);
    }

    const data: unknown = await response.json();

    if (
        !isRecord(data) || !Array.isArray(data.users)
    ) {
        throw new Error("INVALID_USERS_RESPONSE");
    }
    const users = data.users.filter(isUser);

    if (users.length !== data.users.length) {
        throw new Error("INVALID_USERS_RESPONSE");
    }
    return users;
}

export const fetchCountries = async (token: string): Promise<Country[]> => {
    const response = await authenticatedFetch(`${backendUrl}/countries`, token, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    if (!response.ok) {
        throw new Error(`COUNTRIES_REQUEST_FAILED_${response.status}`);
    }

    const data: unknown = await response.json();

    if (
        typeof data !== "object" ||
        data === null ||
        !("countries" in data) ||
        !Array.isArray(data.countries)  
    ) {
        throw new Error("INVALID_COUNTRIES_RESPONSE");
    }

    const countries = data.countries as CountryApiResponse[];

    return countries.map((country) => ({
        id: country.code,
        name: {
            fi: country.fi,
            en: country.en,
        },
    }));
}

export const fetchOptions = async (token: string): Promise<Options> => {
    const response = await authenticatedFetch(`${backendUrl}/formcontent`, token, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    if (!response.ok) {
        throw new Error(`OPTIONS_REQUEST_FAILED_${response.status}`);
    }

    const data: unknown = await response.json();

    if (
        typeof data !== "object" ||
        data === null ||
        !requiredOptionsDataKeys.every(key => Object.hasOwn(data, key))
    ) {
        throw new Error("INVALID_OPTIONS_RESPONSE");
    }

    return data as Options;
}