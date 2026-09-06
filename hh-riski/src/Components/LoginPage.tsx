import { useCurrentUser } from "../context/AuthContext";
import { authenticateUser } from "../services/auth";
import { useNavigate } from "react-router-dom";
import Navbar from "./Layout/Navbar";
import { useState } from "react";


const LoginPage = () => {
	const { login } = useCurrentUser();
	const [selectedLanguage, setSelectedLanguage] = useState<"fi" | "en">("fi");
	const [inputUser, setInputUser] = useState({
		username: "",
		password: ""
	});
	const [errorMessage, setErrorMessage] = useState("");
	const [isLoading, setIsLoading] = useState(false);

	const navigate = useNavigate();

	async function handleLogin() {
		setErrorMessage("");
		setIsLoading(true);

		try {
			const data = await authenticateUser(inputUser);
			login(data, data.token);
			setInputUser({
				username: "",
				password: ""
			})
			navigate("/user");
		} catch (error) {
			setErrorMessage(
				error instanceof Error
					? error.message
					: selectedLanguage === "fi"
						? "Kirjautuminen epäonnistui."
						: "Sign in failed."
			);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<>
			<Navbar language={selectedLanguage} setLanguage={setSelectedLanguage} />
			<div>
				{selectedLanguage === 'fi' ?
					<h1>Kirjaudu sisään</h1>
					:
					<h1>Sign in</h1>
				}
			</div>
			<div>
				{selectedLanguage === 'fi' ?
					<div>
						<label>
							Käyttäjänimi:
							<input
								value={inputUser.username}
								onChange={e => setInputUser({ ...inputUser, username: e.target.value })}
							/>
						</label>
						<label>
							Salasana:
							<input
								type="password"
								value={inputUser.password}
								onChange={e => setInputUser({ ...inputUser, password: e.target.value })}
							/>
						</label>
						{errorMessage && <p role="alert">{errorMessage}</p>}
						<button onClick={handleLogin} disabled={isLoading}>
							{isLoading ? "Kirjaudutaan..." : "Kirjaudu sisään"}
						</button>
					</div>
					:
					<div>
						<label>
							Username:
							<input
								value={inputUser.username}
								onChange={e => setInputUser({ ...inputUser, username: e.target.value })}
							/>
						</label>
						<label>
							Password:
							<input
								type="password"
								value={inputUser.password}
								onChange={e => setInputUser({ ...inputUser, password: e.target.value })}
							/>
						</label>
						{errorMessage && <p role="alert">{errorMessage}</p>}
						<button onClick={handleLogin} disabled={isLoading}>
							{isLoading ? "Signing in..." : "Sign in"}
						</button>
					</div>
				}
			</div>
		</>
	)
}

export default LoginPage;