import {
  fetchOrganizations,
  fetchUsers,
  fetchCountries,
  fetchOptions,
} from "../../util/fetchData";

import { useEffect, useState } from "react";
import { useCurrentUser } from "../../context/AuthContext";

import { sortElements } from "../../util/utils";
import { useNavigate } from "react-router-dom";
import {
  validateCooperationRiskForm,
  type CooperationRiskFormValues,
  type ValidationField,
} from "../../util/validation";

import type { Options, Country, Organization, User } from "../../types";
import styles from "../../styles.module.css";

/* import ProjectInfoSection from "./Sections/ProjectInfoSection"; */
import SingleChoice from "./SingleChoice";
import MultiChoice from "./MultiChoice";
import SingleSelect from "./SingleSelect";
import {
    Button,
    TextField,
    Autocomplete,
    createFilterOptions,
} from "@mui/material";
import { useFormAnswers } from "../../context/FormAnswersContext";
import { i18n } from "../../util/translations";

type CooperationRiskFormProps = {
  language: "fi" | "en";
};

const OTHER_ORGANIZATION_COUNTRY_ID = "OTH";

const organizationFilter = createFilterOptions<Organization>({
    stringify: (organization) =>
        `${organization.name.fi} ${organization.name.en}`,
    ignoreCase: true,
    ignoreAccents: true,
    matchFrom: "any",
    limit: 100,
});

const CooperationRiskForm = ({ language }: CooperationRiskFormProps) => {
  const { token } = useCurrentUser();
  const [organizations, setOrganizations] = useState<Organization[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [countries, setCountries] = useState<Country[]>([]);
  const [options, setOptions] = useState<Options | null>(null);
  const [loadError, setLoadError] = useState(false);
  const [additionalCountry, setAdditionalCountry] = useState<Country | null>(null);
  const [additionalOrganization, setAdditionalOrganization] =
    useState<Organization | null>(null);

  useEffect(() => {
    if (!token) return;

    setLoadError(false);

    fetchOrganizations(token)
    .then((data) => {
        setOrganizations(Array.isArray(data) ? data : []);
    })
    .catch((error) => {
        console.error("Failed to load organizations", error);
        setOrganizations([]);
        setLoadError(true);
    });

    fetchUsers(token).then(setUsers).catch(() => {
      setUsers([]);
      setLoadError(true);
    });

    fetchCountries(token).then(setCountries).catch(() => {
      setCountries([]); 
      setLoadError(true);
    });

    fetchOptions(token).then(setOptions).catch(() => {
      setOptions(null); 
      setLoadError(true);
    });
  }, [token]);

  const {
    selectedOrganization,
    setSelectedOrganization,
    selectedOrganizations,
    setSelectedOrganizations,
    otherOrganizationCountry,
    setOtherOrganizationCountry,
    organizationName,
    setOrganizationName,
    selectedProjectOwner,
    setSelectedProjectOwner,
    selectedCountry,
    setSelectedCountry,
    projectName,
    setProjectName,
    projectDescription,
    setProjectDescription,
    duration,
    setDuration,
    hhRole,
    setHhRole,
    hhRoleOther,
    setHhRoleOther,
    consortium,
    setConsortium,
    history,
    setHistory,
    organizationType,
    setOrganizationType,
    organizationTypeOther,
    setOrganizationTypeOther,
    contractStatus,
    setContractStatus,
    funding,
    setFunding,
    exchange,
    setExchange,
    fundingSource,
    setFundingSource,
    fundingHistory,
    setFundingHistory,
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
    cooperationTypeOther,
    setCooperationTypeOther,
    clearAnswers,
  } = useFormAnswers();

  const otherOrganization = organizations.find(
    (organization) =>
        organization.countryId === OTHER_ORGANIZATION_COUNTRY_ID
  );


  const filteredOrganizations = selectedCountry
    ? organizations.filter(
          (organization) =>
              String(organization.countryId) === String(selectedCountry.id) &&
              organization.countryId !== OTHER_ORGANIZATION_COUNTRY_ID
      )
    : [];

  

const sortedOrganizations = sortElements(
    filteredOrganizations,
    language
);

  const filteredAdditionalOrganizations = additionalCountry
    ? organizations.filter(
        (organization) =>
          String(organization.countryId) === String(additionalCountry.id) &&
          organization.countryId !== OTHER_ORGANIZATION_COUNTRY_ID &&
          organization.id !== selectedOrganization?.id &&
          !selectedOrganizations.some((selected) => selected.id === organization.id)
      )
    : [];

  const sortedAdditionalOrganizations = sortElements(
    filteredAdditionalOrganizations,
    language
  );

  const sortedCountries = sortElements([...countries], language);

  const navigate = useNavigate();

  const [validationAttempted, setValidationAttempted] = useState(false);

  const t = i18n[language].formValidation

  const formValues: CooperationRiskFormValues = {
    projectName,
    ownerusername: selectedProjectOwner?.username ?? "",
    selectedCountry: String(selectedCountry?.id ?? ""),
    selectedOrganization: selectedOrganization?.id ?? "",
    selectedOrganizations:
      consortium === "option2"
        ? selectedOrganizations.map((org) => String(org.id))
        : [],
    organizationIsOther:
      selectedOrganization?.countryId === OTHER_ORGANIZATION_COUNTRY_ID,
    otherOrganizationCountry: otherOrganizationCountry?.id ?? "",
    organizationName,
    hhRole,
    hhRoleOther,
    consortium,
    history,
    organizationType,
    organizationTypeOther,
    contractStatus,
    cooperationType,
    cooperationTypeOther,
    funding,
    exchange,
    fundingSource,
    fundingHistory,
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
      {loadError && (
        <div role="alert">
          {language === "fi"
            ? "Tietojen lataaminen epäonnistui. Päivitä sivu ja yritä uudelleen."
            : "Some form data could not be loaded. Please refresh the page and try again."}
        </div>
      )}

      {errors.length > 0 && (
        <div role="alert">
          <strong>
            {t.fields.needsAttention(errors.length)}
          </strong>
        </div>
      )}
      <ul className={styles.formlist}>
        <li>
          {renderFieldError("projectName")}
          <TextField
            label={options?.name.placeholder[language]}
            fullWidth
            size="small"
            slotProps={{ htmlInput: { maxLength: 100 } }}
            error={Boolean(fieldErrors.projectName)}
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
          />
        </li>
        <li>
          {renderFieldError("ownerusername")}
          <SingleSelect
            question={{ fi: "Projektin omistaja", en: "Project owner" }}
            answers={users.map((user) => ({
              id: String(user.id ?? user.username),
              name: { fi: user.name ?? user.username, en: user.name ?? user.username },
            }))}
            placeholder={{ fi: "Valitse projektin omistaja", en: "Select project owner" }}
            language={language}
            value={selectedProjectOwner ? String(selectedProjectOwner.id ?? selectedProjectOwner.username) : ""}
            onChange={(value) => {
              setSelectedProjectOwner(
                users.find((user) => String(user.id ?? user.username) === value) ?? null,
              );
            }}
          />
        </li>
        <li>
          {renderFieldError("hhRole")}
          <SingleChoice
            id="hhrole"
            question={options?.hhrole}
            answers={options?.hhrole.options}
            language={language}
            value={hhRole}
            onChange={(value) => {
              setHhRole(value);
              if (value !== "option3") {
                setHhRoleOther("");
              }
            }}
          />
          {hhRole === "option3" && (
            <>
              {renderFieldError("hhRoleOther")}
              <TextField
                label={options?.hhrole.other.placeholder[language]}
                fullWidth
                size="small"
                slotProps={{ htmlInput: { maxLength: 100 } }}
                error={Boolean(fieldErrors.hhRoleOther)}
                value={hhRoleOther}
                onChange={(event) => setHhRoleOther(event.target.value)}
              />
            </>
          )}
        </li>
        <li>
          {renderFieldError("consortium")}
          <SingleChoice
            id="consortium"
            question={options?.consortium}
            answers={options?.consortium.options}
            language={language}
            value={consortium}
            onChange={(value) => {
              setConsortium(value);

             
              setSelectedOrganizations([]);
              setAdditionalCountry(null);
              setAdditionalOrganization(null);
              
            }}
          />
        </li>
        
        <li>
          {renderFieldError("selectedCountry")}
          <SingleSelect
            question={{
              fi: consortium === "option2"
                  ? "Pääyhteistyökumppanin sijaintimaa"
                  : "Yhteistyökumppanin sijaintimaa",
              en: consortium === "option2"
                  ? "Main collaborator's country of origin"
                  : "Collaborator's country of origin",
            }}
            answers={sortedCountries}
            placeholder={{ fi: "Valitse sijaintimaa", en: "Select country" }}
            language={language}
            value={selectedCountry?.id ?? ""}
            onChange={(value) => {
                setSelectedCountry(
                    countries.find((country) => country.id === value) ?? null
                );
            }}
          />
        </li>

        <li>
          {renderFieldError("selectedOrganization")}

          {/* Pääyhteistyökumppani */}
          <Autocomplete<Organization, false, false, false>
            options={sortedOrganizations}
            filterOptions={organizationFilter}
            value={selectedOrganization}
            onChange={(_event, newValue) => {
              
              setSelectedOrganization(newValue);
              if (newValue?.countryId !== OTHER_ORGANIZATION_COUNTRY_ID) {
                setOrganizationName("");
                setOtherOrganizationCountry(null);
              }
            }}
            getOptionLabel={(option) => option.name[language]}
            isOptionEqualToValue={(option, value) =>
              String(option.id) === String(value.id)
            }
            noOptionsText={language === "fi" ? "Organisaatioita ei löytynyt" : "No organizations found"}
            renderInput={(params) => (
              <TextField
                {...params}
                label={
                  consortium === "option2"
                    ? (language === "fi" ? "Pääyhteistyökumppani" : "Main collaborator")
                    : (language === "fi" ? "Organisaatio" : "Organization")
                }
                placeholder={
                  language === "fi" ? "Hae organisaatiota nimellä..." : "Search organizations by name..."
                }
                size="small"
                error={Boolean(fieldErrors.selectedOrganization)}
              />
            )}
          />

          {selectedOrganization?.countryId === OTHER_ORGANIZATION_COUNTRY_ID && (
            <>
              <TextField
                label={language === "fi" ? "Muun organisaation nimi" : "Other organization name"}
                fullWidth
                size="small"
                margin="normal"
                value={organizationName}
                onChange={(event) => setOrganizationName(event.target.value)}
                slotProps={{ htmlInput: { maxLength: 100 } }}
                error={Boolean(fieldErrors.organizationName)}
                helperText={fieldErrors.organizationName}
              />
              {renderFieldError("otherOrganizationCountry")}
              <SingleSelect
                question={{ fi: "Muun organisaation sijaintimaa", en: "Other organization's country" }}
                answers={sortedCountries}
                placeholder={{ fi: "Valitse sijaintimaa", en: "Select country" }}
                language={language}
                value={otherOrganizationCountry?.id ?? ""}
                onChange={(value) => setOtherOrganizationCountry(
                  countries.find((country) => country.id === value) ?? null
                )}
              />
            </>
          )}

          {consortium === "option2" && (
            <div style={{ marginTop: "24px" }}>
              <strong>{language === "fi" ? "Lisää muut yhteistyökumppanit" : "Add other collaborators"}</strong>

              <div style={{ marginTop: "12px" }}>
                <SingleSelect
                  question={{ fi: "Organisaation sijaintimaa", en: "Organization's country" }}
                  answers={sortedCountries}
                  placeholder={{ fi: "Valitse maa", en: "Select country" }}
                  language={language}
                  value={additionalCountry?.id ?? ""}
                  onChange={(value) => {
                    setAdditionalCountry(countries.find((country) => country.id === value) ?? null);
                    setAdditionalOrganization(null);
                  }}
                />
              </div>

              <div style={{ marginTop: "12px" }}>
                <Autocomplete<Organization, false, false, false>
                  options={sortedAdditionalOrganizations}
                  filterOptions={organizationFilter}
                  value={additionalOrganization}
                  onChange={(_event, newValue) => setAdditionalOrganization(newValue)}
                  getOptionLabel={(option) => option.name[language]}
                  isOptionEqualToValue={(option, value) => String(option.id) === String(value.id)}
                  disabled={!additionalCountry}
                  noOptionsText={language === "fi" ? "Organisaatioita ei löytynyt" : "No organizations found"}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label={language === "fi" ? "Organisaatio" : "Organization"}
                      placeholder={language === "fi" ? "Hae organisaatiota nimellä..." : "Search organizations by name..."}
                      size="small"
                    />
                  )}
                />
              </div>

              <Button
                variant="outlined"
                disabled={!additionalOrganization}
                onClick={() => {
                  if (!additionalOrganization) return;
                  setSelectedOrganizations((previous) => [...previous, additionalOrganization]);
                  setAdditionalCountry(null);
                  setAdditionalOrganization(null);
                }}
                sx={{ marginTop: 1 }}
              >
                {language === "fi" ? "Lisää organisaatio" : "Add organization"}
              </Button>

              {selectedOrganizations.length > 0 && (
                <div style={{ marginTop: "16px" }}>
                  <strong>{language === "fi" ? "Lisätyt organisaatiot" : "Added organizations"}</strong>
                  <ul>
                    {selectedOrganizations.map((organization) => (
                      <li key={organization.id}>
                        {organization.name[language]}
                        <Button
                          size="small"
                          color="error"
                          onClick={() => setSelectedOrganizations((previous) =>
                            previous.filter((item) => item.id !== organization.id)
                          )}
                        >
                          {language === "fi" ? "Poista" : "Remove"}
                        </Button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </li>

        <li>
          {renderFieldError("history")}
          <SingleChoice
            id="history"
            question={options?.history}
            answers={options?.history.options}
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
            id="organizationtype"
            question={options?.organizationtype}
            answers={options?.organizationtype.options}
            language={language}
            value={organizationType}
            onChange={(value) => {
              setOrganizationType(value);
              if (value !== "option5") {
                setOrganizationTypeOther("");
              }
            }}
          />
          {organizationType === "option5" && (
            <>
              {renderFieldError("organizationTypeOther")}
              <TextField
                label={options?.organizationtype.other.placeholder[language]}
                fullWidth
                size="small"
                slotProps={{ htmlInput: { maxLength: 100 } }}
                error={Boolean(fieldErrors.organizationTypeOther)}
                value={organizationTypeOther}
                onChange={(event) => setOrganizationTypeOther(event.target.value)}
              />
            </>
          )}
        </li>
        
        <li>
          {renderFieldError("contractStatus")}
          <SingleChoice
            id="contract"
            question={options?.contract}
            answers={options?.contract.options}
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
            id="cooperationType"
            question={options?.collaborationtype}
            answers={options?.collaborationtype.options}
            language={language}
            value={cooperationType}
            onChange={(value) => {
              setCooperationType(value);
              if (!value.includes("option7")) {
                setCooperationTypeOther("");
              }
            }}
          />
          {cooperationType.includes("option7") && (
            <>
              {renderFieldError("cooperationTypeOther")}
              <TextField
                label={options?.collaborationtype.other.placeholder[language]}
                fullWidth
                size="small"
                slotProps={{ htmlInput: { maxLength: 100 } }}
                error={Boolean(fieldErrors.cooperationTypeOther)}
                value={cooperationTypeOther}
                onChange={(event) => setCooperationTypeOther(event.target.value)}
              />
            </>
          )}
        </li>
        <li>
          {renderFieldError("funding")}
          <SingleChoice
            id="funding"
            question={options?.funding}
            answers={options?.funding.options}
            language={language}
            value={funding}
            onChange={(value) => {
              setFunding(value);
              if (value !== "option1") {
                setExchange("");
                setFundingSource("");
                setFundingHistory("");
              }
            }}
          />
        </li>
        {funding === "option1" && (
          <>
            <li>
              {renderFieldError("exchange")}
              <SingleSelect
                question={options?.funding.exchange.placeholder}
                answers={options?.funding.exchange.options.map((answer) => ({
                  id: answer.code,
                  name: { fi: answer.fi, en: answer.en },
                }))}
                placeholder={options?.funding.exchange}
                language={language}
                value={exchange}
                onChange={setExchange}
              />
            </li>
            <li>
              {renderFieldError("fundingSource")}
              <SingleSelect
                question={options?.funding.fundingsource.placeholder}
                answers={options?.funding.fundingsource.options.map((answer) => ({
                  id: answer.code,
                  name: { fi: answer.fi, en: answer.en },
                }))}
                placeholder={options?.funding.fundingsource}
                language={language}
                value={fundingSource}
                onChange={setFundingSource}
              />
            </li>
            <li>
              {renderFieldError("fundingHistory")}
              <SingleSelect
                question={options?.funding.fundinghistory.placeholder}
                answers={options?.funding.fundinghistory.options.map((answer) => ({
                  id: answer.code,
                  name: { fi: answer.fi, en: answer.en },
                }))}
                placeholder={options?.funding.fundinghistory}
                language={language}
                value={fundingHistory}
                onChange={setFundingHistory}
              />
            </li>
          </>
        )}
        <li>
          {renderFieldError("liability")}
          <SingleChoice
            id="liability"
            question={options?.liability}
            answers={options?.liability.options}
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
            id="personalinformation"
            question={options?.personalinformation}
            answers={options?.personalinformation.options}
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
            id="dualuse"
            question={options?.dualuse}
            answers={options?.dualuse.options}
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
            id="ethics"
            question={options?.ethics}
            answers={options?.ethics.options}
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
            id="duration"
            question={options?.duration}
            answers={options?.duration.options}
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
