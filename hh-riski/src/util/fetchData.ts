
import { delay } from "./utils";
import type { Question } from "../types";

//Temporary data sources
const countries = [{
    id: 'fi',
    name: {
        fi: 'Suomi',
        en: 'Finland'
    },
    risk: { //placeholder values
        corruption: 1,
        security: 1,
        academicFreedom: 1,
        development: 1,
        GDPR: 1,
        sanctions: 1,
        ruleOfLaw: 1
    }

},
{
    id: 'se',
    name: {
        fi: 'Ruotsi',
        en: 'Sweden'
    },
    risk: { //placeholder values
        corruption: 1,
        security: 1,
        academicFreedom: 1,
        development: 1,
        GDPR: 1,
        sanctions: 1,
        ruleOfLaw: 1
    }
},
{ //test countries
    id: 'yx',
    name: {
        fi: 'Testimaa matala riski',
        en: 'Test country low risk'
    },
    risk: {
        corruption: 1,
        security: 1,
        academicFreedom: 2,
        development: 2,
        GDPR: 1,
        sanctions: 1,
        ruleOfLaw: 1
    },

},
{
    id: 'ys',
    name: {
        fi: 'Testimaa korkea riski',
        en: 'Test country high risk'
    },
    risk: { //placeholder values
        corruption: 2,
        security: 3,
        academicFreedom: 2,
        development: 3,
        GDPR: 3,
        sanctions: 2,
        ruleOfLaw: 3
    },

}

]

const organizations = [
    {
        id: 'HH',
        countryId: 'fi',
        name: {
            fi: 'Haaga-Helia Ammattikorkeakoulu',
            en: 'Haaga-Helia University of Applied Sciences'
        }
    },
    {
        id: 'HY',
        countryId: 'fi',
        name: {
            fi: 'Helsingin Yliopisto',
            en: 'University of Helsinki'
        }
    },
    {
        id: 'HaY',
        countryId: 'se',
        name: {
            fi: 'Halmstadin Yliopisto',
            en: 'University of Halmstad'
        }
    },
    {
        id: 'TY',
        countryId: 'se',
        name: {
            fi: 'Tukholman Yliopisto',
            en: 'University of Stockholm'
        }
    }
]

//Change to async with simulated delay once FormPage lists have been updated to support that
export const fetchCountries = () => {
    //delay(Math.floor((Math.random() * 1750) + 250));
    return countries;
}

//Change to async with simulated delay once FormPage lists have been updated to support that
export const fetchOrganizations = () => {
    //delay(Math.floor((Math.random() * 1750) + 250));
    return organizations;
}


//Haaga-Helia role in cooperation
export const fetchHhRole = (): Question => {
    return {
        question: {
            id: "hhRole",
            fi: "Haaga-Helia ammattikorkeakoulun rooli yhteistyössä",
            en: "Haaga-Helia university of applied sciences role in collaboration"
        },
        answers: [
            {
                id: "coordinator",
                fi: "Yhteistyön koordinaattori",
                en: "Collaboration Coordnator"
            },
            {
                id: "partner",
                fi: "Kumppani tai tasaveroinen partner",
                en: "Partner"
            },
            {
                id: "other",
                fi: "Muu",
                en: "Other"
            }
        ]
    }
}

//Consortium type
export const fetchConsortiumType = (): Question => {
    return {
        question: {
            id: "cooperationType",
            fi: "Yhteistyökonsortion koostumus",
            en: "Composition of the Collaobration Consortium"
        },
        answers: [
            {
                id: "bilateral",
                fi: "Kahdenvälinen",
                en: "Bilateral"
            },
            {
                id: "multilateral",
                fi: "Monenkeskeinen",
                en: "Multilateral"
            }
        ]
    }
}

//Cooperation history
export const fetchCooperationHistory = (): Question => {
    return {
        question: {
            id: "history",
            fi: "Onko yhteistyöorganisaation kanssa tehty onnistunutta yhteistyötä aiemmin?",
            en: "Has there been previous successfull cooperation with the organization?"
        },
        answers: [
            {
                id: "yes",
                fi: "Kyllä",
                en: "Yes"
            },
            {
                id: "no",
                fi: "Ei",
                en: "No"
            }
        ]
    }
}

//Organization type
export const fetchOrganizationType = (): Question => {
    return {
        question: {
            id: "organizationType",
            fi: "Yhteistyöorganisaation tyyppi?",
            en: "Type of Partner Organization?"
        },
        answers: [
            {
                id: "university",
                fi: "Yliopisto",
                en: "University"
            },
            {
                id: "otherResearch",
                fi: "Muu tutkimuslaitos",
                en: "Other Research Institute"
            },
            {
                id: "business",
                fi: "Yritys",
                en: "Company"
            },
            {
                id: "ngo",
                fi: "Kansalaisjärjestö",
                en: "Non-Governmental Organization"
            },
            {
                id: "other",
                fi: "Muu",
                en: "Other"
            }
        ]
    }
}

//Contract information
export const fetchContractInfo = (): Question => {
    return {
        question: {
            id: "contract",
            fi: "Onko kirjallinen sopimus solmittu tai tullaanko sellainen solmimaan ennen yhteistyön aloittamista?",
            en: "Has a written agreement been signed, or will one be signed before the collaboration begins?"
        },
        answers: [
            {
                id: "yes",
                fi: "Kyllä",
                en: "Yes"
            },
            {
                id: "no",
                fi: "Ei",
                en: "No"
            }
        ]
    }
}

//Outside funding
export const fetchFunding = (): Question => {
    return {
        question: {
            id: "funding",
            fi: "Sisältyykö yhteistyöhön ulkopuolista rahoitusta?",
            en: "Does the collaboration involve external funding?"
        },
        answers: [
            {
                id: "yes",
                fi: "Kyllä",
                en: "Yes"
            },
            {
                id: "no",
                fi: "Ei",
                en: "No"
            }
        ]
    }
}

//Financial liability
export const fetchLiability = (): Question => {
    return {
        question: {
            id: "liability",
            fi: "Anna arvio yhteistyön taloudellisista kokonaisvastuista (sis. omarahoitus) sen kokonaiskeston aikana.",
            en: "Provide an estimate of the collaboration’s total financial responsibilities (including self-funding) for the university over its entire duration."
        },
        answers: [
            {
                id: "0",
                fi: "0-200.000",
                en: "0-200.000"
            },
            {
                id: "200.000",
                fi: "200.000-500.000",
                en: "200.000-500.000"
            },
            {
                id: "500.000",
                fi: "Yli 500.000",
                en: "Over 500.000"
            },
        ]
    }
}

//Personal data
export const fetchPersonalInformation = (): Question => {
    return {
        question: {
            id: "personal",
            fi: "Onko mahdollista, että yhteistyössä siirretään henkilötietoja yhtiestyökumppaneille?",
            en: "Is it possible that personal data will be transferred to the partner organization during the collaboration?"
        },
        answers: [
            {
                id: "yes",
                fi: "Kyllä",
                en: "Yes"
            },
            {
                id: "no",
                fi: "Ei",
                en: "No"
            },
            {
                id: "unknown",
                fi: "Ei tiedossa",
                en: "Unknown"
            }
        ]
    }
}

//Possible military use
export const fetchDualUse = (): Question => {
    return {
        question: {
            id: "dualUse",
            fi: "Onko mahdollista, että yhteistyössä siirtyy sotilaskäyttöön soveltuvaa teknologiaa tai osaamista kumppanille (vrt. Dual Use)?",
            en: "Is it possible that technology or expertise suitable for military use (i.e., Dual Use) will be transferred to the partner organization during the collaboration?"
        },
        answers: [
            {
                id: "yes",
                fi: "Kyllä",
                en: "Yes"
            },
            {
                id: "no",
                fi: "Ei",
                en: "No"
            },
            {
                id: "unknown",
                fi: "Ei tiedossa",
                en: "Unknown"
            }
        ]
    }
}

//Ethics assessment
export const fetchEthicsAssessment = (): Question => {
    return {
        question: {
            id: "ethics",
            fi: "Arvioi, sisältääkö yhteistyö eettisiä ongelmakohtia (ihmisoikeudet, tasa-arvo, yhdenvertaisuus) tai ristiriitaa Haaga-Helian arvojen kanssa.",
            en: "Assess whether the collaboration involves any ethical issues (human rights, equality, non-discrimination) or conflicts with the university’s values."
        },
        answers: [
            {
                id: "1",
                fi: "Ei missään tapauksessa",
                en: "Absolutely not"
            },
            {
                id: "2",
                fi: "Melko varmasti ei",
                en: "Most likely not"
            },
            {
                id: "3",
                fi: "Ehkä",
                en: "Possibly"
            },
            {
                id: "4",
                fi: "Melko varmasti",
                en: "Very likely"
            },
            {
                id: "5",
                fi: "Varmasti",
                en: "Definitely"
            }
        ]
    }
}

//Duration of cooperation
export const fetchDuration = (): Question => {
    return {
        question: {
            id: "duration",
            fi: "Mikä on yhteistyön kesto?",
            en: "Duration of Collaboration"
        },
        answers: [
            {
                id: "1",
                fi: "0-24 kk",
                en: "0-24 months"
            },
            {
                id: "2",
                fi: "24-60 kk",
                en: "24-60 months"
            },
            {
                id: "3",
                fi: "yli 60 kk",
                en: "Over 60 months"
            },
        ]
    }
}

//Cooperation type
export const fetchCooperationType = (): Question => {
    return {
        question: {
            id: "cooperationType",
            fi: "Yhteistyön muodot?",
            en: "Forms of Collaboration"
        },
        answers: [
            {
                id: "option1",
                fi: "Tutkimusyhteistyö",
                en: "Research collaboration"
            },
            {
                id: "option2",
                fi: "Koulutus/opetusyhteistyö",
                en: "Education/Teaching Collaboration"
            },
            {
                id: "option3",
                fi: "Koulutusvienti",
                en: "Export of Education"
            },
            {
                id: "option4",
                fi: "Kansainvälinen opiskelijaliikkuvuus",
                en: "International Student Mobility"
            },
            {
                id: "option5",
                fi: "Kansainvälinen henkilöstöliikkuvuus",
                en: "International Staff Mobility"
            },
            {
                id: "option6",
                fi: "Yhteistutkintoyhteistyö",
                en: "Joint Degree Collaboration"
            },
            {
                id: "option7",
                fi: "Muu",
                en: "Other"
            },
        ]
    }
}