try:
    open("countries.ts", "x")
    print("Output file created")
except FileExistsError:
    print("Output file present")

try:
    countriesTypescript = open("countries.ts", "w")
    countries = open("parsed_countries.json", "r")
    countriesTypescript.write("export const countries =")
    countriesRead = countries.read()
    countriesModified = countriesRead
    countriesModified = countriesModified.replace('"en"', "en")
    countriesModified = countriesModified.replace('"fi"', "fi")
    countriesModified = countriesModified.replace('"code"', "code")
    countriesModified = countriesModified.replace('"dataYear"', "dataYear")
    countriesModified = countriesModified.replace('"corruption"', "corruption")
    countriesModified = countriesModified.replace('"security"', "security")
    countriesModified = countriesModified.replace('"academicFreedom"', "academicFreedom")
    countriesModified = countriesModified.replace('"politicalStability"', "politicalStability")
    countriesModified = countriesModified.replace('"development"', "development")
    countriesModified = countriesModified.replace('"gdpr"', "gdpr")
    countriesModified = countriesModified.replace('"sanctions"', "sanctions")
    countriesModified = countriesModified.replace('"ruleOfLaw"', "ruleOfLaw")
    countriesTypescript.write(countriesModified)
    print("countries.ts updated")
except FileNotFoundError:
    print("Could not read parsed_countries.json")
