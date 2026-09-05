export async function authenticateUser(user: { username: string, password: string }) {
	// TODO: Place port into an env. file
	const response = await fetch("http://localhost:3000/login", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(user)
	});

	const data = await response.json();

	if (!response.ok) {
		throw new Error(data.message);
	};

	return data;
};


