import { useEffect, useState } from "react";
import { useCurrentUser } from "../../context/AuthContext";
import Navbar from "../Layout/Navbar";
import { useFormAnswers } from "../../context/FormAnswersContext";
import { Button, Snackbar, Alert, List, ListItem } from "@mui/material";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { West } from "@mui/icons-material";
import Typography from '@mui/material/Typography';
import { PDFDownloadLink } from '@react-pdf/renderer';
import styles from "../../styles.module.css";
import type { RiskCalculationRequest, RiskCalculationResponse, Options } from "../../types";

import { SingleQuestionSummary } from "./SingleQuestionSummary";
import { MultiQuestionSummary } from "./MultiQuestionSummary";
import CountryRiskAssessment from "./CountryRiskAssessment";
import { calculateRisk } from "../../services/riskCalculation";
import { createReport, ApiError, updateReport } from "../../services/reports";
import { i18n } from "../../util/translations";
import { fetchOptions } from "../../util/fetchData";
import { ResultsDocument } from "./PDF/ResultDocumentPDF";


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
        selectedOrganizations,
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
        organization: consortium === "option2"
            ? [
                Number(selectedOrganization!.id),
                ...selectedOrganizations.map((organization) =>
                    Number(organization.id)
                ),
            ]
            : Number(selectedOrganization!.id),
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

    const PDFprops = {
        language: selectedLanguage,
        results,
        selectedProjectOwner,
        user,
        projectName,
        hhRole,
        options,
        hhRoleOther,
        cooperationType,
        cooperationTypeOther,
        consortium,
        selectedCountry,
        history,
        organizationType,
        organizationTypeOther,
        selectedOrganization,
        selectedOrganizations,
        organizationName,
        contractStatus,
        duration,
        funding,
        exchange,
        fundingSource,
        fundingHistory,
        liability,
        personalInformation,
        dualUse,
        ethics,
        projectDescription,
    }

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
                    <PDFDownloadLink
                        document={<ResultsDocument {...PDFprops} />}
                        fileName="assessment.pdf"
                    >
                        <Button
                            variant="outlined"
                            disabled={!user || !results}
                        >
                            {selectedLanguage === "fi" ? "Lataa PDF" : "Download PDF"}
                        </Button>
                    </PDFDownloadLink>
                </div>

                <div>
                    {selectedLanguage === "fi" ? (
                        <Typography component="h1" variant="h4">Riskiarvio</Typography>
                    ) : (
                        <Typography component="h1" variant="h4">Risk assessment</Typography>
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
                    <Typography>Kirjaudu sisään nähdäksesi sivun</Typography>
                ) : (
                    <Typography>Log in to view the page</Typography>
                )
            )}

            {user && (
                <div className={styles.resultsSummary}>
                    <div>
                        {selectedLanguage === "fi" ? (
                            <Typography variant="h5">Yhteenveto valinnoistasi</Typography>
                        ) : (
                            <Typography variant="h5">Selection Summary</Typography>
                        )}

                        <List className={styles.summaryList}>
                            <ListItem>
                                <Typography fontWeight="bold">{selectedLanguage === "fi" ? "Lomakkeen täyttäjä" : "Form Respondent"}</Typography>
                                <Typography>{selectedProjectOwner?.name ?? selectedProjectOwner?.username ?? "-"}</Typography>
                            </ListItem>

                            <ListItem>
                                <Typography fontWeight="bold">{selectedLanguage === "fi" ? "Projektin omistaja" : "Project Owner"}</Typography>
                                <Typography>{user.username}</Typography>
                            </ListItem>

                            <ListItem>
                                <Typography fontWeight="bold">{selectedLanguage === "fi" ? "Yhteistyön/yhteistyöprojektin nimi" : "Collaboration name"}</Typography>
                                <Typography>{projectName || "-"}</Typography>
                            </ListItem>

                            <ListItem>
                                <SingleQuestionSummary
                                    question={options?.hhrole}
                                    answers={options?.hhrole.options}
                                    language={selectedLanguage}
                                    value={hhRole}
                                />
                                {hhRoleOther.trim() && (
                                    <Typography fontWeight="bold">{selectedLanguage === "fi" ? "Tarkennus" : "Details"}: {hhRoleOther}</Typography>
                                )}
                            </ListItem>

                            <ListItem>
                                <MultiQuestionSummary
                                    question={options?.collaborationtype}
                                    answers={options?.collaborationtype.options}
                                    language={selectedLanguage}
                                    values={cooperationType}
                                />
                                {cooperationTypeOther.trim() && (
                                    <Typography sx={{pl: 2}} fontWeight="bold">{selectedLanguage === "fi" ? "Tarkennus" : "Details"}: {cooperationTypeOther}</Typography>
                                )}
                            </ListItem>

                            <ListItem>
                                <SingleQuestionSummary
                                    question={options?.consortium}
                                    answers={options?.consortium.options}
                                    language={selectedLanguage}
                                    value={consortium}
                                />
                            </ListItem>

                            <ListItem>
                                <Typography fontWeight="bold">{selectedLanguage === "fi" ? "Yhteistyökumppanin sijaintimaa" : "Partner country"}</Typography>
                                <Typography>{selectedCountry ? selectedCountry.name[selectedLanguage] : "-"}</Typography>
                            </ListItem>

                            <ListItem>
                                <SingleQuestionSummary
                                    question={options?.history}
                                    answers={options?.history.options}
                                    language={selectedLanguage}
                                    value={history}
                                />
                            </ListItem>

                            <ListItem>
                                <SingleQuestionSummary
                                    question={options?.organizationtype}
                                    answers={options?.organizationtype.options}
                                    language={selectedLanguage}
                                    value={organizationType}
                                />
                                {organizationTypeOther.trim() && (
                                    <Typography fontWeight="bold">{selectedLanguage === "fi" ? "Tarkennus" : "Details"}: {organizationTypeOther}</Typography>
                                )}
                            </ListItem>

                            <ListItem>
                                <Typography fontWeight="bold">
                                    {consortium === "option2"
                                        ? selectedLanguage === "fi"
                                            ? "Pääyhteistyökumppani"
                                            : "Main collaborator"
                                        : selectedLanguage === "fi"
                                            ? "Organisaatio"
                                            : "Organization"}
                                </Typography>
                                <Typography>
                                    {selectedOrganization?.countryId === "OTH"
                                        ? organizationName || "-"
                                        : selectedOrganization
                                            ? selectedOrganization.name[selectedLanguage]
                                            : "-"}
                                </Typography>

                                {consortium === "option2" && selectedOrganizations.length > 0 && (
                                    <>
                                        <Typography fontWeight="bold" sx={{ mt: 1 }}>
                                            {selectedLanguage === "fi"
                                                ? "Muut yhteistyökumppanit"
                                                : "Other collaborators"}
                                        </Typography>
                                        <List dense disablePadding>
                                            {selectedOrganizations.map((organization) => (
                                                <ListItem key={organization.id}>
                                                    <Typography>
                                                        {organization.name[selectedLanguage]}
                                                    </Typography>
                                                </ListItem>
                                            ))}
                                        </List>
                                    </>
                                )}
                            </ListItem>

                            <ListItem>
                                <SingleQuestionSummary
                                    question={options?.contract}
                                    answers={options?.contract.options}
                                    language={selectedLanguage}
                                    value={contractStatus}
                                />
                            </ListItem>

                            <ListItem>
                                <SingleQuestionSummary
                                    question={options?.duration}
                                    answers={options?.duration.options}
                                    language={selectedLanguage}
                                    value={duration}
                                />
                            </ListItem>

                            <ListItem>
                                <SingleQuestionSummary
                                    question={options?.funding}
                                    answers={options?.funding.options}
                                    language={selectedLanguage}
                                    value={funding}
                                />
                            </ListItem>
                            {funding === "option1" && (
                                <>
                                    <ListItem>
                                        <SingleQuestionSummary
                                            question={options?.funding.exchange.placeholder}
                                            answers={options?.funding.exchange.options}
                                            language={selectedLanguage}
                                            value={exchange}
                                        />
                                    </ListItem>
                                    <ListItem>
                                        <SingleQuestionSummary
                                            question={options?.funding.fundingsource.placeholder}
                                            answers={options?.funding.fundingsource.options}
                                            language={selectedLanguage}
                                            value={fundingSource}
                                        />
                                    </ListItem>
                                    <ListItem>
                                        <SingleQuestionSummary
                                            question={options?.funding.fundinghistory.placeholder}
                                            answers={options?.funding.fundinghistory.options}
                                            language={selectedLanguage}
                                            value={fundingHistory}
                                        />
                                    </ListItem>
                                </>
                            )}
                            <ListItem>
                                <SingleQuestionSummary
                                    question={options?.liability}
                                    answers={options?.liability.options}
                                    language={selectedLanguage}
                                    value={liability}
                                />
                            </ListItem>

                            <ListItem>
                                <SingleQuestionSummary
                                    question={options?.personalinformation}
                                    answers={options?.personalinformation.options}
                                    language={selectedLanguage}
                                    value={personalInformation}
                                />
                            </ListItem>

                            <ListItem>
                                <SingleQuestionSummary
                                    question={options?.dualuse}
                                    answers={options?.dualuse.options}
                                    language={selectedLanguage}
                                    value={dualUse}
                                />
                            </ListItem>

                            <ListItem>
                                <SingleQuestionSummary
                                    question={options?.ethics}
                                    answers={options?.ethics.options}
                                    language={selectedLanguage}
                                    value={ethics}
                                />
                            </ListItem>

                            <ListItem>
                                <Typography fontWeight="bold">{selectedLanguage === "fi" ? "Lisätiedot" : "Additional Information"}</Typography>
                                <Typography>{projectDescription || "-"}</Typography>
                            </ListItem>
                        </List>
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