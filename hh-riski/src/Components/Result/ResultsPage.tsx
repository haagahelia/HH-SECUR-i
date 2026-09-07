import { useState } from "react";
import { useCurrentUser } from "../../context/AuthContext";

import Navbar from "../Layout/Navbar";
import { useFormAnswers } from "../../context/FormAnswersContext";
import { Button, Snackbar, Alert } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { West } from "@mui/icons-material";

import styles from "../../styles.module.css";
import type { Country, CountryRaw, Organization, Question } from "../../types";

import {
    fetchConsortiumType,
    fetchContractInfo,
    fetchCooperationHistory,
    fetchCooperationType,
    fetchCountriesRaw,
    fetchDualUse,
    fetchDuration,
    fetchEthicsAssessment,
    fetchFunding,
    fetchHhRole,
    fetchLiability,
    fetchOrganizations,
    fetchOrganizationType,
    fetchPersonalInformation,
} from "../../util/fetchData";

import SingleQuestionSummary from "./SingleQuestionSummary";
import MultiQuestionSummary from "./MultiQuestionSummary";
import CountryRiskAssessment from "./CountryRiskAssessment";
import { calculateCollaborationRisk, parseCountries, parseCountry } from "../../util/utils";

//const countries: Country[] = fetchCountries();
const countriesRaw: CountryRaw[] = fetchCountriesRaw();
const organizations: Organization[] = fetchOrganizations();
const hhRoleQuestionData: Question = fetchHhRole();
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
const consortiumQuestionData: Question = fetchConsortiumType();

const ResultsPage = () => {
    const { user } = useCurrentUser();
    const [saveMessageOpen, setSaveMessageOpen] = useState(false);

    const {
        selectedLanguage,
        setSelectedLanguage,
        selectedCountry,
        selectedOrganization,
        projectName,
        projectDescription,
        hhRole,
        consortium,
        history,
        organizationType,
        contractStatus,
        funding,
        liability,
        personalInformation,
        dualUse,
        ethics,
        cooperationType,
        duration,
        clearAnswers,
    } = useFormAnswers();

    const countries: Country[] = parseCountries(countriesRaw, personalInformation);

    const country= countries.find((country) => country.id === selectedCountry);
    //const countryRaw = countriesRaw.find((country) => country.id === selectedCountry);
    //const country = parseCountry(countryRaw);


    const selectedCountryData = countries.find(
        (country) => country.id === selectedCountry
    );

    const selectedOrganizationData = organizations.find(
        (organization) => organization.id === selectedOrganization
    );

    const saveAssessment = () => {
        if (!user) return;

        const getAverageCountryRisk = (country?: Country): 1 | 2 | 3 => {
            if (!country) return 1;

            const values: number[] = [
                country.risk.corruption,
                country.risk.security,
                country.risk.academicFreedom,
                country.risk.development,
                country.risk.GDPR,
                country.risk.sanctions,
                country.risk.ruleOfLaw,
            ];

            const avg = values.reduce((sum, value) => sum + value, 0) / values.length;

            if (avg < 1.67) return 1;
            if (avg < 2.34) return 2;
            return 3;
        };

        //const riskLevel = getAverageCountryRisk(country);
        const riskLevel = calculateCollaborationRisk(country, cooperationType)

        const data = {
            id: crypto.randomUUID(),
            createdAt: new Date().toISOString(),
            riskLevel,

            projectName,
            projectDescription,
            selectedCountry,
            selectedOrganization,
            duration,
            hhRole,
            consortium,
            history,
            organizationType,
            contractStatus,
            funding,
            liability,
            personalInformation,
            dualUse,
            ethics,
            cooperationType,
            selectedLanguage,

            savedBy: {
                id: user.id,
                username: user.username,
            },
        };

        const existing = JSON.parse(localStorage.getItem("assessments") || "[]");

        localStorage.setItem(
            "assessments",
            JSON.stringify([...existing, data])
        );

        console.log("Saved assessment:", data);
        setSaveMessageOpen(true);
    };

    return (
        <>
            <Navbar
                language={selectedLanguage}
                setLanguage={setSelectedLanguage}
            />
            <div className={styles.results}>
                
                <div className={styles.left}>
                    <Button
                        variant="outlined"
                        onClick={clearAnswers}
                        component={RouterLink}
                        to="/"
                        startIcon={<West />}
                    >
                        {selectedLanguage === "fi"
                            ? "Luo uusi riskiarvio"
                            : "Create New Risk Assessment"}
                    </Button>

                    <Button
                        component={RouterLink}
                        to="/"
                        variant="outlined"
                    >
                        {selectedLanguage === "fi" ? "Muokkaa" : "Edit"}
                    </Button>
                    <Button
                        onClick={saveAssessment} variant="contained">
                        {selectedLanguage === "fi" ? "Tallenna" : "Save"}
                    </Button>
                </div>

                <div>
                    {selectedLanguage === "fi" ? (
                        <h1>Yhteistyön riskit</h1>
                    ) : (
                        <h1>Collaboration Risks</h1>
                    )}
                </div>
            </div>

            {user ? (
                <div className={styles.resultsCountry}>
                    <CountryRiskAssessment
                        language={selectedLanguage}
                        country={country}
                    />
                </div>
            ) : (
                selectedLanguage === "fi" ? (
                    <p>Kirjaudu sisään nähdäksesi sivun</p>
                ) : (
                    <p>Log in to view the page</p>
                )
            )}

            {user && (
                <div className={styles.resultsSummary}>
                    <div>
                        {selectedLanguage === "fi" ? (
                            <h4>Yhteenveto valinnoistasi</h4>
                        ) : (
                            <h4>Selection Summary</h4>
                        )}

                        <ul className={styles.summaryList}>
                            <li>
                                <p><b>{selectedLanguage === "fi" ? "Lomakkeen täyttäjä" : "Form Respondent"}</b></p>
                                <p>{user.username}</p>
                            </li>

                            <li>
                                <p><b>{selectedLanguage === "fi" ? "Projektin omistaja" : "Project Owner"}</b></p>
                                <p>{user.username}</p>
                            </li>

                            <li>
                                <p><b>{selectedLanguage === "fi" ? "Yhteistyön/yhteistyöprojektin nimi" : "Collaboration name"}</b></p>
                                <p>{projectName || "-"}</p>
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
                                <MultiQuestionSummary
                                    question={cooperationTypeData.question}
                                    answers={cooperationTypeData.answers}
                                    language={selectedLanguage}
                                    values={cooperationType}
                                />
                            </li>

                            <li>
                                <SingleQuestionSummary
                                    question={consortiumQuestionData.question}
                                    answers={consortiumQuestionData.answers}
                                    language={selectedLanguage}
                                    value={consortium}
                                />
                            </li>

                            <li>
                                <p><b>{selectedLanguage === "fi" ? "Yhteistyökumppanin sijaintimaa" : "Partner country"}</b></p>
                                <p>{selectedCountryData ? selectedCountryData.name[selectedLanguage] : "-"}</p>
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
                                <p><b>{selectedLanguage === "fi" ? "Organisaatio" : "Organization"}</b></p>
                                <p>
                                    {selectedOrganizationData
                                        ? selectedOrganizationData.name[selectedLanguage]
                                        : "-"}
                                </p>
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
                                <p><b>{selectedLanguage === "fi" ? "Lisätiedot" : "Additional Information"}</b></p>
                                <p>{projectDescription || "-"}</p>
                            </li>
                        </ul>
                    </div>
                </div>
            )}

            <Snackbar
                open={saveMessageOpen}
                autoHideDuration={3000}
                onClose={() => setSaveMessageOpen(false)}
                anchorOrigin={{ vertical: "top", horizontal: "center" }}
            >
                <Alert
                    onClose={() => setSaveMessageOpen(false)}
                    severity="success"
                    sx={{ width: "100%" }}
                >
                    {selectedLanguage === "fi"
                        ? "Tallennus onnistui!"
                        : "Saved successfully!"}
                </Alert>
            </Snackbar>
        </>
    );
};

export default ResultsPage;