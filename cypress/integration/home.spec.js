/// <reference types="cypress" />

describe('marvel list home', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('displays marvel characters in a list', () => {
    cy.get('#marvel-characters').should('be.visible');
    const elements = cy.get('#marvel-characters li');
    expect(elements.length).to.be.greaterThan(0);
  });

  it('should scroll to the bottom', () => {
    cy.scrollTo('bottom');
  });

  it('should scroll to the bottom of the page and perform a get request to get more data', () => {
    cy.intercept({
      method: 'GET',
      url: 'https://gateway.marvel.com/v1/public/characters*',
    }).as('fetchCharacters');

    cy.scrollTo('bottom');

    cy.wait('@fetchCharacters').then(({ response }) => {
      expect(response.statusCode).to.eq(200);
      expect(response.body.code).to.eq(200);
      expect(response.body.data.count).to.eq(30);
      expect(response.body.data.results.length).to.eq(30);
    });
  });
});
