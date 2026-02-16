# SmartCode - AI Code Reviewer

SmartCode is an automated code review tool powered by OpenAI's GPT-4o-mini. It analyzes code snippets, provides a summary, identifies potential bugs, suggests improvements, and rates the code quality.

## Features

-   **AI-Powered Analysis**: Instant code review with detailed feedback.
-   **Review History**: Track past reviews, ratings, and code snippets.
-   **Validation**: robust input validation to ensure quality queries.
-   **Clean UI**: Modern, responsive interface with a focus on usability.

## Tech Stack

-   **Frontend**: React.js, CSS3
-   **Backend**: Node.js, Express.js
-   **Database**: Supabase (PostgreSQL)
-   **AI Engine**: OpenAI GPT-4o-mini

## Architecture

1.  **Frontend**: React app accepts user code input.
2.  **API Layer**: Express server handles requests, validates input, and communicates with AI & DB services.
3.  **AI Service**: Constructs a prompt and queries OpenAI API.
4.  **Database**: Supabase stores review results for history tracking.

## Folder Structure

```
smartcode/
├── smartcode-backend/       # Express server
│   ├── config/             # Database configuration
│   ├── controllers/        # Request handlers
│   ├── middleware/         # Error handling & other middleware
│   ├── routes/             # API routes definition
│   ├── services/           # External services (OpenAI)
│   ├── utils/              # Helper functions
│   ├── .env                # Environment variables
│   └── server.js           # Entry point
│
└── smartcode-frontend/      # React application
    ├── src/
    │   ├── components/     # Reusable UI components
    │   ├── pages/          # Page views
    │   ├── services/       # API client
    │   └── App.js          # Main component
    └── public/             # Static assets
```

## Installation & Setup

### Prerequisites
-   Node.js (v16+)
-   Supabase Account
-   OpenAI API Key

### Backend Setup
1.  Navigate to `smartcode-backend`:
    ```bash
    cd smartcode-backend
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Create a `.env` file (see `.env.example` if available) and add:
    ```
    PORT=5000
    OPENAI_API_KEY=your_openai_key
    SUPABASE_URL=your_supabase_url
    SUPABASE_KEY=your_supabase_key
    ```
4.  Start the server:
    ```bash
    npm start
    ```

### Frontend Setup
1.  Navigate to `smartcode-frontend`:
    ```bash
    cd smartcode-frontend
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Start the development server:
    ```bash
    npm start
    ```

## API Documentation

### POST `/api/review`
Analyzes the provided code.
-   **Body**: `{ "code_text": "string" }`
-   **Response**: `{ "summary": "...", "bugs": [], "improvements": [], "rating": 8 }`

### GET `/api/history`
Fetches past code reviews.
-   **Response**: `[{ "id": 1, "code_text": "...", "rating": 8, "created_at": "..." }, ...]`
