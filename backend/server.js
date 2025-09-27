import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB, { getDbStatus } from "./config/mongodb.js";
import connectCloudinary from "./config/cloudinary.js";
import userRouter from "./routes/userRoute.js";
import doctorRouter from "./routes/doctorRoute.js";
import adminRouter from "./routes/adminRoute.js";

/**
 * Server bootstrap with resilient startup:
 * - Default PORT=3001 (unless overridden by env)
 * - Non-blocking DB connect with retry; server can still come up for health checks
 * - Cloudinary configured if env vars are present
 */
const app = express();
const port = Number(process.env.PORT) || 3001;

// middlewares
app.use(express.json({ limit: "5mb" }));
app.use(cors({
  origin: process.env.CORS_ORIGIN?.split(",") || "*",
  credentials: true
}));

// Log startup configuration to aid debugging in CI/container
console.log(`[Startup] Using PORT=${port}`);
if (process.env.MONGODB_URI) console.log("[Startup] MONGODB_URI provided");
if (process.env.DB_NAME) console.log(`[Startup] DB_NAME=${process.env.DB_NAME}`);
if (process.env.CLOUDINARY_NAME) console.log("[Startup] Cloudinary vars present");
if (process.env.STRIPE_SECRET_KEY) {
  console.log("[Startup] Stripe secret configured");
} else {
  console.warn("[Startup] STRIPE_SECRET_KEY not configured - Stripe payments will be disabled");
}

// health/readiness endpoint
// PUBLIC_INTERFACE
app.get("/healthz", (req, res) => {
  /** Health endpoint reporting service and DB status. */
  const status = {
    service: "ok",
    db: getDbStatus(),
    time: new Date().toISOString(),
  };
  const httpCode = status.db === "connected" ? 200 : 503;
  res.status(httpCode).json(status);
});

// api endpoints
app.use("/api/user", userRouter);
app.use("/api/admin", adminRouter);
app.use("/api/doctor", doctorRouter);

// PUBLIC_INTERFACE
app.get("/", (req, res) => {
  /** Root endpoint to verify the API is up. */
  res.send("API Working");
});

// Initialize integrations (non-blocking with logs)
(async () => {
  try {
    // Kick off DB connect with retry in background so server can bind to port
    connectDB().catch((err) => {
      console.error("Initial DB connection attempt failed:", err?.message || err);
    });

    // Configure Cloudinary (safe if missing envs)
    await connectCloudinary();
  } catch (err) {
    console.error("Startup integration error:", err?.message || err);
  }
})();

// Start server and handle common startup errors
const server = app.listen(port, "0.0.0.0", () => {
  console.log(`Server started on PORT:${port} and bound to 0.0.0.0`);
});

// Handle EADDRINUSE or other listen errors gracefully with logs
server.on("error", (err) => {
  if (err.code === "EADDRINUSE") {
    console.error(`Port ${port} is already in use. Ensure no other service is listening on this port.`);
  } else {
    console.error("Server listen error:", err);
  }
  process.exit(1);
});