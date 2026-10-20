import urllib.request
import urllib.parse
import csv
import time
from html.parser import HTMLParser

BASE_URL = "https://whed.net/results_institutions.php"
OUTPUT_FILE = "DATA_WHED-partnership-organizations.csv"


# ---------- Institution parser ----------

class InstitutionParser(HTMLParser):
    def __init__(self):
        super().__init__()
        self.institution = False
        self.in_code = False
        self.in_name = False
        self.code_text = ""
        self.name_text = ""
        self.iau_member = False
        self.results = []

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)

        if tag == "span" and "gui" in (attrs.get("class") or ""):
            self.in_code = True

        if tag == "li":
            c = attrs.get("class") or ""
            if "clearfix" in c and "plus" in c:
                self.institution = True
                self.iau_member = "iaumember" in c

        if self.institution and tag == "h3":
            self.in_name = True

    def handle_data(self, data):
        if self.in_code:
            self.code_text += data

        if self.institution and self.in_name:
            self.name_text += data

    def handle_endtag(self, tag):
        if tag == "span":
            self.in_code = False

        if tag == "h3":
            self.in_name = False

        if tag == "li" and self.institution:
            name = self.name_text.strip()

            if name:
                self.results.append({
                    "name": name,
                    "code": self.code_text.strip(),
                    "iau_member": "yes" if self.iau_member else "no"
                })

            self.institution = False
            self.code_text = ""
            self.name_text = ""
            self.iau_member = False


# ---------- Country filter parser ----------

class CountryFilterParser(HTMLParser):
    def __init__(self):
        super().__init__()
        self.in_group = False
        self.group_name = ""
        self.in_option = False
        self.option_value = ""
        self.option_text = ""
        self.filters = []

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)

        if tag == "optgroup":
            self.in_group = True
            self.group_name = attrs.get("label", "")

        elif tag == "option":
            self.in_option = True
            self.option_value = attrs.get("value", "")
            self.option_text = ""

    def handle_data(self, data):
        if self.in_option:
            self.option_text += data

    def handle_endtag(self, tag):
        if tag == "option" and self.in_option:
            text = self.option_text.strip()
            value = self.option_value.strip()

            if self.in_group:
                if "(all)" in text:
                    self.filters.append((value, self.group_name))
            else:
                if value:
                    self.filters.append((value, text))

            self.in_option = False

        elif tag == "optgroup":
            self.in_group = False
            self.group_name = ""


# ---------- Get countries ----------

response = urllib.request.urlopen(BASE_URL, timeout=30)
main_html = response.read().decode("utf-8", errors="replace")

country_parser = CountryFilterParser()
country_parser.feed(main_html)

print("Country filters:", len(country_parser.filters))


# ---------- Create NEW CSV ----------

with open(OUTPUT_FILE, "w", encoding="utf-8", newline="") as f:

    writer = csv.DictWriter(
        f,
        fieldnames=["name", "code", "iau_member", "country"]
    )

    writer.writeheader()

    # ---------- Scrape all countries ----------

    for country_value, country_name in country_parser.filters:

        print("\nScraping:", country_name)

        debut = 0
        country_total = 0

        while True:

            params = {
                "Chp1": country_value,
                "nbr_ref_pge": 100,
                "debut": debut
            }

            url = BASE_URL + "?" + urllib.parse.urlencode(params)

            response = urllib.request.urlopen(url, timeout=30)

            page_html = response.read().decode(
                "utf-8",
                errors="replace"
            )

            parser = InstitutionParser()
            parser.feed(page_html)

            for item in parser.results:
                item["country"] = country_name
                writer.writerow(item)

            f.flush()

            found = len(parser.results)
            country_total += found

            print(
                "  start =", debut,
                "| found =", found
            )

            if found < 100:
                break

            debut += 100
            time.sleep(0.5)

        print("  Total:", country_total)

print("\nDONE")
print("CSV:", OUTPUT_FILE)