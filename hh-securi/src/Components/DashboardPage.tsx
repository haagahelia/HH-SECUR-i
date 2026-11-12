import { Box, Button, Card, CardActions, CardContent, Grid, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import Navbar from "./Layout/Navbar";
import { useCurrentUser } from "../context/AuthContext";
import { useFormAnswers } from "../context/FormAnswersContext";

const DashboardPage = () => {
    const { user } = useCurrentUser();
    const { selectedLanguage } = useFormAnswers();
    const isFinnish = selectedLanguage === "fi";

    const cards = [
        {
            title: isFinnish ? "Riskiarviot" : "Risk assessments",
            description: isFinnish ? "Tarkastele tallennettuja riskiarvioita." : "View saved risk assessments.",
            path: "/my-assessments",
        },
        ...(user?.role === "admin"
            ? [
                  {
                      title: isFinnish ? "Käyttäjät" : "Users",
                      description: isFinnish ? "Hallitse käyttäjätilejä." : "Manage user accounts.",
                      path: "/admin/users",
                  },
                  {
                      title: isFinnish ? "Maat" : "Countries",
                      description: isFinnish ? "Hallitse maiden riskitietoja." : "Manage country risk data.",
                      path: "/admin/countries",
                  },
                  {
                      title: isFinnish ? "Organisaatiot" : "Organizations",
                      description: isFinnish ? "Hallitse yhteistyöorganisaatioita." : "Manage partner organizations.",
                      path: "/admin/organizations",
                  },
              ]
            : []),
    ];

    return (
        <>
            <Navbar />
            <Box component="main" sx={{ maxWidth: 1100, mx: "auto", px: 2, pb: 10 }}>
                <Typography component="h1" variant="h4" sx={{ mb: 3 }}>
                    {isFinnish ? "Kojelauta" : "Dashboard"}
                </Typography>
                <Grid container spacing={2}>
                    {cards.map((card) => (
                        <Grid key={card.path} size={{ xs: 12, sm: 6, md: 4 }}>
                            <Card sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
                                <CardContent sx={{ flex: 1 }}>
                                    <Typography variant="h6">{card.title}</Typography>
                                    <Typography color="text.secondary" sx={{ mt: 1 }}>
                                        {card.description}
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    <Button component={RouterLink} to={card.path}>
                                        {isFinnish ? "Avaa" : "Open"}
                                    </Button>
                                </CardActions>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </>
    );
};

export default DashboardPage;
