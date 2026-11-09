import fs from "fs/promises";
import { transcribeAudio } from "../services/speechService.js";

export const transcribe = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Audio file is required"
      });
    }

    const text = await transcribeAudio(req.file.path);

    await fs.unlink(req.file.path).catch(() => {});

    return res.status(200).json({
      success: true,
      text
    });
  } catch (error) {
    if (req.file?.path) {
      await fs.unlink(req.file.path).catch(() => {});
    }

    console.error(error);

    return res.status(500).json({
      success: false,
      message: error.message || "Speech recognition failed"
    });
  }
};
