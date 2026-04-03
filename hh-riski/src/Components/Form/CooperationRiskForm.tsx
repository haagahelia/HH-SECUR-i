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
import { useFormAnswers } from "../../context/FormAnswersContext";

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
  
  //const [selectedCountry, setSelectedCountry] = useState("fi");
  const { selectedCountry, setSelectedCountry, selectedOrganization, setSelectedOrganization, projectName, setProjectName,
            projectDescription, setProjectDescription, duration, setDuration, hhRole, setHhRole, consortium, setConsortium, history, setHistory, organizationType, setOrganizationType,
            contractStatus, setContractStatus, funding, setFunding, liability, setLiability, personalInformation, setPersonalInformation, dualUse, setDualUse, ethics, setEthics,
            cooperationType, setCooperationType, clearAnswers } = useFormAnswers();

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
          <li>
            <MultiChoice question={cooperationTypeData.question}
              answers={cooperationTypeData.answers}
              language={language}
              value={cooperationType}
              onChange={setCooperationType}
            />
          </li>
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

      {language === "fi" ?

        <div>
          <h3>Kehitysvaiheen elementti: lomakkeen valinnat</h3>
          <ul>
            <li>Maa: {selectedCountry}</li>
            <li>Organisaatio: {selectedOrganization}</li>
            <li>Projektin nimi: {projectName}</li>
            <li>Projektin kuvaus: {projectDescription}</li>
            <li>Projektin kesto: {duration}</li>
            <li>HH rooli: {hhRole}</li>
            <li>Konsortio: {consortium}</li>
            <li>Historia : {history}</li>
            <li>Organisaation tyyppi: {organizationType}</li>
            <li>Sopimus: {contractStatus}</li>
            <li>Rahoitus: {funding}</li>
            <li>Vastuu: {liability}</li>
            <li>Henkilötiedot: {personalInformation}</li>
            <li>Dual use: {dualUse}</li>
            <li>Etiikka: {ethics}</li>
            <li>Yhteistyön tyyppi: {cooperationType}</li>
          </ul>
        </div>
        :
        <div>
          <h3>Temporary element: form choices</h3>
          <ul>
            <li>Country: {selectedCountry}</li>
            <li>Organization: {selectedOrganization}</li>
            <li>Project name: {projectName}</li>
            <li>Project description: {projectDescription}</li>
            <li>Project duration: {duration}</li>
            <li>HH role: {hhRole}</li>
            <li>Consortium: {consortium}</li>
            <li>History : {history}</li>
            <li>Organization type: {organizationType}</li>
            <li>Agreement: {contractStatus}</li>
            <li>Funding: {funding}</li>
            <li>Liability: {liability}</li>
            <li>Personal information: {personalInformation}</li>
            <li>Dual use: {dualUse}</li>
            <li>Ethics: {ethics}</li>
            <li>Collaboration type: {cooperationType}</li>
          </ul>
        </div>
      }


      <div className={styles.center}>
        <Button
          variant="outlined"
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
          onClick={() => clearAnswers()}
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