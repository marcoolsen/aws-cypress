import * as https from 'https';

export const AWS_CONFIG = {
  accessKeyId: Cypress.env('ACCESS_KEY_ID'),
  secretAccessKey: Cypress.env('AWS_SECRET_ACCESS_KEY'),
  region: Cypress.env('AWS_REGION') || 'us-east-1',
  maxRetries: 1,
  dynamoDbCrc32: false,
  httpOptions: {
    agent: new https.Agent({
      keepAlive: true,
      maxSockets: 50,
      rejectUnauthorized: true,
    }),
  },
};
