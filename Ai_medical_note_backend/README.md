# Medical AI Backend

Flow:

Browser microphone -> audio upload -> OpenAI speech-to-text -> medical documentation analysis -> MongoDB -> JSON response.

## Setup

1. Install Node.js.
2. Install MongoDB locally or use a MongoDB connection string.
3. Copy `.env.example` to `.env`.
4. Put your OpenAI API key in `.env`.
5. Install dependencies:

```bash
npm install
```

6. Start development server:

```bash
npm run dev
```

Server:
`http://localhost:4000`

## API

### Health check

GET `/`

### Process audio

POST `/api/v1/medical/process`

Use `multipart/form-data`:

- `audio`: audio file
- `patientName`: optional patient name

The endpoint transcribes the audio, analyzes the transcript, saves the record, and returns the result.

### Analyze existing transcript

POST `/api/v1/medical/analyze`

JSON:

```json
{
  "patientName": "John Doe",
  "transcript": "Patient reports fever and cough for three days."
}
```

## Important

This project is a clinical documentation/decision-support prototype. AI output must be reviewed by a qualified healthcare professional. Do not use it as an autonomous diagnosis or prescription system.
