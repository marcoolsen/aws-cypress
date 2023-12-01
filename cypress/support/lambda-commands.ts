import { config, Lambda } from 'aws-sdk';
import { AWS_CONFIG } from './aws-config';

config.update(AWS_CONFIG);

const lambda = new Lambda();

Cypress.Commands.add('lambdaInvoke', (params: Lambda.InvocationRequest) => {
    return new Cypress.Promise((resolve, reject): void => {
      lambda.invoke(params, (error, data) => {
        if (error) {
          error.code === 'TooManyRequestsException'
            ? resolve(error)
            : reject(error);
        } else {
          resolve(data);
        }
      });
    });
  });
