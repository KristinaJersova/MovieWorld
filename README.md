# 🎬 MovieWorld

Full-stack movie web application built with:

- React + Vite
- Node.js + Express
- TypeScript
- PostgreSQL
- Prisma ORM
- JWT Authentication
- Swagger API Documentation

---

# 📖 Project Overview

MovieWorld is a web application where users can browse movies, view ratings, genres, actors, and directors.

Administrators can import movies directly from the OMDb API and manage movie data through protected API endpoints.

The project was created as a university full-stack/database project.

---

# 🚀 Features

## Authentication & Authorization
- User registration
- User login
- JWT authentication
- Role-based authorization
- Protected routes

## Movies
- Get all movies
- Get movie by ID
- Create movie
- Update movie
- Delete movie

## OMDb Integration
- Import movies from OMDb API
- Automatic creation of:
  - directors
  - actors
  - genres
  - ratings

## Database
- PostgreSQL database
- Prisma ORM
- Relations:
  - Movie ↔ Actor
  - Movie ↔ Genre
  - Movie ↔ Rating
  - Movie ↔ Director

## API Documentation
- Swagger UI
- REST API

---

# 🛠️ Tech Stack

## Frontend
- React
- Vite
- TypeScript
- Axios
- React Router

## Backend
- Node.js
- Express
- TypeScript
- Prisma ORM
- JWT
- bcrypt

## Database
- PostgreSQL
- pgAdmin

---

# 📂 Project Structure

```bash
MovieWorld/
│
├── backend/
│   ├── prisma/
│   ├── src/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── prisma/
│   │   ├── routes/
│   │   ├── validators/
│   │   ├── server.ts
│   │   └── swagger.ts
│
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   └── App.tsx
│
└── README.md