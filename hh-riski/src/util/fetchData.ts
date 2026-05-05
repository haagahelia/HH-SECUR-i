
import { delay } from "./utils";
import type { CountryRaw, Question } from "../types";

type OrganizationRaw = {
    id: string;
    countryId: string;
    name: {
        fi: string;
        en: string;
    };
    type?: string;
};


const organizations: OrganizationRaw[] = [
    {
        id: "halmstad",
        countryId: "SWE",
        name: {
            fi: "Halmstadin yliopisto",
            en: "Halmstad University",
        },
        type: "university",
    },
    {
        id: "stockholm",
        countryId: "SWE",
        name: {
            fi: "Tukholman yliopisto",
            en: "Stockholm University",
        },
        type: "university",
    },
    {
        id: "harvard",
        countryId: "USA",
        name: {
            fi: "Harvardin yliopisto",
            en: "Harvard University",
        },
        type: "university",
    },
    {
        id: "mit",
        countryId: "USA",
        name: {
            fi: "MIT",
            en: "MIT",
        },
        type: "university",
    },
    {
        id: "moldova-state",
        countryId: "MDA",
        name: {
            fi: "Moldovan valtionyliopisto",
            en: "Moldova State University",
        },
        type: "university",
    },
    {
        id: "peking",
        countryId: "CHN",
        name: {
            fi: "Pekingin yliopisto",
            en: "Peking University",
        },
        type: "university",
    },
    {
        id: "tsinghua",
        countryId: "CHN",
        name: {
            fi: "Tsinghuan yliopisto",
            en: "Tsinghua University",
        },
        type: "university",
    },
];

export const fetchCountriesRaw = () => {
    return countriesRaw;
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
                fi: "0-20.000",
                en: "0-20.000"
            },
            {
                id: "20.000",
                fi: "20.000-50.000",
                en: "20.000-50.000"
            },
            {
                id: "50.000",
                fi: "Yli 50.000",
                en: "Over 50.000"
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
                fi: "TKI-yhteistyö",
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

//Raw country data, security placeholder value of 3, excpect for China, Moldova, USA, Sweden and Finland that have real values

const countriesRaw: CountryRaw[] = [
{
    name: {
        en: "Afghanistan",
        fi: "Afganistan"
    },
    id: "AFG",
    dataYear: 2025,
    risk: {
        corruption: 13.68,
        security: 3,
        academicFreedom: 0.086,
        politicalStability: 1.42,
        development: 181,
        GDPR: 3,
        sanctions: 1,
        ruleOfLaw: 0.30764429
    }
},
{
    name: {
        en: "Albania",
        fi: "Albania"
    },
    id: "ALB",
    dataYear: 2025,
    risk: {
        corruption: 43.4,
        security: 3,
        academicFreedom: 0.76,
        politicalStability: 51.66,
        development: 71,
        GDPR: 3,
        sanctions: 1,
        ruleOfLaw: 0.48877582
    }
},
{
    name: {
        en: "Algeria",
        fi: "Algeria"
    },
    id: "DZA",
    dataYear: 2025,
    risk: {
        corruption: 30.19,
        security: 3,
        academicFreedom: 0.206,
        politicalStability: 23.22,
        development: 96,
        GDPR: 3,
        sanctions: 1,
        ruleOfLaw: 0.48857478
    }
},
{
    name: {
        en: "Angola",
        fi: "Angola"
    },
    id: "AGO",
    dataYear: 2025,
    risk: {
        corruption: 29.25,
        security: 3,
        academicFreedom: 0.416,
        politicalStability: 32.23,
        development: 148,
        GDPR: 3,
        sanctions: 1,
        ruleOfLaw: 0.42317338
    }
},
{
    name: {
        en: "Argentina",
        fi: "Argentiina"
    },
    id: "ARG",
    dataYear: 2025,
    risk: {
        corruption: 41.98,
        security: 3,
        academicFreedom: 0.625,
        politicalStability: 41.71,
        development: 47,
        GDPR: 2,
        sanctions: 1,
        ruleOfLaw: 0.54045581
    }
},
{
    name: {
        en: "Armenia",
        fi: "Armenia"
    },
    id: "ARM",
    dataYear: 2025,
    risk: {
        corruption: 57.08,
        security: 3,
        academicFreedom: 0.582,
        politicalStability: 17.06,
        development: 69,
        GDPR: 3,
        sanctions: 1,
        ruleOfLaw: -1.0
    }
},
{
    name: {
        en: "Australia",
        fi: "Australia"
    },
    id: "AUS",
    dataYear: 2025,
    risk: {
        corruption: 95.75,
        security: 3,
        academicFreedom: 0.864,
        politicalStability: 79.62,
        development: 7,
        GDPR: 3,
        sanctions: 1,
        ruleOfLaw: 0.79630136
    }
},
{
    name: {
        en: "Austria",
        fi: "Itävalta"
    },
    id: "AUT",
    dataYear: 2025,
    risk: {
        corruption: 83.49,
        security: 3,
        academicFreedom: 0.881,
        politicalStability: 71.56,
        development: 22,
        GDPR: 1,
        sanctions: 1,
        ruleOfLaw: 0.79426923
    }
},
{
    name: {
        en: "Azerbaijan",
        fi: "Azerbaidžan"
    },
    id: "AZE",
    dataYear: 2025,
    risk: {
        corruption: 12.26,
        security: 3,
        academicFreedom: 0.092,
        politicalStability: 18.01,
        development: 81,
        GDPR: 3,
        sanctions: 1,
        ruleOfLaw: -1.0
    }
},
{
    name: {
        en: "Bahrain",
        fi: "Bahrain"
    },
    id: "BHR",
    dataYear: 2025,
    risk: {
        corruption: 59.43,
        security: 3,
        academicFreedom: 0.199,
        politicalStability: 29.38,
        development: 38,
        GDPR: 3,
        sanctions: 1,
        ruleOfLaw: -1.0
    }
},
{
    name: {
        en: "Bangladesh",
        fi: "Bangladesh"
    },
    id: "BGD",
    dataYear: 2025,
    risk: {
        corruption: 14.62,
        security: 3,
        academicFreedom: 0.519,
        politicalStability: 15.64,
        development: 130,
        GDPR: 3,
        sanctions: 1,
        ruleOfLaw: 0.3912668
    }
},
{
    name: {
        en: "Barbados",
        fi: "Barbados"
    },
    id: "BRB",
    dataYear: 2025,
    risk: {
        corruption: 89.62,
        security: 3,
        academicFreedom: 0.904,
        politicalStability: 93.84,
        development: 69,
        GDPR: 3,
        sanctions: 1,
        ruleOfLaw: 0.66109376
    }
},
{
    name: {
        en: "Belarus",
        fi: "Valkovenäjä"
    },
    id: "BLR",
    dataYear: 2025,
    risk: {
        corruption: 26.89,
        security: 3,
        academicFreedom: 0.06,
        politicalStability: 18.48,
        development: 65,
        GDPR: 3,
        sanctions: 1,
        ruleOfLaw: 0.44475383
    }
},
{
    name: {
        en: "Belgium",
        fi: "Belgia"
    },
    id: "BEL",
    dataYear: 2025,
    risk: {
        corruption: 89.15,
        security: 3,
        academicFreedom: 0.946,
        politicalStability: 58.29,
        development: 10,
        GDPR: 1,
        sanctions: 1,
        ruleOfLaw: 0.78141921
    }
},
{
    name: {
        en: "Benin",
        fi: "Benin"
    },
    id: "BEN",
    dataYear: 2025,
    risk: {
        corruption: 52.83,
        security: 3,
        academicFreedom: 0.709,
        politicalStability: 31.75,
        development: 173,
        GDPR: 3,
        sanctions: 1,
        ruleOfLaw: 0.47187284
    }
},
{
    name: {
        en: "Bhutan",
        fi: "Bhutan"
    },
    id: "BTN",
    dataYear: 2025,
    risk: {
        corruption: 91.04,
        security: 3,
        academicFreedom: 0.401,
        politicalStability: 83.41,
        development: 125,
        GDPR: 3,
        sanctions: 1,
        ruleOfLaw: -1.0
    }
},
{
    name: {
        en: "Bolivia",
        fi: "Bolivia"
    },
    id: "BOL",
    dataYear: 2025,
    risk: {
        corruption: 21.7,
        security: 3,
        academicFreedom: 0.582,
        politicalStability: 35.07,
        development: 108,
        GDPR: 3,
        sanctions: 1,
        ruleOfLaw: 0.3654158
    }
},
{
    name: {
        en: "Bosnia and Herzegovina",
        fi: "Bosnia ja Hertsegovina"
    },
    id: "BIH",
    dataYear: 2025,
    risk: {
        corruption: 30.66,
        security: 3,
        academicFreedom: 0.75,
        politicalStability: 31.28,
        development: 74,
        GDPR: 3,
        sanctions: 1,
        ruleOfLaw: 0.51994863
    }
},
{
    name: {
        en: "Botswana",
        fi: "Botswana"
    },
    id: "BWA",
    dataYear: 2025,
    risk: {
        corruption: 73.58,
        security: 3,
        academicFreedom: 0.834,
        politicalStability: 87.2,
        development: 111,
        GDPR: 3,
        sanctions: 1,
        ruleOfLaw: 0.59548103
    }
},
{
    name: {
        en: "Brazil",
        fi: "Brasilia"
    },
    id: "BRA",
    dataYear: 2025,
    risk: {
        corruption: 34.43,
        security: 3,
        academicFreedom: 0.849,
        politicalStability: 28.44,
        development: 84,
        GDPR: 3,
        sanctions: 1,
        ruleOfLaw: 0.50271197
    }
},
{
    name: {
        en: "Bulgaria",
        fi: "Bulgaria"
    },
    id: "BGR",
    dataYear: 2025,
    risk: {
        corruption: 50.0,
        security: 3,
        academicFreedom: 0.85,
        politicalStability: 55.45,
        development: 55,
        GDPR: 1,
        sanctions: 1,
        ruleOfLaw: 0.55251684
    }
},
{
    name: {
        en: "Burkina Faso",
        fi: "Burkina Faso"
    },
    id: "BFA",
    dataYear: 2025,
    risk: {
        corruption: 49.53,
        security: 3,
        academicFreedom: 0.562,
        politicalStability: 5.69,
        development: 186,
        GDPR: 3,
        sanctions: 1,
        ruleOfLaw: 0.45197536
    }
},
{
    name: {
        en: "Burma/Myanmar",
        fi: "Myanmar"
    },
    id: "MMR",
    dataYear: 2025,
    risk: {
        corruption: 11.79,
        security: 3,
        academicFreedom: 0.023,
        politicalStability: 4.74,
        development: -1,
        GDPR: 3,
        sanctions: 1,
        ruleOfLaw: 0.33605104
    }
},
{
    name: {
        en: "Burundi",
        fi: "Burundi"
    },
    id: "BDI",
    dataYear: 2025,
    risk: {
        corruption: 3.3,
        security: 3,
        academicFreedom: 0.144,
        politicalStability: 12.8,
        development: 187,
        GDPR: 3,
        sanctions: 1,
        ruleOfLaw: -1.0
    }
},
{
    name: {
        en: "Cambodia",
        fi: "Kambodža"
    },
    id: "KHM",
    dataYear: 2025,
    risk: {
        corruption: 9.43,
        security: 3,
        academicFreedom: 0.216,
        politicalStability: 47.87,
        development: 151,
        GDPR: 3,
        sanctions: 1,
        ruleOfLaw: 0.31025398
    }
},
{
    name: {
        en: "Cameroon",
        fi: "Kamerun"
    },
    id: "CMR",
    dataYear: 2025,
    risk: {
        corruption: 13.21,
        security: 3,
        academicFreedom: 0.207,
        politicalStability: 11.37,
        development: 155,
        GDPR: 3,
        sanctions: 1,
        ruleOfLaw: 0.35633851
    }
},
{
    name: {
        en: "Canada",
        fi: "Kanada"
    },
    id: "CAN",
    dataYear: 2025,
    risk: {
        corruption: 94.81,
        security: 3,
        academicFreedom: 0.854,
        politicalStability: 76.3,
        development: 16,
        GDPR: 2,
        sanctions: 1,
        ruleOfLaw: 0.79413974
    }
},
{
    name: {
        en: "Cape Verde",
        fi: "Kap Verde"
    },
    id: "CPV",
    dataYear: 2025,
    risk: {
        corruption: 81.13,
        security: 3,
        academicFreedom: 0.866,
        politicalStability: 79.15,
        development: -1,
        GDPR: 3,
        sanctions: 1,
        ruleOfLaw: -1.0
    }
},
{
    name: {
        en: "Central African Republic",
        fi: "Keski-Afrikan tasavalta"
    },
    id: "CAF",
    dataYear: 2025,
    risk: {
        corruption: 8.96,
        security: 3,
        academicFreedom: 0.326,
        politicalStability: 3.32,
        development: 191,
        GDPR: 3,
        sanctions: 1,
        ruleOfLaw: -1.0
    }
},
{
    name: {
        en: "Chad",
        fi: "Tšad"
    },
    id: "TCD",
    dataYear: 2025,
    risk: {
        corruption: 4.72,
        security: 3,
        academicFreedom: 0.132,
        politicalStability: 9.0,
        development: 190,
        GDPR: 3,
        sanctions: 1,
        ruleOfLaw: -1.0
    }
},
{
    name: {
        en: "Chile",
        fi: "Chile"
    },
    id: "CHL",
    dataYear: 2025,
    risk: {
        corruption: 80.66,
        security: 3,
        academicFreedom: 0.918,
        politicalStability: 50.24,
        development: 45,
        GDPR: 3,
        sanctions: 1,
        ruleOfLaw: 0.65501172
    }
},
{
    name: {
        en: "China",
        fi: "Kiina"
    },
    id: "CHN",
    dataYear: 2025,
    risk: {
        corruption: 54.25,
        security: 1,
        academicFreedom: 0.071,
        politicalStability: 25.12,
        development: 78,
        GDPR: 3,
        sanctions: 1,
        ruleOfLaw: 0.47709017
    }
},
{
    name: {
        en: "Colombia",
        fi: "Kolumbia"
    },
    id: "COL",
    dataYear: 2025,
    risk: {
        corruption: 44.81,
        security: 3,
        academicFreedom: 0.599,
        politicalStability: 18.96,
        development: 83,
        GDPR: 3,
        sanctions: 1,
        ruleOfLaw: 0.47184299
    }
},
{
    name: {
        en: "Comoros",
        fi: "Komorit"
    },
    id: "COM",
    dataYear: 2025,
    risk: {
        corruption: 19.34,
        security: 3,
        academicFreedom: 0.303,
        politicalStability: 38.86,
        development: 152,
        GDPR: 3,
        sanctions: 1,
        ruleOfLaw: -1.0
    }
},
{
    name: {
        en: "Costa Rica",
        fi: "Costa Rica"
    },
    id: "CRI",
    dataYear: 2025,
    risk: {
        corruption: 72.64,
        security: 3,
        academicFreedom: 0.915,
        politicalStability: 83.89,
        development: 62,
        GDPR: 3,
        sanctions: 1,
        ruleOfLaw: 0.67563572
    }
},
{
    name: {
        en: "Croatia",
        fi: "Kroatia"
    },
    id: "HRV",
    dataYear: 2025,
    risk: {
        corruption: 59.91,
        security: 3,
        academicFreedom: 0.811,
        politicalStability: 67.77,
        development: 41,
        GDPR: 1,
        sanctions: 1,
        ruleOfLaw: 0.60745101
    }
},
{
    name: {
        en: "Cuba",
        fi: "Kuuba"
    },
    id: "CUB",
    dataYear: 2025,
    risk: {
        corruption: 52.36,
        security: 3,
        academicFreedom: 0.084,
        politicalStability: 56.87,
        development: 97,
        GDPR: 3,
        sanctions: 1,
        ruleOfLaw: -1.0
    }
},
{
    name: {
        en: "Cyprus",
        fi: "Kypros"
    },
    id: "CYP",
    dataYear: 2025,
    risk: {
        corruption: 62.74,
        security: 3,
        academicFreedom: 0.889,
        politicalStability: 59.24,
        development: 32,
        GDPR: 1,
        sanctions: 1,
        ruleOfLaw: 0.67323453
    }
},
{
    name: {
        en: "Czechia",
        fi: "Tšekki"
    },
    id: "CZE",
    dataYear: 2025,
    risk: {
        corruption: 76.89,
        security: 3,
        academicFreedom: 0.978,
        politicalStability: 82.46,
        development: 29,
        GDPR: 1,
        sanctions: 1,
        ruleOfLaw: 0.73902408
    }
},
{
    name: {
        en: "Democratic Republic of the Congo",
        fi: "Kongon demokraattinen tasavalta"
    },
    id: "COD",
    dataYear: 2025,
    risk: {
        corruption: 5.19,
        security: 3,
        academicFreedom: 0.506,
        politicalStability: 5.21,
        development: 171,
        GDPR: 3,
        sanctions: 1,
        ruleOfLaw: 0.33908811
    }
},
{
    name: {
        en: "Denmark",
        fi: "Tanska"
    },
    id: "DNK",
    dataYear: 2025,
    risk: {
        corruption: 100.0,
        security: 3,
        academicFreedom: 0.875,
        politicalStability: 76.78,
        development: 4,
        GDPR: 1,
        sanctions: 1,
        ruleOfLaw: 0.89786373
    }
},
{
    name: {
        en: "Djibouti",
        fi: "Djibouti"
    },
    id: "DJI",
    dataYear: 2025,
    risk: {
        corruption: 23.58,
        security: 3,
        academicFreedom: 0.302,
        politicalStability: 24.64,
        development: 175,
        GDPR: 3,
        sanctions: 1,
        ruleOfLaw: -1.0
    }
},
{
    name: {
        en: "Dominican Republic",
        fi: "Dominikaaninen tasavalta"
    },
    id: "DOM",
    dataYear: 2025,
    risk: {
        corruption: 37.74,
        security: 3,
        academicFreedom: 0.901,
        politicalStability: 53.55,
        development: 89,
        GDPR: 3,
        sanctions: 1,
        ruleOfLaw: 0.50376138
    }
},
{
    name: {
        en: "Ecuador",
        fi: "Ecuador"
    },
    id: "ECU",
    dataYear: 2025,
    risk: {
        corruption: 27.83,
        security: 3,
        academicFreedom: 0.433,
        politicalStability: 32.7,
        development: 88,
        GDPR: 3,
        sanctions: 1,
        ruleOfLaw: 0.45550633
    }
},
{
    name: {
        en: "Egypt",
        fi: "Egypti"
    },
    id: "EGY",
    dataYear: 2025,
    risk: {
        corruption: 24.53,
        security: 3,
        academicFreedom: 0.075,
        politicalStability: 16.59,
        development: 100,
        GDPR: 3,
        sanctions: 1,
        ruleOfLaw: 0.34621281
    }
},
{
    name: {
        en: "El Salvador",
        fi: "El Salvador"
    },
    id: "SLV",
    dataYear: 2025,
    risk: {
        corruption: 32.08,
        security: 3,
        academicFreedom: 0.165,
        politicalStability: 46.45,
        development: 132,
        GDPR: 3,
        sanctions: 1,
        ruleOfLaw: 0.41992069
    }
},
{
    name: {
        en: "Equatorial Guinea",
        fi: "Päiväntasaajan Guinea"
    },
    id: "GNQ",
    dataYear: 2025,
    risk: {
        corruption: 2.83,
        security: 3,
        academicFreedom: 0.108,
        politicalStability: 38.39,
        development: 133,
        GDPR: 3,
        sanctions: 1,
        ruleOfLaw: -1.0
    }
},
{
    name: {
        en: "Eritrea",
        fi: "Eritrea"
    },
    id: "ERI",
    dataYear: 2025,
    risk: {
        corruption: 5.66,
        security: 3,
        academicFreedom: 0.034,
        politicalStability: 17.54,
        development: 178,
        GDPR: 3,
        sanctions: 1,
        ruleOfLaw: -1.0
    }
},
{
    name: {
        en: "Estonia",
        fi: "Viro"
    },
    id: "EST",
    dataYear: 2025,
    risk: {
        corruption: 91.51,
        security: 3,
        academicFreedom: 0.974,
        politicalStability: 69.19,
        development: 36,
        GDPR: 1,
        sanctions: 1,
        ruleOfLaw: 0.81892344
    }
},
{
    name: {
        en: "Eswatini",
        fi: "Swazimaa"
    },
    id: "SWZ",
    dataYear: 2025,
    risk: {
        corruption: 25.0,
        security: 3,
        academicFreedom: 0.179,
        politicalStability: 30.81,
        development: 126,
        GDPR: 3,
        sanctions: 1,
        ruleOfLaw: -1.0
    }
},
{
    name: {
        en: "Ethiopia",
        fi: "Etiopia"
    },
    id: "ETH",
    dataYear: 2025,
    risk: {
        corruption: 37.26,
        security: 3,
        academicFreedom: 0.337,
        politicalStability: 6.16,
        development: 180,
        GDPR: 3,
        sanctions: 1,
        ruleOfLaw: 0.36220672
    }
},
{
    name: {
        en: "Fiji",
        fi: "Fidži"
    },
    id: "FJI",
    dataYear: 2025,
    risk: {
        corruption: 66.04,
        security: 3,
        academicFreedom: 0.636,
        politicalStability: 72.99,
        development: 111,
        GDPR: 3,
        sanctions: 1,
        ruleOfLaw: -1.0
    }
},
{
    name: {
        en: "Finland",
        fi: "Suomi"
    },
    id: "FIN",
    dataYear: 2025,
    risk: {
        corruption: 99.53,
        security: 1,
        academicFreedom: 0.818,
        politicalStability: 71.09,
        development: 12,
        GDPR: 1,
        sanctions: 1,
        ruleOfLaw: 0.8707053
    }
},
{
    name: {
        en: "France",
        fi: "Ranska"
    },
    id: "FRA",
    dataYear: 2025,
    risk: {
        corruption: 83.96,
        security: 3,
        academicFreedom: 0.8,
        politicalStability: 55.92,
        development: 26,
        GDPR: 1,
        sanctions: 1,
        ruleOfLaw: 0.72377548
    }
},
{
    name: {
        en: "Gabon",
        fi: "Gabon"
    },
    id: "GAB",
    dataYear: 2025,
    risk: {
        corruption: 17.92,
        security: 3,
        academicFreedom: 0.428,
        politicalStability: 33.65,
        development: 108,
        GDPR: 3,
        sanctions: 1,
        ruleOfLaw: 0.40204301
    }
},
{
    name: {
        en: "Georgia",
        fi: "Georgia"
    },
    id: "GEO",
    dataYear: 2025,
    risk: {
        corruption: 71.23,
        security: 3,
        academicFreedom: 0.584,
        politicalStability: 33.18,
        development: 57,
        GDPR: 3,
        sanctions: 1,
        ruleOfLaw: 0.58114936
    }
},
{
    name: {
        en: "Germany",
        fi: "Saksa"
    },
    id: "DEU",
    dataYear: 2025,
    risk: {
        corruption: 94.34,
        security: 3,
        academicFreedom: 0.877,
        politicalStability: 66.35,
        development: 5,
        GDPR: 1,
        sanctions: 1,
        ruleOfLaw: 0.8333243
    }
},
{
    name: {
        en: "Ghana",
        fi: "Ghana"
    },
    id: "GHA",
    dataYear: 2025,
    risk: {
        corruption: 51.42,
        security: 3,
        academicFreedom: 0.67,
        politicalStability: 45.5,
        development: 143,
        GDPR: 3,
        sanctions: 1,
        ruleOfLaw: 0.54499807
    }
},
{
    name: {
        en: "Greece",
        fi: "Kreikka"
    },
    id: "GRC",
    dataYear: 2025,
    risk: {
        corruption: 58.02,
        security: 3,
        academicFreedom: 0.68,
        politicalStability: 54.03,
        development: 34,
        GDPR: 1,
        sanctions: 1,
        ruleOfLaw: 0.59691846
    }
},
{
    name: {
        en: "Guatemala",
        fi: "Guatemala"
    },
    id: "GTM",
    dataYear: 2025,
    risk: {
        corruption: 14.15,
        security: 3,
        academicFreedom: 0.736,
        politicalStability: 36.97,
        development: 137,
        GDPR: 3,
        sanctions: 1,
        ruleOfLaw: 0.43949764
    }
},
{
    name: {
        en: "Guinea",
        fi: "Guinea"
    },
    id: "GIN",
    dataYear: 2025,
    risk: {
        corruption: 20.28,
        security: 3,
        academicFreedom: 0.301,
        politicalStability: 16.11,
        development: 179,
        GDPR: 3,
        sanctions: 1,
        ruleOfLaw: 0.40879427
    }
},
{
    name: {
        en: "Guinea-Bissau",
        fi: "Guinea-Bissau"
    },
    id: "GNB",
    dataYear: 2025,
    risk: {
        corruption: 12.74,
        security: 3,
        academicFreedom: 0.523,
        politicalStability: 34.12,
        development: 174,
        GDPR: 3,
        sanctions: 1,
        ruleOfLaw: -1.0
    }
},
{
    name: {
        en: "Guyana",
        fi: "Guyana"
    },
    id: "GUY",
    dataYear: 2025,
    risk: {
        corruption: 40.57,
        security: 3,
        academicFreedom: 0.761,
        politicalStability: 43.6,
        development: 89,
        GDPR: 3,
        sanctions: 1,
        ruleOfLaw: 0.49976778
    }
},
{
    name: {
        en: "Haiti",
        fi: "Haiti"
    },
    id: "HTI",
    dataYear: 2025,
    risk: {
        corruption: 6.13,
        security: 3,
        academicFreedom: 0.69,
        politicalStability: 10.43,
        development: 166,
        GDPR: 3,
        sanctions: 1,
        ruleOfLaw: 0.32376015
    }
},
{
    name: {
        en: "Honduras",
        fi: "Honduras"
    },
    id: "HND",
    dataYear: 2025,
    risk: {
        corruption: 15.09,
        security: 3,
        academicFreedom: 0.931,
        politicalStability: 27.96,
        development: 139,
        GDPR: 3,
        sanctions: 1,
        ruleOfLaw: 0.41139412
    }
},
{
    name: {
        en: "Hong Kong",
        fi: "Hongkong"
    },
    id: "HKG",
    dataYear: 2025,
    risk: {
        corruption: 93.4,
        security: 3,
        academicFreedom: 0.237,
        politicalStability: 69.67,
        development: 8,
        GDPR: 3,
        sanctions: 1,
        ruleOfLaw: 0.71824242
    }
},
{
    name: {
        en: "Hungary",
        fi: "Unkari"
    },
    id: "HUN",
    dataYear: 2025,
    risk: {
        corruption: 54.72,
        security: 3,
        academicFreedom: 0.299,
        politicalStability: 72.04,
        development: 46,
        GDPR: 1,
        sanctions: 1,
        ruleOfLaw: 0.50260437
    }
},
{
    name: {
        en: "Iceland",
        fi: "Islanti"
    },
    id: "ISL",
    dataYear: 2025,
    risk: {
        corruption: 91.98,
        security: 3,
        academicFreedom: 0.756,
        politicalStability: 95.26,
        development: 1,
        GDPR: 3,
        sanctions: 1,
        ruleOfLaw: -1.0
    }
},
{
    name: {
        en: "India",
        fi: "Intia"
    },
    id: "IND",
    dataYear: 2025,
    risk: {
        corruption: 41.51,
        security: 3,
        academicFreedom: 0.136,
        politicalStability: 21.33,
        development: 130,
        GDPR: 3,
        sanctions: 1,
        ruleOfLaw: 0.48898741
    }
},
{
    name: {
        en: "Indonesia",
        fi: "Indonesia"
    },
    id: "IDN",
    dataYear: 2025,
    risk: {
        corruption: 36.32,
        security: 3,
        academicFreedom: 0.33,
        politicalStability: 28.91,
        development: 113,
        GDPR: 3,
        sanctions: 1,
        ruleOfLaw: 0.52387695
    }
},
{
    name: {
        en: "Iran",
        fi: "Iran"
    },
    id: "IRN",
    dataYear: 2025,
    risk: {
        corruption: 10.38,
        security: 3,
        academicFreedom: 0.06,
        politicalStability: 8.06,
        development: 75,
        GDPR: 3,
        sanctions: 1,
        ruleOfLaw: 0.38246528
    }
},
{
    name: {
        en: "Iraq",
        fi: "Irak"
    },
    id: "IRQ",
    dataYear: 2025,
    risk: {
        corruption: 8.49,
        security: 3,
        academicFreedom: 0.604,
        politicalStability: 2.37,
        development: 126,
        GDPR: 3,
        sanctions: 1,
        ruleOfLaw: -1.0
    }
},
{
    name: {
        en: "Ireland",
        fi: "Irlanti"
    },
    id: "IRL",
    dataYear: 2025,
    risk: {
        corruption: 92.92,
        security: 3,
        academicFreedom: 0.922,
        politicalStability: 78.67,
        development: 11,
        GDPR: 1,
        sanctions: 1,
        ruleOfLaw: 0.8234931
    }
},
{
    name: {
        en: "Israel",
        fi: "Israel"
    },
    id: "ISR",
    dataYear: 2025,
    risk: {
        corruption: 78.77,
        security: 3,
        academicFreedom: 0.84,
        politicalStability: 9.95,
        development: 27,
        GDPR: 2,
        sanctions: 1,
        ruleOfLaw: -1.0
    }
},
{
    name: {
        en: "Italy",
        fi: "Italia"
    },
    id: "ITA",
    dataYear: 2025,
    risk: {
        corruption: 67.92,
        security: 3,
        academicFreedom: 0.822,
        politicalStability: 64.93,
        development: 29,
        GDPR: 1,
        sanctions: 1,
        ruleOfLaw: 0.65651175
    }
},
{
    name: {
        en: "Ivory Coast",
        fi: "Norsunluurannikko"
    },
    id: "CIV",
    dataYear: 2025,
    risk: {
        corruption: 44.34,
        security: 3,
        academicFreedom: 0.575,
        politicalStability: 21.8,
        development: -1,
        GDPR: 3,
        sanctions: 1,
        ruleOfLaw: 0.44405588
    }
},
{
    name: {
        en: "Jamaica",
        fi: "Jamaika"
    },
    id: "JAM",
    dataYear: 2025,
    risk: {
        corruption: 50.94,
        security: 3,
        academicFreedom: 0.939,
        politicalStability: 57.35,
        development: 117,
        GDPR: 3,
        sanctions: 1,
        ruleOfLaw: 0.56986124
    }
},
{
    name: {
        en: "Japan",
        fi: "Japani"
    },
    id: "JPN",
    dataYear: 2025,
    risk: {
        corruption: 90.09,
        security: 3,
        academicFreedom: 0.76,
        politicalStability: 81.52,
        development: 23,
        GDPR: 3,
        sanctions: 1,
        ruleOfLaw: 0.78367491
    }
},
{
    name: {
        en: "Jordan",
        fi: "Jordania"
    },
    id: "JOR",
    dataYear: 2025,
    risk: {
        corruption: 57.55,
        security: 3,
        academicFreedom: 0.173,
        politicalStability: 40.28,
        development: 100,
        GDPR: 3,
        sanctions: 1,
        ruleOfLaw: 0.55158001
    }
},
{
    name: {
        en: "Kazakhstan",
        fi: "Kazakstan"
    },
    id: "KAZ",
    dataYear: 2025,
    risk: {
        corruption: 47.17,
        security: 3,
        academicFreedom: 0.334,
        politicalStability: 36.49,
        development: 60,
        GDPR: 3,
        sanctions: 1,
        ruleOfLaw: 0.5363161
    }
},
{
    name: {
        en: "Kenya",
        fi: "Kenia"
    },
    id: "KEN",
    dataYear: 2025,
    risk: {
        corruption: 24.06,
        security: 3,
        academicFreedom: 0.864,
        politicalStability: 14.69,
        development: 143,
        GDPR: 3,
        sanctions: 1,
        ruleOfLaw: 0.4506896
    }
},
{
    name: {
        en: "Kosovo",
        fi: "Kosovo"
    },
    id: "XKX",
    dataYear: 2025,
    risk: {
        corruption: 48.58,
        security: 3,
        academicFreedom: 0.621,
        politicalStability: 34.6,
        development: -1,
        GDPR: 3,
        sanctions: 1,
        ruleOfLaw: 0.56098566
    }
},
{
    name: {
        en: "Kuwait",
        fi: "Kuwait"
    },
    id: "KWT",
    dataYear: 2025,
    risk: {
        corruption: 60.38,
        security: 3,
        academicFreedom: 0.418,
        politicalStability: 58.77,
        development: 52,
        GDPR: 3,
        sanctions: 1,
        ruleOfLaw: 0.57898735
    }
},
{
    name: {
        en: "Kyrgyzstan",
        fi: "Kirgiisi"
    },
    id: "KGZ",
    dataYear: 2025,
    risk: {
        corruption: 11.32,
        security: 3,
        academicFreedom: 0.378,
        politicalStability: 26.54,
        development: 117,
        GDPR: 3,
        sanctions: 1,
        ruleOfLaw: 0.44826869
    }
},
{
    name: {
        en: "Laos",
        fi: "Lao"
    },
    id: "LAO",
    dataYear: 2025,
    risk: {
        corruption: 19.81,
        security: 3,
        academicFreedom: 0.122,
        politicalStability: 75.36,
        development: 147,
        GDPR: 3,
        sanctions: 1,
        ruleOfLaw: -1.0
    }
},
{
    name: {
        en: "Latvia",
        fi: "Latvia"
    },
    id: "LVA",
    dataYear: 2025,
    risk: {
        corruption: 74.53,
        security: 3,
        academicFreedom: 0.928,
        politicalStability: 66.82,
        development: 41,
        GDPR: 1,
        sanctions: 1,
        ruleOfLaw: 0.73348182
    }
},
{
    name: {
        en: "Lebanon",
        fi: "Libanon"
    },
    id: "LBN",
    dataYear: 2025,
    risk: {
        corruption: 10.85,
        security: 3,
        academicFreedom: 0.618,
        politicalStability: 9.48,
        development: 102,
        GDPR: 3,
        sanctions: 1,
        ruleOfLaw: 0.44185147
    }
},
{
    name: {
        en: "Lesotho",
        fi: "Lesotho"
    },
    id: "LSO",
    dataYear: 2025,
    risk: {
        corruption: 33.49,
        security: 3,
        academicFreedom: 0.643,
        politicalStability: 35.55,
        development: 167,
        GDPR: 3,
        sanctions: 1,
        ruleOfLaw: -1.0
    }
},
{
    name: {
        en: "Liberia",
        fi: "Liberia"
    },
    id: "LBR",
    dataYear: 2025,
    risk: {
        corruption: 20.75,
        security: 3,
        academicFreedom: 0.609,
        politicalStability: 42.65,
        development: 177,
        GDPR: 3,
        sanctions: 1,
        ruleOfLaw: 0.44144825
    }
},
{
    name: {
        en: "Libya",
        fi: "Libya"
    },
    id: "LBY",
    dataYear: 2025,
    risk: {
        corruption: 3.77,
        security: 3,
        academicFreedom: 0.282,
        politicalStability: 4.27,
        development: 115,
        GDPR: 3,
        sanctions: 1,
        ruleOfLaw: -1.0
    }
},
{
    name: {
        en: "Lithuania",
        fi: "Liettua"
    },
    id: "LTU",
    dataYear: 2025,
    risk: {
        corruption: 77.83,
        security: 3,
        academicFreedom: 0.823,
        politicalStability: 72.51,
        development: 39,
        GDPR: 1,
        sanctions: 1,
        ruleOfLaw: 0.77418824
    }
},
{
    name: {
        en: "Luxembourg",
        fi: "Luxemburg"
    },
    id: "LUX",
    dataYear: 2025,
    risk: {
        corruption: 96.7,
        security: 3,
        academicFreedom: 0.918,
        politicalStability: 87.68,
        development: 25,
        GDPR: 1,
        sanctions: 1,
        ruleOfLaw: 0.82977847
    }
},
{
    name: {
        en: "Madagascar",
        fi: "Madagaskar"
    },
    id: "MDG",
    dataYear: 2025,
    risk: {
        corruption: 18.4,
        security: 3,
        academicFreedom: 0.684,
        politicalStability: 19.91,
        development: 183,
        GDPR: 3,
        sanctions: 1,
        ruleOfLaw: 0.43209549
    }
},
{
    name: {
        en: "Malawi",
        fi: "Malawi"
    },
    id: "MWI",
    dataYear: 2025,
    risk: {
        corruption: 29.72,
        security: 3,
        academicFreedom: 0.795,
        politicalStability: 37.91,
        development: 172,
        GDPR: 3,
        sanctions: 1,
        ruleOfLaw: 0.51987902
    }
},
{
    name: {
        en: "Malaysia",
        fi: "Malesia"
    },
    id: "MYS",
    dataYear: 2025,
    risk: {
        corruption: 61.79,
        security: 3,
        academicFreedom: 0.289,
        politicalStability: 50.71,
        development: 67,
        GDPR: 3,
        sanctions: 1,
        ruleOfLaw: 0.56995633
    }
},
{
    name: {
        en: "Maldives",
        fi: "Malediivit"
    },
    id: "MDV",
    dataYear: 2025,
    risk: {
        corruption: 39.62,
        security: 3,
        academicFreedom: 0.555,
        politicalStability: 62.56,
        development: 93,
        GDPR: 3,
        sanctions: 1,
        ruleOfLaw: -1.0
    }
},
{
    name: {
        en: "Mali",
        fi: "Mali"
    },
    id: "MLI",
    dataYear: 2025,
    risk: {
        corruption: 21.23,
        security: 3,
        academicFreedom: 0.281,
        politicalStability: 0.47,
        development: 188,
        GDPR: 3,
        sanctions: 1,
        ruleOfLaw: 0.38519028
    }
},
{
    name: {
        en: "Malta",
        fi: "Malta"
    },
    id: "MLT",
    dataYear: 2025,
    risk: {
        corruption: 58.49,
        security: 3,
        academicFreedom: 0.874,
        politicalStability: 77.25,
        development: 24,
        GDPR: 1,
        sanctions: 1,
        ruleOfLaw: 0.66978317
    }
},
{
    name: {
        en: "Mauritania",
        fi: "Mauritania"
    },
    id: "MRT",
    dataYear: 2025,
    risk: {
        corruption: 22.64,
        security: 3,
        academicFreedom: 0.253,
        politicalStability: 26.07,
        development: 163,
        GDPR: 3,
        sanctions: 1,
        ruleOfLaw: 0.36177795
    }
},
{
    name: {
        en: "Mauritius",
        fi: "Mauritius"
    },
    id: "MUS",
    dataYear: 2025,
    risk: {
        corruption: 65.57,
        security: 3,
        academicFreedom: 0.592,
        politicalStability: 74.88,
        development: 73,
        GDPR: 3,
        sanctions: 1,
        ruleOfLaw: 0.60351942
    }
},
{
    name: {
        en: "Mexico",
        fi: "Meksiko"
    },
    id: "MEX",
    dataYear: 2025,
    risk: {
        corruption: 17.45,
        security: 3,
        academicFreedom: 0.706,
        politicalStability: 22.75,
        development: 81,
        GDPR: 3,
        sanctions: 1,
        ruleOfLaw: 0.40311297
    }
},
{
    name: {
        en: "Moldova",
        fi: "Moldova"
    },
    id: "MDA",
    dataYear: 2025,
    risk: {
        corruption: 46.7,
        security: 2,
        academicFreedom: 0.689,
        politicalStability: 20.38,
        development: 86,
        GDPR: 3,
        sanctions: 1,
        ruleOfLaw: 0.5304462
    }
},
{
    name: {
        en: "Mongolia",
        fi: "Mongolia"
    },
    id: "MNG",
    dataYear: 2025,
    risk: {
        corruption: 35.38,
        security: 3,
        academicFreedom: 0.671,
        politicalStability: 67.3,
        development: 104,
        GDPR: 3,
        sanctions: 1,
        ruleOfLaw: 0.53220495
    }
},
{
    name: {
        en: "Montenegro",
        fi: "Montenegro"
    },
    id: "MNE",
    dataYear: 2025,
    risk: {
        corruption: 51.89,
        security: 3,
        academicFreedom: 0.824,
        politicalStability: 48.82,
        development: 48,
        GDPR: 3,
        sanctions: 1,
        ruleOfLaw: 0.57089263
    }
},
{
    name: {
        en: "Morocco",
        fi: "Marokko"
    },
    id: "MAR",
    dataYear: 2025,
    risk: {
        corruption: 33.02,
        security: 3,
        academicFreedom: 0.481,
        politicalStability: 29.86,
        development: 120,
        GDPR: 3,
        sanctions: 1,
        ruleOfLaw: 0.4806151
    }
},
{
    name: {
        en: "Mozambique",
        fi: "Mosambik"
    },
    id: "MOZ",
    dataYear: 2025,
    risk: {
        corruption: 22.17,
        security: 3,
        academicFreedom: 0.408,
        politicalStability: 11.85,
        development: 182,
        GDPR: 3,
        sanctions: 1,
        ruleOfLaw: 0.37387315
    }
},
{
    name: {
        en: "Namibia",
        fi: "Namibia"
    },
    id: "NAM",
    dataYear: 2025,
    risk: {
        corruption: 58.96,
        security: 3,
        academicFreedom: 0.718,
        politicalStability: 63.51,
        development: 136,
        GDPR: 3,
        sanctions: 1,
        ruleOfLaw: 0.60877962
    }
},
{
    name: {
        en: "Nepal",
        fi: "Nepal"
    },
    id: "NPL",
    dataYear: 2025,
    risk: {
        corruption: 33.96,
        security: 3,
        academicFreedom: 0.831,
        politicalStability: 39.34,
        development: 145,
        GDPR: 3,
        sanctions: 1,
        ruleOfLaw: 0.5192691
    }
},
{
    name: {
        en: "Netherlands",
        fi: "Alankomaat"
    },
    id: "NLD",
    dataYear: 2025,
    risk: {
        corruption: 96.23,
        security: 3,
        academicFreedom: 0.763,
        politicalStability: 68.72,
        development: 8,
        GDPR: 1,
        sanctions: 1,
        ruleOfLaw: 0.8208597
    }
},
{
    name: {
        en: "New Zealand",
        fi: "Uusi-Seelanti"
    },
    id: "NZL",
    dataYear: 2025,
    risk: {
        corruption: 98.58,
        security: 3,
        academicFreedom: 0.847,
        politicalStability: 96.21,
        development: 17,
        GDPR: 2,
        sanctions: 1,
        ruleOfLaw: 0.83394471
    }
},
{
    name: {
        en: "Nicaragua",
        fi: "Nicaragua"
    },
    id: "NIC",
    dataYear: 2025,
    risk: {
        corruption: 7.08,
        security: 3,
        academicFreedom: 0.019,
        politicalStability: 42.18,
        development: 123,
        GDPR: 3,
        sanctions: 1,
        ruleOfLaw: 0.33124185
    }
},
{
    name: {
        en: "Niger",
        fi: "Niger"
    },
    id: "NER",
    dataYear: 2025,
    risk: {
        corruption: 31.6,
        security: 3,
        academicFreedom: 0.689,
        politicalStability: 8.53,
        development: 188,
        GDPR: 3,
        sanctions: 1,
        ruleOfLaw: 0.41672597
    }
},
{
    name: {
        en: "Nigeria",
        fi: "Nigeria"
    },
    id: "NGA",
    dataYear: 2025,
    risk: {
        corruption: 16.98,
        security: 3,
        academicFreedom: 0.876,
        politicalStability: 7.58,
        development: 164,
        GDPR: 3,
        sanctions: 1,
        ruleOfLaw: 0.40565446
    }
},
{
    name: {
        en: "North Korea",
        fi: "Pohjois-Korea"
    },
    id: "PRK",
    dataYear: 2025,
    risk: {
        corruption: 2.36,
        security: 3,
        academicFreedom: 0.036,
        politicalStability: 30.33,
        development: -1,
        GDPR: 3,
        sanctions: 1,
        ruleOfLaw: -1.0
    }
},
{
    name: {
        en: "North Macedonia",
        fi: "Pohjois-Makedonian tasavalta"
    },
    id: "MKD",
    dataYear: 2025,
    risk: {
        corruption: 42.45,
        security: 3,
        academicFreedom: 0.664,
        politicalStability: 51.18,
        development: 68,
        GDPR: 3,
        sanctions: 1,
        ruleOfLaw: 0.54133964
    }
},
{
    name: {
        en: "Norway",
        fi: "Norja"
    },
    id: "NOR",
    dataYear: 2025,
    risk: {
        corruption: 99.06,
        security: 3,
        academicFreedom: 0.854,
        politicalStability: 77.73,
        development: 2,
        GDPR: 1,
        sanctions: 1,
        ruleOfLaw: 0.89026255
    }
},
{
    name: {
        en: "Oman",
        fi: "Oman"
    },
    id: "OMN",
    dataYear: 2025,
    risk: {
        corruption: 60.85,
        security: 3,
        academicFreedom: 0.215,
        politicalStability: 65.88,
        development: 50,
        GDPR: 3,
        sanctions: 1,
        ruleOfLaw: -1.0
    }
},
{
    name: {
        en: "Pakistan",
        fi: "Pakistan"
    },
    id: "PAK",
    dataYear: 2025,
    risk: {
        corruption: 18.87,
        security: 3,
        academicFreedom: 0.268,
        politicalStability: 6.64,
        development: 168,
        GDPR: 3,
        sanctions: 1,
        ruleOfLaw: 0.37050436
    }
},
{
    name: {
        en: "Palestine/Gaza",
        fi: "Palestiina/Gaza"
    },
    id: "PSG",
    dataYear: 2025,
    risk: {
        corruption: 26.42,
        security: 3,
        academicFreedom: 0.105,
        politicalStability: 7.11,
        development: -1,
        GDPR: 3,
        sanctions: 1,
        ruleOfLaw: -1.0
    }
},
{
    name: {
        en: "Palestine/West Bank",
        fi: "Palestiina/Länsiranta"
    },
    id: "PSE",
    dataYear: 2025,
    risk: {
        corruption: 26.42,
        security: 3,
        academicFreedom: 0.347,
        politicalStability: 7.11,
        development: -1,
        GDPR: 3,
        sanctions: 1,
        ruleOfLaw: -1.0
    }
},
{
    name: {
        en: "Panama",
        fi: "Panama"
    },
    id: "PAN",
    dataYear: 2025,
    risk: {
        corruption: 28.3,
        security: 3,
        academicFreedom: 0.914,
        politicalStability: 52.61,
        development: 59,
        GDPR: 3,
        sanctions: 1,
        ruleOfLaw: 0.51866469
    }
},
{
    name: {
        en: "Papua New Guinea",
        fi: "Papua-Uusi-Guinea"
    },
    id: "PNG",
    dataYear: 2025,
    risk: {
        corruption: 27.36,
        security: 3,
        academicFreedom: 0.849,
        politicalStability: 27.01,
        development: 160,
        GDPR: 3,
        sanctions: 1,
        ruleOfLaw: -1.0
    }
},
{
    name: {
        en: "Paraguay",
        fi: "Paraguay"
    },
    id: "PRY",
    dataYear: 2025,
    risk: {
        corruption: 16.04,
        security: 3,
        academicFreedom: 0.703,
        politicalStability: 49.29,
        development: 99,
        GDPR: 3,
        sanctions: 1,
        ruleOfLaw: 0.453738
    }
},
{
    name: {
        en: "Peru",
        fi: "Peru"
    },
    id: "PER",
    dataYear: 2025,
    risk: {
        corruption: 25.47,
        security: 3,
        academicFreedom: 0.838,
        politicalStability: 24.17,
        development: 79,
        GDPR: 3,
        sanctions: 1,
        ruleOfLaw: 0.47656254
    }
},
{
    name: {
        en: "Philippines",
        fi: "Filippiinit"
    },
    id: "PHL",
    dataYear: 2025,
    risk: {
        corruption: 32.55,
        security: 3,
        academicFreedom: 0.589,
        politicalStability: 23.7,
        development: 117,
        GDPR: 3,
        sanctions: 1,
        ruleOfLaw: 0.46245548
    }
},
{
    name: {
        en: "Poland",
        fi: "Puola"
    },
    id: "POL",
    dataYear: 2025,
    risk: {
        corruption: 68.87,
        security: 3,
        academicFreedom: 0.864,
        politicalStability: 63.98,
        development: 35,
        GDPR: 1,
        sanctions: 1,
        ruleOfLaw: 0.66222978
    }
},
{
    name: {
        en: "Portugal",
        fi: "Portugali"
    },
    id: "PRT",
    dataYear: 2025,
    risk: {
        corruption: 74.06,
        security: 3,
        academicFreedom: 0.826,
        politicalStability: 70.62,
        development: 40,
        GDPR: 1,
        sanctions: 1,
        ruleOfLaw: 0.673841
    }
},
{
    name: {
        en: "Qatar",
        fi: "Qatar"
    },
    id: "QAT",
    dataYear: 2025,
    risk: {
        corruption: 75.0,
        security: 3,
        academicFreedom: 0.1,
        politicalStability: 84.36,
        development: 43,
        GDPR: 3,
        sanctions: 1,
        ruleOfLaw: 0.61698631
    }
},
{
    name: {
        en: "Republic of the Congo",
        fi: "Kongon Tasavalta"
    },
    id: "COG",
    dataYear: 2025,
    risk: {
        corruption: 8.02,
        security: 3,
        academicFreedom: 0.255,
        politicalStability: 46.92,
        development: -1,
        GDPR: 3,
        sanctions: 1,
        ruleOfLaw: 0.39952319
    }
},
{
    name: {
        en: "Romania",
        fi: "Romania"
    },
    id: "ROU",
    dataYear: 2025,
    risk: {
        corruption: 56.13,
        security: 3,
        academicFreedom: 0.754,
        politicalStability: 56.4,
        development: 55,
        GDPR: 1,
        sanctions: 1,
        ruleOfLaw: 0.61299215
    }
},
{
    name: {
        en: "Russia",
        fi: "Venäjä"
    },
    id: "RUS",
    dataYear: 2025,
    risk: {
        corruption: 15.57,
        security: 3,
        academicFreedom: 0.176,
        politicalStability: 13.27,
        development: -1,
        GDPR: 3,
        sanctions: 1,
        ruleOfLaw: 0.40731793
    }
},
{
    name: {
        en: "Rwanda",
        fi: "Ruanda"
    },
    id: "RWA",
    dataYear: 2025,
    risk: {
        corruption: 73.11,
        security: 3,
        academicFreedom: 0.097,
        politicalStability: 49.76,
        development: 159,
        GDPR: 3,
        sanctions: 1,
        ruleOfLaw: 0.6338727
    }
},
{
    name: {
        en: "Sao Tome and Principe",
        fi: "São Tomé ja Príncipe"
    },
    id: "STP",
    dataYear: 2025,
    risk: {
        corruption: -1.0,
        security: 3,
        academicFreedom: 0.636,
        politicalStability: -1.0,
        development: -1,
        GDPR: 3,
        sanctions: 1,
        ruleOfLaw: -1.0
    }
},
{
    name: {
        en: "Saudi Arabia",
        fi: "Saudi-Arabia"
    },
    id: "SAU",
    dataYear: 2025,
    risk: {
        corruption: 66.51,
        security: 3,
        academicFreedom: 0.066,
        politicalStability: 39.81,
        development: 37,
        GDPR: 3,
        sanctions: 1,
        ruleOfLaw: -1.0
    }
},
{
    name: {
        en: "Senegal",
        fi: "Senegal"
    },
    id: "SEN",
    dataYear: 2025,
    risk: {
        corruption: 56.6,
        security: 3,
        academicFreedom: 0.755,
        politicalStability: 41.23,
        development: 169,
        GDPR: 3,
        sanctions: 1,
        ruleOfLaw: 0.56109951
    }
},
{
    name: {
        en: "Serbia",
        fi: "Serbia"
    },
    id: "SRB",
    dataYear: 2025,
    risk: {
        corruption: 38.21,
        security: 3,
        academicFreedom: 0.598,
        politicalStability: 44.55,
        development: 62,
        GDPR: 3,
        sanctions: 1,
        ruleOfLaw: 0.46606863
    }
},
{
    name: {
        en: "Seychelles",
        fi: "Seychellit"
    },
    id: "SYC",
    dataYear: 2025,
    risk: {
        corruption: 93.87,
        security: 3,
        academicFreedom: 0.931,
        politicalStability: 73.93,
        development: 54,
        GDPR: 3,
        sanctions: 1,
        ruleOfLaw: -1.0
    }
},
{
    name: {
        en: "Sierra Leone",
        fi: "Sierra Leone"
    },
    id: "SLE",
    dataYear: 2025,
    risk: {
        corruption: 31.13,
        security: 3,
        academicFreedom: 0.862,
        politicalStability: 37.44,
        development: 185,
        GDPR: 3,
        sanctions: 1,
        ruleOfLaw: 0.43981985
    }
},
{
    name: {
        en: "Singapore",
        fi: "Singapore"
    },
    id: "SGP",
    dataYear: 2025,
    risk: {
        corruption: 98.11,
        security: 3,
        academicFreedom: 0.466,
        politicalStability: 97.16,
        development: 13,
        GDPR: 3,
        sanctions: 1,
        ruleOfLaw: 0.7833441
    }
},
{
    name: {
        en: "Slovakia",
        fi: "Slovakia"
    },
    id: "SVK",
    dataYear: 2025,
    risk: {
        corruption: 61.32,
        security: 3,
        academicFreedom: 0.807,
        politicalStability: 64.45,
        development: 44,
        GDPR: 1,
        sanctions: 1,
        ruleOfLaw: 0.64349895
    }
},
{
    name: {
        en: "Slovenia",
        fi: "Slovenia"
    },
    id: "SVN",
    dataYear: 2025,
    risk: {
        corruption: 77.36,
        security: 3,
        academicFreedom: 0.937,
        politicalStability: 75.83,
        development: 21,
        GDPR: 1,
        sanctions: 1,
        ruleOfLaw: 0.6834045
    }
},
{
    name: {
        en: "Solomon Islands",
        fi: "Salomonsaaret"
    },
    id: "SLB",
    dataYear: 2025,
    risk: {
        corruption: 50.47,
        security: 3,
        academicFreedom: 0.9,
        politicalStability: 60.66,
        development: 156,
        GDPR: 3,
        sanctions: 1,
        ruleOfLaw: -1.0
    }
},
{
    name: {
        en: "Somalia",
        fi: "Somalia"
    },
    id: "SOM",
    dataYear: 2025,
    risk: {
        corruption: 0.94,
        security: 3,
        academicFreedom: 0.494,
        politicalStability: 2.84,
        development: 192,
        GDPR: 3,
        sanctions: 1,
        ruleOfLaw: -1.0
    }
},
{
    name: {
        en: "Somaliland",
        fi: "Somalimaa"
    },
    id: "SML",
    dataYear: 2025,
    risk: {
        corruption: -1.0,
        security: 3,
        academicFreedom: 0.709,
        politicalStability: -1.0,
        development: -1,
        GDPR: 3,
        sanctions: 1,
        ruleOfLaw: -1.0
    }
},
{
    name: {
        en: "South Africa",
        fi: "Etelä-Afrikka"
    },
    id: "ZAF",
    dataYear: 2025,
    risk: {
        corruption: 45.75,
        security: 3,
        academicFreedom: 0.831,
        politicalStability: 20.85,
        development: 106,
        GDPR: 3,
        sanctions: 1,
        ruleOfLaw: 0.55944854
    }
},
{
    name: {
        en: "South Korea",
        fi: "Etelä-Korea"
    },
    id: "KOR",
    dataYear: 2025,
    risk: {
        corruption: 79.72,
        security: 3,
        academicFreedom: 0.85,
        politicalStability: 68.25,
        development: 20,
        GDPR: 2,
        sanctions: 1,
        ruleOfLaw: 0.74324292
    }
},
{
    name: {
        en: "South Sudan",
        fi: "Etelä-Sudan"
    },
    id: "SSD",
    dataYear: 2025,
    risk: {
        corruption: 0.0,
        security: 3,
        academicFreedom: 0.054,
        politicalStability: 3.79,
        development: 193,
        GDPR: 3,
        sanctions: 1,
        ruleOfLaw: -1.0
    }
},
{
    name: {
        en: "Spain",
        fi: "Espanja"
    },
    id: "ESP",
    dataYear: 2025,
    risk: {
        corruption: 71.7,
        security: 3,
        academicFreedom: 0.869,
        politicalStability: 54.98,
        development: 28,
        GDPR: 1,
        sanctions: 1,
        ruleOfLaw: 0.71060828
    }
},
{
    name: {
        en: "Sri Lanka",
        fi: "Sri Lanka"
    },
    id: "LKA",
    dataYear: 2025,
    risk: {
        corruption: 40.09,
        security: 3,
        academicFreedom: 0.828,
        politicalStability: 25.59,
        development: 89,
        GDPR: 3,
        sanctions: 1,
        ruleOfLaw: 0.51212724
    }
},
{
    name: {
        en: "Sudan",
        fi: "Sudan"
    },
    id: "SDN",
    dataYear: 2025,
    risk: {
        corruption: 4.25,
        security: 3,
        academicFreedom: 0.206,
        politicalStability: 1.9,
        development: 176,
        GDPR: 3,
        sanctions: 1,
        ruleOfLaw: 0.33694743
    }
},
{
    name: {
        en: "Suriname",
        fi: "Suriname"
    },
    id: "SUR",
    dataYear: 2025,
    risk: {
        corruption: 39.15,
        security: 3,
        academicFreedom: 0.828,
        politicalStability: 59.72,
        development: 114,
        GDPR: 3,
        sanctions: 1,
        ruleOfLaw: 0.49495845
    }
},
{
    name: {
        en: "Sweden",
        fi: "Ruotsi"
    },
    id: "SWE",
    dataYear: 2025,
    risk: {
        corruption: 97.64,
        security: 1,
        academicFreedom: 0.934,
        politicalStability: 73.46,
        development: 5,
        GDPR: 1,
        sanctions: 1,
        ruleOfLaw: 0.85227449
    }
},
{
    name: {
        en: "Switzerland",
        fi: "Sveitsi"
    },
    id: "CHE",
    dataYear: 2025,
    risk: {
        corruption: 97.17,
        security: 3,
        academicFreedom: 0.773,
        politicalStability: 88.63,
        development: 2,
        GDPR: 2,
        sanctions: 1,
        ruleOfLaw: -1.0
    }
},
{
    name: {
        en: "Syria",
        fi: "Syyria"
    },
    id: "SYR",
    dataYear: 2025,
    risk: {
        corruption: 0.47,
        security: 3,
        academicFreedom: 0.201,
        politicalStability: 0.0,
        development: 162,
        GDPR: 3,
        sanctions: 1,
        ruleOfLaw: -1.0
    }
},
{
    name: {
        en: "Taiwan",
        fi: "Taiwan"
    },
    id: "TWN",
    dataYear: 2025,
    risk: {
        corruption: -1.0,
        security: 3,
        academicFreedom: 0.828,
        politicalStability: -1.0,
        development: -1,
        GDPR: 3,
        sanctions: 1,
        ruleOfLaw: -1.0
    }
},
{
    name: {
        en: "Tajikistan",
        fi: "Tadžikistan"
    },
    id: "TJK",
    dataYear: 2025,
    risk: {
        corruption: 7.55,
        security: 3,
        academicFreedom: 0.082,
        politicalStability: 27.49,
        development: 128,
        GDPR: 3,
        sanctions: 1,
        ruleOfLaw: -1.0
    }
},
{
    name: {
        en: "Tanzania",
        fi: "Tansania"
    },
    id: "TZA",
    dataYear: 2025,
    risk: {
        corruption: 43.87,
        security: 3,
        academicFreedom: 0.515,
        politicalStability: 44.08,
        development: 165,
        GDPR: 3,
        sanctions: 1,
        ruleOfLaw: 0.46076398
    }
},
{
    name: {
        en: "Thailand",
        fi: "Thaimaa"
    },
    id: "THA",
    dataYear: 2025,
    risk: {
        corruption: 35.85,
        security: 3,
        academicFreedom: 0.382,
        politicalStability: 36.02,
        development: 76,
        GDPR: 3,
        sanctions: 1,
        ruleOfLaw: 0.5028867
    }
},
{
    name: {
        en: "The Gambia",
        fi: "Gambia"
    },
    id: "GMB",
    dataYear: 2025,
    risk: {
        corruption: 46.23,
        security: 3,
        academicFreedom: 0.821,
        politicalStability: 45.97,
        development: -1,
        GDPR: 3,
        sanctions: 1,
        ruleOfLaw: 0.48625897
    }
},
{
    name: {
        en: "Timor-Leste",
        fi: "Itä-Timor"
    },
    id: "TLS",
    dataYear: 2025,
    risk: {
        corruption: 47.64,
        security: 3,
        academicFreedom: 0.731,
        politicalStability: 54.5,
        development: 142,
        GDPR: 3,
        sanctions: 1,
        ruleOfLaw: -1.0
    }
},
{
    name: {
        en: "Togo",
        fi: "Togo"
    },
    id: "TGO",
    dataYear: 2025,
    risk: {
        corruption: 28.77,
        security: 3,
        academicFreedom: 0.609,
        politicalStability: 14.22,
        development: 161,
        GDPR: 3,
        sanctions: 1,
        ruleOfLaw: 0.43259211
    }
},
{
    name: {
        en: "Trinidad and Tobago",
        fi: "Trinidad ja Tobago"
    },
    id: "TTO",
    dataYear: 2025,
    risk: {
        corruption: 41.04,
        security: 3,
        academicFreedom: 0.414,
        politicalStability: 57.82,
        development: 72,
        GDPR: 3,
        sanctions: 1,
        ruleOfLaw: 0.51133836
    }
},
{
    name: {
        en: "Tunisia",
        fi: "Tunisia"
    },
    id: "TUN",
    dataYear: 2025,
    risk: {
        corruption: 42.92,
        security: 3,
        academicFreedom: 0.558,
        politicalStability: 22.27,
        development: 105,
        GDPR: 3,
        sanctions: 1,
        ruleOfLaw: 0.48982978
    }
},
{
    name: {
        en: "Turkmenistan",
        fi: "Turkmenistan"
    },
    id: "TKM",
    dataYear: 2025,
    risk: {
        corruption: 6.6,
        security: 3,
        academicFreedom: 0.064,
        politicalStability: 43.13,
        development: 95,
        GDPR: 3,
        sanctions: 1,
        ruleOfLaw: -1.0
    }
},
{
    name: {
        en: "Türkiye",
        fi: "Turkki"
    },
    id: "TUR",
    dataYear: 2025,
    risk: {
        corruption: 34.91,
        security: 3,
        academicFreedom: 0.088,
        politicalStability: 13.74,
        development: 51,
        GDPR: 3,
        sanctions: 1,
        ruleOfLaw: 0.40770137
    }
},
{
    name: {
        en: "Uganda",
        fi: "Uganda"
    },
    id: "UGA",
    dataYear: 2025,
    risk: {
        corruption: 16.51,
        security: 3,
        academicFreedom: 0.196,
        politicalStability: 19.43,
        development: 157,
        GDPR: 3,
        sanctions: 1,
        ruleOfLaw: 0.38402636
    }
},
{
    name: {
        en: "Ukraine",
        fi: "Ukraina"
    },
    id: "UKR",
    dataYear: 2025,
    risk: {
        corruption: 25.94,
        security: 3,
        academicFreedom: 0.281,
        politicalStability: 10.9,
        development: 87,
        GDPR: 3,
        sanctions: 1,
        ruleOfLaw: 0.48365439
    }
},
{
    name: {
        en: "United Arab Emirates",
        fi: "Yhdistyneet arabiemiirikunnat"
    },
    id: "ARE",
    dataYear: 2025,
    risk: {
        corruption: 82.55,
        security: 3,
        academicFreedom: 0.5,
        politicalStability: 70.14,
        development: 15,
        GDPR: 3,
        sanctions: 1,
        ruleOfLaw: 0.63984888
    }
},
{
    name: {
        en: "United Kingdom",
        fi: "Yhdistynyt kuningaskunta"
    },
    id: "GBR",
    dataYear: 2025,
    risk: {
        corruption: 90.57,
        security: 3,
        academicFreedom: 0.668,
        politicalStability: 62.09,
        development: 13,
        GDPR: 3,
        sanctions: 1,
        ruleOfLaw: 0.78447329
    }
},
{
    name: {
        en: "United States of America",
        fi: "Yhdysvallat"
    },
    id: "USA",
    dataYear: 2025,
    risk: {
        corruption: 83.02,
        security: 1,
        academicFreedom: 0.397,
        politicalStability: 47.39,
        development: -1,
        GDPR: 2,
        sanctions: 1,
        ruleOfLaw: 0.67977332
    }
},
{
    name: {
        en: "Uruguay",
        fi: "Uruguay"
    },
    id: "URY",
    dataYear: 2025,
    risk: {
        corruption: 92.45,
        security: 3,
        academicFreedom: 0.91,
        politicalStability: 81.99,
        development: 48,
        GDPR: 2,
        sanctions: 1,
        ruleOfLaw: 0.71827858
    }
},
{
    name: {
        en: "Uzbekistan",
        fi: "Uzbekistan"
    },
    id: "UZB",
    dataYear: 2025,
    risk: {
        corruption: 23.11,
        security: 3,
        academicFreedom: 0.248,
        politicalStability: 40.76,
        development: 107,
        GDPR: 3,
        sanctions: 1,
        ruleOfLaw: 0.49687625
    }
},
{
    name: {
        en: "Vanuatu",
        fi: "Vanuatu"
    },
    id: "VUT",
    dataYear: 2025,
    risk: {
        corruption: 53.77,
        security: 3,
        academicFreedom: 0.909,
        politicalStability: 81.04,
        development: 146,
        GDPR: 3,
        sanctions: 1,
        ruleOfLaw: -1.0
    }
},
{
    name: {
        en: "Venezuela",
        fi: "Venezuela"
    },
    id: "VEN",
    dataYear: 2025,
    risk: {
        corruption: 1.42,
        security: 3,
        academicFreedom: 0.129,
        politicalStability: 12.32,
        development: 121,
        GDPR: 3,
        sanctions: 1,
        ruleOfLaw: 0.25974105
    }
},
{
    name: {
        en: "Vietnam",
        fi: "Vietnam"
    },
    id: "VNM",
    dataYear: 2025,
    risk: {
        corruption: 38.68,
        security: 3,
        academicFreedom: 0.222,
        politicalStability: 45.02,
        development: -1,
        GDPR: 3,
        sanctions: 1,
        ruleOfLaw: 0.49549633
    }
},
{
    name: {
        en: "Yemen",
        fi: "Jemen"
    },
    id: "YEM",
    dataYear: 2025,
    risk: {
        corruption: 1.89,
        security: 3,
        academicFreedom: 0.24,
        politicalStability: 0.95,
        development: 184,
        GDPR: 3,
        sanctions: 1,
        ruleOfLaw: -1.0
    }
},
{
    name: {
        en: "Zambia",
        fi: "Sambia"
    },
    id: "ZMB",
    dataYear: 2025,
    risk: {
        corruption: 36.79,
        security: 3,
        academicFreedom: 0.844,
        politicalStability: 52.13,
        development: 154,
        GDPR: 3,
        sanctions: 1,
        ruleOfLaw: 0.44991896
    }
},
{
    name: {
        en: "Zanzibar",
        fi: "Sansibar"
    },
    id: "ZZB",
    dataYear: 2025,
    risk: {
        corruption: -1.0,
        security: 3,
        academicFreedom: 0.316,
        politicalStability: -1.0,
        development: -1,
        GDPR: 3,
        sanctions: 1,
        ruleOfLaw: -1.0
    }
},
{
    name: {
        en: "Zimbabwe",
        fi: "Zimbabwe"
    },
    id: "ZWE",
    dataYear: 2025,
    risk: {
        corruption: 9.91,
        security: 3,
        academicFreedom: 0.157,
        politicalStability: 15.17,
        development: 153,
        GDPR: 3,
        sanctions: 1,
        ruleOfLaw: -1.0
    }
}
]
