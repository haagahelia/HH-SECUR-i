import { useState } from "react";
import { fetchCountries, fetchOrganizations } from "../../util/fetchData";

import CountrySelect from "./CountrySelect";
import OrganizationSelect from "./OrganizationSelect";
import RiskSummary from "./RiskSummary";

import type { Country, Organization } from "../../types";

type CooperationRiskFormProps = {
  language: "fi" | "en";
};

const countries: Country[] = fetchCountries();
const organizations: Organization[] = fetchOrganizations();

const CooperationRiskForm = ({ language }: CooperationRiskFormProps) => {
  const [selectedCountry, setSelectedCountry] = useState("fi");
  const [selectedOrganization, setSelectedOrganization] = useState("");

  const filteredOrganizations = organizations.filter(
    (organization) => organization.countryId === selectedCountry
  );

  const selectedCountryData = countries.find(
    (country) => country.id === selectedCountry
  );

  return (
    <div>
      <CountrySelect
        selectedCountry={selectedCountry}
        selectedLanguage={language}
        countries={countries}
        onChange={(value) => {
          setSelectedCountry(value);
          setSelectedOrganization("");
        }}
      />

      <OrganizationSelect
        selectedOrganization={selectedOrganization}
        selectedLanguage={language}
        organizations={filteredOrganizations}
        onChange={setSelectedOrganization}
      />

      {selectedCountryData && (
        <RiskSummary country={selectedCountryData} language={language} />
      )}
    </div>
  );
};

export default CooperationRiskForm;