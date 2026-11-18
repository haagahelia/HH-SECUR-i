import type { Country, Options, Organization, RiskCalculationResponse, User } from "../../../types";
import { Document, Page, Text, View, Font } from '@react-pdf/renderer';
import { PDFstyles } from "../../../PDFstyles";
import { RiskAssessment } from "./RiskAssessmentPDF";
import { SingleQuestionSummaryPDF } from "../SingleQuestionSummary";
import { MultiQuestionSummaryPDF } from "../MultiQuestionSummary";

type ResultsProps = {
    language: "fi" | "en";
    results: RiskCalculationResponse | undefined;
    selectedProjectOwner: User | null;
    user: User | null;
    projectName: string;
    hhRole: string;
    options: Options | null;
    hhRoleOther: string;
    cooperationType: string[];
    cooperationTypeOther: string;
    consortium: string;
    selectedCountry: Country | null;
    history: string;
    organizationType: string;
    organizationTypeOther: string;
    selectedOrganization: Organization | null;
    organizationName: string;
    contractStatus: string;
    duration: string;
    funding: string;
    exchange: string;
    fundingSource: string;
    fundingHistory: string;
    liability: string;
    personalInformation: string;
    dualUse: string;
    ethics: string;
    projectDescription: string;
};

Font.registerHyphenationCallback((word) => [word]);

export const ResultsDocument = ({
    language,
    results,
    selectedProjectOwner,
    user,
    projectName,
    hhRole,
    options,
    hhRoleOther,
    cooperationType,
    cooperationTypeOther,
    consortium,
    selectedCountry,
    history,
    organizationType,
    organizationTypeOther,
    selectedOrganization,
    organizationName,
    contractStatus,
    duration,
    funding,
    exchange,
    fundingSource,
    fundingHistory,
    liability,
    personalInformation,
    dualUse,
    ethics,
    projectDescription
}: ResultsProps) => (
    <Document>
        <Page size="A4" style={PDFstyles.page}>
            <View style={PDFstyles.resultsDiv}>
                {language === "fi" ? (
                    <Text style={PDFstyles.title}>Riskiarvio</Text>
                ) : (
                    <Text style={PDFstyles.title}>Risk assessment</Text>
                )}
            </View>
            <View>
                <RiskAssessment
                    language={language}
                    results={results}
                />
            </View>
            <View break style={PDFstyles.resultsSummaryDiv}>
                {language === "fi" ? (
                    <Text style={PDFstyles.summaryListH5}>Yhteenveto valinnoistasi</Text>
                ) : (
                    <Text style={PDFstyles.summaryListH5}>Selection Summary</Text>
                )}

                <View>
                    <View wrap={false} style={PDFstyles.summaryListLi}>
                        <View style={PDFstyles.summaryListP}>
                            <Text style={PDFstyles.bold}>{language === "fi" ? "Lomakkeen täyttäjä" : "Form Respondent"}</Text>
                            <Text>{selectedProjectOwner?.name ?? selectedProjectOwner?.username ?? "-"}</Text>
                        </View>
                    </View>

                    <View wrap={false} style={PDFstyles.summaryListLi}>
                        <View style={PDFstyles.summaryListP}>
                            <Text style={PDFstyles.bold}>{language === "fi" ? "Projektin omistaja" : "Project Owner"}</Text>
                            <Text>{user?.username}</Text>
                        </View>
                    </View>

                    <View wrap={false} style={PDFstyles.summaryListLi}>
                        <View style={PDFstyles.summaryListP}>
                            <Text style={PDFstyles.bold}>{language === "fi" ? "Yhteistyön/yhteistyöprojektin nimi" : "Collaboration name"}</Text>
                            <Text>{projectName || "-"}</Text>
                        </View>
                    </View>

                    <View wrap={false} style={PDFstyles.summaryListLi}>
                        <View>
                            <SingleQuestionSummaryPDF
                                question={options?.hhrole}
                                answers={options?.hhrole.options}
                                language={language}
                                value={hhRole}
                            />
                            {hhRoleOther.trim() && (
                                <View style={{ paddingTop: 4}}>
                                    <Text style={PDFstyles.bold}>{language === "fi" ? "Tarkennus" : "Details"}: {hhRoleOther}</Text>
                                </View>
                            )}
                        </View>
                    </View>

                    <View wrap={false} style={PDFstyles.summaryListLi}>
                        <View>
                            <MultiQuestionSummaryPDF
                                question={options?.collaborationtype}
                                answers={options?.collaborationtype.options}
                                language={language}
                                values={cooperationType}
                            />
                            {cooperationTypeOther.trim() && (
                                <View style={{ paddingTop: 4}}>
                                    <Text style={PDFstyles.bold}>{language === "fi" ? "Tarkennus" : "Details"}: {cooperationTypeOther}</Text>
                                </View>
                            )}
                        </View>
                    </View>

                    <View wrap={false} style={PDFstyles.summaryListLi}>
                        <View>
                            <SingleQuestionSummaryPDF
                                question={options?.consortium}
                                answers={options?.consortium.options}
                                language={language}
                                value={consortium}
                            />
                        </View>
                    </View>

                    <View wrap={false} style={PDFstyles.summaryListLi}>
                        <View style={PDFstyles.summaryListP}>
                            <Text style={PDFstyles.bold}>{language === "fi" ? "Yhteistyökumppanin sijaintimaa" : "Partner country"}</Text>
                            <Text>{selectedCountry ? selectedCountry.name[language] : "-"}</Text>
                        </View>
                    </View>

                    <View wrap={false} style={PDFstyles.summaryListLi}>
                        <View>
                            <SingleQuestionSummaryPDF
                                question={options?.history}
                                answers={options?.history.options}
                                language={language}
                                value={history}
                            />
                        </View>
                    </View>
                </View>

                <View wrap={false} style={PDFstyles.summaryListLi}>
                    <View style={PDFstyles.summaryListP}>
                        <SingleQuestionSummaryPDF
                            question={options?.organizationtype}
                            answers={options?.organizationtype.options}
                            language={language}
                            value={organizationType}
                        />
                        {organizationTypeOther.trim() && (
                            <View style={{ paddingTop: 4}}>
                                <Text style={PDFstyles.bold}>{language === "fi" ? "Tarkennus" : "Details"}: {organizationTypeOther}</Text>
                            </View>
                        )}
                    </View>
                </View>

                <View wrap={false} style={PDFstyles.summaryListLi}>
                    <View style={PDFstyles.summaryListP}>
                        <Text style={PDFstyles.bold}>{language === "fi" ? "Organisaatio" : "Organization"}</Text>
                        <Text>
                            {selectedOrganization?.id === "other"
                                ? organizationName || "-"
                                : selectedOrganization
                                    ? selectedOrganization.name[language]
                                    : "-"}
                        </Text>
                    </View>
                </View>

                <View wrap={false} style={PDFstyles.summaryListLi}>
                    <View>
                        <SingleQuestionSummaryPDF
                            question={options?.contract}
                            answers={options?.contract.options}
                            language={language}
                            value={contractStatus}
                        />
                    </View>
                </View>

                <View wrap={false} style={PDFstyles.summaryListLi}>
                    <View>
                        <SingleQuestionSummaryPDF
                            question={options?.duration}
                            answers={options?.duration.options}
                            language={language}
                            value={duration}
                        />
                    </View>
                </View>

                <View wrap={false} style={PDFstyles.summaryListLi}>
                    <View>
                        <SingleQuestionSummaryPDF
                            question={options?.funding}
                            answers={options?.funding.options}
                            language={language}
                            value={funding}
                        />
                    </View>
                </View>
                {funding === "option1" && (
                    <>
                        <View wrap={false} style={PDFstyles.summaryListLi}>
                            <View>
                                <SingleQuestionSummaryPDF
                                    question={options?.funding.exchange.placeholder}
                                    answers={options?.funding.exchange.options}
                                    language={language}
                                    value={exchange}
                                />
                            </View>
                        </View>
                        <View wrap={false} style={PDFstyles.summaryListLi}>
                            <View>
                                <SingleQuestionSummaryPDF
                                    question={options?.funding.fundingsource.placeholder}
                                    answers={options?.funding.fundingsource.options}
                                    language={language}
                                    value={fundingSource}
                                />
                            </View>
                        </View>
                        <View wrap={false} style={PDFstyles.summaryListLi}>
                            <View>
                                <SingleQuestionSummaryPDF
                                    question={options?.funding.fundinghistory.placeholder}
                                    answers={options?.funding.fundinghistory.options}
                                    language={language}
                                    value={fundingHistory}
                                />
                            </View>
                        </View>
                    </>
                )}
                <View wrap={false} style={PDFstyles.summaryListLi}>
                    <View>
                        <SingleQuestionSummaryPDF
                            question={options?.liability}
                            answers={options?.liability.options}
                            language={language}
                            value={liability}
                        />
                    </View>
                </View>

                <View wrap={false} style={PDFstyles.summaryListLi}>
                    <View>
                        <SingleQuestionSummaryPDF
                            question={options?.personalinformation}
                            answers={options?.personalinformation.options}
                            language={language}
                            value={personalInformation}
                        />
                    </View>
                </View>

                <View wrap={false} style={PDFstyles.summaryListLi}>
                    <View>
                        <SingleQuestionSummaryPDF
                            question={options?.dualuse}
                            answers={options?.dualuse.options}
                            language={language}
                            value={dualUse}
                        />
                    </View>
                </View>

                <View wrap={false} style={PDFstyles.summaryListLi}>
                    <View>
                        <SingleQuestionSummaryPDF
                            question={options?.ethics}
                            answers={options?.ethics.options}
                            language={language}
                            value={ethics}
                        />
                    </View>
                </View>

                <View wrap={false} style={PDFstyles.summaryListLi}>
                    <View style={PDFstyles.summaryListP}>
                        <Text style={PDFstyles.bold}>{language === "fi" ? "Lisätiedot" : "Additional Information"}</Text>
                        <Text>{projectDescription || "-"}</Text>
                    </View>
                </View>
            </View>
        </Page>
    </Document >
);