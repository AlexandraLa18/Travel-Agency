describe('Verify elements visibility when trying to create a flight + hotel vacation', () => {
    beforeEach(() => {
      cy.visit('/'); 
      cy.get('[data-cy=email]').type('cypressTest@yahoo.com');
      cy.get('[data-cy=password]').type('cypressTest');
      cy.get('[data-cy=submit]').click();
    });

    it('', () => {
      cy.url().should('include', '/user-tabs/dashboard');
      cy.get('#tab-button-flightHotel').click();

      cy.get('[data-cy=from]').type('buch', { delay: 1000 });
      cy.get('ion-list', { timeout: 10000 }).should('be.visible');
      cy.get('ion-list').find('ion-item').first().click();
      
      cy.get('[data-cy=toDest]').type('lond', { delay: 1000 });
      cy.get('ion-list', { timeout: 10000 }).should('be.visible');
      cy.get('ion-list').find('ion-item').first().click();

      cy.get('[data-cy=searchComplex]').click({ force: true });

      cy.url().should('include', '/user-tabs/flightHotel');
      cy.get('.title').should('be.visible');
      cy.get('.toolbar').should('be.visible');
      cy.get('.container').should('be.visible');
      cy.get('.div-spinner button').should('be.visible').click();

      cy.get('.toolbar').should('be.visible');
      cy.get('ion-buttons').should('be.visible');
      cy.get('.popup-container').should('be.visible');

      cy.get('ion-buttons').find('ion-button').first().click({ force: true });
      cy.get('ion-buttons').find('ion-button').first().click({ force: true });

    });

});
    