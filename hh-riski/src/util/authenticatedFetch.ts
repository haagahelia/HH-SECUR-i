import { AUTH_EXPIRED_EVENT } from "../context/AuthContext";

export async function authenticatedFetch(
	input: RequestInfo | URL,
	token: string,
	init: RequestInit = {},
): Promise<Response> {
	const response = await fetch(input, {
		...init,
		headers: {
			...init.headers,
			Authorization: `Bearer ${token}`,
		},
	});

	if (response.status === 401) {
		window.dispatchEvent(new Event(AUTH_EXPIRED_EVENT));
	}

	return response;
}
