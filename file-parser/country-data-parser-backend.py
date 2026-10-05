import json


class Name:
    def __init__(self, en, fi):
        self.en = en
        self.fi = fi

    def to_dict(self):
        return {"en": self.en, "fi": self.fi}


class Risk:
    def __init__(
        self,
        corruption,
        security,
        academicFreedom,
        politicalStability,
        development,
        GDPR,
        sanctions,
        ruleOfLaw,
    ):
        self.corruption = corruption
        self.security = security
        self.academicFreedom = academicFreedom
        self.politicalStability = politicalStability
        self.development = development
        self.GDPR = GDPR
        self.sanctions = sanctions
        self.ruleOfLaw = ruleOfLaw

    def to_dict(self):
        return {
            "corruption": float(self.corruption),
            "security": int(self.security),
            "academicFreedom": float(self.academicFreedom),
            "politicalStability": float(self.politicalStability),
            "development": int(self.development),
            "GDPR": int(self.GDPR),
            "sanctions": int(self.sanctions),
            "ruleOfLaw": float(self.ruleOfLaw),
        }


class Country:
    def __init__(self, name, id, dataYear, risk):
        self.name = name
        self.id = id
        self.dataYear = dataYear
        self.risk = risk

    def to_dict(self):
        return {
            "name": self.name.to_dict(),
            "id": self.id,
            "dataYear": int(self.dataYear),
            "risk": self.risk.to_dict(),
        }


class CountrySimplified:
    def __init__(
        self,
        en,
        fi,
        code,
        dataYear,
        corruption,
        security,
        academicFreedom,
        politicalStability,
        development,
        gdpr,
        sanctions,
        ruleOfLaw,
    ):
        self.en = en
        self.fi = fi
        self.code = code
        self.dataYear = dataYear
        self.corruption = corruption
        self.security = security
        self.academicFreedom = academicFreedom
        self.politicalStability = politicalStability
        self.development = development
        self.gdpr = gdpr
        self.sanctions = sanctions
        self.ruleOfLaw = ruleOfLaw

    def to_dict(self):
        return {
            "en": self.en,
            "fi": self.fi,
            "code": self.code,
            "dataYear": int(self.dataYear),
            "corruption": float(self.corruption),
            "security": int(self.security),
            "academicFreedom": float(self.academicFreedom),
            "politicalStability": float(self.politicalStability),
            "development": int(self.development),
            "gdpr": int(self.gdpr),
            "sanctions": int(self.sanctions),
            "ruleOfLaw": float(self.ruleOfLaw),
        }


def formatCountries():
    try:
        open("countries.ts", "x")
        print("Output file created")
    except FileExistsError:
        print("Output file present")

    countriesTypescript = open("countries.ts", "w")

    try:
        countriesJson = open("parsed_countries.json", "r")
        countriesTypescript.write("const countries =")
        countriesJsonLine = countriesJson.readline()
        while countriesJsonLine != "":
            lineModified = countriesJsonLine
            lineModified = lineModified.replace('"en"', "en")
            lineModified = lineModified.replace('"fi"', "fi")
            lineModified = lineModified.replace('"code"', "code")
            lineModified = lineModified.replace('"dataYear"', "dataYear")
            lineModified = lineModified.replace('"corruption"', "corruption")
            lineModified = lineModified.replace('"security"', "security")
            lineModified = lineModified.replace('"academicFreedom"', "academicFreedom")
            lineModified = lineModified.replace('"politicalStability"', "politicalStability")
            lineModified = lineModified.replace('"development"', "development")
            lineModified = lineModified.replace('"gdpr"', "gdpr")
            lineModified = lineModified.replace('"sanctions"', "sanctions")
            lineModified = lineModified.replace('"ruleOfLaw"', "ruleOfLaw")
            countriesTypescript.write(lineModified)
            countriesJsonLine = countriesJson.readline()
            #countriesJsonLine = countriesJson.readline()
        #lineModified = countriesJSON.read()
        print("Line after loop: " + countriesJsonLine)
        countriesJson.close()
    except FileNotFoundError:
        print("Could not read parsed_countries.json")

# Add corruption, political stability and finnish country names from WB data file
def addWB(country):
    try:
        wbData = open("DATA_WB.csv", "r")
        wbLine = wbData.readline()
        while wbLine != "":
            wbSplit = wbLine.split(",")
            if wbSplit[0].lower() == country.name.en.lower():
                ##print("Match found - Corruption: " + wbSplit[1] + ", Political Stability: " + wbSplit[2] + ", Name fi: " + wbSplit[3])
                country.risk.corruption = wbSplit[1].replace("\n", "")
                country.risk.politicalStability = wbSplit[2].replace("\n", "")
                country.name.fi = wbSplit[3].replace("\n", "")
                return
            wbLine = wbData.readline()
        country.risk.corruption = -1
        country.risk.politicalStability = -1
        country.name.fi = "Lisää nimi"
    except FileNotFoundError:
        country.risk.corruption = -1
        country.risk.politicalStability = -1
        country.name.fi = "Lisää nimi"
        print("DATA_WB.csv not found")


def translateSecuritySource(name):
    if name == "T\u00c5\u00a1ekki":
        return "T\u00c5\u00a1ekki (Tshekin tasavalta)"
    if name == "Swazimaa":
        return "Eswatini"
    if name == "Kirgiisi":
        return "Kirgisia"
    if name == "Lao":
        return "Laos"
    if name == "Pohjois-Makedonian tasavalta":
        return "Pohjois-Makedonia"
    if name in ("Palestiina/Gaza", "Palestiina/L\u00c3\u00a4nsiranta"):
        return "Palestiinalaisalue"
    if name == "Tad\u00c5\u00beikistan":
        return "Tadzhikistan"
    if name == "Yhdistyneet arabiemiirikunnat":
        return "Arabiemiraatit"
    if name == "Yhdistynyt kuningaskunta":
        return "Britannia"
    if name == "Valkoven\u00c3\u00a4j\u00c3\u00a4":
        return "Valko-Ven\u00c3\u00a4j\u00c3\u00a4"
    return name


def addSecurity(country):
    if country.name.en.lower() == "finland":
        country.risk.security = 1
        return
    try:
        travelData = open("DATA_Travel-risk.csv", "r")
        securityLine = travelData.readline()
        countryName = translateSecuritySource(country.name.fi)
        while securityLine != "":
            securityLine = securityLine.split(",")
            if securityLine[0].lower() == countryName.lower():
                # print("Security match: " + country.name.fi)
                country.risk.security = securityLine[3]
                travelData.close()
                return
            securityLine = travelData.readline()
        country.risk.security = -1
        travelData.close()
    except FileNotFoundError:
        country.risk.security = -1
        print("DATA_Travel-risk.csv not found")


# Add rule of law rating
def addRuleOfLaw(country):
    try:
        ruleOfLawData = open("DATA_rule_of_law.csv", "r")
        ruleOfLawLine = ruleOfLawData.readline()
        countryCodeIndex = -1
        while ruleOfLawLine != "":
            ruleOfLawSplit = ruleOfLawLine.split(",")
            # print(ruleOfLawSplit[0])
            if ruleOfLawSplit[0].lower() == "country code":
                try:
                    countryCodeIndex = ruleOfLawSplit.index(country.id.upper())
                    # print("Country index found for " + country.name.en + ", " + str(countryCodeIndex))
                except ValueError:
                    country.risk.ruleOfLaw = -1
                    print(
                        "Rule of law not found for: "
                        + country.name.en
                        + ", Code: "
                        + country.id
                    )
                    ruleOfLawData.close()
                    return
            if ruleOfLawSplit[0].lower() == "wjp rule of law index: overall score":
                if countryCodeIndex != -1:
                    country.risk.ruleOfLaw = ruleOfLawSplit[countryCodeIndex]
                    # print("Rule of law rating added for " + country.name.en + ": " + ruleOfLawSplit[countryCodeIndex])
                    ruleOfLawData.close()
                    return
                else:
                    ruleOfLawData.close()
                    return
            ruleOfLawLine = ruleOfLawData.readline()
        country.risk.ruleOfLaw = -1
        ruleOfLawData.close()
    except FileNotFoundError:
        print("DATA_rule_of_law.csv not found")


# Add sanction to country if active
def addSanctions(country):
    try:
        sanctionsData = open("DATA_sanctions.csv", "r")
        sanctionsLine = sanctionsData.readline()
        while sanctionsLine != "":
            sanctionSplit = sanctionsLine.split(",")
            if sanctionSplit[0].lower() == country.name.en.lower():
                # print("Sanction Match: " + country.name.en)
                country.risk.sanctions = 3
                sanctionsData.close()
                return
            sanctionsLine = sanctionsData.readline()
        country.risk.sanctions = 1
        sanctionsData.close()
    except FileNotFoundError:
        country.risk.sanctions = -1
        print("GDPR_DATA.csv not found")


# Add HDR Humen Development Index rating to country
def addHDI(country):
    try:
        hdiData = open("DATA_HDR_HDI.csv", "r")
        hdiLine = hdiData.readline()
        while hdiLine != "":
            hdiSplit = hdiLine.split(",")
            if hdiSplit[1].lower() == country.name.en.lower():
                # print("Match found - Name: " + country.name.en + ", GDPR: " + hdiSplit[2])
                try:
                    country.risk.development = float(hdiSplit[0])
                except ValueError:
                    country.risk.development = -1
                hdiData.close()
                return
            hdiLine = hdiData.readline()
        country.risk.development = -1
        hdiData.close()
    except FileNotFoundError:
        country.risk.development = -1
        print("DATA_HDR_HDI.csv not found")


# Add GDPR rating 1 = GDPR country, 2 = adequate protection country, 3 = other countries
def addGDPR(country):
    try:
        gdprData = open("DATA_GDPR.csv", "r")
        gdprLine = gdprData.readline()
        while gdprLine != "":
            gdprSplit = gdprLine.split(",")
            if gdprSplit[0].lower() == country.name.fi.lower():
                # print("Match found - Name: " + country.name.fi + ", GDPR: " + gdprSplit[1])
                country.risk.GDPR = gdprSplit[1].replace("\n", "")
                gdprData.close()
                return
            gdprLine = gdprData.readline()
        if country.risk.GDPR == "":
            country.risk.GDPR = 3
            gdprData.close()
    except FileNotFoundError:
        country.risk.GDPR = -1
        print("DATA_GDPR.csv not found")


# Generate country list with ID, data year, english name and academic freedom from v-dem data

# V-Dem-CY-Core-v16.csv"
try:
    file = open("DATA_V-Dem-CY-Core-v16.csv", "r")
    line = ""
    print("Parsing country data")

    line = file.readline()
    splitHeaders = line.split(",")

    nameIndex = splitHeaders.index('"country_name"')
    idIndex = splitHeaders.index('"country_text_id"')
    idNumIndex = splitHeaders.index('"country_id"')
    yearIndex = splitHeaders.index('"year"')
    academIndex = splitHeaders.index('"v2xca_academ"')

    line = file.readline()
    splitLine = line.split(",")
    nameString = splitLine[nameIndex].replace('"', "")
    id = splitLine[idIndex].replace('"', "")
    idNum = splitLine[idNumIndex]
    year = splitLine[yearIndex].replace('"', "")
    academ = splitLine[academIndex].replace('"', "")

    countries = []

    line = file.readline()
    splitLine = line.split(",")
    nameString = splitLine[nameIndex].replace('"', "")
    id = splitLine[idIndex].replace('"', "")
    idNum = splitLine[idNumIndex]
    year = splitLine[yearIndex].replace('"', "")
    academ = splitLine[academIndex].replace('"', "")
    name = Name(nameString, "")
    risk = Risk("", "", academ, "", "", "", "", "")
    country = Country(name, id, year, risk)
    line = file.readline()
    splitLine = line.split(",")
    linesProcessed = 1

    while line != "":
        if idNum != splitLine[idNumIndex] and int(year) >= 2016:
            addWB(country)
            addSecurity(country)
            addGDPR(country)
            addHDI(country)
            addSanctions(country)
            addRuleOfLaw(country)
            # self, en, fi, code, dataYear, corruption, security, academicFreedom, politicalStability, development, gdpr, sanctions, ruleOfLaw
            countrySimplified = CountrySimplified(
                country.name.en,
                country.name.fi,
                country.id,
                country.dataYear,
                country.risk.corruption,
                country.risk.security,
                country.risk.academicFreedom,
                country.risk.politicalStability,
                country.risk.development,
                country.risk.GDPR,
                country.risk.sanctions,
                country.risk.ruleOfLaw,
            )
            countries.append(countrySimplified)
        nameString = splitLine[nameIndex].replace('"', "")
        id = splitLine[idIndex].replace('"', "")
        idNum = splitLine[idNumIndex]
        year = splitLine[yearIndex].replace('"', "")
        academ = splitLine[academIndex].replace('"', "")
        name = Name(nameString, "")
        risk = Risk("", "", academ, "", "", "", "", "")
        country = Country(name, id, year, risk)
        line = file.readline()
        splitLine = line.split(",")
        linesProcessed += 1

        if linesProcessed % 2000 == 0:
            print("Lines processed: " + str(linesProcessed))

    file.close()
    print("Total lines: " + str(linesProcessed))
    print("Countries: " + str(len(countries)))
    countries.sort(key=lambda countrySimplified: countrySimplified.en)

    try:
        open("parsed_countries.json", "x")
        print("Output file created")
    except FileExistsError:
        print("Output file present")

    parsedCountries = open("parsed_countries.json", "w")

    # Write countries as an array in JSON notation
    parsedCountries.write("[\n")
    for i in range(len(countries)):
        data = countries[i].to_dict()
        if i == len(countries) - 1:
            parsedCountries.write(json.dumps(data, indent=4) + "\n")
        else:
            parsedCountries.write(json.dumps(data, indent=4) + ",\n\n")

    parsedCountries.write("]\n")
    print("Data saved to parsed_countries.json")

    formatCountries()

except FileNotFoundError:
    print("DATA_V-Dem-CY-Core-v16.csv not found")
