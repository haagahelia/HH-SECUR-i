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
    
# Adds placeholder security risk rating of 3, remove when actual source is implemented
# Real source will use ministory of foreign affairs travel warnings and changes often enough that a hard coded source is not really practical
def addPlaceholderSecurity(country):
    country.risk.security = 3

# Add rule of law rating
def addRuleOfLaw(country):
    try:
        ruleOfLawData = open("DATA_rule_of_law.csv", "r")
        ruleOfLawLine = ruleOfLawData.readline()
        countryCodeIndex = -1
        while ruleOfLawLine != "":
            ruleOfLawSplit = ruleOfLawLine.split(",")
            #print(ruleOfLawSplit[0])
            if ruleOfLawSplit[0].lower() == "country code":
                try:
                    countryCodeIndex = ruleOfLawSplit.index(country.id.upper())
                    #print("Country index found for " + country.name.en + ", " + str(countryCodeIndex))
                except ValueError:
                    country.risk.ruleOfLaw = -1
                    print("Rule of law not found for: " + country.name.en + ", Code: " + country.id)
            if ruleOfLawSplit[0].lower() == "wjp rule of law index: overall score":
                if countryCodeIndex != -1:
                    country.risk.ruleOfLaw = ruleOfLawSplit[countryCodeIndex]
                    #print("Rule of law rating added for " + country.name.en + ": " + ruleOfLawSplit[countryCodeIndex])
                    return
                else:
                    return
            ruleOfLawLine = ruleOfLawData.readline()
        country.risk.ruleOfLaw = -1
    except FileNotFoundError:
        print("DATA_rule_of_law.csv not found")

# Add sanction to country if active
def addSanctions(country):
    try:
        sanctionsData = open("DATA_sanctions.csv", "r")
        sanctionsLine = sanctionsData.readline()
        while sanctionsLine != "":
            sanctionSplit = sanctionsLine.split()
            if sanctionSplit[0].lower() == country.name.en.lower():
                country.risk.sanctions = 3
                return
            sanctionsLine = sanctionsData.readline()
        country.risk.sanctions = 1
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
                #print("Match found - Name: " + country.name.en + ", GDPR: " + hdiSplit[2])
                try:
                    country.risk.development = float(hdiSplit[0])
                except ValueError:
                    country.risk.development = -1
                return
            hdiLine = hdiData.readline()
        country.risk.development = -1
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
                    #print("Match found - Name: " + country.name.fi + ", GDPR: " + gdprSplit[1])
                    country.risk.GDPR = gdprSplit[1].replace("\n", "")
                    return
                gdprLine = gdprData.readline()
        if country.risk.GDPR == "":
            country.risk.GDPR = 3
    except FileNotFoundError:
        country.risk.GDPR = -1
        print("DATA_GDPR.csv not found")
    
# Add corruption, political stability and finnish country names from WB data file
def addWB(country):
    try:
        wbData = open("DATA_WB.csv", "r")
        wbLine = wbData.readline()
        while wbLine != "":
            wbSplit = wbLine.split(",")
            if wbSplit[0].lower() == country.name.en.lower():
                #print("Match found - Corruption: " + wbSplit[1] + ", Political Stability: " + wbSplit[2])
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
    

# Generate country list with ID, data year, english name and academic freedom from v-dem data

#V-Dem-CY-Core-v16.csv"
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
            addPlaceholderSecurity(country)
            addWB(country)
            addGDPR(country)
            addHDI(country)
            addSanctions(country)
            addRuleOfLaw(country)
            countries.append(country)
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

    print("Total lines: " + str(linesProcessed))
    print("Countries: " + str(len(countries)))
    countries.sort(key=lambda country: country.name.en)

    try:
        open("parsed_countries.json", "x")
        print("Output file created")
    except FileExistsError:
        print("Output file present")

    parsedCountries = open("parsed_countries.json", "w")

    #Write countries as an array in JSON notation
    parsedCountries.write("[\n")
    for i in range(len(countries)):
        data = countries[i].to_dict()
        if i == len(countries) - 1:
            parsedCountries.write(json.dumps(data, indent=4) + "\n")
        else:
            parsedCountries.write(json.dumps(data, indent=4) + ",\n")

    parsedCountries.write("]\n")
    print("Data saved to parsed_countries.json")

except FileNotFoundError:
    print("DATA_V-Dem-CY-Core-v16.csv not found")