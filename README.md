# 🚀 Task Manager (Full Stack Project)

A secure and user-based Task Manager application built using **Node.js, Express, MySQL, and React (Vite)**.
Users can register, log in, and manage their personal tasks with full CRUD functionality.

---

# 📌 Features

## 🔐 Authentication

* User Signup & Login
* Password hashing using **bcrypt**
* JWT-based authentication
* Protected routes using middleware

## 📋 Task Management

* Create new tasks
* View all tasks (user-specific)
* Update tasks
* Delete tasks

## ⚡ Advanced Features

* Filter tasks by status (pending / completed)
* Priority levels (low, medium, high)
* Secure user-specific data handling

---

# 🧠 Tech Stack

## Backend

* Node.js
* Express.js
* MySQL
* JWT (Authentication)
* bcrypt (Security)

## Frontend

* React (Vite)
* Axios
* Tailwind CSS (optional for styling)

---


# 📂 Full Project Structure

```text
Task_Manager/
│
├── backend/
│   ├── config/
│   │    └── db.js
│   │
│   ├── controllers/
│   │    ├── authController.js
│   │    └── taskController.js
│   │
│   ├── routes/
│   │    ├── authRoutes.js
│   │    └── taskRoutes.js
│   │
│   ├── middleware/
│   │    └── authMiddleware.js
│   │
│   ├── models/            (optional - for scalable design)
│   │    └── taskModel.js
│   │
│   ├── .env
│   ├── package.json
│   └── server.js
│
├── frontend/
│   ├── public/
│   │
│   ├── src/
│   │   ├── assets/
│   │   │
│   │   ├── components/
│   │   │   ├── layout/
│   │   │   │   ├── Layout.jsx
│   │   │   │   ├── Sidebar.jsx
│   │   │   │   └── Navbar.jsx
│   │   │   │
│   │   │   ├── ui/
│   │   │   │   ├── Button.jsx
│   │   │   │   ├── Input.jsx
│   │   │   │   └── Card.jsx
│   │   │   │
│   │   │   └── common/
│   │   │       └── Loader.jsx
│   │   │
│   │   ├── pages/
│   │   │   ├── Login.jsx
│   │   │   ├── Signup.jsx
│   │   │   └── Dashboard.jsx
│   │   │
│   │   ├── context/
│   │   │   ├── AuthContext.jsx
│   │   │   └── ThemeContext.jsx
│   │   │
│   │   ├── services/
│   │   │   └── api.js
│   │   │
│   │   ├── utils/
│   │   │   └── helpers.js
│   │   │
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   │
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
│
└── README.md
```

---

# 🧠 Structure Explanation

### 🔹 Backend

* `config/` → database connection
* `controllers/` → business logic
* `routes/` → API endpoints
* `middleware/` → authentication (JWT)
* `models/` → optional DB abstraction layer
* `server.js` → main entry point

---

### 🔹 Frontend

* `components/` → reusable UI
* `pages/` → main screens
* `context/` → global state (auth + theme)
* `services/` → API calls
* `utils/` → helper functions
* `App.jsx` → routing + layout

---

```

---

# ⚙️ Installation & Setup

## 🔹 Backend Setup

```bash
cd backend
npm install
```

Create `.env` file:

```env
PORT=3000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=task_manager
JWT_SECRET=your_secret_key
```

Run backend:

```bash
node server.js
```

---

## 🔹 Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

---

# 🔌 API Endpoints

## 🔐 Auth

* `POST /api/auth/signup`
* `POST /api/auth/login`

## 📋 Tasks

* `POST /api/tasks` → Create task
* `GET /api/tasks` → Get all tasks
* `GET /api/tasks?status=pending` → Filter tasks
* `PUT /api/tasks/:id` → Update task
* `DELETE /api/tasks/:id` → Delete task

---

# 🗄️ Database Schema

## Users Table

* id (Primary Key)
* name
* email (Unique)
* password (Hashed)

## Tasks Table

* id
* title
* description
* dueDate
* status
* priority
* userId (Foreign Key)

---

# 🔐 Authentication Flow

```text
Signup → Login → JWT Token Generated
       ↓
Token sent in headers (Authorization: Bearer <token>)
       ↓
Middleware verifies user
       ↓
Access granted to protected routes
```

---

# 🧪 Testing

Use **Postman** to test APIs:

1. Signup user
2. Login → copy token
3. Add token in header
4. Test task APIs

---

# 📌 Key Learnings

* REST API design
* JWT authentication
* Middleware usage
* MySQL integration
* Secure coding practices
* Full-stack architecture

---

# 🚀 Future Improvements

* Add categories for tasks
* Add pagination
* Add notifications
* Improve UI/UX with animations

---

# 👨‍💻 Author

**Neel Patil**

---
