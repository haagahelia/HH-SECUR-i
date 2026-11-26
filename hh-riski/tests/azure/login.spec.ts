
import { test, expect } from '@playwright/test';

const passwordFromEnv = process.env.TEST_PASSWORD;

if (!passwordFromEnv) {
  throw new Error('TEST_PASSWORD puuttuu .env-tiedostosta');
}

test('Azure login page displays username and password fields', async ({ page }) => {
  await page.goto('/');

  await expect(
    page.getByRole('textbox', { name: 'Käyttäjänimi' })
  ).toBeVisible();

  await expect(
    page.getByRole('textbox', { name: 'Salasana' })
  ).toBeVisible();
});

test('Azure user can enter username and password', async ({ page }) => {
  await page.goto('/');

  const username = page.getByRole('textbox', { name: 'Käyttäjänimi' });
  const password = page.getByRole('textbox', { name: 'Salasana' });

  await username.fill('testuser');
  await password.fill(passwordFromEnv);

  await expect(username).toHaveValue('testuser');
  await expect(password).toHaveValue(passwordFromEnv);
});

test('Azure user cannot submit empty login form', async ({ page }) => {
  await page.goto('/');

  const username = page.getByRole('textbox', { name: 'Käyttäjänimi' });
  const password = page.getByRole('textbox', { name: 'Salasana' });

  await page.getByRole('button', { name: 'Kirjaudu sisään' }).click();

  await expect(username).toHaveAttribute('required', '');
  await expect(password).toHaveAttribute('required', '');
});

test('Azure invalid login shows error message', async ({ page }) => {
  await page.goto('/');

  await page.getByRole('textbox', { name: 'Käyttäjänimi' }).fill('invaliduser');
  await page.getByRole('textbox', { name: 'Salasana' }).fill('wrongpassword');

  await page.getByRole('button', { name: 'Kirjaudu sisään' }).click();

  await expect(
    page.getByText('Virheellinen käyttäjänimi tai salasana.')
  ).toBeVisible();
});

test('Azure user can show and hide password', async ({ page }) => {
  await page.goto('/');

  const password = page.getByRole('textbox', { name: 'Salasana' });

  await password.fill(passwordFromEnv);

  await page.getByRole('button', { name: 'Show password' }).click();

  await expect(password).toHaveAttribute('type', 'text');

  await page.getByRole('button', { name: 'Hide password' }).click();

  await expect(password).toHaveAttribute('type', 'password');
});


test('Azure user can complete and save risk form', async ({ page }) => {
  await page.goto('/login');

  // Kirjautuminen
  await page.getByRole('textbox', { name: 'Käyttäjänimi' }).fill('pasi13');
  await page.getByRole('textbox', { name: 'Salasana' }).fill(process.env.TEST_PASSWORD!);
  await page.getByRole('button', { name: 'Kirjaudu sisään' }).click();

  // Projektin perustiedot
  await page.getByRole('textbox', { name: 'Projektin nimi' }).fill('Playwright testiprojekti');

  await page.getByRole('option', { name: 'Valitse projektin omistaja' }).click();
  await page.getByRole('option', { name: 'pasi13' }).click();

  // Yhteistyön tiedot
  await page.getByRole('radio', { name: 'Kumppani tai tasaveroinen' }).check();
  await page.getByRole('radio', { name: 'Kahdenvälinen' }).check();

  // Sijaintimaa ja organisaatio
  await page.getByRole('option', { name: 'Valitse sijaintimaa' }).click();
  await page.getByRole('option', { name: 'Filippiinit' }).click();

  await page.getByRole('combobox', { name: 'Organisaatio' }).click();
  await page.getByRole('option', { name: 'Adventist International' }).click();

  // Organisaation tiedot
  await page.getByRole('listitem')
    .filter({ hasText: 'Onko yhteistyöorganisaation' })
    .getByLabel('Ei').check();

  await page.getByRole('radio', { name: 'Yliopisto' }).check();

  await page.getByRole('listitem')
    .filter({ hasText: 'Onko kirjallinen sopimus' })
    .getByLabel('Kyllä').check();

  // Yhteistyön muodot
  await page.getByRole('checkbox', { name: 'TKI-yhteistyö' }).check();
  await page.getByRole('checkbox', { name: 'Koulutusvienti' }).check();
  await page.getByRole('checkbox', { name: 'Koulutus/opetusyhteistyö' }).check();

  // Yhteistyöhön liittyvä kysymys
  await page.getByRole('listitem')
    .filter({ hasText: 'Sisältyykö yhteistyöhön' })
    .getByLabel('Kyllä', { exact: true }).check();

  // Taloudellinen arvo
  await page.getByRole('radio', { name: '-20.000' }).check();

  // Henkilötiedot
  await page.getByRole('listitem')
    .filter({ hasText: 'Onko mahdollista, että yhteistyössä siirretään henkilötietoja yhteistyö' })
    .getByLabel('Kyllä').check();

  // Sotilaskäyttöön soveltuva teknologia
  await page.getByRole('listitem')
    .filter({ hasText: 'Onko mahdollista, että yhteistyössä siirtyy sotilaskäyttöön soveltuvaa' })
    .getByLabel('Kyllä').check();

  // Eettiset riskit ja yhteistyön kesto
  await page.getByRole('radio', { name: 'Ei missään tapauksessa' }).check();
  await page.getByRole('radio', { name: '-24 kk' }).check();

  // Lisätiedot
  await page.getByRole('textbox', { name: 'Lisätietoja' })
    .fill('Automaattinen Playwright-testi');

  // Tallennus
  await page.getByRole('button', { name: 'Tallenna' }).click();

  // Tarkistetaan tallennuksen jälkeinen näkymä
  await expect(page.getByText('Playwright testiprojekti')).toBeVisible();
});
