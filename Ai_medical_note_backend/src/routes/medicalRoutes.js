import express from "express";
import upload from "../middleware/uploadMiddleware.js";

import {
  analyzeConversation,
  processMedicalAudio
} from "../controllers/medicalController.js";

const router = express.Router();

router.post("/analyze", analyzeConversation);

router.post(
  "/process",
  upload.single("audio"),
  processMedicalAudio
);

export default router;
