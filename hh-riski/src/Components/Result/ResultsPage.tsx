
import { useCurrentUser } from "../../context/UserContext";

import Navbar from ".././Layout/Navbar";
import { useFormAnswers } from "../../context/FormAnswersContext";
import { Box, Button } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { West } from "@mui/icons-material";

import styles from "../../styles.module.css";
import type { Country, Organization, Question } from "../../types";

import { fetchConsortiumType, fetchContractInfo, fetchCooperationHistory, fetchCooperationType, fetchCountries, fetchDualUse, fetchDuration, fetchEthicsAssessment, fetchFunding, fetchHhRole, fetchLiability, fetchOrganizations, fetchOrganizationType, fetchPersonalInformation } from "../../util/fetchData";


const countries: Country[] = fetchCountries();
const organizations: Organization[] = fetchOrganizations();
const hhRoleQuestionData: Question = fetchHhRole();
const consortiumQuestionData: Question = fetchConsortiumType();
const historyQuestionData: Question = fetchCooperationHistory();
const organizationTypeData: Question = fetchOrganizationType();
const contractInfoData: Question = fetchContractInfo();
const fundingData: Question = fetchFunding();
const liabilityData: Question = fetchLiability();
const personalData: Question = fetchPersonalInformation();
const dualUseData: Question = fetchDualUse();
const ethicsData: Question = fetchEthicsAssessment();
const durationData: Question = fetchDuration();
const cooperationTypeData: Question = fetchCooperationType();

const ResultsPage = () => {
    const { user, clearUser } = useCurrentUser();
    const { selectedLanguage, setSelectedLanguage, clearAnswers } = useFormAnswers();

    return (
        <>
            <Navbar language={selectedLanguage}
                setLanguage={setSelectedLanguage} />

            <div className={styles.results}>


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
                        <div>
                            <p>TODO: Sisältökomponentti</p>
                        </div>
                    )
                    :
                    (
                        selectedLanguage === "fi" ?
                            <p>Kirjaudu sisään nähdäksesi sivun</p>
                            :
                            <p>Log in to view the page</p>
                    )
                }
                {user &&
                    <p>TODO: Yhteenvetokomponentti</p>
                }
            </div>
        </>
    );
};

export default ResultsPage;