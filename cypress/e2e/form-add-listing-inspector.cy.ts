describe('Add Inspector Form', () => {
  beforeEach(() => {
    // Go to the Add Listing page
    cy.visit("http://localhost:3000/add-listing")
    // Click the Inspectors button to switch to that form
    cy.get('button').contains('Inspectors').click()
  })

  it('the h1 contains the correct text"', () => {
    cy.getByData("add-listing-headline").contains('Add a Listing to the Directory')
  })

  it('the Inspectors Form H2 has the correct text', () => {
    cy.get('h2').contains('Add an Inspector')
  })
    
  it("allows users to submit an Inspector", () => {
    cy.getByData('companyName-input').type(`Test Company ${Math.floor(Math.random() * 1000)}`)
    cy.getByData('phoneNumber-input').type('310-555-9878')
    cy.getByData('website-input').type('test.com')
    cy.getByData('addressStreet-input').type('1234 Main St')
    cy.getByData('addressUnit-input').type('Unit 5')
    cy.getByData('addressCity-input').type('Los Alamos')
    cy.getByData('addressState-input').type('NM')
    cy.getByData('addressZipcode-input').type('99321')
    cy.getByData('addressCountry-input').clear().type('USA')
    cy.getByData('certifications-input-acac').check()
    cy.getByData('certifications-input-iirc').check()
    cy.getByData('certifications-input-other').check()
    cy.getByData('certifications-input-other-text').type('Certification 1, Certification 2, Certification 3')
    cy.getByData('bio-input').type('This is a great company. They do great work.\n\nThey are the best. They did a great job for my home. No more mold!\n\nI highly recommend them.')
    cy.getByData('submit-button').click() 
  })

}) 