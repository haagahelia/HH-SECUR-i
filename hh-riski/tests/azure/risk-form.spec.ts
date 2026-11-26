
import { test, expect } from '@playwright/test';

test('Azure user can complete and save risk form', async ({ page }) => {
  // 1. Kirjautuminen
  await page.goto('/login');

  await page.getByRole('textbox', { name: 'Käyttäjänimi' }).fill('pasi13');

  await page.getByRole('textbox', { name: 'Salasana' })
    .fill(process.env.TEST_PASSWORD!);

  await page.getByRole('button', { name: 'Kirjaudu sisään' }).click();

  // 2. Projektin perustiedot
  await page.getByRole('textbox', { name: 'Projektin nimi' }).fill('testi');

  // Projektin omistaja
  const dropdowns = page.getByRole('combobox');

  await dropdowns.nth(0).click();
  await page.getByRole('option', { name: 'pasi13' }).click();

  await page.getByRole('radio', { name: 'Yhteistyön koordinaattori' }).check();
  await page.getByRole('radio', { name: 'Kahdenvälinen' }).check();

  // 3. Sijaintimaa
  await dropdowns.nth(1).click();
  await page.getByRole('option', { name: 'Albania' }).click();

  // 4. Organisaatio
  await page.getByRole('combobox', { name: 'Organisaatio' }).click();
  await page.getByRole('option', { name: 'Albanian University' }).click();

  // 5. Yhteistyöorganisaation tiedot
  await page.getByRole('listitem')
    .filter({ hasText: 'Onko yhteistyöorganisaation' })
    .getByLabel('Kyllä')
    .check();

  await page.getByRole('radio', { name: 'Muu tutkimuslaitos' }).check();

  await page.getByRole('listitem')
    .filter({ hasText: 'Onko kirjallinen sopimus' })
    .getByLabel('Kyllä')
    .check();

  // 6. Yhteistyön sisältö
  await page.getByRole('checkbox', { name: 'Koulutusvienti' }).check();
  await page.getByRole('checkbox', { name: 'Kansainvälinen henkilöstö' }).check();

  await page.getByRole('listitem')
    .filter({ hasText: 'Sisältyykö yhteistyöhön' })
    .getByLabel('Ei', { exact: true })
    .check();

  // 7. Taloudelliset tiedot
  await page.getByRole('radio', { name: '-50.000' }).check();

  // 8. Riskikysymykset
  await page.getByRole('listitem')
    .filter({
      hasText: 'Onko mahdollista, että yhteistyössä siirretään henkilötietoja yhteistyö'
    })
    .getByLabel('Ei', { exact: true })
    .check();

  await page.getByRole('listitem')
    .filter({
      hasText: 'Onko mahdollista, että yhteistyössä siirtyy sotilaskäyttöön soveltuvaa'
    })
    .getByLabel('Ei', { exact: true })
    .check();

  await page.getByRole('radio', { name: 'Melko varmasti ei' }).check();
  await page.getByRole('radio', { name: '-24 kk' }).check();

  // 9. Lisätiedot ja tallennus
  await page.getByRole('textbox', { name: 'Lisätietoja' }).fill('tämä on testi');

  await page.getByRole('button', { name: 'Tallenna' }).click();

  // 10. Tarkistetaan riskinarvionäkymä
  await expect(
    page.getByRole('heading', { name: 'Riskiarvio', level: 1 })
  ).toBeVisible();

  await expect(
    page.getByRole('heading', { name: 'Yhteistyön riskit' })
  ).toBeVisible();

  await expect(
    page.getByText('Yhteistyön kokonaisriskiarvio', { exact: true })
  ).toBeVisible();

  // 11. Tarkistetaan tallennetut projektitiedot
  await expect(page.getByText('testi', { exact: true })).toBeVisible();
  await expect(page.getByText('pasi13', { exact: true }).first()).toBeVisible();

  // 12. Tarkistetaan kokonaisriskin arvo
  await expect(page.getByText('2', { exact: true }).first()).toBeVisible();
});
