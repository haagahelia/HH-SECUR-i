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

#### /results
Risk assessment page

#### /my-assessments
Page for managing your assessments.

#### /user
Temporary page for user management.

## Shared components

### Navbar
Upper and lower navigation bars.

## Contexts




