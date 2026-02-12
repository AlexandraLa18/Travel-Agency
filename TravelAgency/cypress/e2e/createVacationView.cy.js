describe('Verify elements visibility when trying to create a simple vacation', () => {
    beforeEach(() => {
      cy.visit('/'); 
      cy.get('[data-cy=email]').type('cypressTest@yahoo.com');
      cy.get('[data-cy=password]').type('cypressTest');
      cy.get('[data-cy=submit]').click();
    });

    it('', () => {
      cy.url().should('include', '/user-tabs/dashboard');
      
      cy.get('[data-cy=to]').type('lond', { delay: 1000 });
      cy.get('ion-list', { timeout: 10000 }).should('be.visible');
      cy.get('ion-list').find('ion-item').first().click();

      cy.get('[data-cy=search]').click();

      cy.url().should('include', '/user-tabs/dashboard');
      cy.get('.title').should('be.visible');
      cy.get('.toolbar').should('be.visible');
      cy.get('.container').should('be.visible');
      cy.get('.div-spinner button').should('be.visible').click();

      cy.get('.toolbar').should('be.visible');
      cy.get('ion-buttons').should('be.visible');

      cy.get('ion-buttons').find('ion-button').first().click({ force: true });
      cy.get('ion-buttons').find('ion-button').first().click({ force: true });

    });

});
    