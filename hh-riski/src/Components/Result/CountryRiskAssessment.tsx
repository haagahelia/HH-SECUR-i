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
            {country &&
                <div>
                    <div>
                        {language === "fi" ?
                            <h3>Yhteistyön riskit</h3>
                            :
                            <h3>Collaboration Risks</h3>
                        }
                        {language === "fi" ?
                            <p><b>Yhteistyön kokonaisriskitaso</b></p>
                            :
                            <p><b>Overall Collaboration Risk Level</b></p>
                        }
                        <p>{riskSymbol(1)}{results.overall[1][language]}</p>
                    </div>
                    {language === "fi" ?
                        <ul>
                            <li>
                                <p>Korruptio</p>
                                <p>{riskSymbol(country.risk.corruption)}<i>{results.corruption[country.risk.corruption][language]}</i></p>
                            </li>
                            <li>
                                <p>Turvallisuustaso</p>
                                <p>{riskSymbol(country.risk.security)}<i>{results.security[country.risk.security][language]}</i></p>
                            </li>
                            <li>
                                <p>Akateeminen vapaus</p>
                                <p>{riskSymbol(country.risk.academicFreedom)}<i>{results.academic[country.risk.academicFreedom][language]}</i></p>
                            </li>
                            <li>
                                <p>Poliittinen vakaus</p>
                                <p><i>TODO: add to Country type</i></p>
                            </li>
                            <li>
                                <p>Maan kehittyineisyys</p>
                                <p>{riskSymbol(country.risk.development)}<i>{results.development[country.risk.development][language]}</i></p>
                            </li>
                            <li>
                                <p>GDPR</p>

                                <p>{riskSymbol(country.risk.GDPR)}<i>{results.gdpr[country.risk.GDPR][language]}</i></p>
                            </li>
                            <li>
                                <p>Pakotteet</p>
                                <p>{riskSymbol(country.risk.sanctions)}<i>{results.sanctions[country.risk.sanctions][language]}</i></p>
                            </li>
                            <li>
                                <p>Oikeusvalitio</p>
                                <p>{riskSymbol(country.risk.ruleOfLaw)}<i>{results.law[country.risk.ruleOfLaw][language]}</i></p>
                            </li>
                        </ul>
                        :
                        <ul>
                            <li>
                                <p>Corruption</p>
                                <p>{riskSymbol(country.risk.corruption)}<i>{results.corruption[country.risk.corruption][language]}</i></p>
                            </li>
                            <li>
                                <p>Security Level</p>
                                <p>{riskSymbol(country.risk.security)}<i>{results.security[country.risk.security][language]}</i></p>
                            </li>
                            <li>
                                <p>Academic Freedom</p>
                                <p>{riskSymbol(country.risk.academicFreedom)}<i>{results.academic[country.risk.academicFreedom][language]}</i></p>
                            </li>
                            <li>
                                <p>Political Stability</p>
                                <p><i>TODO: add to Country type</i></p>
                            </li>
                            <li>
                                <p>Country Development Level</p>
                                <p>{riskSymbol(country.risk.development)}<i>{results.development[country.risk.development][language]}</i></p>
                            </li>
                            <li>
                                <p>GDPR</p>
                                <p>{riskSymbol(country.risk.GDPR)}<i>{results.gdpr[country.risk.GDPR][language]}</i></p>
                            </li>
                            <li>
                                <p>Sanctions</p>
                                <p>{riskSymbol(country.risk.sanctions)}<i>{results.sanctions[country.risk.sanctions][language]}</i></p>
                            </li>
                            <li>
                                <p>Rule of Law</p>
                                <p>{riskSymbol(country.risk.ruleOfLaw)}<i>{results.law[country.risk.ruleOfLaw][language]}</i></p>
                            </li>
                        </ul>
                    }
                </div>
            }
        </ >
    );
};

export default CountryRiskAssessment;