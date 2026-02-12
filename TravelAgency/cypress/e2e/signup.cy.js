describe('Sign up (Create a new account with "USER" role)', () => {
    it('Successfully signup', () => {
      cy.visit('/'); 
      cy.get('.signup-text a').click();
      cy.get('[data-cy=email]').type('cypressTest@yahoo.com');
      cy.get('[data-cy=password]').type('cypressTest');
      cy.get('[data-cy=confirmPassword]').type('cypressTest');
      cy.get('[data-cy=submit]').click();

      cy.url().should('include', '/user-tabs/dashboard');
    });
});
    