
import { i18n } from "./translations";

export type ValidationField =
  | "projectName"
  | "ownername"
  | "selectedCountry"
  | "selectedOrganization"
  | "otherOrganizationCountry"
  | "organizationName"
  | "hhRole"
  | "hhRoleOther"
  | "consortium"
  | "history"
  | "organizationType"
  | "organizationTypeOther"
  | "contractStatus"
  | "cooperationType"
  | "cooperationTypeOther"
  | "funding"
  | "exchange"
  | "fundingSource"
  | "fundingHistory"
  | "liability"
  | "personalInformation"
  | "dualUse"
  | "ethics"
  | "duration"
  | "projectDescription";

export type ValidationErrors = Partial<Record<ValidationField, string>>;

export type CooperationRiskFormValues = {
  projectName: string;
  ownername: string;
  selectedCountry: string;
  selectedOrganization: string;
  selectedOrganizations: string[];
  organizationIsOther: boolean;
  organizationName?: string;
  otherOrganizationCountry: string;
  hhRole: string;
  hhRoleOther: string;
  consortium: string;
  history: string;
  organizationType: string;
  organizationTypeOther: string;
  contractStatus: string;
  cooperationType: string[];
  cooperationTypeOther: string;
  funding: string;
  exchange: string;
  fundingSource: string;
  fundingHistory: string;
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
  const t = i18n[language].formValidation;

  const requiredMessage = (message: string) => message;

  const toString = (value: unknown): string =>
    value == null ? "" : String(value);

  // Projektin nimi
  if (!toString(values.projectName).trim()) {
    errors.projectName = requiredMessage(t.projectName.required);
  } else if (toString(values.projectName).trim().length < 3) {
    errors.projectName = requiredMessage(t.projectName.atLeast);
  } else if (toString(values.projectName).length > 100) {
    errors.projectName = requiredMessage(t.projectName.orLess);
  }

  // Haaga-Helian muu rooli
  if (values.hhRole === "other" && !toString(values.hhRoleOther).trim()) {
    errors.hhRoleOther = requiredMessage(t.hhRoleOther.required);
  }

  // Muu organisaatiotyyppi
  if (
    values.organizationType === "option5" &&
    !toString(values.organizationTypeOther).trim()
  ) {
    errors.organizationTypeOther = requiredMessage(
      t.organizationTypeOther.required,
    );
  }

  // Organisaation nimi, jos Muu on valittu
  if (
    values.organizationIsOther &&
    !toString(values.organizationName).trim()
  ) {
    errors.organizationName = requiredMessage(
      language === "fi"
        ? "Anna muun organisaation nimi"
        : "Please specify the other organization's name",
    );
  }

  // Pakolliset kentät
  const requiredFields: Array<
    [
      Exclude<
        ValidationField,
        | "projectName"
        | "cooperationType"
        | "projectDescription"
        | "selectedOrganization"
        | "otherOrganizationCountry"
        | "organizationName"
      >,
      string
    ]
  > = [
    [
      "ownername",
      language === "fi"
        ? "Projektin omistaja on pakollinen"
        : "Project owner is required",
    ],
    ["selectedCountry", t.selectedCountry.required],
    ["hhRole", t.hhRole.required],
    ["consortium", t.consortium.required],
    ["history", t.history.required],
    ["organizationType", t.organizationType.required],
    ["contractStatus", t.contractStatus.required],
    ["funding", t.funding.required],
    ["liability", t.liability.required],
    ["personalInformation", t.personalInformation.required],
    ["dualUse", t.dualUse.required],
    ["ethics", t.ethics.required],
    ["duration", t.duration.required],
  ];

  requiredFields.forEach(([field, message]) => {
    if (!toString(values[field]).trim()) {
      errors[field] = requiredMessage(message);
    }
  });

  // Organisaation valinnan validointi
  if (values.consortium === "option2") {
    // Monenkeskinen yhteistyö: vähintään yksi organisaatio
    const hasOrganizations =
      Boolean(toString(values.selectedOrganization).trim()) ||
      (Array.isArray(values.selectedOrganizations) &&
      values.selectedOrganizations.length > 0);

    if (!hasOrganizations) {
      errors.selectedOrganization = t.selectedOrganization.required;
    }

    // Muu-organisaation lisätietojen validointi
    if (values.organizationIsOther) {
      if (!toString(values.organizationName).trim()) {
        errors.organizationName = requiredMessage(
          language === "fi"
            ? "Anna muun organisaation nimi"
            : "Please specify the other organization's name",
        );
      }

      if (!toString(values.otherOrganizationCountry).trim()) {
        errors.otherOrganizationCountry = requiredMessage(
          language === "fi"
            ? "Valitse muun organisaation sijaintimaa"
            : "Select the other organization's country",
        );
      }
    }
  } else {
    // Kahdenvälinen yhteistyö: yksi organisaatio
    if (!toString(values.selectedOrganization).trim()) {
      errors.selectedOrganization = t.selectedOrganization.required;
    }
  }

  // Rahoituksen lisätiedot
  if (values.funding === "option1") {
    const fundingRequiredFields = [
      [
        "exchange",
        language === "fi"
          ? "Rahoitukseen liittyvä vaihto on pakollinen"
          : "Funding exchange is required",
      ],
      [
        "fundingSource",
        language === "fi"
          ? "Rahoituksen lähde on pakollinen"
          : "Funding source is required",
      ],
      [
        "fundingHistory",
        language === "fi"
          ? "Rahoitushistoria on pakollinen"
          : "Funding history is required",
      ],
    ] as const;

    for (const [field, message] of fundingRequiredFields) {
      if (!toString(values[field]).trim()) {
        errors[field] = message;
      }
    }
  }

  // Yhteistyötyypit
  if (
    !Array.isArray(values.cooperationType) ||
    values.cooperationType.length === 0
  ) {
    errors.cooperationType = requiredMessage(
      t.cooperationType.required,
    );
  }

  // Muu yhteistyötyyppi
  if (
    Array.isArray(values.cooperationType) &&
    values.cooperationType.includes("option7") &&
    !toString(values.cooperationTypeOther).trim()
  ) {
    errors.cooperationTypeOther = requiredMessage(
      t.cooperationTypeOther.required,
    );
  }

  // Lisätiedot
  const projectDescription = toString(values.projectDescription);
  const descriptionLength = projectDescription.trim().length;

  if (projectDescription.length > 1000) {
    errors.projectDescription = requiredMessage(
      t.projectDescription.orLess,
    );
  } else if (
    descriptionLength > 0 &&
    descriptionLength < 10
  ) {
    errors.projectDescription = requiredMessage(
      t.projectDescription.atLeast,
    );
  }

  return errors;
};
