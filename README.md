# 📘 User Management System – MERN Stack

A full-stack **User Management application** built as part of a **MERN Stack Internship Assessment**.  
The application supports user CRUD operations, search, pagination, CSV export, responsive UI, and form validation.

---

## 🔗 Live Demo

- **Frontend (Netlify):**  
  https://startling-empanada-655c1d.netlify.app/

- **Backend API (Render):**  
  https://user-management-assignment-2g82.onrender.com


---

## 🛠 Tech Stack

### Frontend
- React (Vite)
- TypeScript
- Tailwind CSS
- React Hook Form + Zod
- Axios
- React Router DOM

### Backend
- Node.js
- Express.js
- TypeScript
- MongoDB Atlas
- Mongoose
- Zod (validation)
- json2csv (CSV export)

### Tooling & Deployment
- pnpm (Monorepo)
- Netlify (Frontend)
- Render (Backend)

---

## 📂 Monorepo Structure

```bash
monorepo/
├── apps/
│   ├── api/        # Express backend
│   └── web/        # React frontend
├── packages/
│   └── shared/     # Shared types & validation schemas
├── pnpm-workspace.yaml
├── package.json
└── README.md
