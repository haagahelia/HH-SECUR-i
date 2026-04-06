
import { useState } from "react";
import { useCurrentUser } from "../context/UserContext";
import CooperationRiskForm from "./Form/CooperationRiskForm";

import Navbar from "./Layout/Navbar";
import InfoBox from "./Layout/InfoBox";
import Box from "@mui/material/Box";
import { useFormAnswers } from "../context/FormAnswersContext";

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

const FormPage = () => {
  const { user, clearUser } = useCurrentUser();
  const { selectedLanguage, setSelectedLanguage } = useFormAnswers();

  return (
    <>
      <Navbar language={selectedLanguage}
        setLanguage={setSelectedLanguage} />


      <div>
        {selectedLanguage === 'fi' ?
          <h1>Riskiarviolomake</h1>
          :
          <h1>Risk assessment form</h1>
        }

        { /*} "Vanha kielivalikko, joka on korvattu NavBarin kielivalinnalla"
        <select
          value={selectedLanguage}
          onChange={(e) =>
            setSelectedLanguage(e.target.value as "fi" | "en")
          }
        >
          {languages.map((language) => (
            <option key={language.id} value={language.id}>
              {selectedLanguage === "fi"
                ? language.id
                : language.id}
            </option>
          ))}
        </select>
*/}
        {user ? (
          <>
            <InfoBox language={selectedLanguage} />

           <Box sx={{ mt: 3 }}></Box>

            <CooperationRiskForm language={selectedLanguage} />
          </>
        ) : selectedLanguage === "fi" ? (
          <p>Kirjaudu sisään nähdäksesi sivun</p>
        ) : (
          <p>Log in to view the page</p>
        )}
      </div>
    </>
  );
};

export default FormPage;