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

    // Descriptions for risk ratings
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
                fi: "Yhteistyön kokonaisriski on alhainen. Yhteistyössä voi kuitenkin  esiintyä tunnistamattomia riskejä ja nyt arvioitujen asioiden riskitaso  saattaa muuttua jatkossa.",
                en: "Placeholder description for rating 1"
            },
            2: {
                fi: "Yhteistyön kokonaisriskitaso on kohonnut. Kiinnitä erityistä huomiota kohonneisiin riskeihin ja mieti niiden hallintaa. Toteuta tarvittaessa yksityiskohtaisempi riskiarvio.",
                en: "The overall collaboration risk level has increased. Pay special attention to the elevated risks and consider how to manage them. If necessary, conduct a more detailed risk assessment."
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
                fi: "Maan yhteenlaskettu kokonaisriskitaso on matala.",
                en: "Placeholder description for rating 1"
            },
            2: {
                fi: "Väliaikainen kuvausteksti tasolle 2",
                en: "Placeholder description for rating 2"
            },
            3: {
                fi: "Maan yhteenlaskettu kokonaisriskitaso on korkea.",
                en: "The country’s overall aggregated risk level is high."
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
                fi: "Yhteistyökumppanin sijaintimaassa korruptio ei ole merkittävä riski.",
                en: "Placeholder description for rating 1"
            },
            2: {
                fi: "Väliaikainen kuvausteksti tasolle 2",
                en: "Placeholder description for rating 2"
            },
            3: {
                fi: "Yhteistyökumppanin sijaintimaassa korruption riski on merkittävä. Ota tämä huomioon yhteistyön suunnittelussa ja toteutuksessa ja varmistu, ettet osallistu korruptioon.",
                en: "The risk of corruption in the partner organization’s country is significant. Take this into account when planning and implementing the collaboration, and ensure that you do not engage in any corrupt practices."
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
                fi: "Yhteistyömaahan matkustamiseen ei liity rajoituksia. Varmistu halutessasi tarkemmin tilanteesta ulkoministeriön matkustustiedotteista.",
                en: "Placeholder description for rating 1"
            },
            2: {
                fi: "Väliaikainen kuvausteksti tasolle 2",
                en: "Placeholder description for rating 2"
            },
            3: {
                fi: "Yhteistyömaahan matkustaminen ei ole tällä hetkellä mahdollista. Tutki tarkemmat yksityiskohdat ulkoministeriön matkustustiedotteista.",
                en: "Travel to the partner country is currently not possible. Please consult the detailed information in the Ministry for Foreign Affairs travel advisories."
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
                fi: "Yhteistyökumppanisi sijaitsee maassa, jossa akateeminen vapaus on hyvin rajoitettua. Harkitse yhteistyötä tarkasti tästä ja yliopiston arvojen näkökulmasta",
                en: "Your partner organization is located in a country where academic freedom is highly restricted. Consider the collaboration carefully from this perspective and in light of the university’s values."
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
                fi: "Yhteistyökumppanisi sijaitsee poliittisesti vakaassa maassa.",
                en: "Placeholder description for rating 1"
            },
            2: {
                fi: "Väliaikainen kuvausteksti tasolle 2",
                en: "Placeholder description for rating 2"
            },
            3: {
                fi: "Yhteistyökumppanisi sijaitsee poliittisesti epävakaassa maassa.",
                en: "Your partner organization is located in a politically unstable country."
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
                fi: "Yhteistyökumppanisi sijaitsee kehittyneessä maassa.",
                en: "Placeholder description for rating 1"
            },
            2: {
                fi: "Yhteistyökumppanisi sijaitsee vähemmän kehittyneessä maassa, millä saattaa olla vaikutusta yhteistyön suunnitteluun ja toteutukseen.",
                en: "Your partner organization is located in a less developed country, which may affect the planning and implementation of the collaboration."
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
                fi: "Antamisesi tietojen perusteella yhteistyöhön ei kohdistu  tietousuojamielessä erityisiä vaatimuksia mutta varmistu, että  henkilötietoja ei yhteistyössä tarvitse luovuttaa.",
                en: "Placeholder description for rating 1"
            },
            2: {
                fi: "Yhteistyö maa on määritelty EU:n toimesta tarpeeksi luotettavaksi henkilödatan käsittelyssä.",
                en: "Collaborator country is rated for adequate data protection by EU."
            },
            3: {
                fi: "Henkilötietojen luovuttamista koskee EU:n GDPR-sääntely.",
                en: "The transfer of personal data is subject to the EU’s GDPR regulations."
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
                fi: "Yhteistyökumppanisi sijaitsee maassa, johon ei kohdistu YK- tai  EU-pakotteita. Pakotteilla ei siis ole vaikutusta yhteistyöhankkeeseesi.",
                en: "Placeholder description for rating 1"
            },
            2: {
                fi: "Väliaikainen kuvausteksti tasolle 2",
                en: "Placeholder description for rating 2"
            },
            3: {
                fi: "Lue lisää maahan kohdistuvista pakotteista sanctionsmap.eu-sivulta",
                en: "Read more about the sanctions imposed on the country at sanctionsmap.eu-page"
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
                fi: "Yhteistyökumppanisi sijaitsee maassa, joka on oikeusvaltio, mikä  tarkoittaa muun muassa, että sopimuksiin liittyvä oikeussuoja on  lähtökohtaisesti vahva. Tämä on kuitenkin vain perusta ja  yhteistyösopimus on joka tapauksessa syytä laatia huolella.",
                en: "Placeholder description for rating 1"
            },
            2: {
                fi: "Väliaikainen kuvausteksti tasolle 2",
                en: "Placeholder description for rating 2"
            },
            3: {
                fi: "Yhteistyökumppanisi sijaitsee maassa, jossa oikeusvaltioperiaate on vakavasti vaarantunut. Varmistu siitä, että yhteistyösopimuksen muotoilut oikeuspaikan ja riidanratkaisumekanismien osalta on mietiitty tarkasti ja konsultoi Haaga-Helian asiantuntijajuristeja.",
                en: "Your partner organization is located in a country where the rule of law is seriously compromised. Ensure that the collaboration agreement’s provisions regarding jurisdiction and dispute resolution mechanisms are carefully considered, and consult the university’s legal experts."
            }
        },
        organization: {
            title: {
                fi: "Organisaation riskitaso",
                en: "Organization Risk Level"
            },
            0: {
                fi: "Virheellinen tai puuttuva riskiluokitus",
                en: "Invalid or missing risk level"
            },
            1: {
                fi: "Yhteistyöyliopisto on listattu World Higher Education -tietokannassa. Tämä tarkoittaa, että yliopisto kuuluu varmuudella sijaintimaansa viralliseen koulutusjärjestelmään. Tämä on minimtaso, eikä välttämättä ole tae sen laadusta.",
                en: "The partner university is listed in the World Higher Education database. This means that the university is officially part of its country’s education system. This represents a minimum standard and does not necessarily guarantee the quality of the institution."
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
        financial: {
            overall: {
                fi: "Yhteistyön taloudellinen kokonaisriskitaso",
                en: "Overall Financial Risk Level of the Collaboration"
            },
            title: {
                fi: "Taloudellinen laajuus",
                en: "Financial Scope"
            },
            0: {
                fi: "Virheellinen tai puuttuva riskiluokitus",
                en: "Invalid or missing risk level"
            },
            1: {
                fi: "Yhteistyön taloudellinen laajuus ei ole merkittävä, eikä muodosta merkittävää riskiä. Varmista tarvittaessa ykskkösi talouden lähipalveluilta, että hankkeen budjetti on asianmukainen.",
                en: "The financial scope of the collaboration is not significant and does not pose a major risk. If necessary, consult your unit’s financial services to ensure that the project budget is appropriate."
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

        dualUse: {
            title: {
                fi: "Kaksikäyttötuotteiden riskitaso",
                en: "Dual-Use Products Risk Level"
            },
            0: {
                fi: "Virheellinen tai puuttuva riskiluokitus",
                en: "Invalid or missing risk level"
            },
            1: {
                fi: "Antamiesi tietojen perusteella yhteistyö ei sisällä kaksoiskäyttöriskejä. Jos tästä kuitenkin on jotain epävarmuutta, tutustu yliopiston ohjeisiin.",
                en: "Placeholder description for rating 1"
            },
            2: {
                fi: "Olet ilmoittanut, että ei ole tiedossa onko yhteistyössä mahdollisuus siihen, että kumppanille siirtyy sotilaskäyttöön soveltuvaa teknologiaa tai osaamista. Intressimme ja myös lakisääteinen velvollisuutemme on varmistaa, että asiantuntijuuttamme tai teknologiaamme ei päädy sotilaalliseen loppukäyttöön. Tutustu tarkasti Flammassa oleviin ohjeisiin ja ota yhteyttä tarvittaessa yliopiston asiantuntijoihin.",
                en: "You have indicated that it is unknown whether the collaboration may involve the transfer of technology or expertise suitable for military use to the partner. Our interest, as well as our legal obligation, is to ensure that our expertise or technology does not end up in military end-use. Please carefully review the guidelines available in Flamma and consult the university’s experts if necessary."
            },
            3: {
                fi: "Väliaikainen kuvausteksti tasolle 3",
                en: "Placeholder description for rating 3"
            }
        },
        ethics: {
            title: {
                fi: "Eettinen riskitaso",
                en: "Ethical Risk Level"
            },
            0: {
                fi: "Virheellinen tai puuttuva riskiluokitus",
                en: "Invalid or missing risk level"
            },
            1: {
                fi: "Ilmoituksesi perusteella yhteistyössä ei ole erityisiä eettisiä haasteita.",
                en: "Placeholder description for rating 1"
            },
            2: {
                fi: "Väliaikainen kuvausteksti tasolle 2",
                en: "Placeholder description for rating 2"
            },
            3: {
                fi: "Olet arvioinut yhteistyön eettiset riskit merkittäviksi.",
                en: "You have assessed the ethical risks of the collaboration as significant."
            }
        }
    }

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
            {country && language &&
                <div>
                    <div>
                        {language === "fi" ?
                            <h3>Yhteistyön riskit</h3>
                            :
                            <h3>Collaboration Risks</h3>
                        }
                        <p><b>{results.collaboration.title[language]}</b></p>
                        {riskSymbol(country.risk.overall)}<p><i>{results.collaboration[country.risk.overall][language]}</i></p>
                    </div>
                    <div>
                        {language === "fi" ?
                            <p style={{maxWidth:"1000px"}}>Alla mainittujen riskitekijöiden lisäksi kokonaisriskiin vaikuttavat antamasi tiedot Haaga-Helian roolista yhteistyössä.</p>
                            :
                            <p style={{maxWidth:"1000px"}}>In addition to the risk factors listed below, the overall risk is also influenced by the information you provided about Haaga-Helia’s role in the collaboration.</p>
                        }
                    </div>
                    <div>
                        <p><b>{results.overall.title[language]}</b></p>
                        {riskSymbol(country.risk.overall)}<p><i>{results.collaboration[country.risk.overall][language]}</i></p>
                    </div>

                    <ul>
                        <li>
                            <p>{results.corruption.title[language]}</p>
                            {riskSymbol(country.risk.corruption)}<p><i>{results.corruption[country.risk.corruption][language]}</i></p>
                        </li>
                        <li>
                            <p>{results.security.title[language]}</p>
                            {riskSymbol(country.risk.security)}<p><i>{results.security[country.risk.security][language]}</i></p>
                        </li>
                        <li>
                            <p>{results.academic.title[language]}</p>
                            {riskSymbol(country.risk.academicFreedom)}<p><i>{results.academic[country.risk.academicFreedom][language]}</i></p>
                        </li>
                        <li>
                            <p>{results.political.title[language]}</p>
                            {riskSymbol(country.risk.politicalStability)}<p><i>{results.political[country.risk.politicalStability][language]}</i></p>
                        </li>
                        <li>
                            <p>{results.development.title[language]}</p>
                            {riskSymbol(country.risk.development)}<p><i>{results.development[country.risk.development][language]}</i></p>
                        </li>
                        <li>
                            <p>{results.gdpr.title[language]}</p>
                            {riskSymbol(country.risk.GDPR)}<p><i>{results.gdpr[country.risk.GDPR][language]}</i></p>
                        </li>
                        <li>
                            <p>{results.sanctions.title[language]}</p>
                            {riskSymbol(country.risk.sanctions)}<p><i>{results.sanctions[country.risk.sanctions][language]}</i></p>
                        </li>
                        <li>
                            <p>{results.law.title[language]}</p>
                            {riskSymbol(country.risk.ruleOfLaw)}<p><i>{results.law[country.risk.ruleOfLaw][language]}</i></p>
                        </li>
                    </ul>
                </div>
            }
        </ >
    );
};

export default CountryRiskAssessment;