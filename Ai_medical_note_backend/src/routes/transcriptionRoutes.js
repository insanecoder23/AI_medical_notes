import express from "express";
import upload from "../middleware/uploadMiddleware.js";
import { transcribe } from "../controllers/transcriptionController.js";

const router = express.Router();

router.post("/transcribe", upload.single("audio"), transcribe);

export default router;
