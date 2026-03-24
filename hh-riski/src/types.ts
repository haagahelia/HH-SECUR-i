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

export type SingleChoiceQuestion = {
    question: {
        id: string,
        fi: string,
        en: string
    },
    answers: {id: string, fi: string, en:string} []
}

const questionData = {
    question: {
        id: "example",
        fi: "Toimiiko?",
        en: "Works?"
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