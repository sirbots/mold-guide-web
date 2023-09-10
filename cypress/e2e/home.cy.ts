describe('home page', () => {

  // You can use a beforeEach hook to run some code before each test in a spec file so you DRY
  beforeEach(() => {
    cy.visit("http://localhost:3000")
  })

  context("Hero Section", () => {
    // Each time you see it() within a given spec file that is a single test. 
    // You can write it as it.only() to only run that one test.

    it('the h1 contains the correct text"', () => {
      // cy.visit('http://localhost:3000') // removed this line because we are using beforeEach
      cy.getByData("hero-heading").contains('Mold Recovery Made Simple')
    })
    it("the homepage Hero CTA text is correct", () => {
      cy.visit("http://localhost:3000")
      // Rewrote the line below to use the new getByData command
      // cy.get("[data-test='hero-cta-txt']").contains("Find Doctors")
      cy.getByData("hero-cta-txt").contains("Find Doctors")
      
    })
  })

  context("Intro Content Section", () => {

    it("the homepage intro content is correct", () => {
      // .eq() can be used to select a specific element from a list of elements
      // .eq() can take a regex as an argument: 
      // regex example: cy.get('p').eq(1).contains(/.+debilitating.+ways/)
      cy.get('p').eq(0).contains("Mold illness can manifest in all sorts of strange and debilitating ways")
      cy.get('p').eq(1).contains("the process of detox and healing is a long one")
    })
  }) 
  
  context("Steps Section", () => {

    it("the step 1 CTA works", () => {
      cy.getByData("steps-container").find("a").contains("Find Doctors").click()
      cy.location("pathname").should("equal", "/practitioners")  
    })
    
    it("the step 2 CTA works", () => {
      cy.visit("http://localhost:3000")
      cy.getByData("steps-container").find("a").contains("Find Inspectors").click()
      cy.location("pathname").should("equal", "/inspection")  
    })

    it("the step 3 CTA works", () => {
      cy.visit("http://localhost:3000")
      cy.getByData("steps-container").find("a").contains("Find Remediators").click()
      cy.location("pathname").should("equal", "/remediation")  
    })
    it("the step 4 CTA works", () => {
      cy.visit("http://localhost:3000")
      cy.getByData("steps-container").find("a").eq(3).click()
      cy.location("pathname").should("equal", "/practitioners")  
    })


  })

  
})

