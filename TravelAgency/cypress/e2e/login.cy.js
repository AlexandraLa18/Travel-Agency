describe('Login Test', () => {
    it('Successfully admin login', () => {
      cy.visit(''); 
      cy.get('[data-cy=email]').type('admin@yahoo.com');
      cy.get('[data-cy=password]').type('aaa');
      cy.get('[data-cy=submit]').click();
      
      cy.url().should('include', '/admin-tabs/vacations');
    });
  });
  