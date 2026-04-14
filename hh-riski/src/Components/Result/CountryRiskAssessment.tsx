import type { Country } from "../../types";

type CountryRiskAssessmentProps = {
    country: Country | undefined;
    language: "fi" | "en";
};

const CountryRiskAssessment = ({
    country,
    language,
}: CountryRiskAssessmentProps) => {

    const results = {
        overall: {
            title: {
                fi: "Yhteistyön kokonaisriskiarvio",
                en: "Overall Collaboration Risk Level"
            },
            1: {
                fi: "Väliaikainen kuvausteksti tasolle 1",
                en: "Placeholder description for rating 1"
            },
            2: {
                fi: "Väliaikainen kuvausteksti tasolle 2",
                en: "Placeholder description for rating 2"
            },
            3: {
                fi: "Väliaikainen kuvausteksti tasolle 3",
                en: "Placeholder description for rating 3"
            }
        },
        corruption: {
            title: {
                fi: "Korruptio",
                en: "Corruption"
            },
            1: {
                fi: "Väliaikainen kuvausteksti tasolle 1",
                en: "Placeholder description for rating 1"
            },
            2: {
                fi: "Väliaikainen kuvausteksti tasolle 2",
                en: "Placeholder description for rating 2"
            },
            3: {
                fi: "Väliaikainen kuvausteksti tasolle 3",
                en: "Placeholder description for rating 3"
            }
        },
        security: {
            title: {
                fi: "Turvallisuustaso",
                en: "Security Level"
            },
            1: {
                fi: "Väliaikainen kuvausteksti tasolle 1",
                en: "Placeholder description for rating 1"
            },
            2: {
                fi: "Väliaikainen kuvausteksti tasolle 2",
                en: "Placeholder description for rating 2"
            },
            3: {
                fi: "Väliaikainen kuvausteksti tasolle 3",
                en: "Placeholder description for rating 3"
            }
        },
        academic: {
            title: {
                fi: "Akateeminen vapaus",
                en: "Academic Freedom"
            },
            1: {
                fi: "Väliaikainen kuvausteksti tasolle 1",
                en: "Placeholder description for rating 1"
            },
            2: {
                fi: "Väliaikainen kuvausteksti tasolle 2",
                en: "Placeholder description for rating 2"
            },
            3: {
                fi: "Väliaikainen kuvausteksti tasolle 3",
                en: "Placeholder description for rating 3"
            }
        },
        political: {
            title: {
                fi: "Poliittinen vakaus",
                en: "Political Stability"
            },
            1: {
                fi: "Väliaikainen kuvausteksti tasolle 1",
                en: "Placeholder description for rating 1"
            },
            2: {
                fi: "Väliaikainen kuvausteksti tasolle 2",
                en: "Placeholder description for rating 2"
            },
            3: {
                fi: "Väliaikainen kuvausteksti tasolle 3",
                en: "Placeholder description for rating 3"
            }
        },
        development: {
            title: {
                fi: "Maan kehittyineisyys",
                en: "Country Development Level"
            },
            1: {
                fi: "Väliaikainen kuvausteksti tasolle 1",
                en: "Placeholder description for rating 1"
            },
            2: {
                fi: "Väliaikainen kuvausteksti tasolle 2",
                en: "Placeholder description for rating 2"
            },
            3: {
                fi: "Väliaikainen kuvausteksti tasolle 3",
                en: "Placeholder description for rating 3"
            }
        },
        gdpr: {
            title: {
                fi: "GDPR",
                en: "GDPR"
            },
            1: {
                fi: "Väliaikainen kuvausteksti tasolle 1",
                en: "Placeholder description for rating 1"
            },
            2: {
                fi: "Väliaikainen kuvausteksti tasolle 2",
                en: "Placeholder description for rating 2"
            },
            3: {
                fi: "Väliaikainen kuvausteksti tasolle 3",
                en: "Placeholder description for rating 3"
            }
        },
        sanctions: {
            title: {
                fi: "Pakotteet",
                en: "Sanctions"
            },
            1: {
                fi: "Väliaikainen kuvausteksti tasolle 1",
                en: "Placeholder description for rating 1"
            },
            2: {
                fi: "Väliaikainen kuvausteksti tasolle 2",
                en: "Placeholder description for rating 2"
            },
            3: {
                fi: "Väliaikainen kuvausteksti tasolle 3",
                en: "Placeholder description for rating 3"
            }
        },
        law: {
            title: {
                fi: "Oikeusvalitio",
                en: "Rule of Law"
            },
            1: {
                fi: "Väliaikainen kuvausteksti tasolle 1",
                en: "Placeholder description for rating 1"
            },
            2: {
                fi: "Väliaikainen kuvausteksti tasolle 2",
                en: "Placeholder description for rating 2"
            },
            3: {
                fi: "Väliaikainen kuvausteksti tasolle 3",
                en: "Placeholder description for rating 3"
            }
        },
    }

    const riskSymbol = (risk: number) => {
        if (risk === 1) {
            return <span style={{ background: "green", padding: "3px", paddingLeft: "9px", paddingRight: "9px", marginRight: "15px", borderRadius: "50%" }}><b>1</b></span>
        } else if (risk === 2) {
            return <span style={{ background: "yellow", padding: "3px", paddingLeft: "9px", paddingRight: "9px", marginRight: "15px", borderRadius: "50%" }}><b>2</b></span>
        } else if (risk === 3) {
            return <span style={{ background: "red", padding: "3px", paddingLeft: "9px", paddingRight: "9px", marginRight: "15px", borderRadius: "50%" }}><b>3</b></span>
        } else {
            return <span>error</span>
        }
    }

    return (

        <>
            {country && language &&
                <div>
                    <div>
                        {language === "fi" ?
                            <h3>Yhteistyön riskit</h3>
                            :
                            <h3>Collaboration Risks</h3>
                        }
                        <p><b>{results.overall.title[language]}</b></p>
                        <p>{riskSymbol(1)}{results.overall[1][language]}</p>
                    </div>

                    <ul>
                        <li>
                            <p>{results.corruption.title[language]}</p>
                            <p>{riskSymbol(country.risk.corruption)}<i>{results.corruption[country.risk.corruption][language]}</i></p>
                        </li>
                        <li>
                            <p>{results.security.title[language]}</p>
                            <p>{riskSymbol(country.risk.security)}<i>{results.security[country.risk.security][language]}</i></p>
                        </li>
                        <li>
                            <p>{results.academic.title[language]}</p>
                            <p>{riskSymbol(country.risk.academicFreedom)}<i>{results.academic[country.risk.academicFreedom][language]}</i></p>
                        </li>
                        <li>
                            <p>{results.political.title[language]}</p>
                            <p>{riskSymbol(country.risk.politicalStability)}<i>{results.political[country.risk.politicalStability][language]}</i></p>
                        </li>
                        <li>
                            <p>{results.development.title[language]}</p>
                            <p>{riskSymbol(country.risk.development)}<i>{results.development[country.risk.development][language]}</i></p>
                        </li>
                        <li>
                            <p>{results.gdpr.title[language]}</p>
                            <p>{riskSymbol(country.risk.GDPR)}<i>{results.gdpr[country.risk.GDPR][language]}</i></p>
                        </li>
                        <li>
                            <p>{results.sanctions.title[language]}</p>
                            <p>{riskSymbol(country.risk.sanctions)}<i>{results.sanctions[country.risk.sanctions][language]}</i></p>
                        </li>
                        <li>
                            <p>{results.law.title[language]}</p>
                            <p>{riskSymbol(country.risk.ruleOfLaw)}<i>{results.law[country.risk.ruleOfLaw][language]}</i></p>
                        </li>
                    </ul>
                </div>
            }
        </ >
    );
};

export default CountryRiskAssessment;