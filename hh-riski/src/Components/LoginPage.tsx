import { useCurrentUser } from "../context/AuthContext";
import { authenticateUser } from "../services/auth";
import { useNavigate } from "react-router-dom";
import Navbar from "./Layout/Navbar";
import { useState } from "react";
import { Alert, Box, Button, CircularProgress, IconButton, InputAdornment, Paper, Stack, TextField, Typography } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { i18n } from "../util/translations";

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
	const [showPassword, setShowPassword] = useState(false);

	const navigate = useNavigate();
	const t = i18n[selectedLanguage].login

	const getErrorMessage = () => {
		if (errorCode === "INVALID_CREDENTIALS") {
			return t.incorrectError;
		}
		if (errorCode === "LOGIN_SERVICE_UNAVAILABLE") {
			return t.serviceError;
		}
		return t.loginFail;
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
								sx={{
									"& input:-webkit-autofill": {
										WebkitBoxShadow: "0 0 0 100px #ffffff inset",
										WebkitTextFillColor: "#17212b"
									}
								}}
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
								type={showPassword ? "text" : "password"}
								sx={{
									"& .MuiOutlinedInput-root": {
										backgroundColor: "transparent"
									},
									"& .MuiInputAdornment-root": {
										backgroundColor: "transparent"
									},
									"& .MuiIconButton-root": {
										backgroundColor: "transparent"
									},
									"& input:-webkit-autofill": {
										WebkitBoxShadow: "0 0 0 100px #ffffff inset",
										WebkitTextFillColor: "#17212b"
									}
								}}
								value={inputUser.password}
								autoComplete="current-password"
								required
								slotProps={{
									input: {
										endAdornment: (
											<InputAdornment position="end" sx={{ backgroundColor: "transparent" }}>
												<IconButton
													aria-label={showPassword ? "Hide password" : "Show password"}
													size="small"
													edge="end"
													onClick={() => setShowPassword((visible) => !visible)}
													onMouseDown={(event) => event.preventDefault()}
													sx={{
														p: 0.5,
														backgroundColor: "transparent",
														"&:hover": { backgroundColor: "transparent" },
														"& .MuiSvgIcon-root": { fontSize: 20 }
													}}
												>
													{showPassword ? <VisibilityOff /> : <Visibility />}
												</IconButton>
											</InputAdornment>
										)
									}
								}}
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