import { fetchConsortiumType, fetchContractInfo, fetchCooperationHistory, fetchCooperationType, fetchCountriesRaw, fetchDualUse, fetchDuration, fetchEthicsAssessment, fetchFunding, fetchHhRole, fetchLiability, fetchOrganizations, fetchOrganizationType, fetchPersonalInformation } from "../../util/fetchData";

import { useState } from "react";
import CountrySelect from "./CountrySelect";
import OrganizationSelect from "./OrganizationSelect";
import {  sortElements } from "../../util/utils";
import { Link as RouterLink, Navigate, useNavigate } from "react-router-dom";

import type { CountryRaw, Organization, Question } from "../../types";
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

  const { selectedCountry, setSelectedCountry, selectedOrganization, setSelectedOrganization, projectName, setProjectName,
    projectDescription, setProjectDescription, duration, setDuration, hhRole, setHhRole, consortium, setConsortium, history, setHistory, organizationType, setOrganizationType,
    contractStatus, setContractStatus, funding, setFunding, liability, setLiability, personalInformation, setPersonalInformation, dualUse, setDualUse, ethics, setEthics,
    cooperationType, setCooperationType, clearAnswers } = useFormAnswers();

  const filteredOrganizations = organizations.filter(
    (organization) => organization.countryId === selectedCountry
  );
  const sortedOrganizations = sortElements(filteredOrganizations, language);

  const selectedCountryData = countriesRaw.find(
    (countryRaw) => countryRaw.id === selectedCountry
  );
  const sortedCountries = sortElements(countriesRaw, language);

  const navigate = useNavigate();

  const saveFormUnfilled = () => {
    if (formFilled()) {
      window.scrollTo(0, 0);
      navigate("/results");
    } else {
      window.scrollTo(0, 0);
    }
  }

  const saveForm = () => {
    if (formFilled()) {
      window.scrollTo(0, 0);
      navigate("/results");
    } else {
      window.scrollTo(0, 0);
    }
  }

  const formFilled = () => {
    const values = [projectName, selectedCountry, selectedOrganization, duration, hhRole, consortium, history, organizationType, contractStatus, funding, liability, personalInformation, dualUse, ethics]
    for (let i = 0; i < values.length; i++) {
      if (values[i].trim() === "") {
        return false;
      }
    }
    if (cooperationType.length < 1) {
      return false;
    }
    return true;
  }

  const [debug, setDebug] = useState(false);

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
            <label>
              {language === "fi" ? "Projektin nimi" : "Project name"}
            </label>
            <input
              type="text"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
            />
          </li>
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
          <li>
            <label>
              {language === "fi" ? "Lisätietoja" : "Additional Information"}
            </label>
            <textarea
              rows={5}
              cols={120}
              maxLength={1000}
              placeholder={
                language === "fi" ?
                  "Tähän kenttään voi esimerkiksi kirjoittaa tärkeitä lisätietoja yhteistyöstä."
                  :
                  "In this field, you can enter important additional information about the collaboration."
              }
              value={projectDescription}
              onChange={(e) => setProjectDescription(e.target.value)}
            />
          </li>
        </ul>
      </FormSection>

      <div className={styles.center}>
        {debug &&
          <Button
            variant="outlined"
            onClick={() => saveFormUnfilled()}
          >
            {(language === "fi" ?
              <a>Temp: tallenna täyttämättä</a>
              :
              <a>Temp: save unfilled</a>)
            }
          </Button>
        }
        <Button
          variant="outlined"
          onClick={() => saveForm()}
        >
          {language === "fi" ?
            <a>Tallenna</a>
            :
            <a>Save</a>
          }
        </Button>
        <Button
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