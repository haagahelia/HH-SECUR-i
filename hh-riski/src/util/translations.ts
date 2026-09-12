export const i18n = {
    fi: {
        login: {
            incorrectError: "Virheellinen käyttäjänimi tai salasana.",
            serviceError: "Kirjautumispalvelu ei ole käytettävissä. Yritä myöhemmin uudelleen.",
            loginFail: "Kirjautuminen epäonnistui."
        },

        formValidation: {
            projectName: {
                required: "Projektin nimi on pakollinen",
                atLeast: "Projektin nimessä on oltava vähintään 3 merkkiä",
                orLess: "Projektin nimessä saa olla enintään 100 merkkiä"
            },
            selectedCountry: {
                required: "Maa on pakollinen"
            },
            selectedOrganization: {
                required: "Organisaatio on pakollinen"
            },
            hhRole: {
                required: "Haaga-Helian rooli on pakollinen"
            },
            consortium: {
                required: "Konsortio on pakollinen"
            },
            history: {
                required: "Yhteistyöhistoria on pakollinen"
            },
            organizationType: {
                required: "Organisaatiotyyppi on pakollinen"
            },
            contractStatus: {
                required: "Sopimustiedot on pakolliset"
            },
            funding: {
                required: "Rahoitus on pakollinen"
            },
            liability: {
                required: "Vastuut on pakolliset"
            },
            personalInformation: {
                required: "Henkilötiedot ovat pakolliset"
            },
            dualUse: {
                required: "Kaksikäyttöisyys on pakollinen"
            },
            ethics: {
                required: "Eettinen arviointi on pakollinen"
            },
            duration: {
                required: "Kesto on pakollinen"
            },
            cooperationType: {
                required: "Valitse vähintään yksi yhteistyön tyyppi"
            },
            projectDescription: {
                atLeast: "Lisätiedoissa on oltava vähintään 10 merkkiä",
                orLess: "Lisätiedoissa saa olla enintään 1000 merkkiä"
            },
            fields: {
                needsAttention: (amount: number) => `${amount} kenttä${amount === 1 ? "" : "ä"} vaatii korjausta.`
            }

        }
    },
    en: {
        login: {
            incorrectError: "Incorrect username or password.",
            serviceError: "The login service is unavailable. Please try again later.",
            loginFail: "Sign in failed."
        },
        
        formValidation: {
            projectName: {
                required: "Project name is required",
                atLeast: "Project name must be at least 3 characters",
                orLess: "Project name must be 100 characters or less",
            },
            selectedCountry: {
                required: "Country is required"
            },
            selectedOrganization: {
                required: "Organization is required"
            },
            hhRole: {
                required: "HH role is required"
            },
            consortium: {
                required: "Consortium is required"
            },
            history: {
                required: "History is required"
            },
            organizationType: {
                required: "Organization type is required"
            },
            contractStatus: {
                required: "Contract status is required"
            },
            funding: {
                required: "Funding is required"
            },
            liability: {
                required: "Liability is required"
            },
            personalInformation: {
                required: "Personal information is required"
            },
            dualUse: {
                required: "Dual use is required"
            },
            ethics: {
                required: "Ethics is required"
            },
            duration: {
                required: "Duration is required"
            },
            cooperationType: {
                required: "Select at least one cooperation type"
            },
            projectDescription: {
                atLeast: "Additional information must be at least 10 characters",
                orLess:  "Additional information must be 1000 characters or less"
            },
            fields: {
                needsAttention: (amount: number) => `${amount} field${amount === 1 ? "" : "s"} need${amount === 1 ? "s" : ""} attention.`
            }
        }
    },
}

