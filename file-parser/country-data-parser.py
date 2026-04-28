import json

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
    def __init__(self, name, id, year, risk):
        self.name = name
        self.id = id
        self.year = year
        self.risk = risk

    def to_dict(self):
        return {
            "name": self.name.to_dict(),
            "id": self.id,
            "year": self.year,
            "risk": self.risk.to_dict(),
        }
    
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
        print("World bank data file not found")
    


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
academIndex = splitHeaders.index('"v2xca_academ_sd"')

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

for country in countries:
    data = country.to_dict()
    parsedCountries.write(json.dumps(data, indent=4) + ",\n")

print("Data saved")
