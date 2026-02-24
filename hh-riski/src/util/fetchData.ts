
import { delay } from "./utils";

//Temporary data sources
const countries = [{
    id: 'fin',
    name: {
        fi: 'Suomi',
        en: 'Finland'
    },

},
{
    id: 'swe',
    name: {
        fi: 'Ruotsi',
        en: 'Sweden'
    }
}]

const organizations = [
    {
        id: 'HH',
        countryId: 'fin',
        name: {
            fi: 'Haaga-Helia Ammattikorkeakoulu',
            en: 'Haaga-Helia University of Applied Sciences'
        }
    },
    {
        id: 'HY',
        countryId: 'fin',
        name: {
            fi: 'Helsingin Yliopisto',
            en: 'University of Helsinki'
        }
    },
    {
        id: 'HaY',
        countryId: 'swe',
        name: {
            fi: 'Halmstadin Yliopisto',
            en: 'University of Halmstad'
        }
    },
    {
        id: 'TY',
        countryId: 'swe',
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