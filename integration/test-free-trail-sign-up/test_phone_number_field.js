const dropdownBt = 'div.vti__dropdown'
const dropdownTable = 'ul.vti__dropdown-list'
const phoneField = 'input.vti__input'
const zero1 = "0929946416"
const zero2 = "0929946416789"
const num1 = "123456789"
const num2 = "1234567891099"
const errorMessage = 'Enter a valid phone number'
describe('Test Phone Number Field', () => {
    it('Go to url', () => {
        cy.visit(Cypress.env('testUrl'))
    })
    //Test by using invalid
    it('Test phone number with invalid number',() => {
        //Type text in phone number field
        cy.get(phoneField).clear()
        cy.get(phoneField).type(zero2, { force: true })
        cy.wait(200)
        cy.get('form > span').contains(errorMessage).should('be.visible')
        cy.get(phoneField).clear()
        cy.get(phoneField).type(num2, { force: true })
        cy.wait(200)
        cy.get('form > span').contains(errorMessage).should('be.visible')

    })
    //Test by using valid number
    it('Test phone number with valid number',() => {
        //Type text in phone number field
        cy.get(phoneField).clear()
        cy.get(phoneField).type(zero1, { force: true })
        cy.get('span').contains(errorMessage).should('not.exist')
        cy.get(phoneField).clear()
        cy.get(phoneField).type(num1, { force: true })
        cy.get('span').contains(errorMessage).should('not.exist')

    })
    //Test dropdown button
    it('Test dropdown', () => {
        cy.get(dropdownBt).should('be.visible')
        //Click dropdown
        cy.get(dropdownBt).click()
        cy.get(dropdownBt+'.open').should('be.visible')
        cy.get(dropdownTable).should('be.visible')
    })
    //Phone field can be empty
    it('Test phone number',() => {
        //Type text in phone number field
        cy.get(phoneField).clear()
        cy.get(phoneField).type('text')
        cy.get(phoneField).should('not.have.value')

    })
})