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

import { useState } from "react";

import { sortElements } from "../../util/utils";
import { useNavigate } from "react-router-dom";
import {
  validateCooperationRiskForm,
  type CooperationRiskFormValues,
  type ValidationField,
} from "../../util/validation";

import type { CountryRaw, Organization, Question } from "../../types";
import styles from "../../styles.module.css";

/* import ProjectInfoSection from "./Sections/ProjectInfoSection"; */
import SingleChoice from "./SingleChoice";
import MultiChoice from "./MultiChoice";
import SingleSelect from "./SingleSelect";
import { Button, TextField } from "@mui/material";
import { useFormAnswers } from "../../context/FormAnswersContext";

type CooperationRiskFormProps = {
  language: "fi" | "en";
};

const countriesRaw: CountryRaw[] = fetchCountriesRaw();
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

const CooperationRiskForm = ({ language }: CooperationRiskFormProps) => {
  const {
    selectedCountry,
    setSelectedCountry,
    selectedOrganization,
    setSelectedOrganization,
    projectName,
    setProjectName,
    projectDescription,
    setProjectDescription,
    duration,
    setDuration,
    hhRole,
    setHhRole,
    consortium,
    setConsortium,
    history,
    setHistory,
    organizationType,
    setOrganizationType,
    contractStatus,
    setContractStatus,
    funding,
    setFunding,
    liability,
    setLiability,
    personalInformation,
    setPersonalInformation,
    dualUse,
    setDualUse,
    ethics,
    setEthics,
    cooperationType,
    setCooperationType,
    clearAnswers,
  } = useFormAnswers();

  const filteredOrganizations = organizations.filter(
    (organization) => organization.countryId === selectedCountry,
  );
  const sortedOrganizations = sortElements(filteredOrganizations, language);

  const sortedCountries = sortElements(countriesRaw, language);

  const navigate = useNavigate();

  const [validationAttempted, setValidationAttempted] = useState(false);

  const formValues: CooperationRiskFormValues = {
    projectName,
    selectedCountry,
    selectedOrganization,
    hhRole,
    consortium,
    history,
    organizationType,
    contractStatus,
    cooperationType,
    funding,
    liability,
    personalInformation,
    dualUse,
    ethics,
    duration,
    projectDescription,
  };

  const saveForm = () => {
    const validationErrors = validateCooperationRiskForm(formValues, language);
    setValidationAttempted(true);

    if (Object.keys(validationErrors).length > 0) {
      window.scrollTo(0, 0);
      return;
    }

    navigate("/results");
  };

  const fieldErrors = validationAttempted
    ? validateCooperationRiskForm(formValues, language)
    : {};
  const errors = Object.values(fieldErrors);
  const renderFieldError = (field: ValidationField) =>
    fieldErrors[field] ? (
      <span className={styles.fieldError} role="alert">
        {fieldErrors[field]}
      </span>
    ) : null;

  return (
    <div className={styles.form}>
      {errors.length > 0 && (
        <div role="alert">
          <strong>
            {language === "fi"
              ? `${errors.length} kenttää vaatii korjausta.`
              : `${errors.length} field${errors.length === 1 ? "" : "s"} need${errors.length === 1 ? "s" : ""} attention.`}
          </strong>
        </div>
      )}
      <ul className={styles.formlist}>
        <li>
          {renderFieldError("projectName")}
          <TextField
            label={language === "fi" ? "Projektin nimi" : "Project name"}
            fullWidth
            size="small"
            slotProps={{ htmlInput: { maxLength: 100 } }}
            error={Boolean(fieldErrors.projectName)}
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
          />
        </li>
        <li>
          {renderFieldError("hhRole")}
          <SingleChoice
            question={hhRoleQuestionData.question}
            answers={hhRoleQuestionData.answers}
            language={language}
            value={hhRole}
            onChange={(value) => {
              setHhRole(value);
            }}
          />
        </li>
        <li>
          {renderFieldError("consortium")}
          <SingleChoice
            question={consortiumQuestionData.question}
            answers={consortiumQuestionData.answers}
            language={language}
            value={consortium}
            onChange={(value) => {
              setConsortium(value);
            }}
          />
        </li>
        <li>
          {renderFieldError("selectedCountry")}
          <SingleSelect
            question={{
              fi: "Yhteistyökumppanin sijaintimaa",
              en: "Collaborator's country of origin",
            }}
            answers={sortedCountries}
            placeholder={{ fi: "Valitse sijaintimaa", en: "Select country" }}
            language={language}
            value={selectedCountry}
            onChange={(value) => {
              setSelectedCountry(value);
            }}
          />
        </li>

        <li>
          {renderFieldError("history")}
          <SingleChoice
            question={historyQuestionData.question}
            answers={historyQuestionData.answers}
            language={language}
            value={history}
            onChange={(value) => {
              setHistory(value);
            }}
          />
        </li>

        <li>
          {renderFieldError("organizationType")}
          <SingleChoice
            question={organizationTypeData.question}
            answers={organizationTypeData.answers}
            language={language}
            value={organizationType}
            onChange={(value) => {
              setOrganizationType(value);
            }}
          />
        </li>
        <li>
          {renderFieldError("selectedOrganization")}
          <SingleSelect
            question={{ fi: "Organisaatio", en: "Organization" }}
            answers={sortedOrganizations}
            placeholder={{
              fi: "Valitse organisaatio",
              en: "Select organization",
            }}
            language={language}
            value={selectedOrganization}
            onChange={(value) => {
              setSelectedOrganization(value);
            }}
          />
        </li>
        <li>
          {renderFieldError("contractStatus")}
          <SingleChoice
            question={contractInfoData.question}
            answers={contractInfoData.answers}
            language={language}
            value={contractStatus}
            onChange={(value) => {
              setContractStatus(value);
            }}
          />
        </li>
        <li>
          {renderFieldError("cooperationType")}
          <MultiChoice
            question={cooperationTypeData.question}
            answers={cooperationTypeData.answers}
            language={language}
            value={cooperationType}
            onChange={setCooperationType}
          />
        </li>
        <li>
          {renderFieldError("funding")}
          <SingleChoice
            question={fundingData.question}
            answers={fundingData.answers}
            language={language}
            value={funding}
            onChange={(value) => {
              setFunding(value);
            }}
          />
        </li>
        <li>
          {renderFieldError("liability")}
          <SingleChoice
            question={liabilityData.question}
            answers={liabilityData.answers}
            language={language}
            value={liability}
            onChange={(value) => {
              setLiability(value);
            }}
          />
        </li>
        <li>
          {renderFieldError("personalInformation")}
          <SingleChoice
            question={personalData.question}
            answers={personalData.answers}
            language={language}
            value={personalInformation}
            onChange={(value) => {
              setPersonalInformation(value);
            }}
          />
        </li>
        <li>
          {renderFieldError("dualUse")}
          <SingleChoice
            question={dualUseData.question}
            answers={dualUseData.answers}
            language={language}
            value={dualUse}
            onChange={(value) => {
              setDualUse(value);
            }}
          />
        </li>
        <li>
          {renderFieldError("ethics")}
          <SingleChoice
            question={ethicsData.question}
            answers={ethicsData.answers}
            language={language}
            value={ethics}
            onChange={(value) => {
              setEthics(value);
            }}
          />
        </li>
        <li>
          {renderFieldError("duration")}
          <SingleChoice
            question={durationData.question}
            answers={durationData.answers}
            language={language}
            value={duration}
            onChange={(value) => {
              setDuration(value);
            }}
          />
        </li>
        <li>
          {renderFieldError("projectDescription")}
          <TextField
            label={language === "fi" ? "Lisätietoja" : "Additional Information"}
            multiline
            minRows={5}
            fullWidth
            slotProps={{ htmlInput: { maxLength: 1000 } }}
            error={Boolean(fieldErrors.projectDescription)}
            helperText={
              language === "fi"
                ? "Tähän kenttään voi esimerkiksi kirjoittaa tärkeitä lisätietoja yhteistyöstä."
                : "In this field, you can enter important additional information about the collaboration."
            }
            value={projectDescription}
            onChange={(e) => setProjectDescription(e.target.value)}
          />
        </li>
      </ul>

      <div className={styles.center}>
        <Button variant="outlined" onClick={() => saveForm()}>
          {language === "fi" ? "Tallenna" : "Save"}
        </Button>
        <Button
          variant="outlined"
          onClick={() => {
            setValidationAttempted(false);
            clearAnswers();
          }}
        >
          {language === "fi" ? "Aloita alusta" : "Start Over"}
        </Button>
      </div>
    </div>
  );
};

export default CooperationRiskForm;
