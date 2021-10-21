const emailField = 'input[id="company_email_address"]'
const confirmField = 'input[id="confirm_company_email_address"]'
const errorMessage = 'The confirm company email address field is required'
const invalidEmailMessage = 'The confirm company email address field must be a valid email'
const notMatchEmailMessage = 'The confirm company email address confirmation does not match'
const longId = 'bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb@bbb.bbb'
const emailTest = 'sawalee.k@candidate.manatal.com'


describe('Test Email Address Field', () => {
    it('Go to url', () => {
        cy.visit(Cypress.env('testUrl'))
    })
    it('Company email address is empty',() => {
        cy.get(confirmField).clear()
        cy.get(confirmField).type(" ")
        cy.get('form > span').contains(errorMessage)
    })
    //Validate comfirm email id by using special charactor
    it('Confirm id with special char',() => {
        cy.get(confirmField).clear()
        cy.get(confirmField).type("!@aaa.aaa")
        cy.get('form > span').contains(invalidEmailMessage).should('not.exist')
    })
    //Validate confirm email id by using bumber
    it('Confirm id with number',() => {
        cy.get(confirmField).clear()
        cy.get(confirmField).type("123@aaa.aaa")
        cy.get('form > span').contains(invalidEmailMessage).should('not.exist')
    })
    //Validate confirm email id by using charactor more than 64
    it('Confirm id with long id',() => {
        cy.get(confirmField).clear()
        cy.get(confirmField).type(longId)
        cy.get('form > span').contains(invalidEmailMessage).should('be.visible')
    })

    //Validate email id by using charactor and number
    //Create email address
    let date = new Date()
    let cDate = date.getDate()
    let currentTime = Date.now()
    const email = 'sawalee.k'+cDate+currentTime+'@candidate.manatal.com'
    it('Email id with char and number',() => {
        cy.get(confirmField).clear()
        cy.get(confirmField).type(email)
        cy.get('form > span').contains(invalidEmailMessage).should('not.exist')
    })
    //Validate Email
    //Create email
    const emails = (value) => {
        var email = ""
        var possible = "kim@.test"
        for (var i = 0; i < value; i++) {
            email += possible.charAt(Math.floor(Math.random() * possible.length))
        }
        return email
    }
    const validateEmail = (email) => {
        var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        return re.test(email);
    }
    for (let index = 0; index < 10; index++) {
        const TestEmail = emails(10)
        const EmailState = validateEmail(TestEmail)
        it("Validate email test"+" "+ TestEmail,() => {
            cy.get(emailField).clear()
            cy.get(confirmField).clear()
            cy.get(emailField).type(TestEmail)
            cy.get(confirmField).type(TestEmail)
            cy.wait(200)
            if(!EmailState){
                cy.get('form > span').contains(invalidEmailMessage).should('be.visible')
            }else{
                cy.get('form > span').should('not.exist')
            }
        })
    }
    //Validate email and match with company email
    it("Confirm email is match",() => {
        cy.get(emailField).clear()
        cy.get(emailField).type(emailTest)
        cy.get(confirmField).clear()
        cy.get(confirmField).type(emailTest)
        cy.get(emailField).invoke('val').then(emailAddress => {
            cy.get(confirmField).should('have.value', emailAddress)
        })
        cy.get('form > span').should('not.exist')  
    })
    it("Confirm email is not match",() => {
        cy.get(emailField).clear()
        cy.get(emailField).type(emailTest)
        cy.get(confirmField).clear()
        cy.get(confirmField).type(emailTest+'a')
        cy.get(emailField).invoke('val').then(emailAddress => {
            cy.get(confirmField).should('not.have.value', emailAddress)
        })
        cy.get('form > span').contains(notMatchEmailMessage).should('be.visible')
    })
    
})