# 📚 Eigent Test Backend System and Algorithm

A **TypeScript-based Express.js** application for managing book borrowings and returns. This project includes **penalty enforcement for overdue books**, OpenAPI documentation, and was generated using the **Express.js Generator with TypeScript** by **@seanpmaxwell**.

---

## 🚀 Features
- Borrow and return books.
- Enforce penalties for overdue books (7+ days).
- OpenAPI/Swagger documentation.
- MySQL database integration.

## 📦 Setup & Installation

### 1️⃣ Prerequisites
- **Node.js** (>= 14)
- **MySQL** (Ensure you have a running MySQL database)

### 2️⃣ Clone the Repository
```sh
git clone https://github.com/your-repo/library-management.git
cd library-management
```

### 3️⃣ Install Dependencies
```sh
npm install
```

### 4️⃣ Configure the Environment
Copy `.env.example` to `.env` and update database credentials.
```sh
cp .env.example .env
```
Modify `.env`:
```
DB_HOST=localhost
DB_USER=root
DB_PASS=yourpassword
DB_NAME=library
```

### 5️⃣ Run Database Migrations (if applicable)
```sh
npm run migrate
```

### 6️⃣ Start the Server
```sh
npm run dev
```

---

## 🔗 API Endpoints

### 📖 **Borrow a Book**
```http
POST /borrow
```
#### Request Body:
```json
{
  "memberCode": "M123",
  "bookCode": "B456"
}
```
#### Response:
```json
{
  "message": "Book borrowed successfully!"
}
```

### 📖 **Return a Book**
```http
POST /return
```
#### Request Body:
```json
{
  "memberCode": "M123",
  "bookCode": "B456"
}
```
#### Response:
```json
{
  "message": "Book returned successfully!"
}
```

> **Overdue books (7+ days late) result in a penalty applied to the member.**

---

## 📝 OpenAPI & Swagger Documentation
This project includes **Swagger UI** for API documentation.

### 🔹 **Access Swagger UI**
After running the server, open:
```
http://localhost:3000/api-docs
```

Swagger provides a UI to test the API endpoints interactively.

---

## 🎉 Acknowledgment
This project was built using **Express.js with TypeScript** and was **scaffolded using** the [Express Generator with TypeScript](https://github.com/seanpmaxwell/express-generator-typescript) by **@seanpmaxwell**.

Kudos to Sean P Maxwell @seanpmaxwell for the awesome generator! 🚀🔥


Algorithm Test case is on Algorithm Test folder
