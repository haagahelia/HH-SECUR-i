
import { useState } from "react";
import { useCurrentUser } from "../../context/UserContext";

import Navbar from ".././Layout/Navbar";
import InfoBox from ".././Layout/InfoBox";
import Box from "@mui/material/Box";
import { useFormAnswers } from "../../context/FormAnswersContext";
import { Button } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

import styles from "../../styles.module.css";
import { West } from "@mui/icons-material";


const ResultsPage = () => {
    const { user, clearUser } = useCurrentUser();
    const { selectedLanguage, setSelectedLanguage, clearAnswers } = useFormAnswers();

    return (
        <>
            <Navbar language={selectedLanguage}
                setLanguage={setSelectedLanguage} />

            <div className={styles.results}>

                <div>
                    <div className={styles.left}>
                        <Button
                            variant="outlined"
                            onClick={clearAnswers}
                            component={RouterLink} to="/"
                            startIcon={<West />}
                        >
                            {selectedLanguage === "fi" ?
                                <a>Luo uusi riskiarvio</a>
                                :
                                <a>Create New Risk Assessment</a>
                            }
                        </Button>
                        <Button
                            component={RouterLink} to="/"
                            variant="outlined"
                            onClick={() => clearAnswers()}
                        >
                            {selectedLanguage === "fi" ?
                                <a>Muokkaa</a>
                                :
                                <a>Edit</a>
                            }
                        </Button>
                    </div>
                    <div>
                        {selectedLanguage === 'fi' ?
                            <h1>Yhteistyön riskit</h1>
                            :
                            <h1>Collaboration Risks</h1>
                        }
                    </div>

                    {user ?
                        (
                            <p>TODO: Sisältökomponentti</p>
                        )
                        :
                        (
                            selectedLanguage === "fi" ?
                                <p>Kirjaudu sisään nähdäksesi sivun</p>
                                :
                                <p>Log in to view the page</p>
                        )
                    }
                </div >
            </div>
        </>
    );
};

export default ResultsPage;