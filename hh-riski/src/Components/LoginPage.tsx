import { useCurrentUser } from "../context/AuthContext";
import { authenticateUser } from "../services/auth";
import { useNavigate } from "react-router-dom";
import Navbar from "./Layout/Navbar";
import { useState } from "react";
import { Alert, Box, Button, CircularProgress, Paper, Stack, TextField, Typography } from "@mui/material";

type LoginErrorCode = "" | "INVALID_CREDENTIALS" | "LOGIN_SERVICE_UNAVAILABLE" | "UNKNOWN";

const LoginPage = () => {
	const { login } = useCurrentUser();
	const [selectedLanguage, setSelectedLanguage] = useState<"fi" | "en">("fi");
	const [inputUser, setInputUser] = useState({
		username: "",
		password: ""
	});
	const [errorCode, setErrorCode] = useState<LoginErrorCode>("");
	const [isLoading, setIsLoading] = useState(false);

	const navigate = useNavigate();
	const isFinnish = selectedLanguage === "fi";

	const getErrorMessage = () => {
		if (errorCode === "INVALID_CREDENTIALS") {
			return isFinnish ? "Virheellinen käyttäjänimi tai salasana." : "Incorrect username or password.";
		}
		if (errorCode === "LOGIN_SERVICE_UNAVAILABLE") {
			return isFinnish
				? "Kirjautumispalvelu ei ole käytettävissä. Yritä myöhemmin uudelleen."
				: "The login service is unavailable. Please try again later.";
		}
		return isFinnish ? "Kirjautuminen epäonnistui." : "Sign in failed.";
	};

	async function handleLogin() {
		setErrorCode("");
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
			const backendErrorCode = error instanceof Error ? error.message : "";
			setErrorCode(
				backendErrorCode === "INVALID_CREDENTIALS"
					? "INVALID_CREDENTIALS"
					: backendErrorCode === "LOGIN_SERVICE_UNAVAILABLE"
						? "LOGIN_SERVICE_UNAVAILABLE"
						: "UNKNOWN"
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
								onChange={e => {
									setErrorCode("");
									setInputUser({ ...inputUser, username: e.target.value });
								}}
							/>
							<TextField
								label={selectedLanguage === "fi" ? "Salasana" : "Password"}
								type="password"
								value={inputUser.password}
								autoComplete="current-password"
								required
								onChange={e => {
									setErrorCode("");
									setInputUser({ ...inputUser, password: e.target.value });
								}}
							/>
							{errorCode && <Alert severity="error">{getErrorMessage()}</Alert>}
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