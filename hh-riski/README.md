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



