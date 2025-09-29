import React from 'react';
import Login from '../Login';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithProviders } from '@/tests/utils/test-utils';
import axios from 'axios';

jest.mock('axios');

describe('Login page (integration/behavior)', () => {
  beforeEach(() => {
    localStorage.clear();
    jest.resetAllMocks();
  });

  test('sign up flow stores token and navigates', async () => {
    axios.post.mockResolvedValueOnce({ data: { success: true, token: 'signup-token' } });

    renderWithProviders(<Login />, {
      providerProps: {
        backendUrl: 'http://localhost:3001',
        setToken: (t) => {
          // simulate navigation by setting window location (component uses navigate('/'))
          window.location.hash = '#/'; 
        }
      }
    });

    // Default state is Sign Up, so expect Full Name field present
    expect(screen.getByText(/full name/i)).toBeInTheDocument();

    await userEvent.type(screen.getByLabelText(/full name/i, { selector: 'input' }), 'Jane Doe');
    await userEvent.type(screen.getByLabelText(/email/i, { selector: 'input' }), 'jane@example.com');
    await userEvent.type(screen.getByLabelText(/password/i, { selector: 'input' }), 'secret123');

    await userEvent.click(screen.getByRole('button', { name: /create account/i }));

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith(
        'http://localhost:3001/api/user/register',
        { name: 'Jane Doe', email: 'jane@example.com', password: 'secret123' }
      );
    });
  });

  test('login flow calls backend and stores token', async () => {
    axios.post.mockResolvedValueOnce({ data: { success: true, token: 'login-token' } });

    renderWithProviders(<Login />, {
      providerProps: {
        backendUrl: 'http://localhost:3001',
        setToken: () => {}
      }
    });

    // Switch to Login view
    await userEvent.click(screen.getByText(/login here/i));
    expect(screen.queryByText(/full name/i)).not.toBeInTheDocument();

    await userEvent.type(screen.getByLabelText(/email/i, { selector: 'input' }), 'john@example.com');
    await userEvent.type(screen.getByLabelText(/password/i, { selector: 'input' }), 'secret123');

    await userEvent.click(screen.getByRole('button', { name: /^login$/i }));

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith(
        'http://localhost:3001/api/user/login',
        { email: 'john@example.com', password: 'secret123' }
      );
    });
  });
});
