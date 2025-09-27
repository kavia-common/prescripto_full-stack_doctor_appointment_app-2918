import mongoose from "mongoose";

let dbStatus = "disconnected";

/**
 * Attempt to connect to MongoDB with retries.
 * - Uses MONGODB_URI or defaults to localhost
 * - Allows specifying DB_NAME, defaulting to 'prescripto'
 * - Retries a few times without blocking server startup
 */
const connectDB = async (maxRetries = 5, delayMs = 2000) => {
  const baseUri = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017";
  const dbName = process.env.DB_NAME || "prescripto";

  if (!process.env.MONGODB_URI) {
    console.warn("MONGODB_URI not set; attempting to connect to local MongoDB at 127.0.0.1:27017");
  }

  // Attach listeners once
  if (mongoose.connection.listeners("connected").length === 0) {
    mongoose.connection.on("connected", () => {
      dbStatus = "connected";
      console.log("MongoDB: connected");
    });
    mongoose.connection.on("disconnected", () => {
      dbStatus = "disconnected";
      console.warn("MongoDB: disconnected");
    });
    mongoose.connection.on("error", (err) => {
      dbStatus = "error";
      console.error("MongoDB error:", err?.message || err);
    });
  }

  let attempt = 0;
  const uri = `${baseUri}/${dbName}`;

  while (attempt < maxRetries) {
    try {
      attempt++;
      console.log(`MongoDB: connecting (attempt ${attempt}/${maxRetries}) to ${uri}`);
      await mongoose.connect(uri, {
        // Use modern mongoose defaults; options object left minimal for mongoose v8
      });
      // Success will trigger 'connected' event and update status
      return;
    } catch (err) {
      dbStatus = "error";
      console.error(`MongoDB: connection attempt ${attempt} failed:`, err?.message || err);
      if (attempt >= maxRetries) {
        console.error("MongoDB: max retries reached. Proceeding without DB connection.");
        return;
      }
      await new Promise((r) => setTimeout(r, delayMs));
    }
  }
};

/**
 * PUBLIC_INTERFACE
 * Get current DB connection status for health checks.
 */
export const getDbStatus = () => dbStatus;

export default connectDB;

// Note: Avoid using '@' in database password in plain URI strings unless properly URL-encoded.