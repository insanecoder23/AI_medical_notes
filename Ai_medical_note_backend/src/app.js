import express from "express";
import cors from "cors";

import transcriptionRoutes from "./routes/transcriptionRoutes.js";
import medicalRoutes from "./routes/medicalRoutes.js";

const app = express();

app.use(
  cors({
    origin: true
  })
);

app.use(express.json({ limit: "2mb" }));
app.use(express.urlencoded({ extended: true }));

app.get("/", (_req, res) => {
  res.json({
    success: true,
    message: "Medical AI API is running"
  });
});

app.use("/api/v1/speech", transcriptionRoutes);
app.use("/api/v1/medical", medicalRoutes);

app.use((err, _req, res, _next) => {
  console.error(err);

  res.status(500).json({
    success: false,
    message: err.message || "Internal server error"
  });
});

export default app;
