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
      <h2>{selectedLanguage === "fi" ? "Maa" : "Country"}</h2>

      <select
        value={selectedCountry}
        onChange={(e) => onChange(e.target.value)}
      >
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