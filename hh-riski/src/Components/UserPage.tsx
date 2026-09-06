import Navbar from "./Layout/Navbar";
import { useFormAnswers } from "../context/FormAnswersContext";
import { useCurrentUser } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Avatar, Box, Button, Paper, Stack, Typography } from "@mui/material";

const UserPage = () => {
	const { selectedLanguage, setSelectedLanguage } = useFormAnswers();
	const { user, clearUser } = useCurrentUser();
	const navigate = useNavigate();
	const isFinnish = selectedLanguage === "fi";

	const handleLogout = () => {
		clearUser();
		navigate("/login");
	};

	return (
		<>
			<Navbar language={selectedLanguage} setLanguage={setSelectedLanguage} />
			<Box component="section" aria-labelledby="user-title" sx={{ maxWidth: 640, mx: "auto" }}>
				<Typography id="user-title" component="h1" variant="h4" sx={{ mb: 3 }}>
					{isFinnish ? "Käyttäjä" : "User"}
				</Typography>
				<Paper elevation={2} sx={{ p: { xs: 2.5, sm: 4 } }}>
					<Stack direction={{ xs: "column", sm: "row" }} spacing={2.5} alignItems={{ xs: "flex-start", sm: "center" }}>
						<Avatar sx={{ width: 64, height: 64, bgcolor: "primary.main" }}>
							{user?.username?.charAt(0).toUpperCase()}
						</Avatar>
						<Box sx={{ flex: 1 }}>
							<Typography variant="overline" color="text.secondary" sx={{ display: "block", lineHeight: 1.1 }}>
								{isFinnish ? "Kirjautunut käyttäjä" : "Signed-in user"}
							</Typography>
							<Typography variant="h6" sx={{ lineHeight: 1.2, mt: 0.5 }}>
								{user?.username}
							</Typography>
						</Box>
						<Button variant="outlined" color="error" onClick={handleLogout}>
							{isFinnish ? "Kirjaudu ulos" : "Log out"}
						</Button>
					</Stack>
				</Paper>
			</Box>
		</>
	)
}

export default UserPage;