# HH-SECUR-i

Risk assessment tool for international collaboration.

It currently consists of a front end React web app and a Python script for parsing raw source data.

URL to deployment: https://hh-riski-hh-secur-i-frontend.2.rahtiapp.fi/

# [Front end](hh-riski/)
Front end is a React web app where navigation is handled by react-router.

## Installation & launching(dev)

### Requirements

	- Node.js
	- NPM
	
### Launching

In HH_Riski/hh-riski

```
npm install
npm run dev
```

## Features

### Risk survey form

*Collaboration risk survey form*

**Path:** /

### Risk survey results

*Risk assessment page*

**Path:** /results

### Old assesments

*View, edit and delete your old assessments*

**Path:** /my-assessments

### User managament

*Temporary user management page until real authentication is implemented*

**Path:** /user

# [File parser](file-parser/)

File parser is a Python script for parsing and combining data sources for Country risk calculation.

# HH-Riski Frontend

This project contains the frontend for the HH-SECUR-i risk assessment system.

## End-to-End Testing

The frontend uses **Playwright** for end-to-end (E2E) testing.

The Playwright tests focus on the login page and test the main login functionality and different error situations.

### Installing Playwright

Install the project dependencies:

```bash
npm install
````
### Install the Playwright browsers:
```bash
npx playwright install
````