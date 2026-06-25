# VibeTech Event Registration Portal

A modern, responsive Event Registration Portal built for college technical sessions and workshops. Designed with a premium SaaS-inspired UI featuring glassmorphism, smooth animations, and a unified authentication system.

## 🚀 Features

* **Public Landing Page**: Stunning, interactive event overview showcasing speakers, schedules, and dynamic "seats available" indicators.
* **Student Registration**: Clean, validated registration form resulting in a success ticket generation.
* **Unified Login**: A single, sleek authentication page for all users. The system dynamically determines role access (Student vs. Admin).
* **Role-Based Access Control (RBAC)**: Secure routing ensures students cannot access admin-level dashboard pages or APIs.
* **Admin Dashboard**: A secure, data-rich dashboard for administrators to view, search, and manage all registrations.
* **Graceful Error Handling**: Global Error Boundaries and skeleton loaders ensure a flawless, crash-free user experience.

## 💻 Tech Stack

### Frontend (Client)
* **Framework**: React 18 + Vite
* **Language**: TypeScript
* **Styling**: Tailwind CSS (Deep Slate theme with Crimson accents)
* **Animations**: Framer Motion
* **Icons**: Lucide React
* **Routing**: React Router DOM

### Backend (Server)
* **Framework**: Express.js
* **Language**: TypeScript (Node.js)
* **Architecture**: REST API
* **Data Storage**: In-memory (Array-based, resetting on server restart)

## 📁 Project Structure

```text
vibe/
├── client/                 # React Frontend
│   ├── src/
│   │   ├── components/     # Reusable UI components (Buttons, Cards, Modals)
│   │   ├── layouts/        # Page layout wrappers (Navbar, Footer)
│   │   ├── pages/          # Full page views (Landing, Admin, Auth)
│   │   └── types/          # TypeScript interfaces
│   └── ...
└── server/                 # Express Backend
    ├── src/
    │   └── server.ts       # Main server and API routes
    └── ...
```

## 🛠️ Setup & Installation

### Prerequisites
* Node.js (v18+ recommended)
* npm or yarn

### 1. Start the Backend Server
Open a terminal and run the following commands:
```bash
cd server
npm install
npm run dev
```
*The server will start on `http://localhost:5000`.*

### 2. Start the Frontend Client
Open a second, separate terminal and run:
```bash
cd client
npm install
npm run dev
```
*The frontend will start on `http://localhost:5173` (or 5174 if 5173 is occupied).*

## 🔐 Default Credentials

To test the unified authentication and Role-Based Access Control, use the following credentials on the `/login` page:

**Admin Access:**
* **Username**: `admin`
* **Password**: `admin123`
*(Grants access to the secure `/admin` Dashboard)*

**Student Access:**
* **Username**: `student`
* **Password**: `student123`
*(Restricts access to public routes only)*

## 📡 API Endpoints

| Method | Endpoint | Description | Access |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/event` | Fetch public event details and available seats | Public |
| `POST` | `/api/register` | Submit a new student registration | Public |
| `POST` | `/api/login` | Authenticate a user and return a JWT/Role | Public |
| `GET` | `/api/registrations`| Fetch all submitted registrations | **Admin Only** |
| `DELETE` | `/api/registrations/:id` | Delete a specific registration by ID | **Admin Only** |

## ✨ Design Philosophy
This project distances itself from basic structural templates by strictly adhering to modern UI/UX principles. It features high-contrast typography, interactive hover states, micro-animations, and a highly polished dark mode.
