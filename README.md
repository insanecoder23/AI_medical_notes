# AI-Powered Medical Note Generation

A MERN stack application that converts doctor-patient conversations into structured medical notes. It uses OpenAI Whisper for speech transcription and an LLM to organize the transcribed conversation into a readable clinical format.

## Overview

Writing medical notes manually after every consultation can take time. This project explores how speech recognition and language models can assist with that process.

A user can provide an audio recording of a consultation, get its transcription, and generate a structured medical note from the extracted text. The generated note can then be reviewed and managed through the application.

## Tech Stack

- **Frontend:** React.js
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Speech Recognition:** OpenAI Whisper
- **AI Processing:** Large Language Model (LLM)
- **Authentication:** JWT (if implemented)

## How It Works

1. The user uploads an audio recording of a conversation.
2. The backend processes the audio using OpenAI Whisper.
3. Whisper returns the transcribed text.
4. The transcription is passed to an LLM with instructions to generate a structured medical note.
5. The generated note is returned to the frontend for review.

## Project Structure

```text
project/
├── client/
│   └── src/
│       ├── components/
│       ├── pages/
│       └── ...
│
├── server/
│   ├── controllers/
│   ├── routes/
│   ├── models/
│   ├── middleware/
│   ├── config/
│   └── server.js
│
└── README.md
```

## Getting Started

### Prerequisites

- Node.js and npm
- MongoDB
- OpenAI API key

### 1. Clone the repository

```bash
git clone YOUR_REPOSITORY_URL
cd YOUR_PROJECT_FOLDER
```

### 2. Set up the backend

```bash
cd server
npm install
```

Create a `.env` file in the server directory:

```env
PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
OPENAI_API_KEY=your_openai_api_key
```

Use only the environment variables required by your implementation.

Start the backend:

```bash
npm run dev
```

### 3. Set up the frontend

Open another terminal:

```bash
cd client
npm install
npm run dev
```

## Notes

- The generated medical notes are intended to assist with documentation, not replace professional medical judgment.
- AI-generated content should be checked for accuracy before use.
- Do not use real patient information in public testing or demonstrations.

## Author

**Faizan Ansari**

[GitHub](https://github.com/insanecoder23) · [LeetCode](https://leetcode.com/u/coolcoder32/)
