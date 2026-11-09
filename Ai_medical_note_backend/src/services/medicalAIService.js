import openai from "../config/openai.js";

const SYSTEM_INSTRUCTIONS = `
You are a medical documentation assistant.

Your job is to organize a doctor-patient conversation into a concise clinical note
and clinical considerations for a qualified healthcare professional.

Safety requirements:
- Do not invent symptoms, diagnoses, medications, allergies, test results, vital signs,
  or medical history.
- Clearly separate reported facts from possible interpretations.
- Do not independently prescribe medication or give dosing instructions.
- Do not claim a diagnosis is certain unless it was explicitly stated in the conversation.
- If potentially urgent symptoms are present, flag them for clinician review.
- If information is missing, use an empty string or empty array.
- This is clinical decision support and documentation assistance, not autonomous medical care.
`;

const RESPONSE_FORMAT = {
  type: "json_schema",
  name: "medical_analysis",
  strict: true,
  schema: {
    type: "object",
    additionalProperties: false,
    properties: {
      chiefComplaint: { type: "string" },
      symptoms: {
        type: "array",
        items: { type: "string" }
      },
      patientHistory: { type: "string" },
      medicationsMentioned: {
        type: "array",
        items: { type: "string" }
      },
      allergiesMentioned: {
        type: "array",
        items: { type: "string" }
      },
      diagnosesMentionedByClinician: {
        type: "array",
        items: { type: "string" }
      },
      possibleConditionsForClinicianReview: {
        type: "array",
        items: { type: "string" }
      },
      testsMentionedOrToConsider: {
        type: "array",
        items: { type: "string" }
      },
      generalCareConsiderations: {
        type: "array",
        items: { type: "string" }
      },
      redFlagsForClinicianReview: {
        type: "array",
        items: { type: "string" }
      },
      medicalNote: { type: "string" }
    },
    required: [
      "chiefComplaint",
      "symptoms",
      "patientHistory",
      "medicationsMentioned",
      "allergiesMentioned",
      "diagnosesMentionedByClinician",
      "possibleConditionsForClinicianReview",
      "testsMentionedOrToConsider",
      "generalCareConsiderations",
      "redFlagsForClinicianReview",
      "medicalNote"
    ]
  }
};

export const generateMedicalAnalysis = async (conversation) => {
  if (!conversation?.trim()) {
    throw new Error("Transcript is empty");
  }

  const response = await openai.responses.create({
    model: "gpt-5.6",
    instructions: SYSTEM_INSTRUCTIONS,
    input: `Doctor-patient conversation:\n\n${conversation}`,
    text: {
      format: RESPONSE_FORMAT
    }
  });

  return JSON.parse(response.output_text);
};
