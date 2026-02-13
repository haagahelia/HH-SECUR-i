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