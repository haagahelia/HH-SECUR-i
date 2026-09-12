import { i18n } from "./translations"; 

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
  const t = i18n[language].formValidation

  const requiredMessage = (message: string) => message;

  if (!values.projectName.trim()) {
    errors.projectName = requiredMessage(
      t.projectName.required
    );
  } else if (values.projectName.trim().length < 3) {
    errors.projectName = requiredMessage(
      t.projectName.atLeast
    );
  } else if (values.projectName.length > 100) {
    errors.projectName = requiredMessage(
      t.projectName.orLess
    );
  }

  const requiredFields: Array<[
    Exclude<ValidationField, "projectName" | "cooperationType" | "projectDescription">,
    string,
    string,
    string,
  ]> = [
    ["selectedCountry", "Maa", "Country", t.selectedCountry.required],
    [
      "selectedOrganization",
      "Organisaatio",
      "Organization",
      t.selectedOrganization.required
    ],
    ["hhRole", "Haaga-Helian rooli", "HH role", t.hhRole.required],
    ["consortium", "Konsortio", "Consortium", t.consortium.required],
    ["history", "Yhteistyöhistoria", "History", t.history.required],
    [
      "organizationType",
      "Organisaatiotyyppi",
      "Organization type",
      t.organizationType.required
    ],
    ["contractStatus", "Sopimustiedot", "Contract status", t.contractStatus.required],
    ["funding", "Rahoitus", "Funding", t.funding.required],
    ["liability", "Vastuut", "Liability", t.liability.required],
    [
      "personalInformation",
      "Henkilötiedot",
      "Personal information",
      t.personalInformation.required,
    ],
    ["dualUse", "Kaksikäyttöisyys", "Dual use", t.dualUse.required],
    ["ethics", "Eettinen arviointi", "Ethics", t.ethics.required],
    ["duration", "Kesto", "Duration", t.duration.required],
  ];

  requiredFields.forEach(([field, , , message]) => {
    if (!values[field].trim()) {
      errors[field] = requiredMessage(message);
    }
  });

  if (values.cooperationType.length === 0) {
    errors.cooperationType = requiredMessage(
      t.cooperationType.required,
    );
  }

  const descriptionLength = values.projectDescription.trim().length;
  if (values.projectDescription.length > 1000) {
    errors.projectDescription = requiredMessage(
      t.projectDescription.orLess,
    );
  } else if (descriptionLength > 0 && descriptionLength < 10) {
    errors.projectDescription = requiredMessage(
      t.projectDescription.atLeast,
    );
  }

  return errors;
};
