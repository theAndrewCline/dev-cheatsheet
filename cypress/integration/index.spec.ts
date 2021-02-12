describe('initial test', () => {
  before(() => {
    cy.visit('/')
  })

  it('should find title', () => {
    cy.findByText(/Andrew's Dev Cheatsheet/i)
  })

  it('should find vim hints link', () => {
    cy.findByRole('link', { name: /vim/i })
  })
})
