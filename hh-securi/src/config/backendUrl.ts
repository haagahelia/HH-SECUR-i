const DEFAULT_BACKEND_URL =
    "https://hh-secur-be-git-main-hh-secur-i-backend.2.rahtiapp.fi";

export const backendUrl =
    import.meta.env.VITE_BACKEND_URL || DEFAULT_BACKEND_URL;
