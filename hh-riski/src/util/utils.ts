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

//Parse a list of countries
export function parseCountries(countriesRaw: CountryRaw[], personal: string) {
    const countries = [];
    for (let i = 0; i < countriesRaw.length; i++) {
        countries.push(parseCountry(countriesRaw[i], personal))
    }
    return countries;
}

//Generate 1-3 risk calculation from raw country data
export function parseCountry(countryRaw: CountryRaw, personal: string) {
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
    let gdpr: 0 | 1 | 2 | 3 = 0;
    if (personal === "no" || countryRaw.risk.GDPR === 1) {
        gdpr = 1;
    } else if (personal !== "no" && countryRaw.risk.GDPR === 2) {
        gdpr = 2;
    } else if (personal !== "no" && countryRaw.risk.GDPR === 3) {
        gdpr = 3
    }
    let sanctions: 0 | 1 | 2 | 3 = 0;
    if (countryRaw.risk.sanctions == 1) {
        sanctions = 1;
    } else if (countryRaw.risk.sanctions == 3) {
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

//Calculate overall collaboration risk
//WIP: Currently has security and sanctions multipliers implemented
//TODO: refer to risk calculation documentation and implement the rest
export function calculateCollaborationRisk(country: Country | undefined, cooperationType: string[]): 0 | 1 | 2 | 3 {
    if (!country) {
        return 0;
    } else if (country.risk.sanctions === 3) { //sanctioned countries trigger automatic overall risk rating of 3
        return 3
    }
    let securityMultiplier = 1;
    let sanctionsMultiplier = 1;
    for (let i = 0; i < cooperationType.length; i++) {
        if (cooperationType[i] === "option1") {
            sanctionsMultiplier = 1.5;
        }
        if (cooperationType[i] === "option4" || cooperationType[i] === "option5" && country.risk.security > 1) {
            securityMultiplier = 1.5;
        }
    }
    const sanctions = country.risk.sanctions * sanctionsMultiplier;
    const security = country.risk.security * securityMultiplier;

    const average = (sanctions + security + country.risk.corruption + country.risk.academicFreedom + country.risk.politicalStability + country.risk.development + country.risk.GDPR + country.risk.ruleOfLaw) / 8;
    let roundedAverage = Math.round(average) as 0 | 1 | 2 | 3;

    if (average > 3) roundedAverage = 3;
    if (average < 1) roundedAverage = 0;

    return roundedAverage;
}

//Calcultes risk for dualUse
export function calculateDualUse(dualUse: string): 0 | 1 | 2 | 3 {
    let dualUseRisk = 0 as 0 | 1 | 2 | 3

    if (dualUse === "no") {
        dualUseRisk = 1
    } else if (dualUse === "unknown") {
        dualUseRisk = 2
    } else if (dualUse === "yes") {
        dualUseRisk = 3
    }

    return dualUseRisk
}

//Calculates risk for ethical issues
export function calculateEthics(ethics: string): 0 | 1 | 2 | 3 {
    let ethicsRisk = 0 as 0 | 1 | 2 | 3;
    if (ethics === "1") {
        ethicsRisk = 1;
    } else if (ethics === "2" || ethics === "3") {
        ethicsRisk = 2;
    } else if (ethics === "4" || ethics === "5") {
        ethicsRisk = 3;
    }

    return ethicsRisk;
}

//Calculates financial scope risk
export function calculateFinancialScope(financial: string): 0 | 1 | 2 | 3 {
    let scope = 0 as 0 | 1 | 2 | 3;
    if (financial === "0") {
        scope = 1;
    } else if (financial === "20.000") {
        scope = 2;
    } else if (financial === "50.000") {
        scope = 3;
    }
    return scope;
}

//Calculates overall financial risk
//WIP: currently gives simple average of financial scope and exchange
export function calculateFinancialOverall(scope: number, exchange: number): 0 | 1 | 2 | 3 {

    let overall = (scope + exchange) / 2;
    if (overall < 1) {
        overall = 0;
    } else if (overall > 3) {
        overall = 3
    }
    const roundedOverall = Math.round(overall) as 0 | 1 | 2 | 3

    return roundedOverall;
}