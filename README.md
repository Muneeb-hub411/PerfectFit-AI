# ✦ PerfectFit AI

> **AI-powered interview preparation platform** — upload your resume, paste a job description, and get a personalized report with match score, interview questions, skills gap analysis, and a day-by-day prep plan. Powered by Gemini AI and built on the MERN stack.

---

## 🚀 What It Does

PerfectFit AI analyzes your resume against any job description and generates:

- **Match Score** — how well your profile fits the role (0–100)
- **Technical Questions** — role-specific questions the interviewer might ask, with suggested answers
- **Behavioral Questions** — STAR-method guided questions with coaching tips
- **Skills Gap Analysis** — missing or weak skills ranked by severity (low / medium / high)
- **5-Day Prep Plan** — a personalized day-by-day action plan to get interview-ready

---

## 🛠 Tech Stack

| Layer       | Technology                                  |
| ----------- | ------------------------------------------- |
| Frontend    | React.js, Tailwind CSS, React Router        |
| Backend     | Node.js, Express.js                         |
| Database    | MongoDB + Mongoose                          |
| AI          | Google Gemini AI (gemini-2.5-flash-preview) |
| PDF Parsing | pdf-parse                                   |
| Auth        | JWT + HTTP-only Cookies                     |

---

## 📁 Project Structure

```
PerfectFit-AI/
├── backend/          # Express API server
│   ├── src/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── routes/
│   │   └── services/
│   └── .env
├── frontend/         # React client
│   ├── src/
│   │   ├── api/
│   │   ├── components/
│   │   ├── context/
│   │   ├── hooks/
│   │   └── pages/
│   └── .env
```

---

## ⚙️ Prerequisites

Make sure you have these installed before starting:

- [Node.js](https://nodejs.org/) v18 or higher
- [MongoDB](https://www.mongodb.com/) (local or Atlas)
- A [Google Gemini API key](https://aistudio.google.com/app/apikey)

---

## 🔧 Setup & Installation

### 1. Clone the repository

```bash
git clone https://github.com/your-username/PerfectFit-AI.git
cd PerfectFit-AI
```

---

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file inside the `backend` folder:

```env
PORT=3000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
GEMINI_API_KEY=your_gemini_api_key
NODE_ENV=development
```

Start the backend server:

```bash
npm run dev
```

> Backend runs on **http://localhost:3000**

---

### 3. Frontend Setup

Open a **new terminal**, then:

```bash
cd frontend
npm install
```

Create a `.env` file inside the `frontend` folder:

```env
VITE_API_URL=http://localhost:3000
```

Start the frontend dev server:

```bash
npm run dev
```

> Frontend runs on **http://localhost:5173**

---

## 🖥️ Running Both Servers

You need **two terminals running simultaneously**:

```bash
# Terminal 1 — Backend
cd backend
npm run dev

# Terminal 2 — Frontend
cd frontend
npm run dev
```

Then open your browser and go to:

```
http://localhost:5173
```

---

## 🔑 Environment Variables Reference

### Backend `.env`

| Variable         | Description                                 |
| ---------------- | ------------------------------------------- |
| `PORT`           | Port for the Express server (default: 3000) |
| `MONGO_URI`      | MongoDB connection string                   |
| `JWT_SECRET`     | Secret key for signing JWT tokens           |
| `GEMINI_API_KEY` | Your Google Gemini API key                  |
| `NODE_ENV`       | `development` or `production`               |

### Frontend `.env`

| Variable       | Description        |
| -------------- | ------------------ |
| `VITE_API_URL` | Backend server URL |

---

## 📖 How to Use

1. **Sign up** for an account
2. **Upload your resume** as a PDF
3. **Paste the job title and description** of the role you're applying for
4. **Add a short self-description** about yourself
5. Click **Generate Interview Report**
6. View your personalized report with match score, questions, skills gap, and prep plan
7. Access all your past reports anytime from **My Reports**

---

## 🌐 API Endpoints

### Auth

| Method | Endpoint             | Description         |
| ------ | -------------------- | ------------------- |
| POST   | `/api/auth/register` | Register a new user |
| POST   | `/api/auth/login`    | Login               |
| GET    | `/api/auth/logout`   | Logout              |
| GET    | `/api/auth/getme`    | Get current user    |

### Reports

| Method | Endpoint                         | Description                        |
| ------ | -------------------------------- | ---------------------------------- |
| POST   | `/api/interviewreport/generate`  | Generate a new report              |
| GET    | `/api/interviewreport/myreports` | Get all reports for logged-in user |

---

## 🤝 Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you'd like to change.

---

## 📄 License

[MIT](LICENSE)

---

<div align="center">
  <strong>Built with ✦ by yours truly 🦍</strong>
</div>
