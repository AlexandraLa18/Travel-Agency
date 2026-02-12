describe('Verify the elements visibility for each page (Normal user)', () => {
    beforeEach(() => {
      // Runs before each test in the block
      cy.visit('/'); 
      cy.get('[data-cy=email]').type('cypressTest@yahoo.com');
      cy.get('[data-cy=password]').type('cypressTest');
      cy.get('[data-cy=submit]').click();
    });
  
    it('Stays page', () => {
      cy.get('.logo-header').should('be.visible');
      cy.get('.title').should('be.visible');
      cy.get('.div-form').should('be.visible');
      cy.get('.cards').should('exist');
    });
  
    it('Flight + Hotel page', () => {
      cy.get('#tab-button-flightHotel').click();
      cy.get('.logo-header').should('be.visible');
      cy.get('.title').should('be.visible');
      cy.get('.div-form').should('be.visible');
      cy.get('.cards').should('exist');
    });
  
    it('Flights page', () => {
      cy.get('#tab-button-flights').click();
      cy.get('.logo-header').should('be.visible');
      cy.get('.title').should('be.visible');
      cy.get('.div-form').should('be.visible');
      cy.get('.cards').should('exist');
    });
  
    it('My Reservations page', () => {
      cy.get('#tab-button-reservations').click();
      cy.get('.logo-header').should('be.visible');
      cy.get('.title').should('be.visible');
      cy.get('ion-card').should('exist');
    });
});
    