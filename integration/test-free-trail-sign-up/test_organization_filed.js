
const organizationField = 'input[id="organization_name"]'
const longName = 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'
const specialChar = '!!!!'
const typeText = 'abc'
const num = '123'
const errorMessage = 'The organization name field is required'
const longCharMessage = 'The organization name field may not be greater than 255 characters'



describe('Test Organization Field', () => {
    it('Go to url', () => {
        cy.visit(Cypress.env('testUrl'))
    })
    //Organization cannot empty
    it('Organization is empty',() => {
        cy.get(organizationField).clear()
        cy.get(organizationField).type(" ")
        cy.get('form > span').contains(errorMessage)
    })
    //Validate by using charactor more than 255
    it('Organozation is too long',() => {
        cy.get(organizationField).clear()
        cy.get(organizationField).type(longName)
        cy.get('form > span').contains(longCharMessage)
    })
    //Validate by using charactor and number
    var currentTime = Date.now()
    const newCompanyName = 'kimmyStudio'+currentTime
    it('Organization with char and num',() => {
        cy.get(organizationField).clear()
        cy.get(organizationField).type(newCompanyName)
        cy.get('form > span').should('not.exist')
    })
    //Validate by using number
    const numName = currentTime
    it('Organization with number',() => {
        cy.get(organizationField).clear()
        cy.get(organizationField).type(numName)
        cy.get('form > span').should('not.exist')
    })
    //Validate by using charactor
    it('Organization with charactor',() => {
        cy.get(organizationField).clear()
        cy.get(organizationField).type(typeText)
        cy.get('form > span').should('not.exist')
    })
    //Validate by using special charactor
    it('Organization with special charactor',() => {
        cy.get(organizationField).clear()
        cy.get(organizationField).type(specialChar)
        cy.get('form > span').should('not.exist')
    })
})