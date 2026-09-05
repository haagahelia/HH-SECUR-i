export type User = { 
    // id: string, 
    username: string, 
    // password: string 
    // isAdmin: boolean
}

export type Country = {
    id: string
    name: {
        fi: string
        en: string
    },
    risk: {
        overall: 0 | 1 | 2 | 3, 
        corruption: 0 | 1 | 2 | 3,
        security: 0 | 1 | 2 | 3,
        academicFreedom: 0 | 1 | 2 | 3,
        politicalStability: 0 |1 | 2 | 3, 
        development: 0 | 1 | 2 | 3,
        GDPR: 0 | 1 | 2 | 3,
        sanctions: 0 |1 | 2 | 3,
        ruleOfLaw: 0 | 1 | 2 | 3
    }
}

export type CountryRaw = {
        id: string
    name: {
        fi: string
        en: string
    },
    risk: {
        corruption: number,
        security: 1 | 2 | 3,
        academicFreedom: number,
        politicalStability: number, 
        development: number,
        GDPR: number,
        sanctions: number,
        ruleOfLaw: number
    },
    dataYear: number
}

export type Organization = {
    id: string
    name: {
        fi: string
        en: string
    }
    countryId: string
}

export type Question = {
    question: {
        id: string,
        fi: string,
        en: string
    },
    answers: {id: string, fi: string, en:string} []
}