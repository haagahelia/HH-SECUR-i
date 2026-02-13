import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

import { useCurrentUser } from "../context/UserContext"

import type { Country } from "../types";

//Temporary data sources for initial UI development
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
const languages = [
    {
        id: 'fi',
        name:
        {
            fi: 'Suomi',
            en: 'Finnish'
        }
    },
    {
        id: 'en',
        name:
        {
            fi: 'Englanti',
            en: 'English'
        }
    }
]

const FormPage = () => {
    const { user, clearUser } = useCurrentUser();
    const [selectedCountry, setSelectedCountry] = useState('fin');
    const [selectedOrganization, setSelectedOrganization] = useState('');
    const [selectedLanguage, setSelectedLanguage] = useState('fi');

    useEffect

    return (
        <>
            <div>
                {user && <p>Logged in as {user.username}</p>}
                {user && <button onClick={clearUser}>Logout</button>}
            </div>
            <div>
                <Link to="/">Home</Link>
                <Link to="/user">User Page</Link>
            </div>
            <div>
                <h1>Form Page</h1>
                <div>
                    <select
                        value={selectedLanguage}
                        onChange={e => setSelectedLanguage(e.target.value)}
                    >
                        {selectedLanguage == 'fi' ?
                            languages.map((language) => (
                                <option value={language.id}>{language.name.fi}</option>
                            ))
                            :
                            languages.map((language) => (
                                <option value={language.id}>{language.name.en}</option>
                            ))}
                    </select>
                </div>
                {user ? 
                <div>
                    <h1>Maa</h1>
                    <select
                        value={selectedCountry}
                        onChange={e => setSelectedCountry(e.target.value)}
                    >
                        {selectedLanguage == 'fi' ?
                            countries.map((country) => (
                                <option value={country.id}>{country.name.fi}</option>
                            ))
                            :
                            countries.map((country) => (
                                <option value={country.id}>{country.name.en}</option>
                            ))}
                    </select>
                </div>
                :
                <div></div>
                }
                {user ? 
                <div>
                    <h1>Organisaatio</h1>
                    <select
                        value={selectedOrganization}
                        onChange={e => setSelectedOrganization(e.target.value)}
                    >
                        {selectedLanguage == 'fi' ?
                            organizations.map((organization) => {
                                if (organization.countryId == selectedCountry) {
                                    return <option value={organization.id}>{organization.name.fi}</option>
                                }
                            })
                            :
                            organizations.map((organization) => {
                                if (organization.countryId == selectedCountry) {
                                    return <option value={organization.id}>{organization.name.en}</option>
                                }
                            })
                        }
                    </select>
                </div>
                :
                <div></div>
                }
            </div>

        </>
    )
}

export default FormPage