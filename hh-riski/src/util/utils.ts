import type { Country, CountryRaw } from "../types";

//Artificial delay for async simulations
export async function delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

//Sort an array of elements that have language dependant names
export function sortElements(elements: any, language: 'fi' | 'en') {
    const sortedElements = elements.sort((a: any, b: any) => {
        if (a.name[language] > b.name[language]) return 1
        if (a.name[language] < b.name[language]) return -1
        return 0
    })

    return sortedElements;
}

//Generate 1-3 risk calculation from raw country data
export function parseCountries(countriesRaw: CountryRaw[]) {
    const countries = [];
    for (let i = 0; i < countriesRaw.length; i++) {
        countries.push(parseCountry(countriesRaw[i]))
    }
    return countries;
}

export function parseCountry(countryRaw: CountryRaw) {
    let overall: 0 | 1 | 2 | 3 = 0;
    let corruption: 0 | 1 | 2 | 3 = 0;
    if (countryRaw.risk.corruption > 66.666) {
        corruption = 1;
    } else if (countryRaw.risk.corruption <= 66.666 && countryRaw.risk.corruption > 33.333) {
        corruption = 2;
    } else if (countryRaw.risk.corruption <= 33.333) {
        corruption = 3;
    }
    let academic: 0 | 1 | 2 | 3 = 0;
    if (countryRaw.risk.academicFreedom > 0.66) {
        academic = 1;
    } else if (countryRaw.risk.academicFreedom > 0.33 && countryRaw.risk.academicFreedom <= 0.66) {
        academic = 2;
    } else if (countryRaw.risk.academicFreedom <= 0.33) {
        academic = 3;
    }
    let political: 0 | 1 | 2 | 3 = 0;
    if (countryRaw.risk.politicalStability > 66.666) {
        political = 1;
    } else if (countryRaw.risk.politicalStability <= 66.666 && countryRaw.risk.politicalStability > 33.333) {
        political = 2;
    } else if (countryRaw.risk.politicalStability <= 33.333) {
        political = 3;
    }
    let development: 0 | 1 | 2 | 3 = 0;
    if (countryRaw.risk.development >= 1 && countryRaw.risk.development <= 64) {
        development = 1;
    } else if (countryRaw.risk.development >= 65 && countryRaw.risk.development <= 128) {
        development = 2;
    } else if (countryRaw.risk.development >= 129) {
        development = 3;
    }
    let gdpr: 0 | 1 | 2 | 3 = 0; //placeholder
    if (countryRaw.risk.GDPR) {
        gdpr = 1;
    } else {
        gdpr = 2;
    }
    let sanctions: 0 | 1 | 2 | 3 = 0;
    if (!countryRaw.risk.sanctions) {
        sanctions = 1;
    } else {
        sanctions = 3;
    }
    let law: 0 | 1 | 2 | 3 = 0;
    if (countryRaw.risk.ruleOfLaw >= 0.7) {
        law = 1;
    } else if (countryRaw.risk.ruleOfLaw >= 0.45 && countryRaw.risk.ruleOfLaw < 0.7) {
        law = 2;
    } else if (countryRaw.risk.ruleOfLaw < 0.45) {
        law = 3;
    }
    if (law != 0 || development != 0 || political != 0 || academic != 0 || corruption != 0) {
        const roundedAverage = Math.round((corruption + countryRaw.risk.security + academic + political + development + gdpr + sanctions + law) / 8)
        if (roundedAverage === 1 || roundedAverage === 2 || roundedAverage === 3) {
            overall = roundedAverage;
        }
    }
    const country: Country = {
        id: countryRaw.id,
        name: {
            fi: countryRaw.name.fi,
            en: countryRaw.name.en
        },
        risk: {
            overall: overall,
            corruption: corruption,
            security: countryRaw.risk.security,
            academicFreedom: academic,
            politicalStability: political,
            development: development,
            GDPR: gdpr,
            sanctions: sanctions,
            ruleOfLaw: law
        }
    }

    return country;
}