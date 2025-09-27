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
app.use(express.json());
app.use(cors());

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

app.get("/", (req, res) => {
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

// Start server
app.listen(port, () => {
  console.log(`Server started on PORT:${port}`);
});