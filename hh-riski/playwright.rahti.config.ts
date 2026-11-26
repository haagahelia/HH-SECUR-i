import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests/rahti',
  use: {
    baseURL: 'https://hh-riski-main-hh-secur-i-frontend.2.rahtiapp.fi/',
    headless: true,
  },
});
