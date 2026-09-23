import { test, expect } from '@playwright/test';

test('login page displays username and password fields', async ({ page }) => {
  await page.goto('https://hh-riski-main-hh-secur-i-frontend.2.rahtiapp.fi/');

  await expect(
    page.getByRole('textbox', { name: 'Käyttäjänimi' })
  ).toBeVisible();

  await expect(
    page.getByRole('textbox', { name: 'Salasana' })
  ).toBeVisible();
});

test('user can enter username and password', async ({ page }) => {
  await page.goto(
    'https://hh-riski-main-hh-secur-i-frontend.2.rahtiapp.fi/'
  );

  await page.getByRole('textbox', { name: 'Käyttäjänimi' }).click();
  await page.getByRole('textbox', { name: 'Käyttäjänimi' }).fill('testuser');

  await page.getByRole('textbox', { name: 'Salasana' }).click();
  await page.getByRole('textbox', { name: 'Salasana' }).fill('testpasword');

  await expect(
    page.getByRole('textbox', { name: 'Käyttäjänimi' })
  ).toHaveValue('testuser');

  await expect(
    page.getByRole('textbox', { name: 'Salasana' })
  ).toHaveValue('testpasword');
});


test('user can log in', async ({ page }) => {
  await page.goto(
    'https://hh-riski-main-hh-secur-i-frontend.2.rahtiapp.fi/'
  );

  await page.getByRole('textbox', { name: 'Käyttäjänimi' }).fill('username');

  await page.getByRole('textbox', { name: 'Salasana' }).fill('password');

  await expect(
    page.getByRole('textbox', { name: 'Käyttäjänimi' })
  ).toHaveValue('username');

  await expect(
    page.getByRole('textbox', { name: 'Salasana' })
  ).toHaveValue('password');

  await page.getByRole('button', { name: 'Kirjaudu' }).click();

  
  await expect(page).not.toHaveURL(
    'https://hh-riski-main-hh-secur-i-frontend.2.rahtiapp.fi/'
  );
});


test('successful login displays user page', async ({ page }) => {
  await page.goto(
    'https://hh-riski-main-hh-secur-i-frontend.2.rahtiapp.fi/'
  );

  await page.getByRole('textbox', { name: 'Käyttäjänimi' }).fill('pekka13');

  await page.getByRole('textbox', { name: 'Salasana' }).fill('Aamukahv!');

  await page.getByRole('button', { name: 'Kirjaudu' }).click();

  await expect(
    page.getByRole('heading', { name: 'Käyttäjä' })
  ).toBeVisible();

  await expect(
    page.getByRole('heading', { name: 'pekka13' })
  ).toBeVisible();

  await expect(
    page
      .getByRole('region', { name: 'Käyttäjä' })
      .getByRole('button', { name: 'Kirjaudu ulos' })
  ).toBeVisible();
});


test('user can show and hide password', async ({ page }) => {
  await page.goto(
    'https://hh-riski-main-hh-secur-i-frontend.2.rahtiapp.fi/'
  );

  const password = page.getByRole('textbox', { name: 'Salasana' });

  await password.fill('testpassword');

  await page.getByRole('button', { name: 'Show password' }).click();

  await expect(password).toHaveAttribute('type', 'text');

  await page.getByRole('button', { name: 'Hide password' }).click();

  await expect(password).toHaveAttribute('type', 'password');
});


test('user cannot submit empty login form', async ({ page }) => {
  await page.goto(
    'https://hh-riski-main-hh-secur-i-frontend.2.rahtiapp.fi/'
  );

  const username = page.getByRole('textbox', { name: 'Käyttäjänimi' });
  const password = page.getByRole('textbox', { name: 'Salasana' });

  await page.getByRole('button', { name: 'Kirjaudu sisään' }).click();

  await expect(username).toHaveAttribute('required', '');
  await expect(password).toHaveAttribute('required', '');
});



test('invalid login shows error message', async ({ page }) => {
  await page.goto(
    'https://hh-riski-main-hh-secur-i-frontend.2.rahtiapp.fi/'
  );

  await page.getByRole('textbox', { name: 'Käyttäjänimi' }).fill('user');
  await page.getByRole('textbox', { name: 'Salasana' }).fill('password');

  await page.getByRole('button', { name: 'Kirjaudu sisään' }).click();

  await expect(
    page.getByText('Virheellinen käyttäjänimi tai salasana.')
  ).toBeVisible();
});



test('user can change the language', async ({ page }) => {
  await page.goto(
    'https://hh-riski-main-hh-secur-i-frontend.2.rahtiapp.fi/'
  );

  // Change from Finnish to English
  await page.getByRole('button', { name: 'FI' }).click();

  await expect(
    page.getByRole('heading', { name: 'Sign in' })
  ).toBeVisible();

  await expect(
    page.getByRole('textbox', { name: 'Username' })
  ).toBeVisible();

  await expect(
    page.getByRole('textbox', { name: 'Password' })
  ).toBeVisible();

  // Change back to Finnish
  await page.getByRole('button', { name: 'EN' }).click();

  await expect(
    page.getByRole('heading', { name: 'Kirjaudu sisään' })
  ).toBeVisible();

  await expect(
    page.getByRole('textbox', { name: 'Käyttäjänimi' })
  ).toBeVisible();

  await expect(
    page.getByRole('textbox', { name: 'Salasana' })
  ).toBeVisible();
});

// Testaa, että sovellus näyttää virheilmoituksen, kun login-palvelu ei ole käytettävissä

test('shows error when login service is unavailable', async ({ page }) => {
  await page.route(
    'https://hh-secur-be-git-main-hh-secur-i-backend.2.rahtiapp.fi/login',
    async route => {
      await route.fulfill({
        status: 500,
        contentType: 'application/json',
        body: JSON.stringify({
          message: 'Internal Server Error'
        })
      });
    }
  );

  await page.goto(
    'https://hh-riski-main-hh-secur-i-frontend.2.rahtiapp.fi/'
  );

  await page.getByRole('textbox', { name: 'Käyttäjänimi' }).fill('username');
  await page.getByRole('textbox', { name: 'Salasana' }).fill('password');

  await page.getByRole('button', { name: 'Kirjaudu sisään' }).click();

  await expect(page.getByRole('alert')).toBeVisible();
});