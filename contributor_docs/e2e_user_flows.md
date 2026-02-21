# E2E Testing and Core User Flows

This document defines the core user flows for the p5.js Web Editor that should be covered by end-to-end (E2E) tests. E2E tests validate complete user journeys through the application in a real browser environment, ensuring that all components work together correctly.

## Table of Contents
- [Overview](#overview)
- [E2E Testing Setup](#e2e-testing-setup)
- [Core User Flows](#core-user-flows)
  - [Unauthenticated User Flows](#unauthenticated-user-flows)
  - [Authenticated User Flows](#authenticated-user-flows)
  - [Sketch Management Flows](#sketch-management-flows)
  - [Collaboration and Sharing Flows](#collaboration-and-sharing-flows)
- [Implementation Status](#implementation-status)
- [Writing E2E Tests](#writing-e2e-tests)
- [Running E2E Tests](#running-e2e-tests)

## Overview

E2E tests complement our existing unit and integration tests by validating complete user workflows in a browser environment. They ensure that:
- Users can complete critical tasks from start to finish
- Authentication and authorization work correctly
- The editor, preview, and file system interact properly
- Error states and edge cases are handled gracefully

## E2E Testing Setup

**Framework:** Cypress 13.17.0

**Location:** All E2E tests are in the `cypress/e2e/` directory.

**Configuration:** `cypress.config.js` in the project root.

**Selectors:** We use `data-testid` attributes for stable element selection. See [E2E selectors](testing.md#e2e-selectors) in the main testing guide.

**CI Integration:** E2E tests run automatically on pull requests via `.github/workflows/e2e.yml`.

## Core User Flows

### Unauthenticated User Flows

These flows validate the experience for users who are not logged in.

#### 1. Write Code and Run Preview ⚠️ Not yet implemented
**Goal:** Verify that unauthenticated users can write code and see the preview.

**Steps:**
1. Visit the editor at `/`
2. Wait for the code editor to load
3. Enter valid p5.js code (e.g., `function setup() { createCanvas(400, 400); } function draw() { background(220); }`)
4. Click the play button in the toolbar
5. Verify the preview iframe loads and displays the sketch

**Expected Behavior:**
- Code editor is editable
- Play button triggers preview
- Preview renders without errors
- No authentication prompt appears

**Key Elements:**
- `data-testid="code-editor"` - Code editor
- `data-testid="toolbar-play-button"` - Play button
- Preview iframe/container

---

#### 2. Prompt to Sign Up on Save ✅ Implemented
**Goal:** Verify that unauthenticated users are prompted to log in when attempting to save.

**Implementation:** `cypress/e2e/unauthenticated-save.cy.js`

**Steps:**
1. Visit the editor at `/`
2. Wait for the toolbar and code editor to be visible
3. Clear cookies to ensure unauthenticated state
4. Trigger save action (Cmd+S or Ctrl+S, or File > Save)
5. Verify the force-authentication modal appears
6. Verify "Log in" and "Sign up" links are present

**Expected Behavior:**
- Save action triggers authentication modal
- Modal displays clear message about needing to log in
- Links to login and signup pages are present
- Modal can be dismissed

**Key Elements:**
- `data-testid="toolbar"` - Toolbar
- `data-testid="nav-file-save"` - File > Save menu item
- `data-testid="error-modal"` - Authentication modal
- `data-testid="overlay-close-button"` - Modal close button

---

#### 3. Download Sketch Without Logging In ⚠️ Not yet implemented
**Goal:** Verify that unauthenticated users can download their sketch files.

**Steps:**
1. Visit the editor at `/`
2. Write some code in the editor
3. Open the File menu
4. Click "Download" (or equivalent action)
5. Verify the sketch files are downloaded as a zip

**Expected Behavior:**
- Download action works without authentication
- All sketch files (HTML, JS, CSS) are included
- No authentication prompt appears

**Note:** Current behavior may require authentication for download. This flow should be clarified based on product requirements.

**Key Elements:**
- File menu
- Download button/menu item
- Browser download verification

---

### Authenticated User Flows

These flows validate the experience for logged-in users.

#### 4. Write Code, Run Preview, and Save ⚠️ Not yet implemented
**Goal:** Verify the complete authenticated workflow from writing to saving.

**Steps:**
1. Log in as a test user
2. Visit the editor (new sketch or existing)
3. Write or modify code
4. Click play to run the preview
5. Verify preview displays correctly
6. Save the sketch (Cmd+S or File > Save)
7. Verify save confirmation appears
8. Reload the page
9. Verify changes were persisted

**Expected Behavior:**
- Authenticated user can write and run code
- Save action succeeds without prompts
- Changes persist after reload
- Save confirmation is shown

**Key Elements:**
- `data-testid="code-editor"` - Code editor
- `data-testid="toolbar-play-button"` - Play button
- `data-testid="nav-file-save"` - Save action
- Save confirmation toast/message
- Preview iframe

---

#### 5. Edit Existing Sketch and Save Changes ⚠️ Not yet implemented
**Goal:** Verify that users can edit and save changes to existing sketches.

**Steps:**
1. Log in as a test user
2. Navigate to "My Sketches"
3. Open an existing sketch
4. Modify the code
5. Save the changes
6. Navigate away and return to the sketch
7. Verify changes were saved

**Expected Behavior:**
- Existing sketch loads with correct content
- Modifications can be made
- Save succeeds
- Changes persist across sessions

**Key Elements:**
- Sketch list/navigation
- `data-testid="code-editor"` - Code editor
- `data-testid="nav-file-save"` - Save action
- Sketch metadata (last modified, etc.)

---

#### 6. Log Out ⚠️ Not yet implemented
**Goal:** Verify that users can successfully log out.

**Steps:**
1. Log in as a test user
2. Verify user menu shows username
3. Click on user menu
4. Click "Log out"
5. Verify redirect to home or login page
6. Verify user is no longer authenticated (e.g., "Log in" button appears)

**Expected Behavior:**
- Log out action clears session
- User is redirected appropriately
- UI reflects unauthenticated state
- Subsequent requests are unauthenticated

**Key Elements:**
- User menu/dropdown
- Log out button
- Authentication state indicators

---

### Sketch Management Flows

#### 7. Create New File in Sketch ⚠️ Not yet implemented
**Goal:** Verify that users can add new files to their sketch.

**Steps:**
1. Log in and open a sketch
2. Click "Add file" or equivalent action
3. Enter a filename (e.g., `myLibrary.js`)
4. Verify the new file appears in the file tree
5. Add code to the new file
6. Save the sketch
7. Reload and verify the new file persists

**Expected Behavior:**
- New file modal/input appears
- File is created with the specified name
- File appears in the file tree
- File content can be edited
- Changes persist after save

**Key Elements:**
- Add file button
- New file modal/input
- File tree/sidebar
- `data-testid="code-editor"` - Editor for new file

---

#### 8. Rename File ⚠️ Not yet implemented
**Goal:** Verify that users can rename files in their sketch.

**Steps:**
1. Log in and open a sketch with multiple files
2. Right-click (or click menu) on a file in the file tree
3. Select "Rename"
4. Enter a new filename
5. Verify the file is renamed in the file tree
6. Save the sketch
7. Reload and verify the rename persisted

**Expected Behavior:**
- Rename action is available
- New name is validated (e.g., no duplicates)
- File tree updates immediately
- References in HTML (if applicable) are updated
- Changes persist after save

**Key Elements:**
- File tree/sidebar
- File context menu
- Rename input/modal
- `data-testid="file-name"` - File name display

---

#### 9. Delete File ⚠️ Not yet implemented
**Goal:** Verify that users can delete files from their sketch.

**Steps:**
1. Log in and open a sketch with multiple files
2. Right-click on a file in the file tree
3. Select "Delete"
4. Confirm deletion if prompted
5. Verify the file is removed from the file tree
6. Save the sketch
7. Reload and verify the file is still deleted

**Expected Behavior:**
- Delete action is available
- Confirmation prompt appears (if destructive)
- File is removed from file tree
- Cannot delete required files (e.g., sketch.js)
- Changes persist after save

**Key Elements:**
- File tree/sidebar
- File context menu
- Delete confirmation modal
- File tree updates

---

### Collaboration and Sharing Flows

#### 10. Duplicate Sketch ⚠️ Not yet implemented
**Goal:** Verify that users can duplicate their own or others' sketches.

**Steps:**
1. Log in as a test user
2. Open a sketch (own or public)
3. Click "Duplicate" or equivalent action
4. Verify a new sketch is created
5. Verify the new sketch has the same content
6. Verify the new sketch has a different ID/URL
7. Modify the duplicate
8. Verify changes don't affect the original

**Expected Behavior:**
- Duplicate action creates a new sketch
- All files and content are copied
- New sketch is owned by current user
- Original sketch is unchanged

**Key Elements:**
- Duplicate button (toolbar or menu)
- Sketch metadata (ID, owner)
- File tree and content

---

#### 11. Share Sketch (Change Visibility) ⚠️ Not yet implemented
**Goal:** Verify that users can change sketch visibility (private/public).

**Steps:**
1. Log in and open a sketch
2. Click the visibility dropdown (if visible in toolbar)
3. Change from "Private" to "Public" (or vice versa)
4. Verify the change is saved
5. Log out or use incognito mode
6. Navigate to the sketch URL
7. Verify access matches the visibility setting

**Expected Behavior:**
- Visibility dropdown shows current state
- Changing visibility updates immediately
- Public sketches are accessible without login
- Private sketches require authentication and ownership

**Key Elements:**
- Visibility dropdown (toolbar)
- Sketch URL
- Access control validation

---

#### 12. Fork Public Sketch ⚠️ Not yet implemented
**Goal:** Verify that users can fork/duplicate public sketches from other users.

**Steps:**
1. User A creates and shares a public sketch
2. User B (different account) opens User A's sketch
3. User B clicks "Duplicate" or "Fork"
4. Verify User B now has a copy in their account
5. User B modifies the copy
6. Verify User A's original is unchanged

**Expected Behavior:**
- Public sketches can be duplicated by others
- Fork creates a new sketch owned by the forking user
- Original sketch is unaffected
- Attribution to original author may be preserved

**Key Elements:**
- Duplicate/Fork button
- Sketch ownership metadata
- User account switching (for testing)

---

## Implementation Status

| Flow | Status | Test File | Priority |
|------|--------|-----------|----------|
| Write Code and Run Preview (Unauthenticated) | ⚠️ Not implemented | - | High |
| Prompt to Sign Up on Save | ✅ Implemented | `cypress/e2e/unauthenticated-save.cy.js` | High |
| Download Sketch Without Login | ⚠️ Not implemented | - | Medium |
| Write, Run, and Save (Authenticated) | ⚠️ Not implemented | - | High |
| Edit Existing Sketch | ⚠️ Not implemented | - | High |
| Log Out | ⚠️ Not implemented | - | Medium |
| Create New File | ⚠️ Not implemented | - | Medium |
| Rename File | ⚠️ Not implemented | - | Low |
| Delete File | ⚠️ Not implemented | - | Low |
| Duplicate Sketch | ⚠️ Not implemented | - | Medium |
| Share Sketch (Visibility) | ⚠️ Not implemented | - | Medium |
| Fork Public Sketch | ⚠️ Not implemented | - | Low |

**Legend:**
- ✅ Implemented - E2E test exists and passes
- ⚠️ Not implemented - Flow defined but no test yet
- 🚧 In progress - Test is being developed

## Writing E2E Tests

### Test Structure

E2E tests should follow this structure:

```javascript
describe('Flow name', () => {
  it('should complete the user flow successfully', () => {
    // 1. Setup: Visit page, log in if needed
    cy.visit('/');
    
    // 2. Action: Perform user actions
    cy.get('[data-testid="some-element"]').click();
    
    // 3. Assert: Verify expected outcomes
    cy.get('[data-testid="result"]').should('be.visible');
  });
});
```

### Best Practices

1. **Use `data-testid` for element selection**
   - Stable across UI changes
   - Clear intent for E2E testing
   - See [E2E selectors](testing.md#e2e-selectors)

2. **Wait for elements to be ready**
   ```javascript
   cy.get('[data-testid="editor"]', { timeout: 10000 }).should('be.visible');
   ```

3. **Clean up state between tests**
   - Clear cookies: `cy.clearCookies()`
   - Clear local storage: `cy.clearLocalStorage()`
   - Reset database state (if applicable)

4. **Handle dynamic content**
   - Wait for network requests: `cy.intercept()`
   - Wait for animations: `cy.wait()`
   - Use `.should()` for retryable assertions

5. **Test realistic user behavior**
   - Use keyboard shortcuts where appropriate
   - Handle modals and overlays
   - Test error states and edge cases

6. **Keep tests focused and independent**
   - Each test should validate one flow
   - Tests should not depend on each other
   - Use `beforeEach()` for common setup

### Example: Authenticated Flow Test

```javascript
describe('Authenticated save flow', () => {
  beforeEach(() => {
    // Log in before each test
    cy.visit('/login');
    cy.get('[data-testid="username-input"]').type('testuser');
    cy.get('[data-testid="password-input"]').type('password123');
    cy.get('[data-testid="login-button"]').click();
    cy.url().should('include', '/');
  });

  it('should save sketch and persist changes', () => {
    // Write code
    cy.get('[data-testid="code-editor"]').click();
    cy.get('[data-testid="code-editor"]').type('// Test code');
    
    // Save
    cy.get('body').type('{meta}s'); // Cmd+S on Mac
    
    // Verify save confirmation
    cy.contains('Sketch saved').should('be.visible');
    
    // Reload and verify persistence
    cy.reload();
    cy.get('[data-testid="code-editor"]').should('contain', '// Test code');
  });
});
```

## Running E2E Tests

### Local Development

**Prerequisites:**
1. Start the development server:
   ```bash
   npm run start
   ```
   The app should be running on `http://localhost:8000` (or set `BASE_URL` in `cypress.config.js` if different).

2. Ensure MongoDB is running (for tests that require database).

**Run all E2E tests (headless):**
```bash
npm run test:e2e
```

**Open interactive Cypress runner:**
```bash
npm run e2e
```
This opens the Cypress UI where you can select and run individual tests, see the browser, and debug failures.

**Run specific test file:**
```bash
npx cypress run --spec "cypress/e2e/unauthenticated-save.cy.js"
```

**Run with slow motion (for debugging):**
```bash
CYPRESS_slowMo=500 npm run test:e2e
```

### CI/CD

E2E tests run automatically on pull requests via GitHub Actions (`.github/workflows/e2e.yml`).

**Workflow:**
1. Sets up Node.js and MongoDB
2. Installs dependencies
3. Starts the application
4. Runs Cypress tests
5. Reports results in the PR

**Viewing Results:**
- Check the "Actions" tab in GitHub
- Look for the "E2E" workflow
- Click on a run to see detailed logs and any failures

### Debugging Failed Tests

1. **Run interactively:** Use `npm run e2e` to see what's happening in the browser
2. **Check screenshots:** Cypress saves screenshots of failures in `cypress/screenshots/`
3. **Check videos:** Full test videos are in `cypress/videos/` (if enabled)
4. **Add `cy.pause()`:** Pause test execution to inspect state
5. **Use `cy.debug()`:** Drop into debugger at a specific point
6. **Check network:** Use `cy.intercept()` to inspect API calls

---

## Contributing

When adding new E2E tests:

1. **Define the flow** in this document first
2. **Add `data-testid`** to components as needed (see [E2E selectors](testing.md#e2e-selectors))
3. **Write the test** following the structure above
4. **Update the status table** in this document
5. **Run locally** to verify it passes
6. **Submit a PR** with both the test and documentation updates

For questions or discussions about E2E testing, open an issue or ask in the p5.js Discord.

---

**Last Updated:** February 2026
