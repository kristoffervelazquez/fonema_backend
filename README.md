# Call Transcript Analyzer - Backend 🚀

This is the backend service for the Call Transcript Analyzer application. It is built with Node.js and Express, and it's responsible for receiving call transcripts, communicating with the OpenRouter AI API to generate an analysis, and persisting the results in an SQLite database.

---
## ✨ Features

- **AI-Powered Analysis**: Generates a summary, sentiment analysis, and action items from a call transcript.
- **Data Persistence**: Stores all analyses in an SQLite database for historical review.
- **RESTful API**: Provides clear endpoints to create new analyses and retrieve existing ones.
- **Structured Code**: Organized using a feature-based architecture with services, controllers, and repositories.

---
## 🛠️ Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Language**: TypeScript
- **Database**: SQLite with `better-sqlite3`
- **AI Gateway**: OpenRouter API

---
## ⚙️ Setup and Installation

Follow these steps to get the backend running locally.

1.  **Clone the repository**
    ```bash
    git clone https://github.com/kristoffervelazquez/fonema_backend.git
    ```

2.  **Navigate to the backend directory**
    ```bash
    cd fonema_backend
    ```

3.  **Install dependencies**
    ```bash
    npm install
    ```


4.  **Configure Environment Variables**
    Create the `.env` file and add your credentials.

---
## 🔑 Environment Variables

The `.env` file is required to run the application.

```dotenv
# .env

# Port for the Express server to run on
PORT=3000

# Your API key from OpenRouter
OPENROUTER_API_KEY=sk-or-xxxxxxxxxxxxxxxxxxxxxx
```
## ✅ Run the project
1.  **Run development**
    ```bash
    npm run dev
    ```
The application will be available at http://localhost:5173 (or another port specified by Vite).
