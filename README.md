# MindVault AI 🧠✨

MindVault AI is a premium, AI-powered journaling platform designed for deep self-reflection, personal growth, and secure memory storage. It combines a modern, high-performance tech stack with intelligent insights to help users understand their thoughts and moods over time.

---

## 🚀 Key Features

### 🤖 AI-Powered Insights
- **Phase 4: Personalized AI Reflection Engine:** A deep-dive analysis system that moves beyond summaries to provide thoughtful, coach-like insights.
  - **Pattern Detection:** Identifies recurring emotional trends and behavioral habits.
  - **Growth Analysis:** Compares historical and recent entries to quantify personal evolution.
  - **Actionable Recommendations:** Suggests specific steps to reduce stress and maintain productivity.
- **AI Summarization:** Generates entry-level, weekly, and monthly summaries using advanced NLP models (BART/T5).
- **Topic Extraction:** Automatically identifies recurring themes and technical tags in your history.
- **Emotion & Sentiment Analysis:** Detects Joy, Sadness, Anger, Fear, Surprise, Love, and Neutrality.

### 🎨 Premium UI/UX
- **AI Reflection Dashboard:** A dedicated space for growth insights featuring glassmorphism, animated insight cards, and progress tracking.
- **Dynamic Themes:** Full support for **Dark** and **Light** modes with customizable accent colors.
- **Modern Transitions:** Powered by Framer Motion for a seamless, interactive SaaS experience.

### 🔒 Privacy & Security
- **Privacy Mode:** One-click blur for sensitive journal content on the dashboard.
- **Secure Auth:** Robust password hashing using `bcrypt` and JWT-based session management.
- **Local Storage:** Your settings and preferences are saved locally for a consistent experience.

### 📈 Tracking & Organization
- **Dynamic Streaks:** Automatically calculates consecutive writing days to build habits.
- **Journal CRUD:** Full control over your entries with search and filtering capabilities.
- **Profile Management:** Personalized user profile with account details.

---

## 🛠️ Tech Stack

### Backend
- **Framework:** FastAPI (Python)
- **AI & NLP:** LangChain, Hugging Face Transformers, PyTorch
- **Database:** MongoDB with Motor (Async driver)
- **Security:** JWT (jose), Bcrypt hashing

### Frontend
- **Framework:** React 19 (Vite)
- **Animations:** Framer Motion
- **Styling:** Tailwind CSS v4
- **Icons:** Lucide React
- **State:** React Context API (Auth & Global Settings)

---

## 📦 Installation & Setup

### 1. Prerequisites
- MongoDB installed and running locally (`mongodb://localhost:27017`).
- Python 3.10+
- Node.js 18+

### 2. Backend Setup
```bash
cd backend
pip install -r requirements.txt
# Create a .env file with:
# MONGO_URI=mongodb://localhost:27017
# DATABASE_NAME=mindvault_ai
# SECRET_KEY=your_secret_key
uvicorn main:app --reload
```

### 3. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

---

## 🔮 Future Advancements

- **Voice-to-Journal:** AI-powered transcription for hands-free reflection.
- **AI Chatbot:** A "Self-Reflection Assistant" that asks meaningful questions based on your history.
- **Export & Sync:** Export entries to PDF/Markdown and sync with cloud providers (Dropbox/Google Drive).
- **Encrypted Vaults:** End-to-end encryption for maximum privacy of sensitive entries.

---

## 📄 License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

Developed with ❤️ by the MindVault Team.
