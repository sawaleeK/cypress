

const inputAgree = 'input[id="agree"]'
const agreeErrorMessage = 'The agree field is required'
describe('Test Work Radio Button', () => {
    it('Go to url', () => {
        cy.visit(Cypress.env('testUrl'))

    })
    it('Check agree policy & terms and condition', () => {
        cy.get(inputAgree).click()
        cy.get(inputAgree).should('be.checked')
       
    })
    it('Uncheck agree policy & terms and condition', () => {
        cy.get(inputAgree).check({ force: true})
        cy.get(inputAgree).click()
        cy.get(inputAgree).should('not.be.checked')
        cy.get('form > span').contains(agreeErrorMessage).should('be.visible')
    })
    
    
})