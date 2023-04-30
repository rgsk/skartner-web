describe('template spec', () => {
  it('passes', () => {
    cy.visit('http://localhost:3000/counter');
    cy.get('[data-test="counter-value"]').contains('Count: 0');
    cy.get('[data-test="increment-button"]').click();
    cy.get('[data-test="counter-value"]').contains('Count: 1');
    cy.get('[data-test="increment-button"]').click();
    cy.get('[data-test="counter-value"]').contains('Count: 2');
  });
});
