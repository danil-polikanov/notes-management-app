import { defineConfig } from 'cypress';
import * as dotenv from 'dotenv';

dotenv.config();

export default defineConfig({
    e2e: {
        baseUrl: process.env.VITE_Cypress_BaseUrl,
        specPattern: 'cypress/e2e/**/*.cy.ts',
    },
});
