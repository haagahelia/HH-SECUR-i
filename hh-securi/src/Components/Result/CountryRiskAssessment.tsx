import type { RiskCalculationResponse } from "../../types";
import styles from "../../styles.module.css";
import { useFormAnswers } from "../../context/FormAnswersContext";
import { Typography, List, ListItem } from "@mui/material";

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
                            <Typography component="h3" variant="h5">Yhteistyön riskit</Typography>
                            :
                            <Typography component="h3" variant="h5">Collaboration Risks</Typography>
                        }
                        <Typography fontWeight="bold">{results.collaboration.title[language]}</Typography>
                        {riskSymbol(results.collaboration.risk)}<Typography>{results.collaboration.description[language]}</Typography>
                    </div>
                    <div>
                        {language === "fi" ?
                            <Typography sx={{ maxWidth: "1000px" }}>Alla mainittujen riskitekijöiden lisäksi kokonaisriskiin vaikuttavat antamasi tiedot Haaga-Helian roolista yhteistyössä.</Typography>
                            :
                            <Typography sx={{ maxWidth: "1000px", padding: "0px" }}>In addition to the risk factors listed below, the overall risk is also influenced by the information you provided about Haaga-Helia’s role in the collaboration.</Typography>
                        }
                    </div>
                    <div>
                        <Typography fontWeight="bold">{results.country.overall.title[language]}</Typography>
                        {riskSymbol(results.country.overall.risk)}<Typography>{results.collaboration.description[language]}</Typography>
                    </div>
                    
                    <List>
                        <ListItem>
                            <Typography>{results.country.corruption.title[language]}</Typography>
                            {riskSymbol(results.country.corruption.risk)}<Typography>{results.country.corruption.description[language]}</Typography>
                        </ListItem>
                        <ListItem>
                            <Typography>{results.country.security.title[language]}</Typography>
                            {riskSymbol(results.country.security.risk)}<Typography>{results.country.security.description[language]}</Typography>
                        </ListItem>
                        <ListItem>
                            <Typography>{results.country.academicfreedom.title[language]}</Typography>
                            {riskSymbol(results.country.academicfreedom.risk)}<Typography>{results.country.academicfreedom.description[language]}</Typography>
                        </ListItem>
                        <ListItem>
                            <Typography>{results.country.politicalstability.title[language]}</Typography>
                            {riskSymbol(results.country.politicalstability.risk)}<Typography>{results.country.politicalstability.description[language]}</Typography>
                        </ListItem>
                        <ListItem>
                            <Typography>{results.country.development.title[language]}</Typography>
                            {riskSymbol(results.country.development.risk)}<Typography>{results.country.development.description[language]}</Typography>
                        </ListItem>
                        <ListItem>
                            <Typography>{results.country.gdpr.title[language]}</Typography>
                            {riskSymbol(results.country.gdpr.risk)}<Typography>{results.country.gdpr.description[language]}</Typography>
                        </ListItem>
                        <ListItem>
                            <Typography>{results.country.sanctions.title[language]}</Typography>
                            {riskSymbol(results.country.sanctions.risk)}<Typography>{results.country.sanctions.description[language]}</Typography>
                        </ListItem>
                        <ListItem>
                            <Typography>{results.country.ruleoflaw.title[language]}</Typography>
                            {riskSymbol(results.country.ruleoflaw.risk)}<Typography>{results.country.ruleoflaw.description[language]}</Typography>
                        </ListItem>
                    </List>
                    
                    <div>
                        <Typography fontWeight="bold">{results.organization.title[language]}</Typography>
                        {riskSymbol(results.organization.risk)}<Typography>{results.organization.description[language]}</Typography>
                    </div>
                    <div>
                        <Typography fontWeight="bold">{results.financial.overall.title[language]}</Typography>
                        {riskSymbol(results.financial.overall.risk)}<Typography>{results.financial.overall.description[language]}</Typography>
                    </div>

                    <List>
                        <ListItem>
                            <Typography>{results.financial.exchange.title[language]}</Typography>
                            {riskSymbol(results.financial.exchange.risk)}<Typography>{results.financial.exchange.description[language]}</Typography>
                        </ListItem>
                        <ListItem>
                            <Typography>{results.financial.scope.title[language]}</Typography>
                            {riskSymbol(results.financial.scope.risk)}<Typography>{results.financial.scope.description[language]}</Typography>
                        </ListItem>
                    </List>

                    <div>
                        <Typography fontWeight="bold">{results.dualuse.title[language]}</Typography>
                        {riskSymbol(results.dualuse.risk)}<Typography>{results.dualuse.description[language]}</Typography>
                    </div>
                    <Typography fontWeight="bold">{results.ethics.title[language]}</Typography>
                    {riskSymbol(results.ethics.risk)}<Typography>{results.ethics.description[language]}</Typography>
                </div>
            }
        </ >
    );
};

export default CountryRiskAssessment;