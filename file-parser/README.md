# file parser

Python script for generating usable country risk data from raw sources.

Currently combines V-dem Academic Freedom rating with World bank corruption and political stability ratings.

## Sources

Unzip source data files from `risk_data_raw.zip` for data sources.

### v-dem - Academic freedom

`DATA_V-Dem-CY-Core-v16.csv`

[V-dem data sets](https://v-dem.net/data/the-v-dem-dataset/)

Country-Year: V-Dem Core


### World Bank Group indicators - corruption & political stability

`DATA_WB.csv`

*Combined WB data with Finnish country names added*

[Political Stability](https://data360.worldbank.org/en/indicator/WB_WDI_PV_PER_RNK)

[Corruption](https://data360.worldbank.org/en/indicator/WB_WDI_CC_PER_RNK)

### Human Development index data

`DATA_HDR_HDI.csv`

[HDR Human Development Index](https://hdr.undp.org/data-center/human-development-index#/indicies/HDI)

### EU Sanctions

`DATA_sanctions.csv`

[EU Sanctions](https://www.sanctionsmap.eu/#/main)

### Rule of Law

`DATA_rule_of_law.csv`

[World Justice Project Rule of Law Index](https://worldjusticeproject.org/rule-of-law-index/global/2024/table)

### GDPR

`DATA_GDPR.csv`

### Placeholder - Security

*Every country is given highest risk security rating until real source is implemented*

Real source will use [ministry of foreign affers' travel notices](https://um.fi/matkustustiedotteet-a-o)

