import { describe, expect, it } from "vitest";
import {
  validateCooperationRiskForm,
  type CooperationRiskFormValues,
} from "./validation";

const validValues: CooperationRiskFormValues = {
  projectName: "Risk project",
  selectedCountry: "fi",
  selectedOrganization: "hh",
  hhRole: "researcher",
  consortium: "yes",
  history: "existing",
  organizationType: "university",
  contractStatus: "signed",
  cooperationType: ["research"],
  funding: "internal",
  liability: "shared",
  personalInformation: "no",
  dualUse: "no",
  ethics: "approved",
  duration: "one-year",
  projectDescription: "Additional project information",
};

describe("validateCooperationRiskForm", () => {
  it("reports all missing mandatory fields in English", () => {
    const errors = validateCooperationRiskForm(
      {
        ...validValues,
        projectName: "",
        selectedCountry: "",
        selectedOrganization: "",
        hhRole: "",
        consortium: "",
        history: "",
        organizationType: "",
        contractStatus: "",
        cooperationType: [],
        funding: "",
        liability: "",
        personalInformation: "",
        dualUse: "",
        ethics: "",
        duration: "",
      },
      "en",
    );

    expect(errors.projectName).toBe("Project name is required");
    expect(errors.selectedCountry).toBe("Country is required");
    expect(errors.cooperationType).toBe("Select at least one cooperation type");
    expect(errors.duration).toBe("Duration is required");
  });

  it("returns Finnish messages when Finnish is selected", () => {
    const errors = validateCooperationRiskForm(
      { ...validValues, projectName: "ab", projectDescription: "short" },
      "fi",
    );

    expect(errors.projectName).toBe(
      "Projektin nimessä on oltava vähintään 3 merkkiä",
    );
    expect(errors.projectDescription).toBe(
      "Lisätiedoissa on oltava vähintään 10 merkkiä",
    );
  });

  it("reports maximum length violations", () => {
    const errors = validateCooperationRiskForm(
      {
        ...validValues,
        projectName: "a".repeat(101),
        projectDescription: "a".repeat(1001),
      },
      "en",
    );

    expect(errors.projectName).toBe(
      "Project name must be 100 characters or less",
    );
    expect(errors.projectDescription).toBe(
      "Additional information must be 1000 characters or less",
    );
  });

  it("returns no errors for valid values", () => {
    expect(validateCooperationRiskForm(validValues, "en")).toEqual({});
  });
});
