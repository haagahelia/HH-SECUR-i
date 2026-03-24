import { useState } from "react";
import { fetchConsortiumType, fetchContractInfo, fetchCooperationHistory, fetchCountries, fetchDualUse, fetchFunding, fetchHhRole, fetchLiability, fetchOrganizations, fetchOrganizationType, fetchPersonalInformation } from "../../util/fetchData";

import CountrySelect from "./CountrySelect";
import OrganizationSelect from "./OrganizationSelect";
import RiskSummary from "./RiskSummary";
import { sortElements } from "../../util/utils";

import type { Country, Organization, SingleChoiceQuestion } from "../../types";
import styles from "../../styles.module.css";

import FormSection from "./Sections/FormSection";
import ProjectInfoSection from "./Sections/ProjectInfoSection";
import SingleChoice from "./SingleChoice";

type CooperationRiskFormProps = {
  language: "fi" | "en";
};

const countries: Country[] = fetchCountries();
const organizations: Organization[] = fetchOrganizations();
const hhRoleQuestionData: SingleChoiceQuestion = fetchHhRole();
const consortiumQuestionData: SingleChoiceQuestion = fetchConsortiumType();
const historyQuestionData: SingleChoiceQuestion = fetchCooperationHistory();
const organizationTypeData: SingleChoiceQuestion = fetchOrganizationType();
const contractInfoData: SingleChoiceQuestion = fetchContractInfo();
const fundingData: SingleChoiceQuestion = fetchFunding();
const liabilityData: SingleChoiceQuestion = fetchLiability();
const personalData: SingleChoiceQuestion = fetchPersonalInformation();
const dualUseData: SingleChoiceQuestion = fetchDualUse();


const CooperationRiskForm = ({ language }: CooperationRiskFormProps) => {
  const [selectedCountry, setSelectedCountry] = useState("fi");
  const [selectedOrganization, setSelectedOrganization] = useState("");
  const [projectName, setProjectName] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [duration, setDuration] = useState("");
  const [hhRole, setHhRole] = useState("");
  const [consortium, setConsortium] = useState("");
  const [history, setHistory] = useState("");
  const [organizationType, setOrganizationType] = useState("");
  const [contractStatus, setContractStatus] = useState("");
  const [funding, setFunding] = useState("");
  const [liability, setLiability] = useState("");
  const [personalInformation, setPersonalInformation] = useState("");
  const [dualUse, setDualUse] = useState("");

  const filteredOrganizations = organizations.filter(
    (organization) => organization.countryId === selectedCountry
  );
  const sortedOrganizations = sortElements(filteredOrganizations, language);

  const selectedCountryData = countries.find(
    (country) => country.id === selectedCountry
  );
  const sortedCountries = sortElements(countries, language);

  return (
    <div className={styles.form}>
      <ProjectInfoSection
        language={language}
        projectName={projectName}
        projectDescription={projectDescription}
        duration={duration}
        onProjectNameChange={setProjectName}
        onProjectDescriptionChange={setProjectDescription}
        onDurationChange={setDuration}
      />
      <FormSection
        title={language === "fi" ? "Perustiedot" : "Basic Information"}
        description={
          language === "fi"
            ? "Valitse maa ja organisaatio"
            : "Select country and organization"
        }
      >
        <SingleChoice question={hhRoleQuestionData.question}
          answers={hhRoleQuestionData.answers}
          language={language}
          value={hhRole}
          onChange={(value) => {
            setHhRole(value);
          }} />

        <SingleChoice question={consortiumQuestionData.question}
          answers={consortiumQuestionData.answers}
          language={language}
          value={consortium}
          onChange={(value) => {
            setConsortium(value);
          }} />

        <CountrySelect
          selectedCountry={selectedCountry}
          selectedLanguage={language}
          countries={sortedCountries}
          onChange={(value) => {
            setSelectedCountry(value);
            setSelectedOrganization("");
          }}
        />

        <SingleChoice question={historyQuestionData.question}
          answers={historyQuestionData.answers}
          language={language}
          value={history}
          onChange={(value) => {
            setHistory(value);
          }} />

        <SingleChoice question={organizationTypeData.question}
          answers={organizationTypeData.answers}
          language={language}
          value={organizationType}
          onChange={(value) => {
            setOrganizationType(value);
          }} />

        <OrganizationSelect
          selectedOrganization={selectedOrganization}
          selectedLanguage={language}
          organizations={sortedOrganizations}
          onChange={setSelectedOrganization}
        />

        <SingleChoice question={contractInfoData.question}
          answers={contractInfoData.answers}
          language={language}
          value={contractStatus}
          onChange={(value) => {
            setContractStatus(value);
          }} />

        <SingleChoice question={fundingData.question}
          answers={fundingData.answers}
          language={language}
          value={funding}
          onChange={(value) => {
            setFunding(value);
          }} />

        <SingleChoice question={liabilityData.question}
          answers={liabilityData.answers}
          language={language}
          value={liability}
          onChange={(value) => {
            setLiability(value);
          }} />

        <SingleChoice question={personalData.question}
          answers={personalData.answers}
          language={language}
          value={personalInformation}
          onChange={(value) => {
            setPersonalInformation(value);
          }} />

        <SingleChoice question={dualUseData.question}
          answers={dualUseData.answers}
          language={language}
          value={dualUse}
          onChange={(value) => {
            setDualUse(value);
          }} />

      </FormSection>

      {selectedCountryData && (
        <FormSection
          title={language === "fi" ? "Riskiyhteenveto" : "Risk Summary"}
        >
          <RiskSummary country={selectedCountryData} language={language} />
        </FormSection>
      )}
    </div>
  );
};

export default CooperationRiskForm;