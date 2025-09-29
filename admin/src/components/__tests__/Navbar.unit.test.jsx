import React from 'react';
import { screen } from '@testing-library/react';
import { renderWithProviders } from '../../tests/utils/test-utils.jsx';
import Navbar from '../Navbar.jsx';

describe('Admin Navbar - Unit', () => {
  test('renders logout button and role badge', () => {
    renderWithProviders(<Navbar />);
    expect(screen.getByRole('button', { name: /logout/i })).toBeInTheDocument();
    // Badge shows Admin or Doctor based on token state; initially shows Doctor when no aToken
    expect(screen.getByText(/Admin|Doctor/)).toBeInTheDocument();
  });
});
