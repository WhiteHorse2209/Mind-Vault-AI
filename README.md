# MindVault AI - Week 1: Foundation

MindVault AI is a modern AI-powered journaling and self-reflection platform. This is the Week 1 foundation.

## Tech Stack

- **Backend:** FastAPI, Python, Motor (Async MongoDB), JWT, Passlib.
- **Frontend:** React (Vite), Tailwind CSS, Framer Motion, Lucide React, React Hook Form.
- **Database:** Local MongoDB (`mongodb://localhost:27017`).

## Project Structure

```text
mindvault-ai/
├── backend/            # FastAPI Backend
│   ├── database/       # MongoDB Connection
│   ├── routes/         # Auth & Journal API
│   ├── schemas/        # Pydantic Models
│   └── main.py         # Entry point
└── frontend/           # React Frontend
    ├── src/
    │   ├── context/    # Auth Context
    │   ├── pages/      # Application Pages
    │   └── layouts/    # UI Layouts
```

## Setup Instructions

### Backend

1.  Navigate to `backend/`.
2.  Install dependencies: `pip install -r requirements.txt`.
3.  Ensure MongoDB is running locally.
4.  Run the server: `uvicorn main:app --reload`.

### Frontend

1.  Navigate to `frontend/`.
2.  Install dependencies: `npm install`.
3.  Run the dev server: `npm run dev`.

## Deliverables

- [x] FastAPI backend with JWT Auth.
- [x] Local MongoDB integration.
- [x] Journal CRUD functionality.
- [x] Premium Dark Theme UI.
- [x] Responsive Sidebar and Dashboard.
- [x] Smooth Framer Motion animations.
