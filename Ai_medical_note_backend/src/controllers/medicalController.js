import fs from "fs/promises";
import MedicalRecord from "../models/MedicalRecord.js";
import { transcribeAudio } from "../services/speechService.js";
import { generateMedicalAnalysis } from "../services/medicalAIService.js";

export const analyzeConversation = async (req, res) => {
  try {
    const { patientName = "", transcript } = req.body;

    if (!transcript?.trim()) {
      return res.status(400).json({
        success: false,
        message: "Transcript is required"
      });
    }

    const medicalAnalysis = await generateMedicalAnalysis(transcript);

    const medicalRecord = await MedicalRecord.create({
      patientName,
      transcript,
      medicalAnalysis
    });

    return res.status(201).json({
      success: true,
      data: medicalRecord
    });
  } catch (error) {
    console.error("Medical analysis error:", error);

    return res.status(500).json({
      success: false,
      message: error.message || "Medical analysis failed"
    });
  }
};

export const processMedicalAudio = async (req, res) => {
  try {
    const { patientName = "" } = req.body;

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Audio file is required"
      });
    }

    const transcript = await transcribeAudio(req.file.path);

    const medicalAnalysis =
      await generateMedicalAnalysis(transcript);

    const medicalRecord = await MedicalRecord.create({
      patientName,
      transcript,
      medicalAnalysis
    });

    await fs.unlink(req.file.path).catch(() => {});

    return res.status(201).json({
      success: true,
      data: medicalRecord
    });
  } catch (error) {
    if (req.file?.path) {
      await fs.unlink(req.file.path).catch(() => {});
    }

    console.error("Medical audio processing error:", error);

    return res.status(500).json({
      success: false,
      message: error.message || "Medical audio processing failed"
    });
  }
};
