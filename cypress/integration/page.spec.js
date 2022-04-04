/// <reference types="cypress" />

describe('character details page', () => {
  it('click the first item and route to the correct page', async () => {
    cy.visit('/');
    let characterName = '';
    cy.get('#marvel-characters li')
      .first()
      .find('.character-name')
      .invoke('text')
      .then((text) => (characterName = text));

    cy.get('#marvel-characters li').first().click();

    cy.get('#character-page').should('be.visible');

    cy.get('h1').should('contain', characterName);
  });

  const sections = ['comics', 'series', 'stories', 'events'];
  sections.forEach((section) => {
    it(`should check for ${section}`, () => {
      cy.visit('/');
      cy.get('#marvel-characters li').first().click();
      cy.get('#character-page').should('be.visible');

      cy.get(`#${section}`).then((sectionRef) => {
        if (sectionRef.find('p').length > 0) {
          expect(sectionRef.find('p').text()).to.eq(`No ${section} available`);
        } else {
          expect(sectionRef.find('div > div').length).to.be.gt(0);
        }
      });
    });
  });
});
