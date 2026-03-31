import { useState } from "react";
import { fetchConsortiumType, fetchContractInfo, fetchCooperationHistory, fetchCooperationType, fetchCountries, fetchDualUse, fetchDuration, fetchEthicsAssessment, fetchFunding, fetchHhRole, fetchLiability, fetchOrganizations, fetchOrganizationType, fetchPersonalInformation } from "../../util/fetchData";

import CountrySelect from "./CountrySelect";
import OrganizationSelect from "./OrganizationSelect";
import RiskSummary from "./RiskSummary";
import { sortElements } from "../../util/utils";

import type { Country, Organization, Question } from "../../types";
import styles from "../../styles.module.css";

import FormSection from "./Sections/FormSection";
/* import ProjectInfoSection from "./Sections/ProjectInfoSection"; */
import SingleChoice from "./SingleChoice";
import MultiChoice from "./MultiChoice";
import { Button } from "@mui/material";

type CooperationRiskFormProps = {
  language: "fi" | "en";
};

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
  const [ethics, setEthics] = useState("");
  const [cooperationType, setCooperationType] = useState<string[]>([]);


  const filteredOrganizations = organizations.filter(
    (organization) => organization.countryId === selectedCountry
  );
  const sortedOrganizations = sortElements(filteredOrganizations, language);

  const selectedCountryData = countries.find(
    (country) => country.id === selectedCountry
  );
  const sortedCountries = sortElements(countries, language);

  const resetForm = () => {
            setSelectedCountry("fi");
            setSelectedOrganization("");
            setProjectName("");
            setProjectDescription("");
            setDuration("");
            setHhRole("");
            setConsortium("");
            setHistory("");
            setOrganizationType("");
            setContractStatus("");
            setFunding("");
            setLiability("");
            setPersonalInformation("");
            setDualUse("");
            setEthics("");
            setCooperationType([]);
  }

  return (
    <div className={styles.form}>
      {/* <ProjectInfoSection
        language={language}
        projectName={projectName}
        projectDescription={projectDescription}
        duration={duration}
        onProjectNameChange={setProjectName}
        onProjectDescriptionChange={setProjectDescription}
        
      /> */}

      <FormSection
      /*
        title={language === "fi" ? "Perustiedot" : "Basic Information"}
        description={
          language === "fi"
            ? "Valitse maa ja organisaatio"
            : "Select country and organization"
        }
            */
      >
        <ul className={styles.formlist}>
          <li>
            <SingleChoice question={hhRoleQuestionData.question}
              answers={hhRoleQuestionData.answers}
              language={language}
              value={hhRole}
              onChange={(value) => {
                setHhRole(value);
              }} />
          </li>
          <li>
            <SingleChoice question={consortiumQuestionData.question}
              answers={consortiumQuestionData.answers}
              language={language}
              value={consortium}
              onChange={(value) => {
                setConsortium(value);
              }} />
          </li>
          <li>
            <CountrySelect
              selectedCountry={selectedCountry}
              selectedLanguage={language}
              countries={sortedCountries}
              onChange={(value) => {
                setSelectedCountry(value);
                setSelectedOrganization("");
              }}
            />
          </li>

          <li>
            <SingleChoice question={historyQuestionData.question}
              answers={historyQuestionData.answers}
              language={language}
              value={history}
              onChange={(value) => {
                setHistory(value);
              }} />
          </li>

          <li>
            <SingleChoice question={organizationTypeData.question}
              answers={organizationTypeData.answers}
              language={language}
              value={organizationType}
              onChange={(value) => {
                setOrganizationType(value);
              }} />
          </li>
          <li>
            <OrganizationSelect
              selectedOrganization={selectedOrganization}
              selectedLanguage={language}
              organizations={sortedOrganizations}
              onChange={setSelectedOrganization}
            />
          </li>
          <li>
            <SingleChoice question={contractInfoData.question}
              answers={contractInfoData.answers}
              language={language}
              value={contractStatus}
              onChange={(value) => {
                setContractStatus(value);
              }} />
          </li>
          <MultiChoice question={cooperationTypeData.question}
            answers={cooperationTypeData.answers}
            language={language}
            value={cooperationType}
            onChange={setCooperationType}
          />
          <li>
            <SingleChoice question={fundingData.question}
              answers={fundingData.answers}
              language={language}
              value={funding}
              onChange={(value) => {
                setFunding(value);
              }} />
          </li>
          <li>
            <SingleChoice question={liabilityData.question}
              answers={liabilityData.answers}
              language={language}
              value={liability}
              onChange={(value) => {
                setLiability(value);
              }} />
          </li>
          <li>
            <SingleChoice question={personalData.question}
              answers={personalData.answers}
              language={language}
              value={personalInformation}
              onChange={(value) => {
                setPersonalInformation(value);
              }} />
          </li>
          <li>
            <SingleChoice question={dualUseData.question}
              answers={dualUseData.answers}
              language={language}
              value={dualUse}
              onChange={(value) => {
                setDualUse(value);
              }} />
          </li>
          <li>
            <SingleChoice question={ethicsData.question}
              answers={ethicsData.answers}
              language={language}
              value={ethics}
              onChange={(value) => {
                setEthics(value);
              }} />
          </li>
          <li>
            <SingleChoice question={durationData.question}
              answers={durationData.answers}
              language={language}
              value={duration}
              onChange={(value) => {
                setDuration(value);
              }} />
          </li>
        </ul>
      </FormSection>

      {
        selectedCountryData && (
          <FormSection
            title={language === "fi" ? "Kehitysvaiheen elementti: Maan Riskiyhteenveto" : "Temporary element: Country Risk Summary"}
          >
            <RiskSummary country={selectedCountryData} language={language} />
          </FormSection>
        )
      }

      <div className={styles.center}>
        <Button
          variant="contained"
        >
          {language === "fi" ?
            <a>Tallenna</a>
            :
            <a>Save</a>
          }
        </Button>
        <Button
          href="#"
          variant="outlined"
          onClick={() => resetForm()}
        >
          {language === "fi" ?
            <a>Aloita alusta</a>
            :
            <a>Start Over</a>
          }
        </Button>
      </div>
    </div >
  );
};

export default CooperationRiskForm;