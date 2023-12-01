import s3data from '../fixtures/s3-data.json'
import lambdas from '../fixtures/lambdas.json'

const lambdaPutObject: string = lambdas.fileGenerator
const fileBucketName:string = s3data.s3FileValidation.BucketName
const fileName:string = s3data.s3FileValidation.ObjectKey

describe('Regression Test Suite - File Validation', () => {
  it('create txt file using the lambda-s3-PutObjectFunction and validate the file exist and content', () => {

    const lambdaInvoke = {
      FunctionName: lambdaPutObject,
      InvocationType: 'RequestResponse',
      LogType: 'None',
      Qualifier: '$LATEST',
      Payload:
        '{}',
    };

    cy.lambdaInvoke(lambdaInvoke).then((resp) =>{
    expect(resp.StatusCode).eq(200)
      cy.existsObjectS3(fileBucketName, fileName).then((fileValidation) =>{
        if(fileValidation){
          cy.getObjectS3(fileBucketName,fileName).then((file) =>{
            expect(file.toString()).eq("Hello World")
          })
        }
        else
        throw new Error(`File doesn't exist`);
      })
    })
  })

  after(() =>{
    cy.deleteObjectS3(fileBucketName, fileName).then((del) =>{
      expect(del.$response.httpResponse.statusCode).eq(204)
    })
  })
})