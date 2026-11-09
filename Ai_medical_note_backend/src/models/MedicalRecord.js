import mongoose from "mongoose";

const medicalRecordSchema = new mongoose.Schema(
  {
    patientName: {
      type: String,
      trim: true,
      default: ""
    },

    transcript: {
      type: String,
      required: true
    },

    medicalAnalysis: {
      type: mongoose.Schema.Types.Mixed,
      required: true
    }
  },
  {
    timestamps: true
  }
);

const MedicalRecord = mongoose.model(
  "MedicalRecord",
  medicalRecordSchema
);

export default MedicalRecord;
