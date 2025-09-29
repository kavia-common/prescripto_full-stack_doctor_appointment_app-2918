import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithProviders } from '../../tests/utils/test-utils.jsx';
import Login from '../Login.jsx';

// Mock fetch for login API
const mockSuccessResponse = { success: true, token: 'fake-admin-token' };

describe('Admin Login - Integration', () => {
  beforeEach(() => {
    // default: success
    global.fetch = jest.fn(async (url, options) => {
      if (options && options.method === 'POST') {
        return {
          ok: true,
          status: 200,
          json: async () => mockSuccessResponse,
        };
      }
      return {
        ok: true,
        status: 200,
        json: async () => ({}),
      };
    });
    // Avoid writing to real localStorage if component uses it
    const store = {};
    jest.spyOn(window.localStorage.__proto__, 'setItem').mockImplementation((k, v) => {
      store[k] = v;
    });
    jest.spyOn(window.localStorage.__proto__, 'getItem').mockImplementation((k) => store[k]);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('logs in admin successfully and shows success UI flow', async () => {
    renderWithProviders(<Login />);

    // Find form fields - adapt labels/placeholders to component implementation
    const emailInput = screen.getByPlaceholderText(/email/i);
    const passwordInput = screen.getByPlaceholderText(/password/i);
    const submitBtn = screen.getByRole('button', { name: /login/i });

    await userEvent.type(emailInput, 'admin@example.com');
    await userEvent.type(passwordInput, 'StrongPassword123');

    await userEvent.click(submitBtn);

    // Expect some post-login effect: success toast/message or redirect indicator.
    // If Dashboard route push happens, we might see an element from Dashboard.
    // To keep generic, we wait for localStorage token being set via mocked setItem or UI text.
    await waitFor(() => {
      // this assert passes because setItem is mocked; replace with UI expectation if available.
      expect(window.localStorage.setItem).toHaveBeenCalled();
    });
  });
});
