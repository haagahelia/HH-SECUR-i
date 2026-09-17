import { AppBar, Toolbar, Typography, Button, Box, Slide, useScrollTrigger } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import LanguageIcon from "@mui/icons-material/Language";
import logo from "../../assets/logo.png";
import { useCurrentUser } from "../../context/AuthContext";

type NavbarProps = {
    language: "fi" | "en";
    setLanguage: (lang: "fi" | "en") => void;
};

function HideOnScroll(props: { children: React.ReactElement }) {
    const trigger = useScrollTrigger();

    return (
        <Slide appear={false} direction="down" in={!trigger}>
            {props.children}
        </Slide>
    );
}


const Navbar = ({ language, setLanguage }: NavbarProps) => {
    const { user, isAuthenticated, clearUser } = useCurrentUser();
    return (
        <>
            {/* YLÄPALKKI */}
            <HideOnScroll>
                <AppBar
                    position="fixed"
                    elevation={0}
                    sx={{
                        backgroundColor: "#ffffff",
                        color: "#000",
                        borderBottom: "1px solid #ccc",
                    }}
                >
                    <Toolbar
                        sx={{
                            position: "relative",
                            minHeight: 72,
                            display: "flex",
                            justifyContent: "space-between",
                        }}
                    >

                        <Box sx={{ display: "flex", alignItems: "center", gap: 2, zIndex: 1 }}>
                            <img
                                src={logo}
                                alt="HH-SECUR-i"
                                style={{ height: "50px" }}
                            />
                            {user && (
                                <Box sx={{ display: "flex", alignItems: "center", gap: 2.5, ml: 1 }}>
                                    <Box>
                                        <Typography variant="caption" display="block" color="text.secondary" lineHeight={1.1}>
                                            {language === "fi" ? "Kirjautuneena" : "Logged in as"}
                                        </Typography>
                                        <Typography variant="body2" fontWeight={600} lineHeight={1.2}>
                                            {user.username}
                                        </Typography>
                                    </Box>
                                    <Button
                                        color="inherit"
                                        size="small"
                                        onClick={clearUser}
                                        sx={{ px: 1.5, py: 0.75, minWidth: "auto" }}
                                    >
                                        {language === "fi" ? "Kirjaudu ulos" : "Logout"}
                                    </Button>
                                </Box>
                            )}
                        </Box>


                        <Typography
                            sx={{
                                position: "absolute",
                                left: "50%",
                                transform: "translateX(-50%)",
                                fontWeight: "bold",
                                textAlign: "center",
                                whiteSpace: "nowrap",
                            }}
                        >
                            {language === "fi"
                                ? "KANSAINVÄLISEN YHTEISTYÖN RISKIARVIO"
                                : "RISK ASSESSMENT"}
                        </Typography>


                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: 1,
                                ml: "auto",
                                zIndex: 1,
                            }}
                        >
                            {user && (
                                <Button component={RouterLink} to="/my-assessments">
                                    {language === "fi" ? "Aiemmat raportit" : "Reports"}
                                </Button>
                            )}

                            <Button
                                onClick={() => setLanguage(language === "fi" ? "en" : "fi")}
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 1,
                                    color: "#1976d2",
                                    textTransform: "none",
                                    padding: "6px 10px",
                                    borderRadius: "6px",
                                    "&:hover": {
                                        backgroundColor: "#f0f7ff",
                                    },
                                }}
                            >
                                <LanguageIcon fontSize="small" />
                                {language.toUpperCase()}
                            </Button>
                        </Box>
                    </Toolbar>
                </AppBar>
            </HideOnScroll>

            {/* ALAPALKKI */}
            <AppBar
                position="fixed"
                color="primary"
                elevation={1}
                sx={{
                    top: "auto",
                    bottom: 0,
                }}
            >
                <Toolbar sx={{ justifyContent: "center" }}>
                    <Box sx={{ display: "flex", gap: 2 }}>
                        <Button color="inherit" component={RouterLink} to="/">
                            {language === "fi" ? "Riskilomake" : "Risk form"}
                        </Button>
                        {!isAuthenticated ?
                        <Button color="inherit" component={RouterLink} to="/login">
                            {language === "fi" ? "Kirjaudu sisään" : "Sign in"}
                        </Button>
                        :
                        <Button color="inherit" component={RouterLink} to="/user">
                            {language === "fi" ? "Käyttäjä" : "User"}
                        </Button>
                        }
                    </Box>
                </Toolbar>
            </AppBar>
            <Box sx={{ height: "64px" }} />
            <Box sx={{ height: "64px" }} />
        </>
    );
};

export default Navbar;