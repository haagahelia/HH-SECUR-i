import type { RiskCalculationResponse } from "../../types";
import styles from "../../styles.module.css";
import { useFormAnswers } from "../../context/FormAnswersContext";

type CountryRiskAssessmentProps = {
    language: "fi" | "en";
    results: RiskCalculationResponse | undefined;
};

const CountryRiskAssessment = ({
    language,
    results
}: CountryRiskAssessmentProps) => {

    // Coloured circular symbol for country risk ratings
    const riskSymbol = (risk: number) => {
        if (risk === 1) {
            return <span className={styles.riskCircleGreen}><b>1</b></span>
        } else if (risk === 2) {
            return <span className={styles.riskCircleYellow}><b>2</b></span>
        } else if (risk === 3) {
            return <span className={styles.riskCircleRed}><b>3</b></span>
        } else {
            return <span></span>
        }
    }

    return (
        <>
            {results && language &&
                <div>
                    <div>
                        {language === "fi" ?
                            <h3>Yhteistyön riskit</h3>
                            :
                            <h3>Collaboration Risks</h3>
                        }
                        <p><b>{results.collaboration.title[language]}</b></p>
                        {riskSymbol(results.collaboration.risk)}<p><i>{results.collaboration.description[language]}</i></p>
                    </div>
                    <div>
                        {language === "fi" ?
                            <p style={{ maxWidth: "1000px" }}>Alla mainittujen riskitekijöiden lisäksi kokonaisriskiin vaikuttavat antamasi tiedot Haaga-Helian roolista yhteistyössä.</p>
                            :
                            <p style={{ maxWidth: "1000px" }}>In addition to the risk factors listed below, the overall risk is also influenced by the information you provided about Haaga-Helia’s role in the collaboration.</p>
                        }
                    </div>
                    <div>
                        <p><b>{results.country.overall.title[language]}</b></p>
                        {riskSymbol(results.country.overall.risk)}<p><i>{results.collaboration.description[language]}</i></p>
                    </div>

                    <ul>
                        <li>
                            <p>{results.country.corruption.title[language]}</p>
                            {riskSymbol(results.country.corruption.risk)}<p><i>{results.country.corruption.description[language]}</i></p>
                        </li>
                        <li>
                            <p>{results.country.security.title[language]}</p>
                            {riskSymbol(results.country.security.risk)}<p><i>{results.country.security.description[language]}</i></p>
                        </li>
                        <li>
                            <p>{results.country.academicfreedom.title[language]}</p>
                            {riskSymbol(results.country.academicfreedom.risk)}<p><i>{results.country.academicfreedom.description[language]}</i></p>
                        </li>
                        <li>
                            <p>{results.country.politicalstability.title[language]}</p>
                            {riskSymbol(results.country.politicalstability.risk)}<p><i>{results.country.politicalstability.description[language]}</i></p>
                        </li>
                        <li>
                            <p>{results.country.development.title[language]}</p>
                            {riskSymbol(results.country.development.risk)}<p><i>{results.country.development.description[language]}</i></p>
                        </li>
                        <li>
                            <p>{results.country.gdpr.title[language]}</p>
                            {riskSymbol(results.country.gdpr.risk)}<p><i>{results.country.gdpr.description[language]}</i></p>
                        </li>
                        <li>
                            <p>{results.country.sanctions.title[language]}</p>
                            {riskSymbol(results.country.sanctions.risk)}<p><i>{results.country.sanctions.description[language]}</i></p>
                        </li>
                        <li>
                            <p>{results.country.ruleoflaw.title[language]}</p>
                            {riskSymbol(results.country.ruleoflaw.risk)}<p><i>{results.country.ruleoflaw.description[language]}</i></p>
                        </li>
                    </ul>
                    <div>
                        <p><b>{results.organization.title[language]}</b></p>
                        {riskSymbol(results.organization.risk)}<p><i>{results.organization.description[language]}</i></p>
                    </div>
                    <div>
                        <p><b>{results.financial.overall.title[language]}</b></p>
                        {riskSymbol(results.financial.overall.risk)}<p><i>{results.financial.overall.description[language]}</i></p>
                    </div>
                    <ul>
                        <li>
                            <p>{results.financial.exchange.title[language]}</p>
                            {riskSymbol(results.financial.exchange.risk)}<p><i>{results.financial.exchange.description[language]}</i></p>
                        </li>
                        <li>
                            <p>{results.financial.scope.title[language]}</p>
                            {riskSymbol(results.financial.scope.risk)}<p><i>{results.financial.scope.description[language]}</i></p>
                        </li>
                    </ul>

                    <div>
                        <p><b>{results.dualuse.title[language]}</b></p>
                        {riskSymbol(results.dualuse.risk)}<p><i>{results.dualuse.description[language]}</i></p>
                    </div>
                    <p><b>{results.ethics.title[language]}</b></p>
                    {riskSymbol(results.ethics.risk)}<p><i>{results.ethics.description[language]}</i></p>
                </div>
            }
        </ >
    );
};

export default CountryRiskAssessment;