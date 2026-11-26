import 'dotenv/config';
import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests/azure',

  use: {
    baseURL: 'https://devhhsecurifrontendd.z1.web.core.windows.net/',
    headless: true,
  },
});
