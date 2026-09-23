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
## Running the tests
### Run all Playwright tests with:

```bash
npm run test:e2e
````
### The tests are located in:

```bash
tests/login.spec.ts
````
### Tests

There are currently **9 Playwright tests** covering:

- Login page fields
- Entering username and password
- User login
- Successful login and navigation to the user page
- Showing and hiding the password
- Empty login form validation
- Invalid login credentials
- Changing the language
- Backend error handling

The backend error test simulates a **500 Internal Server Error** and verifies that the frontend displays an error message.

### Test Result

All **9 Playwright tests** pass successfully.

```text
9 passed
````
### Playwright Test Script

The following script is available in `package.json`:

```json
"test:e2e": "playwright test tests"