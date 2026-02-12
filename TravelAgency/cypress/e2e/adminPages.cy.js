describe('Verify the elements visibility for each page (Admin)', () => {
  beforeEach(() => {
    // Runs before each test in the block
    cy.visit('/'); 
    cy.get('[data-cy=email]').type('admin@yahoo.com');
    cy.get('[data-cy=password]').type('aaa');
    cy.get('[data-cy=submit]').click();
  });

  it('Vacations page', () => {
    cy.get('.logo-header').should('be.visible');
    cy.get('[data-cy="vacations-table"]').should('be.visible');
    cy.get('[data-cy="simple-vacations-table"]').should('exist');
    cy.get('#open-vacations-modal').should('be.visible');
  });

  it('Hotels page', () => {
    cy.get('#tab-button-hotels').click();
    cy.get('.logo-header').should('be.visible');
    cy.get('[data-cy="hotels-table"]').should('be.visible');
    cy.get('#open-hotels-modal').should('be.visible');
  });

  it('Flights page', () => {
    cy.get('#tab-button-flights').click();
    cy.get('.logo-header').should('be.visible');
    cy.get('[data-cy="flights-table"]').should('be.visible');
    cy.get('#open-flights-modal').should('be.visible');
  });

  it('Destinations page', () => {
    cy.get('#tab-button-destinations').click();
    cy.get('.logo-header').should('be.visible');
    cy.get('[data-cy="destinations-table"]').should('be.visible');
    cy.get('#open-destinations-modal').should('be.visible');
  });

  it('Users page', () => {
    cy.get('#tab-button-users').click();
    cy.get('.logo-header').should('be.visible');
    cy.get('[data-cy="users-table"]').should('be.visible');
    cy.get('#open-users-modal').should('be.visible');
  });
});
  