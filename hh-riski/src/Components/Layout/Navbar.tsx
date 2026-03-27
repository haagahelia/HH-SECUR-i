import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

type NavbarProps = {
    language: "fi" | "en";
};

const Navbar = ({ language }: NavbarProps) => {
    return (
        <AppBar position="static" color="primary" elevation={1}>
            <Toolbar>
                <Typography variant="h6" sx={{ flexGrow: 1 }}>
                    HHRISKI
                </Typography>

                <Box sx={{ display: "flex", gap: 1 }}>
                    <Button color="inherit" component={RouterLink} to="/">
                        {language === "fi" ? "Riskilomake" : "Risk form"}
                    </Button>

                    <Button color="inherit" component={RouterLink} to="/user">
                        {language === "fi" ? "Käyttäjä" : "User"}
                    </Button>
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;