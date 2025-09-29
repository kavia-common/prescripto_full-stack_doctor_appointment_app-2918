import '@testing-library/jest-dom';

// Silence React-Toastify warnings during tests and mock toast methods
jest.mock('react-toastify', () => {
  const original = jest.requireActual('react-toastify');
  return {
    ...original,
    toast: {
      error: jest.fn(),
      success: jest.fn(),
      info: jest.fn(),
      warn: jest.fn()
    },
    ToastContainer: () => null
  };
});

// Provide a minimal matchMedia mock for components or libs using it
if (!window.matchMedia) {
  window.matchMedia = () => ({
    matches: false,
    addEventListener: () => {},
    removeEventListener: () => {},
    addListener: () => {},
    removeListener: () => {},
    dispatchEvent: () => false
  });
}

// Mock import.meta.env for Vite in Jest environment
if (!global.import) {
  global.import = {};
}
if (!global.import.meta) {
  global.import.meta = {};
}
global.import.meta.env = {
  VITE_BACKEND_URL: 'http://localhost:3001'
};
