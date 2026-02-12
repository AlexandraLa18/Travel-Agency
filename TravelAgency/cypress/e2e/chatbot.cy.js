describe('Chatbot Test', () => {
    beforeEach(() => {
        cy.visit('/'); 
        cy.get('[data-cy=email]').type('cypressTest@yahoo.com');
        cy.get('[data-cy=password]').type('cypressTest');
        cy.get('[data-cy=submit]').click();
      });
    
      it('', () => {
        cy.url().should('include', '/user-tabs/dashboard');

        cy.get('[data-cy=chatbot]').click();
        cy.get('ion-modal').should('be.visible');
        cy.get('ion-toolbar ion-title div span').should('be.visible').and('have.text', 'Chatbot');
        cy.get('ion-card .response p').should('be.visible').and('have.text', 'Hi there! 👋 Welcome to our travel assistant. You can ask me anything about traveling, destinations, travel tips, and more. Just type in your question and I`ll do my best to help you plan your next adventure!');

        cy.intercept('POST', '**/api/chatbot/message').as('chatbotMessage');
        cy.get('[data-cy=ask]').type('Can you tell me some warm destinations in Europe?');
        cy.get('[data-cy=send]').click();
        
        cy.wait('@chatbotMessage').then((interception) => {
            assert.equal(interception.response.statusCode, 200, 'Response status should be 200');
        });

      });
});
  