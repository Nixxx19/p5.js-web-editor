/**
 * E2E: Unauthenticated user tries to save a sketch and sees the sign-in prompt.
 *
 * Complete flow (so anyone can understand):
 *
 * 1. Visit the editor at / and wait for the toolbar and code editor to be visible.
 *
 * 2. Dismiss cookie banner and any overlay (e.g. keyboard shortcuts):
 *    - Click inside the code editor.
 *    - Press Ctrl+H (or Cmd+H on Mac) to close any overlay.
 *    - If the "Allow All" cookie button is visible, click it, then press Ctrl+H again.
 *
 * 3. Simulate an unauthenticated user: clear all cookies and reload the page.
 *
 * 4. After reload, the cookie dialog may appear again. Repeat step 2 (click editor,
 *    Ctrl+H, "Allow All" if present, Ctrl+H again).
 *
 * 5. Trigger save without being logged in:
 *    - Click the toolbar so the shortcut is handled by the app (not the editor).
 *    - Press Ctrl+H once more to close any overlay.
 *    - Press Cmd+S (Mac) or Ctrl+S (Windows/Linux) to save.
 *
 * 6. Assert the "force sign-in" behaviour:
 *    - The error modal appears (data-testid="error-modal").
 *    - It contains a "Log in" or "Sign up" link.
 *    - Click the overlay close button (X) to dismiss the modal.
 *
 * 7. Set the code editor content to: "Hi, you are using the p5.js Web Editor! XD"
 *    using the CodeMirror API (el._cm.setValue(...)).
 */
const slowMo = () => {
  const ms = Cypress.env('slowMo');
  if (ms && ms > 0) cy.wait(ms);
};

function dismissCookieAndOverlays() {
  cy.get('[data-testid="code-editor"]', { timeout: 15000 }).should(
    'be.visible'
  );
  slowMo();
  cy.get('[data-testid="code-editor"]').click();
  cy.get('body').type('{ctrl}h');
  cy.get('body').then(($body) => {
    if ($body.find('button:contains("Allow All")').length) {
      cy.contains('button', 'Allow All').click();
      cy.get('body').type('{ctrl}h');
    }
  });
  slowMo();
}

describe('Unauthenticated save flow', () => {
  it('triggering save when not logged in shows force-authentication modal', () => {
    cy.visit('/');
    slowMo();

    cy.get('[data-testid="toolbar"]', { timeout: 15000 }).should('be.visible');
    dismissCookieAndOverlays();

    cy.clearCookies();
    cy.reload();
    slowMo();

    cy.get('[data-testid="toolbar"]', { timeout: 15000 }).should('be.visible');
    dismissCookieAndOverlays();

    // Move focus to toolbar, press Ctrl+H to close any overlay, then trigger save
    cy.get('[data-testid="toolbar"]').click();
    slowMo();
    cy.get('body').type('{ctrl}h');
    const saveShortcut = Cypress.platform === 'darwin' ? '{meta}s' : '{ctrl}s';
    cy.get('body').type(saveShortcut);
    slowMo();

    // Force-authentication modal should appear
    cy.get('[data-testid="error-modal"]', { timeout: 5000 }).should(
      'be.visible'
    );
    slowMo();

    // Modal should offer login/signup
    cy.get('a')
      .contains(/log in|sign up/i)
      .should('be.visible');

    // Click the close (cross) button to dismiss the modal
    cy.get('[data-testid="error-modal"]')
      .find('[data-testid="overlay-close-button"]')
      .click();
    slowMo();

    // Set code editor content via CodeMirror API
    cy.get('[data-testid="code-editor"]').then(($el) => {
      const el = $el[0];
      if (el._cm) {
        el._cm.setValue('Hi, you are using the p5.js Web Editor! XD');
      }
    });
  });
});
