import { AppBar, Toolbar, Typography, Button, Box, Slide, useScrollTrigger } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import LanguageIcon from "@mui/icons-material/Language";
import logo from "../../assets/logo.png";

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
                    <Toolbar sx={{ justifyContent: "space-between" }}>

                        {/* LOGO */}
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                            <img
                                src={logo}
                                alt="HH-SECUR-i"
                                style={{ height: "50px" }}
                            />
                        </Box>


                        <Typography sx={{ fontWeight: "bold" }}>
                            {language === "fi"
                                ? "KANSAINVÄLISEN YHTEISTYÖN RISKIARVIO"
                                : "RISK ASSESSMENT"}
                        </Typography>


                        <Box sx={{ display: "flex", gap: 2 }}>
                            <Button
                                onClick={() =>
                                    setLanguage(language === "fi" ? "en" : "fi")
                                }
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

                        <Button color="inherit" component={RouterLink} to="/user">
                            {language === "fi" ? "Käyttäjä" : "User"}
                        </Button>
                    </Box>
                </Toolbar>
            </AppBar>
            <Box sx={{ height: "64px" }} />
            <Box sx={{ height: "64px" }} />
        </>
    );
};

export default Navbar;