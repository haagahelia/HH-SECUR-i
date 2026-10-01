
import type { Country, CountryApiResponse, Organization, Question, User } from "../types";

const backendUrl = import.meta.env.VITE_BACKEND_URL || 'https://hh-secur-be-git-main-hh-secur-i-backend.2.rahtiapp.fi';

export const fetchOrganizations = async (token: string): Promise<Organization[]> => {
    const response = await fetch(`${backendUrl}/organizations`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    if (!response.ok) {
        throw new Error(`ORGANIZATIONS_REQUEST_FAILED_${response.status}`);
    }

    const data: { organizations?: Organization[] } = await response.json();
    return data.organizations ?? [];
}

export const fetchUsers = async (token: string): Promise<User[]> => {
    const response = await fetch(`${backendUrl}/users`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    if (!response.ok) {
        throw new Error(`USERS_REQUEST_FAILED_${response.status}`);
    }

    const data: { users?: User[] } = await response.json();
    return data.users ?? [];
}
export const fetchCountries = async (token: string): Promise<Country[]> => {
    const response = await fetch(`${backendUrl}/countries`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    if (!response.ok) {
        throw new Error(`COUNTRIES_REQUEST_FAILED_${response.status}`);
    }

    const data: { countries?: CountryApiResponse[] } = await response.json();

    return (data.countries ?? []).map((country) => ({
        id: country.code,
        name: {
            fi: country.fi,
            en: country.en,
        },
    }));
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
                id: "option1",
                fi: "Yhteistyön koordinaattori",
                en: "Collaboration Coordinator"
            },
            {
                id: "option2",
                fi: "Kumppani tai tasaveroinen partneri",
                en: "Partner"
            },
            {
                id: "option3",
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
            en: "Composition of the Collaboration Consortium"
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
            en: "Has there been previous successful cooperation with the organization?"
        },
        answers: [
            {
                id: "option1",
                fi: "Kyllä",
                en: "Yes"
            },
            {
                id: "option2",
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
                id: "option1",
                fi: "Yliopisto",
                en: "University"
            },
            {
                id: "option2",
                fi: "Muu tutkimuslaitos",
                en: "Other Research Institute"
            },
            {
                id: "option3",
                fi: "Yritys",
                en: "Company"
            },
            {
                id: "option4",
                fi: "Kansalaisjärjestö",
                en: "Non-Governmental Organization"
            },
            {
                id: "option5",
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
                id: "option1",
                fi: "Kyllä",
                en: "Yes"
            },
            {
                id: "option2",
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
                id: "option1",
                fi: "Kyllä",
                en: "Yes"
            },
            {
                id: "option2",
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
                id: "option1",
                fi: "0-20.000",
                en: "0-20.000"
            },
            {
                id: "option2",
                fi: "20.000-50.000",
                en: "20.000-50.000"
            },
            {
                id: "option3",
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
            fi: "Onko mahdollista, että yhteistyössä siirretään henkilötietoja yhteistyökumppaneille?",
            en: "Is it possible that personal data will be transferred to the partner organization during the collaboration?"
        },
        answers: [
            {
                id: "option1",
                fi: "Kyllä",
                en: "Yes"
            },
            {
                id: "option2",
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
                id: "option1",
                fi: "Kyllä",
                en: "Yes"
            },
            {
                id: "option2",
                fi: "Ei",
                en: "No"
            },
            {
                id: "option3",
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
                id: "option1",
                fi: "Ei missään tapauksessa",
                en: "Absolutely not"
            },
            {
                id: "option2",
                fi: "Melko varmasti ei",
                en: "Most likely not"
            },
            {
                id: "option3",
                fi: "Ehkä",
                en: "Possibly"
            },
            {
                id: "option4",
                fi: "Melko varmasti",
                en: "Very likely"
            },
            {
                id: "option5",
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
                id: "option1",
                fi: "0-24 kk",
                en: "0-24 months"
            },
            {
                id: "option2",
                fi: "24-60 kk",
                en: "24-60 months"
            },
            {
                id: "option3",
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
                en: "Research Collaboration"
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