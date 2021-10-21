import { waitForDebugger } from "inspector";


// test_free_trial_sign_up.js created with Cypress
//
// Start writing your Cypress tests below!
// If you're unfamiliar with how Cypress works,
// check out the link below and learn how to write your first test:
// https://on.cypress.io/writing-first-test


const name = 'Kim'
const organization = "Kimmy Studio 1234"
const password = "1234"
const phone = "0929946416"
const nameField = 'input[id="name"]'
const organizationField = 'input[id="organization_name"]'
const agencyBt = 'input[id="agency"]'
const emailField = 'input[id="company_email_address"]'
const confirmField = 'input[id="confirm_company_email_address"]'
const passField = 'input[id="password"]'
const phoneField = 'input.vti__input'
const checkAgree = 'input[id="agree"]'
const successMes = 'Confirm your e-mail address'
const errorSignUp = 'User with this email address already exists.'


describe('Test Free Trial Sign Up Form', () => {
    //Create email address
    let date = new Date()
    let cDate = date.getDate()
    let currentTime = Date.now()
    const email = 'sawalee.k'+cDate+currentTime+'@candidate.manatal.com'

    it('Go to url', () => {
        cy.visit(Cypress.env('testUrl'))
    })
    it('Is validate form',() => {
        cy.get(nameField).type(name)
        cy.get(organizationField).type(organization)
        cy.get(agencyBt).click()
        cy.get(emailField).type(email)
        cy.get(confirmField).type(email)
        cy.get(passField).type(password)
        cy.get(phoneField).type(phone)
        cy.get(checkAgree).click()
        cy.get('button[type="submit"]').should('be.visible')
        //Validate require field 
        cy.get(nameField).invoke('val').should('not.be.empty')
        cy.get(organizationField).invoke('val').should('not.be.empty')
        cy.get(agencyBt).should('be.checked')
        cy.get(emailField).invoke('val').should('not.be.empty')
        cy.get(confirmField).invoke('val').should('not.be.empty')
        cy.get(checkAgree).should('be.checked')
        cy.get('form').submit()
        cy.get('h5').contains(successMes).should('be.visible')
        cy.get('h6 > b').contains(email).should('be.visible')

    })
    //Sign up with email that already exist
    it('Sign up exist email', () =>{
        cy.visit(Cypress.env('testUrl'))

        cy.get(nameField).type(name)
        cy.get(organizationField).type(organization)
        cy.get(agencyBt).click()
        cy.get(emailField).type(email)
        cy.get(confirmField).type(email)
        cy.get(passField).type(password)
        cy.get(phoneField).type(phone)
        cy.get(checkAgree).click()
        cy.get('button[type="submit"]').should('be.visible')
        //Validate require field 
        cy.get(nameField).invoke('val').should('not.be.empty')
        cy.get(organizationField).invoke('val').should('not.be.empty')
        cy.get(agencyBt).should('be.checked')
        cy.get(emailField).invoke('val').should('not.be.empty')
        cy.get(confirmField).invoke('val').should('not.be.empty')
        cy.get(checkAgree).should('be.checked')
        cy.get('form').submit()
        Cypress.on('uncaught:exception', (err, runnable) => {
            return false;
        });
        cy.get('.toast-error-message', { timeout: 5000 }).find('p').should('contain', errorSignUp)
        cy.get('h5').contains(successMes).should('not.exist')
        cy.get('h6').contains(email).should('not.exist')
        
    })
})

