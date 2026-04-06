
import { useState } from "react";
import { useCurrentUser } from "../../context/UserContext";

import Navbar from ".././Layout/Navbar";
import InfoBox from ".././Layout/InfoBox";
import Box from "@mui/material/Box";
import { useFormAnswers } from "../../context/FormAnswersContext";

{ /*} "Vanha kielivalikko, joka on korvattu NavBarin kielivalinnalla"
const languages = [
  {
    id: "fi" as const,
    name: {
      fi: "Suomi",
      en: "Finnish",
    },
  },
  {
    id: "en" as const,
    name: {
      fi: "Englanti",
      en: "English",
    },
  },
]; */}

const ResultsPage = () => {
    const { user, clearUser } = useCurrentUser();
    const { selectedLanguage, setSelectedLanguage } = useFormAnswers();

    return (
        <>
            <Navbar language={selectedLanguage}
                setLanguage={setSelectedLanguage} />

            <div>
                {user && (
                    <div>
                        {selectedLanguage === "fi" ? (
                            <p>Kirjautuneena {user.username}</p>
                        ) : (
                            <p>Logged in as {user.username}</p>
                        )}
                        {selectedLanguage === "fi" ? (
                            <button onClick={clearUser}>Kirjaudu ulos</button>
                        ) : (
                            <button onClick={clearUser}>Logout</button>
                        )}
                    </div>
                )}
            </div>
            <div>
                {selectedLanguage === 'fi' ?
                    <h1>Yhteistyön riskit</h1>
                    :
                    <h1>Collaboration Risks</h1>
                }

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
        </>
    );
};

export default ResultsPage;