/// <reference types="cypress" />
describe('Notes App E2E Test', () => {
    beforeEach(() => {
        cy.visit('/');
        cy.get('[data-cy="create-note-button"]', { timeout: 10000 }).should(
            'be.visible'
        );
    });

    it('should create a new note successfully', () => {
        const noteTitle = 'Test Note ' + Date.now();
        const noteContent = 'This is a test content.';

        cy.get('[data-cy="create-note-button"]').click();

        cy.get('[data-cy="note-title-input"]').type(noteTitle);
        cy.get('[data-cy="note-content-input"]').type(noteContent);

        cy.get('[data-cy="note-submit-button"]').click();

        cy.contains(noteTitle, { timeout: 10000 }).should('be.visible');
        cy.get('[data-cy="note-card"]')
            .first()
            .within(() => {
                cy.get('[data-cy="note-title"]').should('contain', noteTitle);
                cy.get('[data-cy="note-content"]').should(
                    'contain',
                    noteContent
                );
            });
    });
});
