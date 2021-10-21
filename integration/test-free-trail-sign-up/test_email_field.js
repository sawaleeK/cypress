
const emailField = 'input[id="company_email_address"]'
const errorMessage = 'The company email address field is required'
const longId = 'bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb@bbb.bbb'
const invalidEmailMessage = 'The company email address field must be a valid email'


describe('Test Email Address Field', () => {
    it('Go to url', () => {
        cy.visit(Cypress.env('testUrl'))
    })
    //Email cannot empty
    it('Email address is empty',() => {
        cy.get(emailField).clear()
        cy.get(emailField).type(" ")
        cy.get('form > span').contains(errorMessage)
    })
    //Validate email id by using special charactor
    it('Email id with special char',() => {
        cy.get(emailField).clear()
        cy.get(emailField).type("!@aaa.aaa")
        cy.get('form > span').should('not.exist')
    })
    //Validate email id by using bumber
    it('Email id with number',() => {
        cy.get(emailField).clear()
        cy.get(emailField).type("123@aaa.aaa")
        cy.get('form > span').should('not.exist')
    })
    //Validate email id by using charactor more than 64
    it('Email id with long id',() => {
        cy.get(emailField).clear()
        cy.get(emailField).type(longId)
        cy.get('form > span').contains(invalidEmailMessage)
    })

    //Validate email id by using charactor and number
    //Create email address
    let date = new Date()
    let cDate = date.getDate()
    let currentTime = Date.now()
    const email = 'sawalee.k'+cDate+currentTime+'@candidate.manatal.com'
    it('Email id with char and number',() => {
        cy.get(emailField).clear()
        cy.get(emailField).type(email)
        cy.get('form > span').should('not.exist')
    })

    //Validate email
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
            cy.get(emailField).type(TestEmail)
            if(!EmailState){
                cy.get('form > span').contains(invalidEmailMessage).should('be.visible')
            }else{
                cy.get('form > span').should('not.exist')
            }
        })
    }
    
})
