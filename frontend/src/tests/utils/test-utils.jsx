import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { AppContext } from '@/context/AppContext';

/**
 * PUBLIC_INTERFACE
 * renderWithProviders
 * This helper renders UI wrapped with BrowserRouter and AppContext provider.
 * Supply optional context overrides to control token, userData, and backendUrl for tests.
 */
export function renderWithProviders(ui, { providerProps = {}, ...renderOptions } = {}) {
  const defaultValue = {
    doctors: [],
    getDoctosData: () => {},
    currencySymbol: '₹',
    backendUrl: 'http://localhost:3001',
    token: '',
    setToken: () => {},
    userData: false,
    setUserData: () => {},
    loadUserProfileData: () => {}
  };
  const value = { ...defaultValue, ...providerProps };

  const Wrapper = ({ children }) => (
    <BrowserRouter>
      <AppContext.Provider value={value}>{children}</AppContext.Provider>
    </BrowserRouter>
  );

  // Lazy import here to avoid pulling testing-library into production bundles
  const { render } = require('@testing-library/react');
  return render(ui, { wrapper: Wrapper, ...renderOptions });
}
