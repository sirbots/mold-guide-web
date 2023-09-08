describe('Add Listing Page', () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/add-listing")
  })

  it('the h1 contains the correct text"', () => {
    cy.getByData("add-listing-headline").contains('Add a Listing to the Directory')
  })

  it('the Remediators Form H2 has the correct text', () => {
    // Open the Remediators form
    cy.get('button').contains('Remediators').click()
    cy.get('h2').contains('Add a Remediator')
  })
    

})