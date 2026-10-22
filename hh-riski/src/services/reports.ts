const BASE = import.meta.env.VITE_BACKEND_URL;

export interface ReportListItem {
  id: string;
  name: string;
  risk: number | string;
  ownername: string;
  creatorname: string;
  created_at: string;
  updated_at: string;
}

async function request<T>(
  path: string,
  token: string,
  init: RequestInit = {},
): Promise<T> {
  const res = await fetch(`${BASE}${path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      ...init.headers,
    },
  });
  if (!res.ok)
    throw new Error(`${init.method ?? "GET"} ${path} failed: ${res.status}`);
  const text = await res.text();
  return (text ? JSON.parse(text) : undefined) as T;
}

export const getReports = (token: string) =>
  request<ReportListItem[]>("/reports", token);

export const createReport = (token: string, payload: unknown) =>
  request<{ id: string }>("/reports", token, {
    method: "POST",
    body: JSON.stringify(payload),
  });

export const updateReport = (token: string, id: string, payload: unknown) =>
  request<unknown>(`/reports/${id}`, token, {
    method: "PATCH",
    body: JSON.stringify(payload),
  });

export const deleteReport = (token: string, id: string) =>
  request<void>(`/reports/${id}`, token, { method: "DELETE" });
