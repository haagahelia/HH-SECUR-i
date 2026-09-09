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

  const saveForm = () => {
    const validationErrors = validateForm();
    setValidationAttempted(true);

    if (validationErrors.length > 0) {
      window.scrollTo(0, 0);
      return;
    }

    navigate("/results");
  };

  const validateForm = (): string[] => {
    const validationErrors: string[] = [];
    const isFinnish = language === "fi";

    if (!projectName.trim()) {
      validationErrors.push(
        isFinnish ? "Projektin nimi on pakollinen" : "Project name is required",
      );
    } else if (projectName.trim().length < 3) {
      validationErrors.push(
        isFinnish
          ? "Projektin nimessä on oltava vähintään 3 merkkiä"
          : "Project name must be at least 3 characters",
      );
    }

    if (!selectedCountry) {
      validationErrors.push(
        isFinnish ? "Maa on pakollinen" : "Country is required",
      );
    }

    if (!selectedOrganization) {
      validationErrors.push(
        isFinnish ? "Organisaatio on pakollinen" : "Organization is required",
      );
    }

    if (!hhRole) {
      validationErrors.push(
        isFinnish ? "Haaga-Helian rooli on pakollinen" : "HH role is required",
      );
    }

    if (cooperationType.length === 0) {
      validationErrors.push(
        isFinnish
          ? "Valitse vähintään yksi yhteistyön tyyppi"
          : "Select at least one cooperation type",
      );
    }

    const requiredFields = isFinnish
      ? [
          ["Konsortio", consortium],
          ["Yhteistyöhistoria", history],
          ["Organisaatiotyyppi", organizationType],
          ["Sopimustiedot", contractStatus],
          ["Rahoitus", funding],
          ["Vastuut", liability],
          ["Henkilötiedot", personalInformation],
          ["Kaksikäyttöisyys", dualUse],
          ["Eettinen arviointi", ethics],
          ["Kesto", duration],
        ]
      : [
          ["Consortium", consortium],
          ["History", history],
          ["Organization type", organizationType],
          ["Contract status", contractStatus],
          ["Funding", funding],
          ["Liability", liability],
          ["Personal information", personalInformation],
          ["Dual use", dualUse],
          ["Ethics", ethics],
          ["Duration", duration],
        ];

    requiredFields.forEach(([label, value]) => {
      if (!value.trim()) {
        validationErrors.push(
          isFinnish ? `${label} on pakollinen` : `${label} is required`,
        );
      }
    });

    if (projectName.length > 100) {
      validationErrors.push(
        isFinnish
          ? "Projektin nimessä saa olla enintään 100 merkkiä"
          : "Project name must be 100 characters or less",
      );
    }

    if (projectDescription.length > 1000) {
      validationErrors.push(
        isFinnish
          ? "Lisätiedoissa saa olla enintään 1000 merkkiä"
          : "Additional information must be 1000 characters or less",
      );
    } else if (
      projectDescription.trim().length > 0 &&
      projectDescription.trim().length < 10
    ) {
      validationErrors.push(
        isFinnish
          ? "Lisätiedoissa on oltava vähintään 10 merkkiä"
          : "Additional information must be at least 10 characters",
      );
    }

    return validationErrors;
  };

  const errors = validationAttempted ? validateForm() : [];

  return (
    <div className={styles.form}>
      {errors.length > 0 && (
        <div role="alert">
          <strong>
            {language === "fi"
              ? "Korjaa seuraavat kohdat:"
              : "Please fix the following:"}
          </strong>
          <ul>
            {errors.map((error) => (
              <li key={error}>{error}</li>
            ))}
          </ul>
        </div>
      )}
      <ul className={styles.formlist}>
        <li>
          <TextField
            label={language === "fi" ? "Projektin nimi" : "Project name"}
            fullWidth
            size="small"
            slotProps={{ htmlInput: { maxLength: 100 } }}
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
          />
        </li>
        <li>
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
          <MultiChoice
            question={cooperationTypeData.question}
            answers={cooperationTypeData.answers}
            language={language}
            value={cooperationType}
            onChange={setCooperationType}
          />
        </li>
        <li>
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
          <TextField
            label={language === "fi" ? "Lisätietoja" : "Additional Information"}
            multiline
            minRows={5}
            fullWidth
            slotProps={{ htmlInput: { maxLength: 1000 } }}
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
