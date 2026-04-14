import type { Country } from "../../types";
import styles from "../../styles.module.css";

type CountryRiskAssessmentProps = {
    country: Country | undefined;
    language: "fi" | "en";
};

const CountryRiskAssessment = ({
    country,
    language,
}: CountryRiskAssessmentProps) => {

    const results = {
        collaboration: {
            title: {
                fi: "Yhteistyön kokonaisriskiarvio",
                en: "Overall Collaboration Risk Level"
            },
            0: {
                fi: "Virheellinen tai puuttuva riskiluokitus",
                en: "Invalid or missing risk level"
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
        overall: {
            title: {
                fi: "Maan riskitaso",
                en: "Country Risk Level"
            },
            0: {
                fi: "Virheellinen tai puuttuva riskiluokitus",
                en: "Invalid or missing risk level"
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
            0: {
                fi: "Virheellinen tai puuttuva riskiluokitus",
                en: "Invalid or missing risk level"
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
            0: {
                fi: "Virheellinen tai puuttuva riskiluokitus",
                en: "Invalid or missing risk level"
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
            0: {
                fi: "Virheellinen tai puuttuva riskiluokitus",
                en: "Invalid or missing risk level"
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
            0: {
                fi: "Virheellinen tai puuttuva riskiluokitus",
                en: "Invalid or missing risk level"
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
            0: {
                fi: "Virheellinen tai puuttuva riskiluokitus",
                en: "Invalid or missing risk level"
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
            0: {
                fi: "Virheellinen tai puuttuva riskiluokitus",
                en: "Invalid or missing risk level"
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
            0: {
                fi: "Virheellinen tai puuttuva riskiluokitus",
                en: "Invalid or missing risk level"
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
            0: {
                fi: "Virheellinen tai puuttuva riskiluokitus",
                en: "Invalid or missing risk level"
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
            {country && language &&
                <div>
                    <div>
                        {language === "fi" ?
                            <h3>Yhteistyön riskit</h3>
                            :
                            <h3>Collaboration Risks</h3>
                        }
                        <p><b>{results.collaboration.title[language]}</b></p>
                        <p>{riskSymbol(country.risk.overall)}<i>{results.collaboration[country.risk.overall][language]}</i></p>
                    </div>
                    <div>
                        {language === "fi" ?
                            <p>Alla mainittujen riskitekijöiden lisäksi kokonaisriskiin vaikuttavat antamasi tiedot Haaga-Helian roolista yhteistyössä.</p>
                            :
                            <p>In addition to the risk factors listed below, the overall risk is also influenced by the information you provided about Haaga-Helia’s role in the collaboration.</p>
                        }
                    </div>
                    <div>
                        <p><b>{results.overall.title[language]}</b></p>
                        <p>{riskSymbol(country.risk.overall)}<i>{results.collaboration[country.risk.overall][language]}</i></p>
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