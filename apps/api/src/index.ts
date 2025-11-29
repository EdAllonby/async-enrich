import express from "express";
import cors from "cors";
import { usersRouter } from "./routes/users.js";

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/users", usersRouter);

// Health check endpoint
app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 API server running at http://localhost:${PORT}`);
  console.log(`📡 Mock endpoints available:`);
  console.log(`   - GET http://localhost:${PORT}/api/users`);
  console.log(`   - GET http://localhost:${PORT}/api/users/:id`);
  console.log(`   - GET http://localhost:${PORT}/api/health`);
});
