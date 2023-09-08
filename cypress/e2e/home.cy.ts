describe('home page', () => {
  // Each time you see it() within a given spec file that is a single test. 
  it('the h1 contains the correct text"', () => {
    cy.visit('http://localhost:3000')
    cy.get("[data-test='hero-heading']").contains('Mold Recovery Made Simple')

  })
})