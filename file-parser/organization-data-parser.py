import json
import csv


class Organization:
    def __init__(self, code, en, fi, country):
        self.code = code
        self.en = en
        self.fi = fi
        self.country = country

    def to_dict(self):
        return {
            "code": self.code,
            "en": self.en,
            "fi": self.fi,
            "country": self.country,
        }


class Country:
    def __init__(self, name, code):
        self.name = name
        self.code = code

    def to_dict(self):
        return {"name": self.name, "code": self.code}


countryDict = {}


def generateMissingCountriesList(missingCountries):
    try:
        open("missingCountries.csv", "x")
    except FileExistsError:
        print("missingCountries.csv present")

    try:
        missingCountriesFile = open("missingCountries.csv", "w")
        for country in missingCountries:
            missingCountriesFile.write(country + "\n")
    except FileExistsError:
        print("missingCountries.csv could not be opened")


def translateCountryName(name):
    if name == "Andorra":
        return ""
    if name == "Aruba":
        return ""
    if name == "Bahamas":
        return ""
    if name == "Belize":
        return ""
    if name == "Bolivia (Plurinational State of)":
        return "BOL"
    if name == "Brunei Darussalam":
        return ""
    if name == "Cabo Verde":
        return "CPV"
    if name == "China - Hong Kong SAR":
        return "HKG"
    if name == "China - Macao SAR":
        return ""
    if name == "China - Taiwan":
        return "TWN"
    if name == "Congo":
        return "COG"
    if name == "Congo (Democratic Republic)":
        return "COD"
    if name == "Côte d'Ivoire":
        return "CIV"
    if name == "Curaçao":
        return ""
    if name == "Gambia (The)":
        return "GMB"
    if name == "Holy See":
        return ""
    if name == "Iran (Islamic Republic of)":
        return "IRN"
    if name == "Korea (Democratic People's Republic of)":
        return "PRK"
    if name == "Korea (Republic of)":
        return "KOR"
    if name == "Lao People's Democratic Republic":
        return "LAO"
    if name == "Liechtenstein":
        return ""
    if name == "Monaco":
        return ""
    if name == "Myanmar":
        return "MMR"
    if name == "North Macedonia (Republic of)":
        return "MKD"
    if name == "Palestine":
        return "PSE"
    if name == "Russian Federation":
        return "RUS"
    if name == "Samoa":
        return ""
    if name == "Slovak Republic":
        return "SVK"
    if name == "Syrian Arab Republic":
        return "SYR"
    if name == "Türkiye":
        return "TUR"
    if name == "Venezuela (Bolivarian Republic of)":
        return "VEN"
    return ""


try:
    countriesRaw = open("countryCodes.csv", "r")
    countryLine = countriesRaw.readline()
    while countryLine != "":
        countryLineSplit = countryLine.split(",")
        if countryLineSplit[0] != "name":
            countryDict[countryLineSplit[0]] = countryLineSplit[1]
        countryLine = countriesRaw.readline()

    organizations = []
    missingCountries = []

    try:
        organizationsRaw = open(
            "DATA_WHED-partnership-organizations.csv", "r", encoding="utf-8"
        )
        reader = csv.reader(organizationsRaw)
        for row in reader:
            organizationsLine = row
            if organizationsLine[0] != "name":
                try:
                    countryCode = countryDict[organizationsLine[3].replace("\n", "")]
                except KeyError:
                    print("Invalid key: " + organizationsLine[3].replace("\n", ""))
                    countryCode = translateCountryName(organizationsLine[3])
                    if (countryCode == "") and (
                        organizationsLine[3] not in missingCountries
                    ):
                        missingCountries.append(organizationsLine[3])
                if countryCode != "":
                    organization = Organization(
                        organizationsLine[1].replace("\n", ""),
                        organizationsLine[0].replace("\n", ""),
                        organizationsLine[0].replace("\n", ""),
                        countryCode,
                    )
                    organizations.append(organization)
            organizationsLine = organizationsRaw.readline()
        organizations.sort(key=lambda organization: organization.en)
        generateMissingCountriesList(missingCountries)
    except FileNotFoundError:
        print("Could not open DATA_WHED-partnership-organizations.csv")

    try:
        open("organizations.ts", "x")
        print("Output file created")
    except FileExistsError:
        print("Output file present")

    organizationsTs = open("organizations.ts", "w", encoding="utf-8")

    organizationsTs.write("export const organizations = [\n")
    for i in range(len(organizations)):
        data = organizations[i].to_dict()
        name = organizations[i].fi.replace('"', "'")
        organizationsTs.write(
            '    {\n        code: "'
            + organizations[i].code.replace("\n", "")
            + '",\n        fi: "'
            + name
            + '",\n        en: "'
            + name
            + '",\n        country_code: "'
            + organizations[i].country.replace("\n", "")
            + '"\n    },\n'
        )
    organizationsTs.write(  # Other organization for custom selection option
        '    {\n        code: "'
        + 'other",\n        fi: "'
        + 'Muu",\n        en: "'
        + 'Other",\n        country_code: "'
        + 'OTH"\n    }\n'
    )

    organizationsTs.write("]\n")
    print("Data saved to organizations.ts")

except FileNotFoundError:
    print(
        "countryCodes.csv not present, run country-data-parser-backend.py script first to generate"
    )
