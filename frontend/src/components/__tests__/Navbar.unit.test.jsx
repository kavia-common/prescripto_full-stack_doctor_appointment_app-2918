import React from 'react';
import Navbar from '../Navbar';
import { screen, fireEvent } from '@testing-library/react';
import { renderWithProviders } from '@/tests/utils/test-utils';

describe('Navbar (unit)', () => {
  test('renders Create account button when not authenticated', () => {
    renderWithProviders(<Navbar />, { providerProps: { token: '', userData: false } });
    expect(screen.getByText(/create account/i)).toBeInTheDocument();
  });

  test('shows user dropdown when authenticated', () => {
    const providerProps = { token: 'fake', userData: { image: '/assets/profile.png' } };
    renderWithProviders(<Navbar />, { providerProps });
    // The dropdown trigger is an avatar image; ensure it exists
    expect(screen.getByRole('img', { name: '' })).toBeInTheDocument();
  });

  test('mobile menu opens when hamburger is clicked', () => {
    renderWithProviders(<Navbar />, { providerProps: { token: '', userData: false } });
    const menuButton = screen.getAllByRole('img')[1];
    fireEvent.click(menuButton);
    expect(screen.getByText(/all doctors/i)).toBeInTheDocument();
  });
});
