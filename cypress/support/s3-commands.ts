
import { config, S3 } from 'aws-sdk';
import { AWS_CONFIG } from './aws-config';

config.update(AWS_CONFIG);

const s3 = new S3();

Cypress.Commands.add(
    'getObjectS3',
    async (Bucket: S3.BucketName, Key: S3.ObjectKey): Promise<Buffer> => {
      return s3
        .getObject({
          Bucket,
          Key,
        })
        .promise()
        .then(data => {
          return data.Body as Buffer;
        })
        .catch(error => {
          cy.log('GetObject failed', { Bucket, Key });
          throw error;
        });
    },
  );

  Cypress.Commands.add(
    'existsObjectS3',
    async (Bucket: S3.BucketName, Key: S3.ObjectKey): Promise<boolean> => {
      try {
        await s3
          .headObject({
            Bucket,
            Key,
          })
          .promise();
  
        return true;
      } catch (error) {
        return false;
      }
    },
  );

  Cypress.Commands.add(
    'deleteObjectS3',
    async (
      Bucket: S3.BucketName,
      Key: S3.ObjectKey,
    ): Promise<S3.DeleteObjectOutput> =>
      s3.deleteObject({ Bucket, Key }).promise(),
);
  