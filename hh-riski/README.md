# hh-SECUR-i

React app front end for hh-SECUR-i international collaboration risk assessments.

## Structure

```
<StrictMode>
	<UserProvider>
		<FormAnswersProvider>
			<Router />
		</FormAnswersProvider>
	</UserProvider>
</StrictMode>
```

**UserProvider:** Provides context for current user.

**FormAnswersProvider:** Provides context for form answer data that persists page navigation.

**Router:** Provides routes to end points.

## Navigation

Navigation is handled by React Router.

### End points

#### /

Risk form page.

**Component:** [FormPage.tsx](src/Components/FormPage.tsx)

#### /results

Risk assessment page.

**Component:** [ResultsPage.tsx](src/Components/Result/ResultsPage.tsx)

#### /my-assessments

Page for managing your assessments.

**Component:** [MyAssesmentsPage.tsx](src/Components/Result/MyAssesmentsPage.tsx)

#### /user

Temporary page for user management.

**Component:** [UserPage.tsx](src/Components/UserPage.tsx)

## Shared components

### Navbar

Upper and lower navigation bars.

## Contexts

Contexts are used to persist data between pages.

### UserContext

[UserContext.tsx](src/context/UserContext.tsx)

Temporary context for tracking and switching current user until real authentication is implemented.

### FormAnswersContext

[FormAnswersContext.tsx](src/context/FormAnswersContext.tsx)

Context for persisting survey form selections between pages.

## Helpers

### [fetchData.ts](src/util/fetchData.ts)

Temporary data source functions until back-end is implemented.

### [utils.ts](src/util/utils.ts)

Helper functions for parsing and sorting data.

## Type definitions

The basic premise for types used is to have `id` attribute for matching them and have displayed values under `fi` and `en` attributes for localization.

### Countries

Types for describing countries and their risk ratings are split into two; `CountryRaw` for raw values and `Country` for when risk data has been calculated and put into 1-3 scale.

#### CountryRaw
```
export type CountryRaw = {
    id: string
    name: {
        fi: string
        en: string
    },
    risk: {
        corruption: number,
        security: 1 | 2 | 3,
        academicFreedom: number,
        politicalStability: number,
        development: number,
        GDPR: number,
        sanctions: number,
        ruleOfLaw: number
    },
    dataYear: number
}
```
#### Country

Ratings 1-3 are correct values and rating 0 indicates an error in risk calculation.

```
export type Country = {
    id: string
    name: {
        fi: string
        en: string
    },
    risk: {
        overall: 0 | 1 | 2 | 3,
        corruption: 0 | 1 | 2 | 3,
        security: 0 | 1 | 2 | 3,
        academicFreedom: 0 | 1 | 2 | 3,
        politicalStability: 0 | 1 | 2 | 3,
        development: 0 | 1 | 2 | 3,
        GDPR: 0 | 1 | 2 | 3,
        sanctions: 0 | 1 | 2 | 3,
        ruleOfLaw: 0 | 1 | 2 | 3
    }
}
```
## TODO

### Error Handling

Error handling and error message message display on all pages.

### Expanded form categories

Add expanded choice dependent selections on form page

### Risk calculation

Finish functions for risk calculation (if sensible before risk calculation is moved to back-end).

Unfinished portions are indicated by WIP, TODO and Placeholder comments in code.