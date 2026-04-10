
import { useCurrentUser } from "../../context/UserContext";

import Navbar from ".././Layout/Navbar";
import { useFormAnswers } from "../../context/FormAnswersContext";
import { Box, Button } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { West } from "@mui/icons-material";

import styles from "../../styles.module.css";
import type { Country, Organization, Question } from "../../types";

import { fetchConsortiumType, fetchContractInfo, fetchCooperationHistory, fetchCooperationType, fetchCountries, fetchDualUse, fetchDuration, fetchEthicsAssessment, fetchFunding, fetchHhRole, fetchLiability, fetchOrganizations, fetchOrganizationType, fetchPersonalInformation } from "../../util/fetchData";
import SingleQuestionSummary from "./SingleSummary";


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
    const { selectedLanguage, setSelectedLanguage, selectedCountry, setSelectedCountry, selectedOrganization, setSelectedOrganization, projectName, setProjectName,
        projectDescription, setProjectDescription, duration, setDuration, hhRole, setHhRole, consortium, setConsortium, history, setHistory, organizationType, setOrganizationType,
        contractStatus, setContractStatus, funding, setFunding, liability, setLiability, personalInformation, setPersonalInformation, dualUse, setDualUse, ethics, setEthics,
        cooperationType, setCooperationType, clearAnswers } = useFormAnswers();

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
            </div>
            {user &&
                <div className={styles.resultsSummary}>
                    <div>
                        {selectedLanguage === "fi" ?
                            <h4>Yhteenveto valinnoistasi</h4>
                            :
                            <h4>Selection Summary</h4>}
                        <ul className={styles.summaryList}>
                            <li>
                                <p><b>TODO:</b></p>
                                <p>Form Respondant</p>
                            </li>
                            <li>
                                <p><b>TODO:</b></p>
                                <p>Project Owner</p>
                            </li>
                            <li>
                                {selectedLanguage === "fi" ?
                                    <p><b>Yhteistyön/yhteistyöprojektin nimi</b></p>
                                    :
                                    <p><b>Collaboration name</b></p>
                                }
                                <p>{projectName}</p>
                            </li>
                            <li>
                                <SingleQuestionSummary
                                    question={hhRoleQuestionData.question}
                                    answers={hhRoleQuestionData.answers}
                                    language={selectedLanguage}
                                    value={hhRole}
                                />
                            </li>
                            <li>
                                <p><b>TODO:</b></p>
                                <p>Cooperation type (multi select component)</p>
                            </li>

                            <li>
                                <p><b>TODO:</b></p>
                                <p>Country selection</p>
                            </li>
                            <li>
                                <SingleQuestionSummary
                                    question={historyQuestionData.question}
                                    answers={historyQuestionData.answers}
                                    language={selectedLanguage}
                                    value={history}
                                />
                            </li>
                            <li>
                                <SingleQuestionSummary
                                    question={organizationTypeData.question}
                                    answers={organizationTypeData.answers}
                                    language={selectedLanguage}
                                    value={organizationType}
                                />
                            </li>
                            <li>
                                <SingleQuestionSummary
                                    question={contractInfoData.question}
                                    answers={contractInfoData.answers}
                                    language={selectedLanguage}
                                    value={contractStatus}
                                />
                            </li>
                            <li>
                                <p><b>TODO:</b></p>
                                <p>Multi answer component</p>
                            </li>
                            <li>
                                <SingleQuestionSummary
                                    question={durationData.question}
                                    answers={durationData.answers}
                                    language={selectedLanguage}
                                    value={duration}
                                />
                            </li>
                            <li>
                                <SingleQuestionSummary
                                    question={fundingData.question}
                                    answers={fundingData.answers}
                                    language={selectedLanguage}
                                    value={funding}
                                />
                            </li>
                            <li>
                                <SingleQuestionSummary
                                    question={liabilityData.question}
                                    answers={liabilityData.answers}
                                    language={selectedLanguage}
                                    value={liability}
                                />
                            </li>
                            <li>
                                <SingleQuestionSummary
                                    question={personalData.question}
                                    answers={personalData.answers}
                                    language={selectedLanguage}
                                    value={personalInformation}
                                />
                            </li>
                            <li>
                                <SingleQuestionSummary
                                    question={dualUseData.question}
                                    answers={dualUseData.answers}
                                    language={selectedLanguage}
                                    value={dualUse}
                                />
                            </li>
                            <li>
                                <SingleQuestionSummary
                                    question={ethicsData.question}
                                    answers={ethicsData.answers}
                                    language={selectedLanguage}
                                    value={ethics}
                                />
                            </li>
                            <li>
                                <p><b>TODO:</b></p>
                                <p>Additional Information</p>
                            </li>
                        </ul>
                    </div>
                </div>
            }
        </>
    );
};

export default ResultsPage;