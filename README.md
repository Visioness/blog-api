# Blog API Project

A full-stack blog application built as part of The Odin Project curriculum. This project features a RESTful API backend and a modern React frontend.

## 🚀 Tech Stack

### Frontend

- **Framework:** React 19 (via Vite)
- **Styling:** Tailwind CSS 4
- **Routing:** React Router 7
- **Icons:** Lucide React

### Backend

- **Server:** Node.js & Express 5
- **Database:** PostgreSQL
- **ORM:** Prisma
- **Authentication:** Passport.js, JWT, Bcryptjs

## 🛠️ Prerequisites

Before you begin, ensure you have met the following requirements:

- **Node.js** (v18 or higher recommended)
- **PostgreSQL** installed and running

## 🏁 Getting Started

### 1. Clone the Repository

```bash
git clone <repository-url>
cd blog-api
```

### 2. Backend Setup

Navigate to the backend directory, install dependencies, and set up the database.

```bash
cd backend
npm install
```

**Environment Variables:**
Create a `.env` file in the `backend` directory with the following variables:

```env
PORT=3000
ALLOWED_ORIGINS="http://localhost:5173"
DATABASE_URL="postgresql://user:password@localhost:5432/blog_db?schema=public"
SECRET_KEY="your_jwt_secret_key"
NODE_ENV="development"
```

**Database Migration:**
Run the Prisma migrations to set up your database schema.

```bash
npx prisma migrate dev
```

**Start the Server:**

```bash
node app.js
# or if you have nodemon installed
npx nodemon app.js
```

### 3. Frontend Setup

Open a new terminal, navigate to the frontend directory, and start the development server.

```bash
cd frontend
npm install
npm run dev
```

The frontend should now be running at `http://localhost:5173` (or the port shown in your terminal).

## ✨ Features

- **User Authentication:** Sign up, log in, and secure route protection.
- **Blog Posts:** Create, read, update, and delete posts (CRUD).
- **Responsive Design:** Mobile-friendly interface using Tailwind CSS.
- **API Integration:** Seamless communication between React frontend and Express backend.

## 📝 License

This project is open source and available under the [MIT License](LICENSE).
