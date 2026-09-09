export type ValidationField =
  | "projectName"
  | "selectedCountry"
  | "selectedOrganization"
  | "hhRole"
  | "consortium"
  | "history"
  | "organizationType"
  | "contractStatus"
  | "cooperationType"
  | "funding"
  | "liability"
  | "personalInformation"
  | "dualUse"
  | "ethics"
  | "duration"
  | "projectDescription";

export type ValidationErrors = Partial<Record<ValidationField, string>>;

export type CooperationRiskFormValues = {
  projectName: string;
  selectedCountry: string;
  selectedOrganization: string;
  hhRole: string;
  consortium: string;
  history: string;
  organizationType: string;
  contractStatus: string;
  cooperationType: string[];
  funding: string;
  liability: string;
  personalInformation: string;
  dualUse: string;
  ethics: string;
  duration: string;
  projectDescription: string;
};

export const validateCooperationRiskForm = (
  values: CooperationRiskFormValues,
  language: "fi" | "en",
): ValidationErrors => {
  const errors: ValidationErrors = {};
  const isFinnish = language === "fi";

  const requiredMessage = (finnish: string, english: string) =>
    isFinnish ? finnish : english;

  if (!values.projectName.trim()) {
    errors.projectName = requiredMessage(
      "Projektin nimi on pakollinen",
      "Project name is required",
    );
  } else if (values.projectName.trim().length < 3) {
    errors.projectName = requiredMessage(
      "Projektin nimessä on oltava vähintään 3 merkkiä",
      "Project name must be at least 3 characters",
    );
  } else if (values.projectName.length > 100) {
    errors.projectName = requiredMessage(
      "Projektin nimessä saa olla enintään 100 merkkiä",
      "Project name must be 100 characters or less",
    );
  }

  const requiredFields: Array<[
    Exclude<ValidationField, "projectName" | "cooperationType" | "projectDescription">,
    string,
    string,
    string,
    string,
  ]> = [
    ["selectedCountry", "Maa", "Country", "Maa on pakollinen", "Country is required"],
    [
      "selectedOrganization",
      "Organisaatio",
      "Organization",
      "Organisaatio on pakollinen",
      "Organization is required",
    ],
    ["hhRole", "Haaga-Helian rooli", "HH role", "Haaga-Helian rooli on pakollinen", "HH role is required"],
    ["consortium", "Konsortio", "Consortium", "Konsortio on pakollinen", "Consortium is required"],
    ["history", "Yhteistyöhistoria", "History", "Yhteistyöhistoria on pakollinen", "History is required"],
    [
      "organizationType",
      "Organisaatiotyyppi",
      "Organization type",
      "Organisaatiotyyppi on pakollinen",
      "Organization type is required",
    ],
    ["contractStatus", "Sopimustiedot", "Contract status", "Sopimustiedot on pakolliset", "Contract status is required"],
    ["funding", "Rahoitus", "Funding", "Rahoitus on pakollinen", "Funding is required"],
    ["liability", "Vastuut", "Liability", "Vastuut on pakolliset", "Liability is required"],
    [
      "personalInformation",
      "Henkilötiedot",
      "Personal information",
      "Henkilötiedot ovat pakolliset",
      "Personal information is required",
    ],
    ["dualUse", "Kaksikäyttöisyys", "Dual use", "Kaksikäyttöisyys on pakollinen", "Dual use is required"],
    ["ethics", "Eettinen arviointi", "Ethics", "Eettinen arviointi on pakollinen", "Ethics is required"],
    ["duration", "Kesto", "Duration", "Kesto on pakollinen", "Duration is required"],
  ];

  requiredFields.forEach(([field, , , finnishMessage, englishMessage]) => {
    if (!values[field].trim()) {
      errors[field] = requiredMessage(finnishMessage, englishMessage);
    }
  });

  if (values.cooperationType.length === 0) {
    errors.cooperationType = requiredMessage(
      "Valitse vähintään yksi yhteistyön tyyppi",
      "Select at least one cooperation type",
    );
  }

  const descriptionLength = values.projectDescription.trim().length;
  if (values.projectDescription.length > 1000) {
    errors.projectDescription = requiredMessage(
      "Lisätiedoissa saa olla enintään 1000 merkkiä",
      "Additional information must be 1000 characters or less",
    );
  } else if (descriptionLength > 0 && descriptionLength < 10) {
    errors.projectDescription = requiredMessage(
      "Lisätiedoissa on oltava vähintään 10 merkkiä",
      "Additional information must be at least 10 characters",
    );
  }

  return errors;
};
