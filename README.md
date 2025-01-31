# 🚀 Garages Management System

A **Full-Stack Application** built with **Node.js (Express + TypeScript + MongoDB) for the backend** and **Angular + Angular Material for the frontend**.

## 📂 Project Structure

```
📂 garages-project
 ├── 📂 backend  # Node.js + Express + MongoDB API
 │   ├── src/
 │   │   ├── config/
 │   │   │   ├── database.ts  # MongoDB connection setup
 │   │   ├── models/
 │   │   │   ├── garage.model.ts  # MongoDB Schema & Model
 │   │   ├── services/
 │   │   │   ├── garage.service.ts  # Business logic for fetching & storing garages
 │   │   ├── routes/
 │   │   │   ├── garage.routes.ts  # Express API routes
 │   │   ├── app.ts  # Express configurations
 │   │   ├── server.ts  # Backend entry point
 │   ├── .env  # Environment variables
 │   ├── package.json  # Backend dependencies
 │   ├── tsconfig.json  # TypeScript configurations
 │   ├── .gitignore  # Ignoring node_modules & build files
 │
 ├── 📂 frontend  # Angular + Angular Material UI
 │   ├── src/
 │   │   ├── app/
 │   │   │   ├── components/
 │   │   │   │   ├── garage-list/  # Table & Multi-Select UI
 │   │   │   ├── services/
 │   │   │   │   ├── garage.service.ts  # API calls to backend
 │   │   │   ├── app.module.ts  # Angular module configuration
 │   │   │   ├── app.component.ts  # Root component
 │   ├── angular.json  # Angular configurations
 │   ├── package.json  # Frontend dependencies
 │   ├── .gitignore  # Ignoring node_modules & build files
```

---

## 🔧 Backend Setup

### **1️⃣ Install Dependencies**
```sh
cd backend
npm install
```

### **2️⃣ Configure Environment Variables**
Create a `.env` file inside the `backend` folder:
```sh
PORT=3000
MONGO_URI=mongodb://localhost:27017/garages_db
```

### **3️⃣ Start the Backend Server**
```sh
node dist/server.js
```
Server will run on **http://localhost:3000**.

---

## 📌 Backend API Documentation

### 🚀 **Fetch Garages from Government API & Store in DB**
#### **GET** `/api/garages/fetch`
- **Response:** Stores and returns garages from external API.

### ➕ **Add a New Garage**
#### **POST** `/api/garages/add`
- **Body:**
  ```json
  {
    "mispar_mosah": 123,
    "full_name": "Example Garage",
    "address": "123 Main St",
    "city": "Tel Aviv",
    "phone": "123-456-7890"
  }
  ```
- **Response:** Adds a new garage to MongoDB.

### 📜 **Get All Garages from DB**
#### **GET** `/api/garages`
- **Response:** Returns all garages stored in MongoDB.

---

## 🎨 Frontend Setup

### **1️⃣ Install Dependencies**
```sh
cd garage-management
npm install
```

### **2️⃣ Start the Frontend Server**
```sh
ng serve
```

The frontend will be available at **http://localhost:4200**.

---

## 🌟 Features
✅ **Fetch & Store** garages from the Israeli government API.
✅ **Display garages** in a table (Angular Material `mat-table`).
✅ **Multi-Select dropdown** to choose garages.
✅ **Validation** to prevent duplicate entries.
✅ **Seamless integration** between backend & frontend.

---

## 🛠️ Technologies Used
### **Backend:**
- Node.js + Express
- TypeScript
- MongoDB (Mongoose)
- Axios (for fetching external API)

### **Frontend:**
- Angular
- Angular Material (UI components)
- RxJS (for handling async API calls)

---

## 🛠️ Development Workflow
1. **Clone the repository**:
   ```sh
   git clone https://github.com/yonakeinon/garages-project.git
   cd garages-project
   ```
2. **Start the backend:**
   ```sh
   cd backend
   node dist/server.js
   ```
3. **Start the frontend:**
   ```sh
   cd garage-management
   ng serve
   ```
4. **Test API Endpoints:** Use **Postman** or your browser at `http://localhost:3000/api/garages`.

---
