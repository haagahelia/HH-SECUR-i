import { useState } from "react";
import { fetchConsortiumType, fetchCountries, fetchHhRole, fetchOrganizations } from "../../util/fetchData";

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


const CooperationRiskForm = ({ language }: CooperationRiskFormProps) => {
  const [selectedCountry, setSelectedCountry] = useState("fi");
  const [selectedOrganization, setSelectedOrganization] = useState("");
  const [projectName, setProjectName] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [duration, setDuration] = useState("");
  const [hhRole, setHhRole] = useState("");
  const [consortium, setConsortium] = useState("");

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

        <OrganizationSelect
          selectedOrganization={selectedOrganization}
          selectedLanguage={language}
          organizations={sortedOrganizations}
          onChange={setSelectedOrganization}
        />
      </FormSection>

      <ProjectInfoSection
        language={language}
        projectName={projectName}
        projectDescription={projectDescription}
        duration={duration}
        onProjectNameChange={setProjectName}
        onProjectDescriptionChange={setProjectDescription}
        onDurationChange={setDuration}
      />

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