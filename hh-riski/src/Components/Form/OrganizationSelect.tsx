import type { Organization } from "../../types";

type OrganizationSelectProps = {
  selectedOrganization: string;
  selectedLanguage: "fi" | "en";
  organizations: Organization[];
  onChange: (value: string) => void;
};

const OrganizationSelect = ({
  selectedOrganization,
  selectedLanguage,
  organizations,
  onChange,
}: OrganizationSelectProps) => {
  return (
    <div>
      <h2>{selectedLanguage === "fi" ? "Organisaatio" : "Organization"}</h2>

      <select
        value={selectedOrganization}
        onChange={(e) => onChange(e.target.value)}
      >
        <option value="">
          {selectedLanguage === "fi"
            ? "Valitse organisaatio"
            : "Choose organization"}
        </option>

        {organizations.map((organization) => (
          <option key={organization.id} value={organization.id}>
            {organization.name[selectedLanguage]}
          </option>
        ))}
      </select>
    </div>
  );
};

export default OrganizationSelect;