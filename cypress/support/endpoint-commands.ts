Cypress.Commands.add('getEndpoint', (url: string, headers: object) => {
  return cy.request({
      url: url,
      method: 'GET',
      headers: headers,
      failOnStatusCode: false
  })
})