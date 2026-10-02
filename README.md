# JoyCart

JoyCart is a full-stack e-commerce application built using the MERN stack.

## Tech Stack

- React + Vite
- Node.js + Express.js
- MongoDB + Mongoose
- Redux Toolkit
- TanStack React Query
- Axios
- JWT Authentication
- Multer + ImageKit
- Tailwind CSS

## Features

- User registration and login
- JWT-based authentication
- Access and refresh token authentication
- Protected routes
- Seller authorization
- Product CRUD operations
- Product details
- Product image upload
- Logout
- React Query based server-state management

## Project Structure

```text
JoyCart/
├── frontend/
└── backend/
```

- `frontend` – React frontend application
- `backend` – Node.js/Express REST API

## Setup

### 1. Clone the Repository

```bash
git clone <repository-url>
cd JoyCart
```

### 2. Setup Backend

```bash
cd backend
npm install
npm run dev
```

Create a `.env` file inside the `backend` folder:

```env
MONGO_URI=your_mongodb_connection_string
JWT_ACCESS_SECRET=your_access_secret
JWT_REFRESH_SECRET=your_refresh_secret
IMAGEKIT_PRIVATE_KEY=your_imagekit_private_key
CLIENT_URL=http://localhost:5173
```

### 3. Setup Frontend

Open another terminal:

```bash
cd frontend
npm install
npm run dev
```

Create a `.env` file inside the `frontend` folder:

```env
VITE_API_URL=http://localhost:3000/api
```

Frontend will run on:

```text
http://localhost:5173
```

## API Endpoints

### Authentication

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register a new user |
| POST | `/api/auth/login` | Login user |
| POST | `/api/auth/refresh` | Refresh access token |
| POST | `/api/auth/logout` | Logout user |

### Products

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/products` | Get all products |
| GET | `/api/products/:id` | Get a single product |
| POST | `/api/products` | Create a product |
| PUT | `/api/products/:id` | Update a product |
| DELETE | `/api/products/:id` | Delete a product |

## Deployment

- Frontend: Vercel
- Backend: Render
- Database: MongoDB Atlas
- Image Storage: ImageKit

## Author

Aaryan Dewangan