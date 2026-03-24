import { useState } from "react";
import { fetchCountries, fetchOrganizations } from "../../util/fetchData";

import CountrySelect from "./CountrySelect";
import OrganizationSelect from "./OrganizationSelect";
import RiskSummary from "./RiskSummary";
import { sortElements } from "../../util/utils";

import type { Country, Organization } from "../../types";
import styles from "../../styles.module.css";

import FormSection from "./Sections/FormSection";
import ProjectInfoSection from "./Sections/ProjectInfoSection";

type CooperationRiskFormProps = {
  language: "fi" | "en";
};

const countries: Country[] = fetchCountries();
const organizations: Organization[] = fetchOrganizations();


const CooperationRiskForm = ({ language }: CooperationRiskFormProps) => {
  const [selectedCountry, setSelectedCountry] = useState("fi");
  const [selectedOrganization, setSelectedOrganization] = useState("");
  const [projectName, setProjectName] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [duration, setDuration] = useState("");

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