import { useCurrentUser } from "../context/AuthContext";
import { authenticateUser } from "../services/auth";
import { useNavigate } from "react-router-dom";
import Navbar from "./Layout/Navbar";
import { useState } from "react";


const LoginPage = () => {
	const { user, login, } = useCurrentUser();
	const [selectedLanguage, setSelectedLanguage] = useState<"fi" | "en">("fi");
	const [inputUser, setInputUser] = useState({
		username: "",
		password: ""
	});

	// TODO: Display error message in UI
	const [error, setError] = useState({ message: "" });

	// TODO: Display successful login message in UI
	const [loginMessage, setLoginMessage] = useState({ message: "" });

	const navigate = useNavigate();

	async function handleLogin() {
		try {
			const data = await authenticateUser(inputUser);
			login(data, data.token);
			setLoginMessage(data.message)
			setInputUser({
				username: "",
				password: ""
			})
			navigate("/user");
		} catch (error: any) {
			setError(error)
			console.error(error)
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
								value={inputUser.password}
								onChange={e => setInputUser({ ...inputUser, password: e.target.value })}
							/>
						</label>
						<button onClick={handleLogin}>
							Kirjaudu sisään
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
								value={inputUser.password}
								onChange={e => setInputUser({ ...inputUser, password: e.target.value })}
							/>
						</label>
						<button onClick={handleLogin}>
							Sign in
						</button>
					</div>
				}
			</div>
		</>
	)
}

export default LoginPage;