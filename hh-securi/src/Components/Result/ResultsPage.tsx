import { useEffect, useState } from "react";
import { useCurrentUser } from "../../context/AuthContext";

import Navbar from "../Layout/Navbar";
import { useFormAnswers } from "../../context/FormAnswersContext";
import { Button, Snackbar, Alert } from "@mui/material";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { West } from "@mui/icons-material";

import styles from "../../styles.module.css";
import type { RiskCalculationRequest, Question, RiskCalculationResponse, Options } from "../../types";

import SingleQuestionSummary from "./SingleQuestionSummary";
import MultiQuestionSummary from "./MultiQuestionSummary";
import CountryRiskAssessment from "./CountryRiskAssessment";
import { calculateRisk } from "../../services/riskCalculation";
import { createReport, ApiError, updateReport } from "../../services/reports";
import { i18n } from "../../util/translations";
import { fetchOptions } from "../../util/fetchData";

const ResultsPage = () => {
    const { user, token } = useCurrentUser();
    const navigate = useNavigate();
    const [saveMessageOpen, setSaveMessageOpen] = useState(false);
    const [errorCode, setErrorCode] = useState("");
    const [options, setOptions] = useState<Options | null>(null);

    const {
        selectedLanguage,
        setSelectedLanguage,
        selectedCountry,
        selectedOrganization,
        organizationName,
        selectedProjectOwner,
        projectName,
        projectDescription,
        hhRole,
        hhRoleOther,
        consortium,
        history,
        organizationType,
        organizationTypeOther,
        contractStatus,
        funding,
        exchange,
        fundingSource,
        fundingHistory,
        liability,
        personalInformation,
        dualUse,
        ethics,
        cooperationType,
        cooperationTypeOther,
        duration,
        clearAnswers,
        editingReportId,
        setEditingReportId
    } = useFormAnswers();

    const t = i18n[selectedLanguage].riskAssessment

    const errorMessage = {
    "AUTHENTICATION_ERROR": t.authFail,
    "INVALID_REQUEST_BODY": t.fetchFail,
    "DUPLICATE_NAME": selectedLanguage === "fi"
        ? "Tämän niminen raportti on jo olemassa. Valitse toinen nimi."
        : "A report with this name already exists. Please choose another name.",
    }[errorCode] || t.unknown

    const saveAssessment = async () => {
    if (!token) return;

    const payload = {
        ...answers,
        ownerusername: answers.ownername || user?.username,
        creatorusername: answers.creatorname,
        organizationother: answers.organizationname,
        hhroleother: answers.hhroleother,
        organizationtypeother: answers.organizationtypeother,
    };
    if (
        user?.role !== "admin" &&
        payload.ownerusername !== user?.username &&
        payload.creatorusername !== user?.username
    ) {
        return;
    }

    try {
        if (editingReportId !== null) {
            await updateReport(token, editingReportId, payload);
        } else {
            const created = await createReport(token, payload);
            setEditingReportId(created.reportDetails.id); // next Save becomes PATCH
        }
        setErrorCode("");
        navigate("/my-assessments");
    } catch (error) {
        if (error instanceof ApiError) {
            console.error("Backend said:", error.body);
            if (error.body?.details?.[0]?.type === "unique violation") {
                setErrorCode("DUPLICATE_NAME");
                return;
            }
        }
        setErrorCode("UNKNOWN_ERROR");
    }
};

    const [results, setResults] = useState<RiskCalculationResponse>();

    const answers: RiskCalculationRequest = {
        name: projectName,
        ownername: selectedProjectOwner?.username ?? "",
        creatorname: user?.username ?? "",
        hhrole: hhRole,
        collaborationtype: cooperationType,
        country: selectedCountry?.id ?? "",
        organization: selectedOrganization?.id ?? "",
        organizationtype: organizationType,
        history: history,
        contract: contractStatus,
        consortium: consortium,
        funding: funding,
        exchange: exchange,
        fundingsource: fundingSource,
        fundinghistory: fundingHistory,
        liability: liability,
        personalinformation: personalInformation,
        dualuse: dualUse,
        ethics: ethics,
        duration: duration,
        organizationname: selectedOrganization?.countryId === "OTH" ? organizationName : undefined,
        hhroleother: hhRoleOther,
        organizationtypeother: organizationTypeOther,
        collaborationtypeother: cooperationTypeOther,
        additionalinformation: projectDescription
    };
    const canSaveReport =
        user?.role === "admin" ||
        answers.ownername === user?.username ||
        answers.creatorname === user?.username;

    useEffect(() => {
        if (!token) return;

        handleCalculateRisk(token)

        fetchOptions(token).then(setOptions).catch(() => {
              setOptions(null); 
        });
    }, [token]);

    async function handleCalculateRisk(token: string) {
        try {
            const data = await calculateRisk(answers, token);
            setResults(data);
        } catch (e) {
            const error = e instanceof Error ? e.message : "";
            setErrorCode(
                error === "AUTHENTICATION_ERROR" ? "AUTHENTICATION_ERROR"
                    : error === "INVALID_REQUEST_BODY" ? "INVALID_REQUEST_BODY"
                        : "UNKNOWN_ERROR"
            )
            console.error("Failed to calculate risk");
        }
    };

    return (
        <>
            <Navbar />

            {errorCode && <Alert severity="error">{errorMessage}</Alert>}

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
                        onClick={saveAssessment}
                        variant="contained"
                        disabled={!canSaveReport}
                        title={!canSaveReport
                            ? selectedLanguage === "fi"
                                ? "Vain raportin omistaja tai luoja voi tallentaa raportin"
                                : "Only the report owner or creator can save this report"
                            : undefined}
                    >
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
                        results={results}
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
                                <p>{selectedProjectOwner?.name ?? selectedProjectOwner?.username ?? "-"}</p>
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
                                    question={options?.hhrole}
                                    answers={options?.hhrole.options}
                                    language={selectedLanguage}
                                    value={hhRole}
                                />
                                {hhRoleOther.trim() && (
                                    <p><b>{selectedLanguage === "fi" ? "Tarkennus" : "Details"}</b>: {hhRoleOther}</p>
                                )}
                            </li>

                            <li>
                                <MultiQuestionSummary
                                    question={options?.collaborationtype}
                                    answers={options?.collaborationtype.options}
                                    language={selectedLanguage}
                                    values={cooperationType}
                                />
                                {cooperationTypeOther.trim() && (
                                    <p><b>{selectedLanguage === "fi" ? "Tarkennus" : "Details"}</b>: {cooperationTypeOther}</p>
                                )}
                            </li>

                            <li>
                                <SingleQuestionSummary
                                    question={options?.consortium}
                                    answers={options?.consortium.options}
                                    language={selectedLanguage}
                                    value={consortium}
                                />
                            </li>

                            <li>
                                <p><b>{selectedLanguage === "fi" ? "Yhteistyökumppanin sijaintimaa" : "Partner country"}</b></p>
                                <p>{selectedCountry ? selectedCountry.name[selectedLanguage] : "-"}</p>
                            </li>

                            <li>
                                <SingleQuestionSummary
                                    question={options?.history}
                                    answers={options?.history.options}
                                    language={selectedLanguage}
                                    value={history}
                                />
                            </li>

                            <li>
                                <SingleQuestionSummary
                                    question={options?.organizationtype}
                                    answers={options?.organizationtype.options}
                                    language={selectedLanguage}
                                    value={organizationType}
                                />
                                {organizationTypeOther.trim() && (
                                    <p><b>{selectedLanguage === "fi" ? "Tarkennus" : "Details"}</b>: {organizationTypeOther}</p>
                                )}
                            </li>

                            <li>
                                <p><b>{selectedLanguage === "fi" ? "Organisaatio" : "Organization"}</b></p>
                                <p>
                                    {selectedOrganization?.id === "other"
                                        ? organizationName || "-"
                                        : selectedOrganization
                                        ? selectedOrganization.name[selectedLanguage]
                                        : "-"}
                                </p>
                            </li>

                            <li>
                                <SingleQuestionSummary
                                    question={options?.contract}
                                    answers={options?.contract.options}
                                    language={selectedLanguage}
                                    value={contractStatus}
                                />
                            </li>

                            <li>
                                <SingleQuestionSummary
                                    question={options?.duration}
                                    answers={options?.duration.options}
                                    language={selectedLanguage}
                                    value={duration}
                                />
                            </li>

                            <li>
                                <SingleQuestionSummary
                                    question={options?.funding}
                                    answers={options?.funding.options}
                                    language={selectedLanguage}
                                    value={funding}
                                />
                            </li>
                            {funding === "option1" && (     
                            <>          
                                <li>
                                    <SingleQuestionSummary
                                        question={options?.funding.exchange.placeholder}
                                        answers={options?.funding.exchange.options}
                                        language={selectedLanguage}
                                        value={exchange}
                                    />
                                </li>
                                <li>
                                    <SingleQuestionSummary
                                        question={options?.funding.fundingsource.placeholder}
                                        answers={options?.funding.fundingsource.options}
                                        language={selectedLanguage}
                                        value={fundingSource}
                                    />
                                </li>
                                <li>
                                    <SingleQuestionSummary
                                        question={options?.funding.fundinghistory.placeholder}
                                        answers={options?.funding.fundinghistory.options}
                                        language={selectedLanguage}
                                        value={fundingHistory}
                                    />
                                </li>
                            </>
                            )}
                            <li>
                                <SingleQuestionSummary
                                    question={options?.liability}
                                    answers={options?.liability.options}
                                    language={selectedLanguage}
                                    value={liability}
                                />
                            </li>

                            <li>
                                <SingleQuestionSummary
                                    question={options?.personalinformation}
                                    answers={options?.personalinformation.options}
                                    language={selectedLanguage}
                                    value={personalInformation}
                                />
                            </li>

                            <li>
                                <SingleQuestionSummary
                                    question={options?.dualuse}
                                    answers={options?.dualuse.options}
                                    language={selectedLanguage}
                                    value={dualUse}
                                />
                            </li>

                            <li>
                                <SingleQuestionSummary
                                    question={options?.ethics}
                                    answers={options?.ethics.options}
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