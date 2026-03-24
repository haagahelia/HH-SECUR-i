import type { Country } from "../../types";

type RiskSummaryProps = {
  country: Country;
  language: "fi" | "en";
};

const getRiskLabel = (value: number, language: "fi" | "en") => {
  if (language === "fi") {
    if (value === 1) return "Matala";
    if (value === 2) return "Keskitaso";
    if (value === 3) return "Korkea";
    return "Ei määritelty";
  }

  if (value === 1) return "Low";
  if (value === 2) return "Medium";
  if (value === 3) return "High";
  return "Not defined";
};

const RiskSummary = ({ country, language }: RiskSummaryProps) => {
  const risk = country.risk;

  return (
    <div>
      

      <p>
        <strong>{language === "fi" ? "Maa" : "Country"}:</strong>{" "}
        {country.name[language]}
      </p>

      <ul>
        <li>
          {language === "fi" ? "Korruptio" : "Corruption"}:{" "}
          {getRiskLabel(risk.corruption, language)}
        </li>
        <li>
          {language === "fi" ? "Turvallisuus" : "Security"}:{" "}
          {getRiskLabel(risk.security, language)}
        </li>
        <li>
          {language === "fi" ? "Akateeminen vapaus" : "Academic Freedom"}:{" "}
          {getRiskLabel(risk.academicFreedom, language)}
        </li>
        <li>
          {language === "fi" ? "Kehitystaso" : "Development"}:{" "}
          {getRiskLabel(risk.development, language)}
        </li>
        <li>
          GDPR: {getRiskLabel(risk.GDPR, language)}
        </li>
        <li>
          {language === "fi" ? "Pakotteet" : "Sanctions"}:{" "}
          {getRiskLabel(risk.sanctions, language)}
        </li>
        <li>
          {language === "fi" ? "Oikeusvaltio" : "Rule of Law"}:{" "}
          {getRiskLabel(risk.ruleOfLaw, language)}
        </li>
      </ul>
    </div>
  );
};

export default RiskSummary;