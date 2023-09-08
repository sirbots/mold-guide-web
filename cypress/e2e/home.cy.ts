describe('home page', () => {

  // You can use a beforeEach hook to run some code before each test in a spec file so you DRY
  beforeEach(() => {
    cy.visit("http://localhost:3000")
  })

  // Each time you see it() within a given spec file that is a single test. 
  // You can write it as it.only() to only run that one test.
  it('the h1 contains the correct text"', () => {
    // cy.visit('http://localhost:3000') // removed this line because we are using beforeEach
    cy.get("[data-test='hero-heading']").contains('Mold Recovery Made Simple')
  })

  it("the homepage Hero CTA text is correct", () => {
    cy.visit("http://localhost:3000")
    cy.get("[data-test='hero-cta-txt']").contains("Find Doctors")
    
  })
  it("the homepage content is correct", () => {
    // .eq() can be used to select a specific element from a list of elements
    cy.get('p').eq(0).contains("not feeling great")
    // .eq() can take a regex
    cy.get('p').eq(1).contains(/.+debilitating.+ways/)
  })
  
})