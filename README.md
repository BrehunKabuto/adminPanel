# OrderAdmin - Order Management System

A full-stack admin panel for managing business orders with an integrated AI assistant powered by OpenAI.

## Screenshots

### Dashboard
![Dashboard](screenshots/dashboard.png)

### Orders List
![Orders](screenshots/orders.png)

### Create Order
![Create Order](screenshots/create-order.png)

### Manager List
![Managers](screenshots/managers.png)

### Create Manager
![Create Manager](screenshots/create-manager.png)

### AI Chat
![AI Chat](screenshots/ai-chat.png)

---

## Features

- **JWT Authentication** - Access + Refresh token rotation with httpOnly cookies
- **Role-based Access Control** - Admin and Manager roles with route protection
- **Order Management** - Full CRUD, status tracking (New → In Progress → Completed/Canceled), infinite scroll
- **Manager Management** - Admin can create, view and delete managers
- **AI Assistant** - Chat with your data using OpenAI tool calling. Ask questions like *"How many orders are in progress?"* and get real-time answers from the database
- **Dark Theme** - Clean dark UI built with Tailwind CSS

---

## Tech Stack

**Backend**
- NestJS + TypeScript
- Prisma v7 + PostgreSQL
- JWT (access + refresh token rotation)
- OpenAI Responses API with tool calling
- class-validator + class-transformer

**Frontend**
- React + Vite + TypeScript
- Tailwind CSS v4
- Zustand (state management)
- React Hook Form + Zod v4
- Axios with interceptors and token refresh queue

---

## Getting Started

### Prerequisites
- Node.js 20+
- PostgreSQL

### Backend

```bash
cd backend
pnpm install
```

Create `.env` in `backend/`:

```env
DATABASE_URL=postgresql://user:password@localhost:5432/order_admin
JWT_ACCESS_SECRET=your_access_secret
JWT_REFRESH_SECRET=your_refresh_secret
OPENAI_API_KEY=your_openai_key
FRONTEND_URL=http://localhost:5173
```

Run migrations and seed admin:

```bash
npx prisma migrate dev
pnpm run seed -- --email admin@example.com --password yourpassword
```

Start the server:

```bash
pnpm run start:dev
```

### Frontend

```bash
cd frontend
pnpm install
```

Create `.env` in `frontend/`:

```env
VITE_API_URL=http://localhost:3000
```

Start the dev server:

```bash
pnpm run dev
```

---

## API Overview

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /auth/login | Login |
| POST | /auth/refresh | Refresh access token |
| POST | /order | Create order |
| POST | /order/changeStatus | Update order status |
| DELETE | /order/:id | Delete order (Admin only) |
| GET | /order/page | Get page of orders (paginated) |
| GET | /order/stats | Dashboard statistics |
| GET | /user/all | Get all managers (Admin only) |
| GET | /user/page | Get page of managers (Admin only) (paginated) |
| POST | /user/create | Create manager (Admin only) |
| DELETE | /user/:id | Delete manager (Admin only) |
| POST | /chat | Send message to AI assistant |
| Get | /chat | get chat page |

---
## Live Demo

🔗 [admin-panel-lake-two.vercel.app](https://admin-panel-lake-two.vercel.app)

**Demo credentials:**
- Email: `testadmin123@gmail.com`
- Password: `ExamplePassword`