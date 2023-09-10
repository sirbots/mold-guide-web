describe('User Journey: Rate & Review a Practitioner', () => {


    
    it("the homepage intro content is correct", () => {
        // User lands on the homepage
        cy.visit("http://localhost:3000")
        
        // Click the Find Doctors button and go to the /practitioners listings page
        cy.getByData("hero-cta-txt").contains("Find Doctors").click()
        cy.location("pathname").should("equal", "/practitioners")

        // Filter for doctors in California
        cy.getByData("filter-form-doctors").find("select").eq(0).select("California")

        // Filter for non-Shoemaker doctors
        cy.getByData("filter-form-doctors").find("select").eq(1).select("Not Shoemaker Protocol")

        // Click on the first doctor listing
        cy.getByData("listings-container-doctors").eq(0).find("a").click()

        // Confirm you were taken to Dr. B's page
        cy.location("pathname").should("equal", "/practitioners/robin-a-bernhoft-ojai-ca")

        // Click the "Add a Review" button
        cy.get("a").contains("Add a Review").click()
 
        // Go to registration page
        cy.get("a").contains("register here").click()
        cy.location("pathname").should("equal", "/signup")

        // Create an account
        cy.getByData("name-input").type(`Test User ${Math.floor(Math.random() * 1000)}`)
        cy.getByData("email-input").type(`test+${Math.floor(Math.random() * 1000)}@test.com`)
        cy.getByData("password-input").type("password123")
        cy.getByData("submit-button").click()

        // Go back to Dr. B's page (they should be redirected automatically!)
        cy.location("pathname").should("equal", "/practitioners/robin-a-bernhoft-ojai-ca")

        // Fill out the review form 
        cy.getByData('input-title').clear().type("Test Review")
        cy.getByData("input-body").clear().type("A wonderful experience. I would recommend them to anyone in need of healing.")
        // TO DO: figure out handline for datalist options that don't exist under a <select> tag
        // cy.getByData("input-rating-datalist").select("3")
                
        // Submit the review
        cy.getByData("submit-button").click()

        // The review should be visible on the page
        cy.getByData("single-review").should("exist")
        cy.getByData("single-review-title").contains("Test Review")


        
    })
}) 
    
    
  