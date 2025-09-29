import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

// Routes
import userRouter from './routes/userRoute.js';
import doctorRouter from './routes/doctorRoute.js';
import adminRouter from './routes/adminRoute.js';

/**
 * PUBLIC_INTERFACE
 * createApp
 * Create and configure an Express app instance without starting the server.
 * This is used by tests to mount routes and run requests with Supertest.
 * @returns {import('express').Express} Configured Express application
 */
export function createApp() {
  const app = express();

  // common middlewares
  app.use(cors({ origin: true, credentials: true }));
  app.use(express.json({ limit: '1mb' }));
  app.use(cookieParser());

  // health route for sanity checks
  app.get('/health', (req, res) => {
    res.status(200).json({ status: 'ok' });
  });

  // API routes (mounted as in server.js)
  app.use('/api/user', userRouter);
  app.use('/api/doctor', doctorRouter);
  app.use('/api/admin', adminRouter);

  // 404 handler
  app.use((req, res) => {
    res.status(404).json({ error: 'Not Found' });
  });

  return app;
}

export default createApp;
