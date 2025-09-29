import React from 'react';
import { BrowserRouter } from 'react-router-dom';

// Contexts used in the admin app
import { AppContextProvider } from '../../../src/context/AppContext.jsx';
import { AdminContextProvider } from '../../../src/context/AdminContext.jsx';
import { DoctorContextProvider } from '../../../src/context/DoctorContext.jsx';

import { render } from '@testing-library/react';

// PUBLIC_INTERFACE
export function renderWithProviders(ui, { route = '/', ...renderOptions } = {}) {
  /** Render a component wrapped with Router and app contexts for tests. */
  window.history.pushState({}, 'Test page', route);
  function Wrapper({ children }) {
    return (
      <BrowserRouter>
        <AppContextProvider>
          <AdminContextProvider>
            <DoctorContextProvider>{children}</DoctorContextProvider>
          </AdminContextProvider>
        </AppContextProvider>
      </BrowserRouter>
    );
  }
  return render(ui, { wrapper: Wrapper, ...renderOptions });
}
