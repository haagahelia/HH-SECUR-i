type AuthenticationResponse = {
	token: string;
	username: string;
	id?: string | number;
	message?: string;
};

const url = import.meta.env.VITE_BACKEND_URL 

export async function authenticateUser(user: { username: string, password: string }): Promise<AuthenticationResponse> {
	// TODO: Place port into an env. file
	let response: Response;
	try {
		response = await fetch(`${url}/login`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(user)
		});
	} catch {
		throw new Error("LOGIN_SERVICE_UNAVAILABLE");
	}

	let data: Partial<AuthenticationResponse> = {};
	try {
		data = await response.json();
	} catch {
		data = {};
	}

	if (!response.ok) {
		if (response.status === 401 || response.status === 403) {
			throw new Error("INVALID_CREDENTIALS");
		}

		throw new Error("LOGIN_SERVICE_UNAVAILABLE");
	};

	if (!data.token || !data.username) {
		throw new Error("LOGIN_SERVICE_UNAVAILABLE");
	}

	return data as AuthenticationResponse;
};


