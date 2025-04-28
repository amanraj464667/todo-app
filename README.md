To-Do App 📝
A full-stack To-Do application built with React.js (frontend) and Node.js + Express.js (backend), using MongoDB for database storage.

🛠️ Tech Stack
Frontend: React.js, Tailwind CSS
Backend: Node.js, Express.js
Database: MongoDB Atlas
Authentication: JWT (JSON Web Token)
API Testing: Axios
Deployment: Vercel (Frontend) & Render (Backend)

✨ Features
User authentication (Signup/Login)
Create, update, and delete To-Do tasks
Mark tasks as complete/incomplete
Responsive UI (Mobile-friendly)
Protected routes using JWT tokens
Environment variables for security (MongoDB URL, JWT secret)
Full deployment with separate frontend and backend

🚀 Getting Started (Local Setup)
1. Clone the repository
   
git clone https://github.com/amanraj464667/todo-app.git
cd todo-app

2. Backend Setup
   
cd backend
npm install

Create a .env file inside the backend/ folder:

PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret_key

Start the backend server:
npm start

3. Frontend Setup

cd frontend
npm install
