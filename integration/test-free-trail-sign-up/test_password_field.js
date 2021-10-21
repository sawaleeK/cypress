const passwordField = 'input[id="password"]'
const switcherBt = 'button[class"password-switcher primary--text"]'
const longPassword = 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'
const errorMessage = 'The password field is required'
const longPassMessage = 'The password field may not be greater than 255 characters'
const testPassword = 'aaa'
describe('Test Work Radio Button', () => {
    it('Go to url', () => {
        cy.visit(Cypress.env('testUrl'))
    })
    //Validate by using text
    it('Input password with text',() => {
        cy.get(passwordField).clear()
        cy.get(passwordField).type("text")
        cy.get('form > span').should('not.exist')
    })
    //Validate by using number
    it('Input password with number',() => {
        cy.get(passwordField).clear()
        cy.get(passwordField).type("123")
        cy.get('form > span').should('not.exist')
    })
    //Validate by using special charactor
    it('Input password with special char',() => {
        cy.get(passwordField).clear()
        cy.get(passwordField).type("!!!")
        cy.get('form > span').should('not.exist')
    })
    //Password cannot empty
    it('Empty password',() => {
        cy.get(passwordField).clear()
        cy.get(passwordField).type(" ")
        cy.get('form > span').contains(errorMessage)
    })
    //Validate by using long password
    it('Password is too Long',() => {
        cy.get(passwordField).clear()
        cy.get(passwordField).type(longPassword)
        cy.get('form > span').contains(longPassMessage)
    })
    it('Password switcher',() => {
        cy.get(passwordField).clear()
        cy.get('input[type="password"]').type(testPassword)
        cy.get(passwordField +'[type="password"]').should('be.visible')
        cy.get('div > button').click()
        cy.get(passwordField +'[type="password"]').should('not.exist')
        cy.get(passwordField +'[type="text"]').should('be.visible')

    })
})