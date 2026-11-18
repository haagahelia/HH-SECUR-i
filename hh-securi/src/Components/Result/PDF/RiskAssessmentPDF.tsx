import type { RiskCalculationResponse, User } from "../../../types";
import { Text, View, } from '@react-pdf/renderer';
import { PDFstyles } from "../../../PDFstyles";

type CountryRiskAssessmentProps = {
    language: "fi" | "en";
    results: RiskCalculationResponse | undefined;
};

const riskSymbol = (risk: number) => {
    if (risk === 1) {
        return <View style={PDFstyles.riskCircleGreen}><Text>1</Text></View>
    } else if (risk === 2) {
        return <View style={PDFstyles.riskCircleYellow}><Text>2</Text></View>
    } else if (risk === 3) {
        return <View style={PDFstyles.riskCircleRed}><Text>3</Text></View>
    } else {
        return <View></View>
    }
}

export const RiskAssessment = ({
    language,
    results
}: CountryRiskAssessmentProps) => {
    if (!results || !language) return null;

    return (
        <View style={PDFstyles.resultsCountryDiv}>
            <View style={PDFstyles.resultsCountryDiv}>
                {language === "fi" ?
                    <Text style={PDFstyles.resultsCountryH5}>Yhteistyön riskit</Text>
                    :
                    <Text style={PDFstyles.resultsCountryH5}>Collaboration Risks</Text>
                }
                <View wrap={false}>
                    <View style={PDFstyles.resultsCountryRow}>
                        <View style={PDFstyles.resultsCountryP}>
                            <Text style={PDFstyles.bold}>{results.collaboration.title[language]}</Text>
                        </View>
                        <View style={PDFstyles.resultsCountryP}>{riskSymbol(results.collaboration.risk)}</View>
                    </View>
                    <Text style={PDFstyles.resultsCountryP}>{results.collaboration.description[language]}</Text>
                </View>
            </View>
            <View style={PDFstyles.resultsCountryDiv}>
                {language === "fi" ?
                    <Text style={PDFstyles.resultsCountryP}>Alla mainittujen riskitekijöiden lisäksi kokonaisriskiin vaikuttavat antamasi tiedot Haaga-Helian rooViewa yhteistyössä.</Text>
                    :
                    <Text style={PDFstyles.resultsCountryP}>In addition to the risk factors Viewed below, the overall risk is also influenced by the information you provided about Haaga-Helia’s role in the collaboration.</Text>
                }
            </View>
            <View wrap={false} style={PDFstyles.resultsCountryDiv}>
                <View style={PDFstyles.resultsCountryRow}>
                    <View style={PDFstyles.resultsCountryP}>
                        <Text style={PDFstyles.bold}>{results.country.overall.title[language]}</Text>
                    </View>
                    <View style={PDFstyles.resultsCountryP}>{riskSymbol(results.country.overall.risk)}</View>
                </View>
                <Text style={PDFstyles.resultsCountryP}>{results.collaboration.description[language]}</Text>
            </View>

            <View style={PDFstyles.resultsCountryUl}>
                <View wrap={false} style={PDFstyles.resultsCountryLi}>
                    <View style={PDFstyles.resultsCountryRow}>
                        <Text style={PDFstyles.resultsCountryP}>{results.country.corruption.title[language]}</Text>
                        <View style={PDFstyles.resultsCountryP}>{riskSymbol(results.country.corruption.risk)}</View>
                    </View>
                    <Text style={PDFstyles.resultsCountryP}>{results.country.corruption.description[language]}</Text>
                </View>
                <View wrap={false} style={PDFstyles.resultsCountryLi}>
                    <View style={PDFstyles.resultsCountryRow}>
                        <Text style={PDFstyles.resultsCountryP}>{results.country.security.title[language]}</Text>
                        <View>{riskSymbol(results.country.security.risk)}</View>
                    </View>
                    <Text style={PDFstyles.resultsCountryP}>{results.country.security.description[language]}</Text>
                </View>
                <View wrap={false} style={PDFstyles.resultsCountryLi}>
                    <View style={PDFstyles.resultsCountryRow}>
                        <Text style={PDFstyles.resultsCountryP}>{results.country.academicfreedom.title[language]}</Text>
                        <View>{riskSymbol(results.country.academicfreedom.risk)}</View>
                    </View>
                    <Text style={PDFstyles.resultsCountryP}>{results.country.academicfreedom.description[language]}</Text>
                </View>
                <View wrap={false} style={PDFstyles.resultsCountryLi}>
                    <View style={PDFstyles.resultsCountryRow}>
                        <Text style={PDFstyles.resultsCountryP}>{results.country.politicalstability.title[language]}</Text>
                        <View>{riskSymbol(results.country.politicalstability.risk)}</View>
                    </View>
                    <Text style={PDFstyles.resultsCountryP}>{results.country.politicalstability.description[language]}</Text>
                </View>
                <View wrap={false} style={PDFstyles.resultsCountryLi}>
                    <View style={PDFstyles.resultsCountryRow}>
                        <Text style={PDFstyles.resultsCountryP}>{results.country.development.title[language]}</Text>
                        <View>{riskSymbol(results.country.development.risk)}</View>
                    </View>
                    <Text style={PDFstyles.resultsCountryP}>{results.country.development.description[language]}</Text>
                </View>
                <View wrap={false} style={PDFstyles.resultsCountryLi}>
                    <View style={PDFstyles.resultsCountryRow}>
                        <Text style={PDFstyles.resultsCountryP}>{results.country.gdpr.title[language]}</Text>
                        <View>{riskSymbol(results.country.gdpr.risk)}</View>
                    </View>
                    <Text style={PDFstyles.resultsCountryP}>{results.country.gdpr.description[language]}</Text>
                </View>
                <View wrap={false} style={PDFstyles.resultsCountryLi}>
                    <View style={PDFstyles.resultsCountryRow}>
                        <Text style={PDFstyles.resultsCountryP}>{results.country.sanctions.title[language]}</Text>
                        <View>{riskSymbol(results.country.sanctions.risk)}</View>
                    </View>
                    <Text style={PDFstyles.resultsCountryP}>{results.country.sanctions.description[language]}</Text>
                </View>
                <View wrap={false} style={PDFstyles.resultsCountryLi}>
                    <View style={PDFstyles.resultsCountryRow}>
                        <Text style={PDFstyles.resultsCountryP}>{results.country.ruleoflaw.title[language]}</Text>
                        <View>{riskSymbol(results.country.ruleoflaw.risk)}</View>
                    </View>
                    <Text style={PDFstyles.resultsCountryP}>{results.country.ruleoflaw.description[language]}</Text>
                </View>
            </View>

            <View wrap={false} style={PDFstyles.resultsCountryDiv}>
                <View style={PDFstyles.resultsCountryRow}>
                    <View style={PDFstyles.resultsCountryP}>
                        <Text style={PDFstyles.bold}>{results.organization.title[language]}</Text>
                    </View>
                    <View style={PDFstyles.resultsCountryP}>{riskSymbol(results.organization.risk)}</View>
                </View>
                <Text style={PDFstyles.resultsCountryP}>{results.organization.description[language]}</Text>
            </View>
            <View wrap={false} style={PDFstyles.resultsCountryDiv}>
                <View style={PDFstyles.resultsCountryRow}>
                    <View style={PDFstyles.resultsCountryP}>
                        <Text style={PDFstyles.bold}>{results.financial.overall.title[language]}</Text>
                    </View>
                    <View style={PDFstyles.resultsCountryP}>{riskSymbol(results.financial.overall.risk)}</View>
                </View>
                <Text style={PDFstyles.resultsCountryP}>{results.financial.overall.description[language]}</Text>
            </View>

            <View style={PDFstyles.resultsCountryUl}>
                <View wrap={false} style={PDFstyles.resultsCountryLi}>
                    <View style={PDFstyles.resultsCountryRow}>
                        <Text style={PDFstyles.resultsCountryP}>{results.financial.exchange.title[language]}</Text>
                        <View style={PDFstyles.resultsCountryP}>{riskSymbol(results.financial.exchange.risk)}</View>
                    </View>
                    <Text style={PDFstyles.resultsCountryP}>{results.financial.exchange.description[language]}</Text>
                </View>
                <View wrap={false} style={PDFstyles.resultsCountryLi}>
                    <View style={PDFstyles.resultsCountryRow}>
                        <Text style={PDFstyles.resultsCountryP}>{results.financial.scope.title[language]}</Text>
                        <View style={PDFstyles.resultsCountryP}>{riskSymbol(results.financial.scope.risk)}</View>
                    </View>
                    <Text style={PDFstyles.resultsCountryP}>{results.financial.scope.description[language]}</Text>
                </View>
            </View>

            <View wrap={false} style={PDFstyles.resultsCountryDiv}>
                <View style={PDFstyles.resultsCountryRow}>
                    <View style={PDFstyles.resultsCountryP}>
                        <Text style={PDFstyles.bold}>{results.dualuse.title[language]}</Text>
                    </View>
                    <View style={PDFstyles.resultsCountryP}>{riskSymbol(results.dualuse.risk)}</View>
                </View>
                <Text style={PDFstyles.resultsCountryP}>{results.dualuse.description[language]}</Text>
            </View>
            <View wrap={false}>
                <View style={PDFstyles.resultsCountryRow}>
                    <View style={PDFstyles.resultsCountryP}>
                        <Text style={PDFstyles.bold}>{results.ethics.title[language]}</Text>
                    </View>
                    <View style={PDFstyles.resultsCountryP}>{riskSymbol(results.ethics.risk)}</View>
                </View>
                <Text style={PDFstyles.resultsCountryP}>{results.ethics.description[language]}</Text>
            </View>
        </View>
    )
};