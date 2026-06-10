# MindVault AI 🧠✨

MindVault AI is a premium, AI-powered journaling platform designed for deep self-reflection, personal growth, and secure memory storage. It combines a modern, high-performance tech stack with intelligent insights to help users understand their thoughts and moods over time.

---

## 🚀 Key Features

### 🤖 AI-Powered Insights
- **Emotion Analysis:** Automatically detects Joy, Sadness, Anger, Fear, Surprise, Love, and Neutrality.
- **Sentiment Analysis:** Categorizes entries as Positive, Negative, or Neutral.
- **Intelligent Reflections:** Provides personalized AI insights based on the content of your writing.
- **Insight Guide:** Dynamic dashboard surfacing the latest AI-generated growth prompts and emotional analytics.

### 🎨 Premium UI/UX
- **Dynamic Themes:** Full support for **Dark** and **Light** modes.
- **Customization:** Multiple accent colors (Blue, Purple, Emerald) to personalize your vault.
- **Glassmorphism Design:** Modern, sleek interface with blur effects and smooth Framer Motion animations.
- **Responsive Layout:** Optimized for desktop and mobile devices.

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
- **AI:** Hugging Face Transformers, PyTorch
- **Database:** MongoDB with Motor (Async driver)
- **Security:** JWT (jose), Bcrypt hashing
- **Environment:** Python 3.13+

### Frontend
- **Framework:** React 19 (Vite)
- **Visualization:** Recharts
- **Styling:** Tailwind CSS v4, PostCSS
- **Animations:** Framer Motion
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
- **Emotion Trends:** Advanced data visualization of mood fluctuations over weeks and months.
- **Encrypted Vaults:** End-to-end encryption for maximum privacy of sensitive entries.
- **AI Chatbot:** A "Self-Reflection Assistant" that asks meaningful questions based on your history.
- **Export & Sync:** Export entries to PDF/Markdown and sync with cloud providers (Dropbox/Google Drive).

---

## 📄 License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

Developed with ❤️ by the MindVault Team.
