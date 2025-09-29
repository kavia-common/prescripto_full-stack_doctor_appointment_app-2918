import React from 'react';
import { screen } from '@testing-library/react';
import { renderWithProviders } from '../../../tests/utils/test-utils.jsx';
import Dashboard from '../Dashboard.jsx';

// The Dashboard shows summary cards; we assert key labels exist.
describe('Admin Dashboard - Unit', () => {
  test('renders dashboard summary metrics', async () => {
    renderWithProviders(<Dashboard />);

    // Labels from the real Dashboard component
    expect(screen.getByText(/Doctors/i)).toBeInTheDocument();
    expect(screen.getByText(/Appointments/i)).toBeInTheDocument();
    expect(screen.getByText(/Patients/i)).toBeInTheDocument();
    expect(screen.getByText(/Latest Bookings/i)).toBeInTheDocument();
  });
});
