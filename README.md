# Quizo - Quiz Management System

A full-stack web application for creating and managing quizzes. Built with React, TypeScript, Node.js, and MySQL.

## 🚀 Features

- User authentication
- Create, read, update, and delete quizzes
- Responsive design
- Toast notifications
- Form validation

## 🛠️ Tech Stack

### Frontend
- React
- TypeScript
- Tailwind CSS
- Shadcn UI
- React Router
- React Hook Form
- Axios

### Backend
- Node.js
- Express
- TypeScript
- TypeORM
- MySQL

## 📝 Setup Instructions

### Backend Setup

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd quizo-backend 
   ```
2. Install dependencies:
   ```bash
   npm install 
   ```
3. Create a `.env` file in the root directory:
   ```env
   PORT=5000
   NODE_ENV=development

   # Database Configuration
   DB_HOST=localhost
   DB_PORT=3306
   DB_USER=your_username
   DB_PASS=your_password
   DB_NAME=quizo_db
   ```
4. Create MySQL database:
   ```sql
   CREATE DATABASE quizo_db; 
   ```
5. Run the development server:
   ```bash
   npm run dev 
   ```

## 📚 API Documentation

### Authentication Endpoints

#### Login 
**POST** `http://localhost:5000/api/auth/login`

**Body (JSON):**
```json
{
    "username": "teacher",
    "password": "password123"
}
```

**Expected Response:**
```json
{
    "status": "success",
    "data": {
        "id": 1,
        "username": "teacher"
    }
}
```

### Quiz Management Endpoints

#### Create Quiz  
**POST** `http://localhost:5000/api/quizzes`

**Headers:**
```
username: teacher
```

**Body (JSON):**
```json
{
    "title": "JavaScript Basics",
    "description": "Test your knowledge of JavaScript fundamentals"
}
```

**Expected Response:**
```json
{
    "status": "success",
    "data": {
        "id": 1,
        "title": "JavaScript Basics",
        "description": "Test your knowledge of JavaScript fundamentals",
        "teacherId": 1,
        "createdAt": "2024-03-14T...",
        "updatedAt": "2024-03-14T..."
    }
}
```

#### Get All Quizzes  
**GET** `http://localhost:5000/api/quizzes`

**Headers:**
```
username: teacher
```

**Expected Response:**
```json
{
    "status": "success",
    "data": [
        {
            "id": 1,
            "title": "JavaScript Basics",
            "description": "Test your knowledge of JavaScript fundamentals",
            "teacherId": 1,
            "createdAt": "2024-03-14T...",
            "updatedAt": "2024-03-14T..."
        }
    ]
}
```

#### Get Single Quiz  
**GET** `http://localhost:5000/api/quizzes/1`

**Headers:**
```
username: teacher
```

**Expected Response:**
```json
{
    "status": "success",
    "data": {
        "id": 1,
        "title": "JavaScript Basics",
        "description": "Test your knowledge of JavaScript fundamentals",
        "teacherId": 1,
        "createdAt": "2024-03-14T...",
        "updatedAt": "2024-03-14T..."
    }
}
```

#### Update Quiz  
**PUT** `http://localhost:5000/api/quizzes/1`

**Headers:**
```
username: teacher
```

**Body (JSON):**
```json
{
    "title": "JavaScript Fundamentals",
    "description": "Updated description for JavaScript quiz"
}
```

**Expected Response:**
```json
{
    "status": "success",
    "data": {
        "id": 1,
        "title": "JavaScript Fundamentals",
        "description": "Updated description for JavaScript quiz",
        "teacherId": 1,
        "createdAt": "2024-03-14T...",
        "updatedAt": "2024-03-14T..."
    }
}
```

#### Delete Quiz  
**DELETE** `http://localhost:5000/api/quizzes/1`

**Headers:**
```
username: teacher
```

**Expected Response:**
```json
{
    "status": "success",
    "message": "Quiz deleted successfully"
}
```

## 🎨 Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd quizo-frontend 
   ```
2. Install dependencies:
   ```bash
   npm install 
   ```
3. Run the development server:
   ```bash
   npm run dev 
   ```

## 🔐 Default User Credentials

**Username:** `teacher`
**Password:** `password123`
