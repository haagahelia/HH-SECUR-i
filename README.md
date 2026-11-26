# HH-SECUR-i

Risk assessment tool for international collaboration.

It currently consists of a front-end React web app and a Python script
for parsing raw source data.

**URL to deployment:**
https://hh-riski-hh-secur-i-frontend.2.rahtiapp.fi/

# [Front end](hh-riski/)

The front end is a React web app where navigation is handled by React
Router.

## Installation & launching (dev)

### Requirements

-   Node.js
-   npm

### Launching

In `HH_Riski/hh-riski`:

``` bash
npm install
npm run dev
```

## Features

### Risk survey form

*Collaboration risk survey form*

**Path:** `/`

### Risk survey results

*Risk assessment page*

**Path:** `/results`

### Old assessments

*View, edit and delete your old assessments*

**Path:** `/my-assessments`

### User management

*Temporary user management page until real authentication is
implemented*

**Path:** `/user`

# [File parser](file-parser/)

File parser is a Python script for parsing and combining data sources
for country risk calculation.

# HH-Riski Frontend -- End-to-End Testing

The frontend uses **Playwright** for end-to-end (E2E) testing.

The tests are organized into separate Azure and Rahti environments. Each
environment has its own Playwright configuration file and test
directory, so tests can be run against each deployment independently.

## Test structure

``` text
hh-riski/
├── tests/
│   ├── azure/
│   │   ├── login.spec.ts
│   │   └── risk-form.spec.ts
│   └── rahti/
│       └── login.spec.ts
├── .env
├── .gitignore
├── playwright.azure.config.ts
├── playwright.rahti.config.ts
└── package.json
```

## Installing Playwright

Install the project dependencies:

``` bash
npm install
```

Install the Playwright browsers:

``` bash
npx playwright install
```

## Azure tests

Azure tests run against the Azure frontend deployment.

**Deployment URL:**
https://devhhsecurifrontendd.z1.web.core.windows.net/

**Configuration file:** `playwright.azure.config.ts`

### Running Azure tests

Run the Azure test suite with:

``` bash
npx playwright test -c playwright.azure.config.ts
```

### Login tests

**File:** `tests/azure/login.spec.ts`

The login tests cover:

-   Visibility of the username and password fields.
-   Entering a username and password.
-   Validation of an empty login form.
-   Error message for invalid login credentials.
-   Showing and hiding the password.

There are **5 login tests**, which have passed.

### Risk assessment form test

**File:** `tests/azure/risk-form.spec.ts`

The risk assessment form test covers the main form submission workflow:

-   Logging in to the application.
-   Entering the project name.
-   Selecting the project owner.
-   Selecting the collaboration role and type.
-   Selecting the country and organization.
-   Completing the collaboration and written agreement questions.
-   Selecting collaboration activities.
-   Answering questions about funding and financial information.
-   Answering questions about personal data transfers and dual-use
    technology.
-   Selecting the ethical risk assessment answer and collaboration
    duration.
-   Entering additional information.
-   Saving the completed form.
-   Checking that the risk assessment results page and key information
    are displayed.

The form-filling and saving workflow has been tested. The final
post-save assertions are being verified.

## Rahti tests

Rahti tests are maintained separately from Azure tests.

**Deployment URL:** https://hh-riski-hh-secur-i-frontend.2.rahtiapp.fi/

**Configuration file:** `playwright.rahti.config.ts`

**Test file:** `tests/rahti/login.spec.ts`

### Running Rahti tests

Run the Rahti tests with:

``` bash
npx playwright test -c playwright.rahti.config.ts
```

The separate configuration allows the login functionality to be tested
against the Rahti deployment independently of Azure.

## Test credentials and environment variables

The tests use an environment variable for the test account password.

Create a `.env` file in the frontend root directory:

``` env
TEST_PASSWORD=your_test_password
```

The password is accessed in the tests using:

``` typescript
process.env.TEST_PASSWORD!
```

The `.env` file must be included in `.gitignore`.

**Important:** Do not commit passwords or other sensitive credentials to
the Git repository.

## Running tests

### Run Azure tests

``` bash
npx playwright test -c playwright.azure.config.ts
```

### Run Rahti tests

``` bash
npx playwright test -c playwright.rahti.config.ts
```

### Run the default E2E test script

The following script is available in `package.json`:

``` json
"test:e2e": "playwright test tests"
```

Run it with:

``` bash
npm run test:e2e
```

For environment-specific testing, use the corresponding Playwright
configuration file.

## Test summary

  ---------------------------------------------------------------------------------
  Environment             Test file                         Coverage
  ----------------------- --------------------------------- -----------------------
  Azure                   `tests/azure/login.spec.ts`       Login page and login
                                                            validation

  Azure                   `tests/azure/risk-form.spec.ts`   Completing and saving
                                                            the risk assessment
                                                            form

  Rahti                   `tests/rahti/login.spec.ts`       Login functionality
  ---------------------------------------------------------------------------------

The Azure login suite contains **5 passing tests**. The Azure risk
assessment form workflow has been tested, including filling in and
saving the form; final result-page assertions are being verified. The
Rahti login tests have a separate configuration and are run
independently.
