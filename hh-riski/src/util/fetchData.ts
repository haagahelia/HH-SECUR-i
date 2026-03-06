
import { delay } from "./utils";

//Temporary data sources
const countries = [{
    id: 'fi',
    name: {
        fi: 'Suomi',
        en: 'Finland'
    },
    risk: { //placeholder values
        corruption: 1,
        security: 1,
        academicFreedom: 1,
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
        development: 1,
        GDPR: 1,
        sanctions: 1,
        ruleOfLaw: 1
    }
},
{
    id: 'yy',
    name: {
        fi: 'Ruotsi',
        en: 'Sweden'
    },
    risk: { //placeholder values
        corruption: 1,
        security: 1,
        academicFreedom: 1,
        development: 1,
        GDPR: 1,
        sanctions: 1,
        ruleOfLaw: 1
    },

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
        development: 3,
        GDPR: 3,
        sanctions: 2,
        ruleOfLaw: 3
    },

}

]

const organizations = [
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
        countryId: 'se',
        name: {
            fi: 'Halmstadin Yliopisto',
            en: 'University of Halmstad'
        }
    },
    {
        id: 'TY',
        countryId: 'se',
        name: {
            fi: 'Tukholman Yliopisto',
            en: 'University of Stockholm'
        }
    }
]

//Change to async with simulated delay once FormPage lists have been updated to support that
export const fetchCountries = () => {
    //delay(Math.floor((Math.random() * 1750) + 250));
    return countries;
}

//Change to async with simulated delay once FormPage lists have been updated to support that
export const fetchOrganizations = () => {
    //delay(Math.floor((Math.random() * 1750) + 250));
    return organizations;
}