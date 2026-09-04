import { useCurrentUser } from "../../context/AuthContext";
import CooperationRiskForm from "./CooperationRiskForm";

import Navbar from ".././Layout/Navbar";
import InfoBox from ".././Layout/InfoBox";
import Box from "@mui/material/Box";
import { useFormAnswers } from "../../context/FormAnswersContext";

// Risk assesment form

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