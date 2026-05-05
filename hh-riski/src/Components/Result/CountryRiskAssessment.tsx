import type { Country } from "../../types";
import styles from "../../styles.module.css";

import { calculateCollaborationRisk, calculateDualUse, calculateEthics, calculateFinancialOverall, calculateFinancialScope } from "../../util/utils";
import { useFormAnswers } from "../../context/FormAnswersContext";

type CountryRiskAssessmentProps = {
    country: Country | undefined;
    language: "fi" | "en";
};

const CountryRiskAssessment = ({
    country,
    language,
}: CountryRiskAssessmentProps) => {

    const {
        selectedLanguage,
        setSelectedLanguage,
        selectedCountry,
        selectedOrganization,
        projectName,
        projectDescription,
        hhRole,
        consortium,
        history,
        organizationType,
        contractStatus,
        funding,
        liability,
        personalInformation,
        dualUse,
        ethics,
        cooperationType,
        duration,
        clearAnswers,
    } = useFormAnswers();

    const collaborationRisk = calculateCollaborationRisk(country, cooperationType);
    const organizationRisk = 1; //Placeholder, implement function to calculate
    const financialExchange = 1; //Placeholder, implement function to calculate
    const financialScope = calculateFinancialScope(liability);
    const financialRisk = calculateFinancialOverall(financialScope, financialExchange)
    const dualUseRisk = calculateDualUse(dualUse);
    const ethicsRisk = calculateEthics(ethics);

    // Descriptions for risk ratings
    // TODO: replace placeholders and add more results with conditional logic to Total economic risk recommendation
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
                fi: "Yhteistyön kokonaisriski on alhainen. Yhteistyössä voi kuitenkin  esiintyä tunnistamattomia riskejä ja nyt arvioitujen asioiden riskitaso saattaa muuttua jatkossa.",
                en: "Overall risk rating for the collaboration is low. Collaboration may still include unforeseen risks and risk ratings for currently assessed risks may change in the future."
            },
            2: {
                fi: "Yhteistyön kokonaisriskitaso on kohonnut. Kiinnitä erityistä huomiota kohonneisiin riskeihin ja mieti niiden hallintaa. Toteuta tarvittaessa yksityiskohtaisempi riskiarvio.",
                en: "The overall collaboration risk level has increased. Pay special attention to the elevated risks and consider how to manage them. If necessary, conduct a more detailed risk assessment."
            },
            3: {
                fi: "Yhteistyön kokonaisriskitaso on merkittävä. Yksityiskohtaisemman riskiarvion toteuttaminen on suositeltavaa. Ryhdy myös toimenpiteisiin tunnistettujen riskien hallitsemiseksi.",
                en: "Risk level is high. It is highly recommendable to undertake a more detailed risk assessment, and take action on individual risks indentified here."
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
                en: "The overall risk rating for the selected country is low."
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
                en: "Risk for corruption in the collaborator's country of residence is not meaningful."
            },
            2: {
                fi: "Yhteistyökumppanin sijaintimaassa korruption riski on kohonnut. Ota tämä huomioon yhteistyön suunnittelussa ja toteutuksessa.",
                en: "Your collaboration partner is located in a country, where the risk of corruption is elevated. Take this into account in planning and implementing your collaboration."
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
                en: "There are not restrictions for travel to the collaborating country. You may use the ministry of foreign affairs travel notices to reassess the status."
            },
            2: {
                fi: "Yhteistyömaahan matkustamiseen liittyy rajoituksia, jotka on syytä ottaa huomioon. Tutki tarkemmat yksityiskohdat ulkoministeriön matkustustiedotteista.",
                en: "Travelling to this country may be restricted. Please review details at the Ministry of Foreign Affairs travel advisory, in Finnish only. "
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
                fi: "Yhteistyökumppanisi sijaitsee maassa, jossa akateeminen vapaus on hyvällä tasolla.",
                en: "Your collaboration partner is located in a country, where academic freedom is at a good level."
            },
            2: {
                fi: "Yhteistyökumppanisi sijaitsee maassa, jossa akateeminen vapaus on jonkin verran rajoitettua. Huomioi tämä yhteistyön toteutuksessa.",
                en: "Your collaboration partner is located in a country, where academic freedom is somewhat restricted. Take this into account in implementation."
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
                en: "Your collaboration partner is located in a politically stable country."
            },
            2: {
                fi: "Yhteistyökumppanisi sijaitsee poliittisesti melko epävakaassa maassa.",
                en: "Your collaboration partner is located in a politically somewhat unstable country."
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
                en: "Your partner is located in a developed country."
            },
            2: {
                fi: "Yhteistyökumppanisi sijaitsee vähemmän kehittyneessä maassa, millä saattaa olla vaikutusta yhteistyön suunnitteluun ja toteutukseen.",
                en: "Your partner organization is located in a less developed country, which may affect the planning and implementation of the collaboration."
            },
            3: {
                fi: "Yhteistyökumppanisi sijaitsee vähiten kehittyneessä maassa. Tämä ei itsessään ole välttämättä riski, mutta ota tämä kuitenkin huomioon yhteistyön suunnittelussa ja toteutuksessa",
                en: "Your partner is located in a least developed country. In and by itself, this is not a risk, but you should still take this into account in planning and implementing phases."
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
                en: "Based on the information you have provided, GDPR is not applicable, but please double check, if this really is the case."
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
                en: "Your collaboration partner is located in a country, which is no sanctioned by UN or EU. Sanctions have no effect on your collaboration."
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
                en: "Your collaboration partner is located in a country, where rule of law is prevalent and agreements are normally followed and respected. As this is merely the point of departure, it is still necessary to draw up an agreement with appropriate care."
            },
            2: {
                fi: "Yhteistyökumppanisi sijaitsee maassa, jossa oikeusvaltioperiaate toteutuu vain osittain. Kiinnitä huomiota yhteistyösopimuksen muotoiluihin erityisesti valittavan oikeuspaikan ja riidanratkaisumekanisimien osalta. Konsultoi tarvittaessa organisaatiosi asiantuntijajuristeja.",
                en: "Your collaboration partner is located in a country, where rule of law is only partially adhered. Pay emphasis in the clauses concerning legal venue and resolution of disagreements in the collaboration agreement. Consider also consulting your organization's legal experts."
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
                fi: "Yhteistyöorganisaatiota ei löydy World Higher Education -tietokannasta. Varmista, että kyseessä on maansa viralliseen korkakoulujärjestelmään kuuluva yliopisto.",
                en: "Collaboration organization is not part of the World Higher Education database and therefore likely not part of the higher education system of the country where it is based."
            }
        },
        financial: {
            overall: {
                fi: "Yhteistyön taloudellinen kokonaisriskitaso",
                en: "Overall Financial Risk Level of the Collaboration"
            },
            title: {
                fi: "Taloudellinen kokonaisriskitaso",
                en: "Overall Financial Risk Level"
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
                fi: "Talouden kokoanaisriski on noussut. Kokonaisriskiin vaikuttavat talouden laajuuden ja valuuttakurssiriskin lisäksi se, että onko yksikkösi ilmoituksen mukaan saanut samalta rahoittajalta aiempaa rahoitusta, onko rahoittajana yritys.",
                en: "The overall economic risk is increased. In additional to the scope of the economy and currency exchange rate risks the overall risk is influenced by whether your unit, according to the notification, received previous funding from the same funder, whether the funder is a company."
            }
        },

        exchangeRate: {
            title: {
                fi: "Valuuttakurssiriski",
                en: "Exchange Rate"
            },
            0: {
                fi: "Virheellinen tai puuttuva riskiluokitus",
                en: "Invalid or missing risk level"
            },
            1: {
                fi: "Yhteistyösi talous on sidottu Euroon, mikä on hyvä tapa välttää valuuttakurssiriskejä.",
                en: "Your collaboration is based on funding in Euro, which is a good away of avoiding currency risks."
            },
            2: {
                fi: "Yhteistyösi talous on osittain riippuvainen valuuttakurssien vaihtelusta. Varmista, ettei valuuttakurssiriski muodostu liian suureksi ja jos mahdollista, pyri siihen, että yhteistyösi olisi kokonaan europerusteista. Konsultoi tarvittaessa yksikkösi talousasiantuntijoita.",
                en: "Your collaborition is somewhat vulnerable to currency exchange risks. Please ensure that the currency risk is not excessive, and consider using Euro as the only currency, if possible. Consult your unit's financial experts."
            },
            3: {
                fi: "Yhteistyösi talous on riippuvainen valuuttakurssien vaihtelusta. Varmista, että yhteistyösopimuksessa on riittävät mekanismit valuuttakurssiriskin hallitsemiseksi ja konsultoi yksikkösi talousasiantuntijoita. Suhteuta valuuttakurssiriskien hallintatavavat hankkeen kokonaisrahoituksen määrään sen koko keston aikana.",
                en: "Your collaboration is vulnerable to currency exchange risks. Please ensure that your collaboration agreement has sufficient safeguards for managing the currency exchange risks. Consult your unit's financial experts. Use proportionate measures on how to manage currency exchange risks with respect to the total funding of the project for the entire duration of it."
            }

        },

        economicScope: {
            title: {
                fi: "Taloudellinen laajuus",
                en: "Fincancial scope"
            },
            0: {
                fi: "Virheellinen tai puuttuva riskiluokitus",
                en: "Invalid or missing risk level"
            },
            1: {
                fi: "Yhteistyön taloudellinen laajuus ei ole merkittävä, eikä muodosta merkittävää riskiä. Varmista tarvittaessa ykskkösi talouden lähipalveluilta, että hankkeen budjetti on asianmukainen.",
                en: "The financial scope of the collaboration is not significant, and does not pose a substantial risk. Consult your unit's financial experts to make sure that the project budget is appropriate."
            },
            2: {
                fi: "Yhteistyön taloudellinen laajuus on kohtalainen ja siihen liittyvä riskitaso on kohonnut. Varmista, että yksikkösi talouden lähipalvelut käy etukäteen läpi hankkeen budjetin.",
                en: "The financial scope of the collaboration is moderate, and the related risk level is elevated.Make sure that your unit's financial experts have reviewed the budget in advance."
            },
            3: {
                fi: "Yhteistyön taloudellinen laajuus on huomattava, ja siihen liittyvä riskitaso on merkittävä",
                en: "The financial scope the collaboration is siginificant and poses a substantial risk"
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
                en: "Based on your response, this collaboration does not pose Dual Use risks. "
            },
            2: {
                fi: "Olet ilmoittanut, että ei ole tiedossa onko yhteistyössä mahdollisuus siihen, että kumppanille siirtyy sotilaskäyttöön soveltuvaa teknologiaa tai osaamista. Intressimme ja myös lakisääteinen velvollisuutemme on varmistaa, että asiantuntijuuttamme tai teknologiaamme ei päädy sotilaalliseen loppukäyttöön. Tutustu tarkasti Flammassa oleviin ohjeisiin ja ota yhteyttä tarvittaessa yliopiston asiantuntijoihin.",
                en: "You have indicated that it is unknown whether the collaboration may involve the transfer of technology or expertise suitable for military use to the partner. Our interest, as well as our legal obligation, is to ensure that our expertise or technology does not end up in military end-use. Please carefully review the guidelines available in Flamma and consult the university’s experts if necessary."
            },
            3: {
                fi: "Olet ilmoittanut, että yhteistyössä on mahdollisuus siihen, että kumppanille siirtyy sotilaskäyttöön soveltuvaa teknologiaa tai osaamista. Intressimme ja myös lakisääteinen velvollisuutemme on varmistaa, että asiantuntijuuttamme tai teknologiaamme ei päädy sotilaalliseen loppukäyttöön.",
                en: "According to the information provided, there is a possibility of military technology or related knowledge being tranferred to the partner in question. It is our interest, and legal requirement to ensure that our expertise or technology does not end up in military use."
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
                en: "Based on your response, this collaboration does not pose ethical challenges."
            },
            2: {
                fi: "Et ole varma yhteistyön eettisistä riskeistä.",
                en: "You are not sure if the collaboration includes ethical risks."
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
                        {riskSymbol(collaborationRisk)}<p><i>{results.collaboration[collaborationRisk][language]}</i></p>
                    </div>
                    <div>
                        {language === "fi" ?
                            <p style={{ maxWidth: "1000px" }}>Alla mainittujen riskitekijöiden lisäksi kokonaisriskiin vaikuttavat antamasi tiedot Haaga-Helian roolista yhteistyössä.</p>
                            :
                            <p style={{ maxWidth: "1000px" }}>In addition to the risk factors listed below, the overall risk is also influenced by the information you provided about Haaga-Helia’s role in the collaboration.</p>
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
                    <div>
                        <p><b>{results.organization.title[language]}</b></p>
                        {riskSymbol(organizationRisk)}<p><i>{results.organization[organizationRisk][language]}</i></p>
                    </div>
                    <div>
                        <p><b>{results.financial.title[language]}</b></p>
                        {riskSymbol(financialRisk)}<p><i></i></p>
                    </div>
                    <ul>
                        <li>
                            <p>{results.exchangeRate.title[language]}</p>
                            {riskSymbol(financialExchange)}<p><i>{results.exchangeRate[financialExchange][language]}</i></p>
                        </li>
                        <li>
                            <p>{results.economicScope.title[language]}</p>
                            {riskSymbol(financialScope)}<p><i>{results.economicScope[financialScope][language]}</i></p>
                        </li>
                    </ul>

                    <div>
                        <p><b>{results.dualUse.title[language]}</b></p>
                        {riskSymbol(dualUseRisk)}<p><i>{results.dualUse[dualUseRisk][language]}</i></p>
                    </div>
                    <p><b>{results.ethics.title[language]}</b></p>
                    {riskSymbol(ethicsRisk)}<p><i>{results.ethics[ethicsRisk][language]}</i></p>
                </div>
            }
        </ >
    );
};

export default CountryRiskAssessment;