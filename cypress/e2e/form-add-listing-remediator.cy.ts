describe('Add Remediator Form', () => {
  beforeEach(() => {
    // Go to the Add Listing page
    cy.visit("http://localhost:3000/add-listing")
    // Click the Remediators button to switch to that form
    cy.get('button').contains('Remediators').click()
  })

  it('the h1 contains the correct text"', () => {
    cy.getByData("add-listing-headline").contains('Add a Listing to the Directory')
  })

  it('the Remediators Form H2 has the correct text', () => {
    cy.get('h2').contains('Add a Remediator')
  })
    
  it("allows users to submit a Remediator", () => {
    cy.getByData('companyName-input').type(`Test Company ${Math.floor(Math.random() * 1000)}`)
    cy.getByData('phoneNumber-input').type('310-555-9878')
    cy.getByData('website-input').type('test.com')
    cy.getByData('addressStreet-input').type('1234 Main St')
    cy.getByData('addressUnit-input').type('Unit 5')
    cy.getByData('addressCity-input').type('Los Alamos')
    cy.getByData('addressState-input').type('NM')
    cy.getByData('addressZipcode-input').type('99321')
    cy.getByData('addressCountry-input').clear().type('USA')
    cy.getByData('bio-input').type('This is a great company. They do great work.\n\nThey are the best. They did a great job for my home. No more mold!\n\nI highly recommend them.')
    cy.getByData('submit-button').click() 
  })

}) 