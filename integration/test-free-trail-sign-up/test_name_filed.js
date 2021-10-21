
const nameField = 'input[id="name"]'
const typeText = 'abc'
const longName = 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'
const specialChar = '!!!!'
const num = '123'
const errorMessage = 'The name field is required'
const longCharMessage = 'The name field may not be greater than 255 characters'


describe('Test Name Field', () => {
    it('Go to url', () => {
        cy.visit(Cypress.env('testUrl'))
    })
    //Validate by using charactor 
    it('Input name with charactor',() => {
        cy.get(nameField).clear()
        cy.get(nameField).type(typeText)
        cy.get('form > span').should('not.exist')
    })

    //Validate by using charactor and number
    var currentTime = Date.now()
    const newName = 'kim'+currentTime
    it('Input name with char and num',() => {
        cy.get(nameField).clear()
        cy.get(nameField).type(newName)
        cy.get('form > span').should('not.exist')
    })
    //Validate by using number
    const NameNum = currentTime
    it('Input name with number',() => {
        cy.get(nameField).clear()
        cy.get(nameField).type(NameNum)
        cy.get('form > span').should('not.exist')
    })
    //Validate by using special charactor
    it('Input name with special charactor',() => {
        cy.get(nameField).clear()
        cy.get(nameField).type(specialChar)
        cy.get('form > span').should('not.exist')
    })
    //Validate by using charactor more than 255
    it('Name is too long',() => {
        cy.get(nameField).clear()
        cy.get(nameField).type(longName)
        cy.get('form > span').contains(longCharMessage)
    })
    //Name cannot empty
    it('Name is empty',() => {
        cy.get(nameField).clear()
        cy.get(nameField).type(" ")
        cy.get('form > span').contains(errorMessage)
    })
    
})
