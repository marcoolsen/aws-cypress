declare namespace Cypress {
    interface Chainable {
        lambdaInvoke(params: Lambda.InvocationRequest): Promise<Response>
        getObjectS3(Bucket: S3.BucketName, Key: S3.ObjectKey): Promise<Buffer>
        existsObjectS3(Bucket: S3.BucketName, Key: S3.ObjectKey): Promise<Boolean>
        deleteObjectS3(Bucket: S3.BucketName, Key: S3.ObjectKey): Promise<Response>
        getEndpoint(url: string, headers: object): Chainable<Response>
    }
}