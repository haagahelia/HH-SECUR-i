import type { Country } from "../../types";

type CountrySelectProps = {
  selectedCountry: string;
  selectedLanguage: "fi" | "en";
  countries: Country[];
  onChange: (value: string) => void;
};

const CountrySelect = ({
  selectedCountry,
  selectedLanguage,
  countries,
  onChange,
}: CountrySelectProps) => {
  return (
    <div>
      <p>{selectedLanguage === "fi" ? "Yhteistyökumppanin sijaintimaa" : "Partner's country of residence"}</p>

      <select
        value={selectedCountry}
        onChange={(e) => onChange(e.target.value)}
      >
        <option value="">
          {selectedLanguage === "fi"
            ? "Valitse sijaintimaa"
            : "Choose Country"}
        </option>
        {countries.map((country) => (
          <option key={country.id} value={country.id}>
            {country.name[selectedLanguage]}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CountrySelect;