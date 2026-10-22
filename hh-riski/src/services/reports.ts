const BASE = import.meta.env.VITE_BACKEND_URL;

export interface ApiErrorBody {
  error?: string;
  details?: { type?: string; path?: string; message?: string }[];
}

export class ApiError extends Error {
  status: number;
  body: ApiErrorBody | undefined;

  constructor(status: number, body: ApiErrorBody | undefined) {
    super(`Request failed: ${status}`);
    this.status = status;
    this.body = body;
  }
}

export interface ReportListItem {
  id: number;
  name: string;
  risk: number;
  ownername: string;
  creatorname: string;
  country: { code: string; fi: string; en: string };
  organizations: { id: number; fi: string; en: string; country_code: string }[];
  created_at: string;
  updated_at: string;
}

export interface ReportDetail {
  reportDetails: { id: number; [key: string]: unknown };
  report: unknown;
  choices: Record<string, unknown>;
}

export interface CreateReportResponse {
  message: string;
  reportDetails: { id: number; [key: string]: unknown };
  report: unknown;
  choices: Record<string, unknown>;
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
  const text = await res.text();
  const data = text ? JSON.parse(text) : undefined;
  if (!res.ok) throw new ApiError(res.status, data); // Edit 1 in use
  return data as T;
}

export const getReports = (token: string) =>
  request<ReportListItem[]>("/reports", token);

export const getReport = (token: string, id: number) =>
  request<ReportDetail>(`/reports/${id}`, token);

export const createReport = (token: string, payload: unknown) =>
  request<CreateReportResponse>("/reports", token, {
    method: "POST",
    body: JSON.stringify(payload),
  });

export const updateReport = (token: string, id: number, payload: unknown) =>
  request<unknown>(`/reports/${id}`, token, {
    method: "PATCH",
    body: JSON.stringify(payload),
  });

export const deleteReport = (token: string, id: number) =>
  request<void>(`/reports/${id}`, token, { method: "DELETE" });