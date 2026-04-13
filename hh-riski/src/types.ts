export type User = {
    id: string
    username: string
    isAdmin: boolean
}

export type Country = {
    id: string
    name: {
        fi: string
        en: string
    },
    risk: {
        corruption: 1 | 2 | 3,
        security: 1 | 2 | 3,
        academicFreedom: 1 | 2 | 3,
        development: 1 | 2 | 3,
        GDPR: 1 | 2 | 3,
        sanctions: 1 | 2 | 3,
        ruleOfLaw: 1 | 2 | 3
    }
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