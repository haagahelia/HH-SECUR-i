import json

class GDPRCountry:
    def __init__(self, nameFi, gdpr):
            self.nameFi = nameFi
            self.gdpr = gdpr

class WBCountry:
    def __init__(self, name, corruption, politicalStability, nameFi):
        self.name = name
        self.corruption = corruption
        self.politicalStability = politicalStability
        self.nameFi = nameFi

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
            "corruption": self.corruption,
            "security": self.security,
            "academicFreedom": self.academicFreedom,
            "politicalStability": self.politicalStability,
            "development": self.development,
            "GDPR": self.GDPR,
            "sanctions": self.sanctions,
            "ruleOfLaw": self.ruleOfLaw,
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
            "dataYear": self.dataYear,
            "risk": self.risk.to_dict(),
        }
    
# Add GDPR rating 1 = GDPR country, 2 = adequate protection country, 3 = other countries
def addGDPR(country):
    try:
        gdprData = open("GDPR_DATA.csv", "r")
        gdprLine = gdprData.readline()
        while gdprLine != "":
                gdprSplit = gdprLine.split(",")
                if gdprSplit[0].lower() == country.name.fi.lower():
                    #print("Match found - Name: " + country.name.fi + ", GDPR: " + gdprSplit[1])
                    country.risk.GDPR = gdprSplit[1].replace("\n", "")
                gdprLine = gdprData.readline()
        if country.risk.GDPR == "":
            country.risk.GDPR = 3
    except FileNotFoundError:
        print("GDPR_DATA.csv not found")
    
# Add corruption, political stability and finnish country names from WB data file
def addWB(country):
    try:
        wbData = open("WB_DATA.csv", "r")
        wbLine = wbData.readline()
        while wbLine != "":
            wbSplit = wbLine.split(",")
            if wbSplit[0].lower() == country.name.en.lower():
                #print("Match found - Corruption: " + wbSplit[1] + ", Political Stability: " + wbSplit[2])
                country.risk.corruption = wbSplit[1].replace("\n", "")
                country.risk.politicalStability = wbSplit[2].replace("\n", "")
                country.name.fi = wbSplit[3].replace("\n", "")
            wbLine = wbData.readline()
    except FileNotFoundError:
        print("WB_DATA.csv not found")
    

# Generate country list with ID, data year, english name and academic freedom from v-dem data

#V-Dem-CY-Core-v16.csv"
file = open("V-Dem-CY-Core-v16.csv", "r")
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
        addGDPR(country)
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
print("Data saved")
