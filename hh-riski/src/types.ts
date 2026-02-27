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
        corruption: number,
        security: number,
        academicFreedom: number,
        development: number,
        GDPR: number,
        sanctions: number,
        ruleOfLaw: number
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