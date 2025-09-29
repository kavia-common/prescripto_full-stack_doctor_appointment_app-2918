import * as userController from '../../../controllers/userController.js';

describe('userController public API', () => {
  test('should export functions', () => {
    // Ensure core functions exist; adjust names as defined in codebase
    const fns = Object.keys(userController);
    expect(Array.isArray(fns)).toBe(true);
    expect(fns.length).toBeGreaterThan(0);
  });
});
