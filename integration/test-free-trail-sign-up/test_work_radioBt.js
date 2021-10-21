
const agencyBt = 'input[id="agency"]'
const companyBt = 'input[id="company"]'

describe('Test work radio button', () => {
    it('Go to url', () => {
        cy.visit(Cypress.env('testUrl'))
    })
    //Validate default
    it('Default is agency', () => {
        cy.get(agencyBt).should('be.checked')
    })
    it('Check company', () => {
        cy.get(companyBt).check()
        cy.get(companyBt).should('be.checked')
        cy.get(agencyBt).should('not.be.checked')
    })
    it('Check agency', () => {
        cy.get(agencyBt).check()
        cy.get(agencyBt).should('be.checked')
        cy.get(companyBt).should('not.be.checked')
    })

})