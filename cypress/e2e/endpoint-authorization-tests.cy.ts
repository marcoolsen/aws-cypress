import endpoints from '../fixtures/endpoints.json'
import authData from '../fixtures/auth-data.json'

const authAPI: string = endpoints.authorizerApiToken
const validAccess: object = authData.valid
const denyAccess: object = authData.deny
const unauthorizedAccess: object = authData.unauthorized
const wrongAccess: object = authData.wrong

describe('Regression Test Suite - Endpoint Validation', () => {
  it('review response for auth endpoint using a valid token ', () => {
    cy.getEndpoint(authAPI,validAccess).then((response) =>{
        expect(response.status).eq(200)
        expect(response.isOkStatusCode).eq(true)
        expect(response.body).exist
        expect(response.headers).exist
        expect(response.body.requestContext.accountId).eq("237368821042")
        expect(response.body.requestContext.apiId).eq("kxny72quge")
        expect(response.body.requestContext.stage).eq("Prod")
    })
  })

  it('review response for auth endpoint using a deny token ', () => {
    cy.getEndpoint(authAPI,denyAccess).then((response) =>{
        expect(response.status).eq(403)
        expect(response.isOkStatusCode).eq(false)
        expect(response.statusText).eq("Forbidden")
        expect(response.body.Message).eq("User is not authorized to access this resource with an explicit deny")
    })
  })

  it('review response for auth endpoint using a unauthorized token ', () => {
    cy.getEndpoint(authAPI,unauthorizedAccess).then((response) =>{
        expect(response.status).eq(401)
        expect(response.isOkStatusCode).eq(false)
        expect(response.statusText).eq("Unauthorized")
        expect(response.body.message).eq("Unauthorized")
    })
  })

  it('review response for auth endpoint using a wrong token ', () => {
    cy.getEndpoint(authAPI,wrongAccess).then((response) =>{
        expect(response.status).eq(500)
        expect(response.isOkStatusCode).eq(false)
        expect(response.statusText).eq("Internal Server Error")
        expect(response.body.message).to.be.null
    })
  })

  it('review response for auth endpoint without header ', () => {
    cy.getEndpoint(authAPI,{}).then((response) =>{
        expect(response.status).eq(401)
        expect(response.isOkStatusCode).eq(false)
        expect(response.statusText).eq("Unauthorized")
        expect(response.body.message).eq("Unauthorized")
    })
  })

})