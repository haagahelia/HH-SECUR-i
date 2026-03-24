
import { delay } from "./utils";
import type { SingleChoiceQuestion } from "../types";

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
export const fetchHhRole = (): SingleChoiceQuestion => {
    return {
        question: {
            id: "hhRole",
            fi: "Haaga-Helia ammattikorkeakoulun rooli yhteistyössä",
            en: "Haaga-Helia university of applied sciences role in partnership"
        },
        answers: [
            {
                id: "coordinator",
                fi: "Yhteistyön koordinaattori",
                en: "Coordinator"
            },
            {
                id: "partner",
                fi: "Kumppani tai tasaveroinen partner",
                en: "Equal partner"
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
export const fetchConsortiumType = (): SingleChoiceQuestion => {
    return {
        question: {
            id: "cooperationType",
            fi: "Yhteistyökonsortion koostumus",
            en: "Consortium type"
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
export const fetchCooperationHistory = (): SingleChoiceQuestion => {
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
export const fetchOrganizationType = (): SingleChoiceQuestion => {
    return {
        question: {
            id: "organizationType",
            fi: "Yhteistyöorganisaation tyyppi?",
            en: "Type of the cooperative organization?"
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
                en: "Other research institution"
            },
            {
                id: "business",
                fi: "Yritys",
                en: "Business"
            },
            {
                id: "ngo",
                fi: "Kansalaisjärjestö",
                en: "Non-governmental organization"
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
export const fetchContractInfo = (): SingleChoiceQuestion => {
    return {
        question: {
            id: "contract",
            fi: "Onko kirjallinen sopimus solmittu tai tullaanko sellainen solmimaan ennen yhteistyön aloittamista?",
            en: "Has a written contract been signed or will one be signed before the start of the cooperation?"
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
export const fetchFunding = (): SingleChoiceQuestion => {
    return {
        question: {
            id: "funding",
            fi: "Sisältyykö yhteistyöhön ulkopuolista rahoitusta?",
            en: "Is the cooperation funded by outside sources?"
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
export const fetchLiability = (): SingleChoiceQuestion => {
    return {
        question: {
            id: "liability",
            fi: "Anna arvio yhteistyön taloudellisista kokonaisvastuista (sis. omarahoitus) sen kokonaiskeston aikana.",
            en: "Estimate of financial liability (including self funding) for the full duration of the project."
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
export const fetchPersonalInformation = (): SingleChoiceQuestion => {
    return {
        question: {
            id: "personal",
            fi: "Onko mahdollista, että yhteistyössä siirretään henkilötietoja yhtiestyökumppaneille?",
            en: "Is it possible that personal information is given to consortium members?"
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
export const fetchDualUse = (): SingleChoiceQuestion => {
        return {
        question: {
            id: "dualUse",
            fi: "Onko mahdollista, että yhteistyössä siirtyy sotilaskäyttöön soveltuvaa teknologiaa tai osaamista kumppanille (vrt. Dual Use)?",
            en: "Is it possible that cooperators are given access to technology or processes suitable for military use (Dual Use)?"
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