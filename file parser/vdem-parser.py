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
            "risk": self.risk.to_dict(),
        }

#V-Dem-CY-Core-v16.csv"
file = open("test.csv", "r")
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

while line != "":
    if idNum != splitLine[idNumIndex]:
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

print("Countries: " + str(len(countries)))

try:
    open("parsed_countries.json", "x")
    print("Output file created")
except FileExistsError:
    print("Output file present")

parsedCountries = open("parsed_countries.json", "w")

for country in countries:
    data = country.to_dict()
    parsedCountries.write(json.dumps(data) + "," + "\n")

print("Data saved")
