const { defineConfig } = require('cypress');

/**
 * E2E tests for the p5.js Web Editor.
 * Run with: npm run test:e2e (headless) or npm run e2e (interactive).
 * Ensure the app is running (e.g. npm run start) on the port below.
 */
module.exports = defineConfig({
  e2e: {
    baseUrl: process.env.BASE_URL || 'http://localhost:8000',
    supportFile: 'cypress/support/e2e.js',
    specPattern: 'cypress/e2e/**/*.cy.js',
    viewportWidth: 1280,
    viewportHeight: 720,
    defaultCommandTimeout: 10000,
    requestTimeout: 10000,
    responseTimeout: 10000,
    // Pause between steps (ms) so you can watch when using cypress open. Example: CYPRESS_SLOW_MO=500 npm run e2e
    env: {
      slowMo: process.env.CYPRESS_SLOW_MO
        ? parseInt(process.env.CYPRESS_SLOW_MO, 10)
        : 0
    }
  }
});
