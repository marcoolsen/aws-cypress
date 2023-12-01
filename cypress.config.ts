import { defineConfig } from "cypress";
import dotenv from 'dotenv'

const { beforeRunHook, afterRunHook } = require('cypress-mochawesome-reporter/lib');

dotenv.config()

export default defineConfig({
  video: false,
  screenshotOnRunFailure: true,
  reporter: 'cypress-mochawesome-reporter',
  viewportWidth: 1440,
  viewportHeight: 1024,
  chromeWebSecurity: false,
  reporterOptions: {
    charts: true,
    overwrite: true,
    reportPageTitle: 'Cypress - AWS Test Report',
    embeddedScreenshots: true,
    inlineAssets: true, //Adds the asserts inline
    reportDir: 'cypress/report',
    json: true,
    html: true,
    code: false,
    showSkipped: false,
    showPending: false,
},
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
      require('cypress-mochawesome-reporter/plugin')(on);
      on('before:run', async (details) => {
        console.log('override before:run');
        await beforeRunHook(details);
      });

      on('after:run', async () => {
        console.log('override after:run');
        await afterRunHook();
      });
      config.env.ACCESS_KEY_ID = process.env.ACCESS_KEY_ID
      config.env.AWS_SECRET_ACCESS_KEY = process.env.AWS_SECRET_ACCESS_KEY
      config.env.AWS_REGION = process.env.AWS_REGION
      return config
    },
  },
});
