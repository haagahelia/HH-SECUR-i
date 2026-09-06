import { useCurrentUser } from "../context/AuthContext";
import { authenticateUser } from "../services/auth";
import { useNavigate } from "react-router-dom";
import Navbar from "./Layout/Navbar";
import { useState } from "react";
import { Alert, Box, Button, CircularProgress, Paper, Stack, TextField, Typography } from "@mui/material";


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
			<Box component="section" aria-labelledby="login-title" sx={{ maxWidth: 480, mx: "auto" }}>
				<Typography id="login-title" component="h1" variant="h4" sx={{ mb: 3 }}>
					{selectedLanguage === "fi" ? "Kirjaudu sisään" : "Sign in"}
				</Typography>
				<Paper elevation={2} sx={{ p: { xs: 2, sm: 4 } }}>
					<Box component="form" onSubmit={(event) => { event.preventDefault(); void handleLogin(); }}>
						<Stack spacing={2.5}>
							<TextField
								label={selectedLanguage === "fi" ? "Käyttäjänimi" : "Username"}
								value={inputUser.username}
								autoComplete="username"
								required
								onChange={e => setInputUser({ ...inputUser, username: e.target.value })}
							/>
							<TextField
								label={selectedLanguage === "fi" ? "Salasana" : "Password"}
								type="password"
								value={inputUser.password}
								autoComplete="current-password"
								required
								onChange={e => setInputUser({ ...inputUser, password: e.target.value })}
							/>
							{errorMessage && <Alert severity="error">{errorMessage}</Alert>}
							<Button type="submit" variant="contained" disabled={isLoading}>
								{isLoading && <CircularProgress size={20} color="inherit" sx={{ mr: 1 }} />}
								{isLoading
									? selectedLanguage === "fi" ? "Kirjaudutaan..." : "Signing in..."
									: selectedLanguage === "fi" ? "Kirjaudu sisään" : "Sign in"}
							</Button>
						</Stack>
					</Box>
				</Paper>
			</Box>
		</>
	)
}

export default LoginPage;