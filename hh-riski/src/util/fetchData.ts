
import { delay } from "./utils";
import type { Country, CountryRaw, Question } from "../types";

//Temporary data sources
/*
const countries: Country[] = [{
    id: 'fi',
    name: {
        fi: 'Suomi',
        en: 'Finland'
    },
    risk: { //placeholder values
        corruption: 1,
        security: 1,
        academicFreedom: 1,
        politicalStability: 1,
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
        politicalStability: 1,
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
        politicalStability: 1,
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
        politicalStability: 3,
        development: 3,
        GDPR: 3,
        sanctions: 2,
        ruleOfLaw: 3
    },

}

]
*/
const countriesRaw: CountryRaw[] = [
    {
        id: 'swe',
        name: {
            fi: 'Ruotsi',
            en: 'Sweden'
        },
        risk: {
            corruption: 97.64151,
            security: 1,
            academicFreedom: 0.94,
            politicalStability: 73.459717,
            development: 5,
            GDPR: true,
            sanctions: false,
            ruleOfLaw: 0.85
        }
    },
    {
        id: 'usa',
        name: {
            fi: 'Yhdysvallat',
            en: 'United States'
        },
        risk: {
            corruption: 83.018867,
            security: 1,
            academicFreedom: 0.684,
            politicalStability: 47.393364,
            development: 17,
            GDPR: false,
            sanctions: false,
            ruleOfLaw: .68
        }
    },

    {
        id: 'mda',
        name: {
            fi: 'Moldova',
            en: 'Moldova'
        },
        risk: {
            corruption: 46.698112,
            security: 2,
            academicFreedom: 0.708,
            politicalStability: 20.379147,
            development: 86,
            GDPR: false,
            sanctions: true,
            ruleOfLaw: 0.53
        }
    },

        {
        id: 'chn',
        name: {
            fi: 'Kiina',
            en: 'China'
        },
        risk: {
            corruption: 54.245281,
            security: 1,
            academicFreedom: 0.067,
            politicalStability: 25.118483,
            development: 78,
            GDPR: false,
            sanctions: true,
            ruleOfLaw: 0.48
        }
    },
]

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
    countryId: "swe",
    name: {
      fi: "Halmstadin yliopisto",
      en: "Halmstad University",
    },
    type: "university",
  },
  {
    id: "stockholm",
    countryId: "swe",
    name: {
      fi: "Tukholman yliopisto",
      en: "Stockholm University",
    },
    type: "university",
  },
  {
    id: "harvard",
    countryId: "usa",
    name: {
      fi: "Harvardin yliopisto",
      en: "Harvard University",
    },
    type: "university",
  },
  {
    id: "mit",
    countryId: "usa",
    name: {
      fi: "MIT",
      en: "MIT",
    },
    type: "university",
  },
  {
    id: "moldova-state",
    countryId: "mda",
    name: {
      fi: "Moldovan valtionyliopisto",
      en: "Moldova State University",
    },
    type: "university",
  },
  {
    id: "peking",
    countryId: "chn",
    name: {
      fi: "Pekingin yliopisto",
      en: "Peking University",
    },
    type: "university",
  },
  {
    id: "tsinghua",
    countryId: "chn",
    name: {
      fi: "Tsinghuan yliopisto",
      en: "Tsinghua University",
    },
    type: "university",
  },
];

/* const organizations = [
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
        countryId: 'swe',
        name: {
            fi: 'Halmstadin Yliopisto',
            en: 'University of Halmstad'
        }
    },
    {
        id: 'TY',
        countryId: 'swe',
        name: {
            fi: 'Tukholman Yliopisto',
            en: 'University of Stockholm'
        }
    }
] */

//Change to async with simulated delay once FormPage lists have been updated to support that
/*
export const fetchCountries = () => {
    //delay(Math.floor((Math.random() * 1750) + 250));
    return countries;
}
*/
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