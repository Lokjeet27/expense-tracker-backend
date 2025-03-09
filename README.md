# **Expense Tracker Backend**

This is the backend for the **Expense Tracker** application, built using **Node.js, Express, PostgreSQL, and Sequelize**.

---

## **🚀 Setup Instructions**  

### **1️⃣ Clone the Repository**  
```sh
git clone https://github.com/your-repo/expense-tracker-backend.git
```
*(Replace `your-repo` with the actual repository URL if needed.)*

### **2️⃣ Navigate to the Project Directory**  
```sh
cd expense-tracker-backend
```

### **3️⃣ Install Dependencies**  
```sh
npm install
```

### **4️⃣ Create a `.env` File**  
Create a `.env` file in the root directory and paste the following environment variables:  

```
PORT=5000 
DB_HOST=localhost
DB_PORT=5432
DB_NAME=expensetracker
DB_USER=postgres
DB_PASSWORD=123
JWT_SECRET=aajflkjflkajfldjleiroiserieurworuoiuriouweoruoiweuriuewruewoiruwoiruwoiruoiruueworuweoi
```

### **5️⃣ Update CORS Configuration for Local Development**  
To run the backend locally on `http://localhost:5000`, update the **CORS** configuration:  

- Open `server.js`
- Replace this line:  
  ```js
  origin: 'https://expense-tracker-frontend-2gwb.onrender.com/',
  ```
  with:  
  ```js
  origin: 'http://localhost:5173',
  ```

### **6️⃣ Start the Server**  
```sh
npm start
```
The backend should now be running at **`http://localhost:5000`** 🎉  

---

## **🛠 API Documentation & Testing**  
Access **Swagger API Documentation** for testing:  
- **Local:** [http://localhost:5000/api-docs](http://localhost:5000/api-docs)  
- **Live:** [https://expense-tracker-backend-1e0i.onrender.com/api-docs/](https://expense-tracker-backend-1e0i.onrender.com/api-docs/)  

---

## **📌 Usage Guide**  

### **1️⃣ Create a New User (Register)**  
Use the **`/api/auth/register`** API to create a new user.  

### **2️⃣ Login & Get JWT Token**  
Use the **`/api/auth/login`** API to authenticate and get a **JWT token**.  

### **3️⃣ Authenticate (Authorize Yourself)**  
- Copy the token from the login response.  
- Click the **"Authorize"** button in the **top right** of Swagger.  
- Paste the token to authenticate.  

### **4️⃣ Add Income Before Any Expense**  
Use **`POST /api/income`** to add your income before adding any expenses.  

### **5️⃣ Explore CRUD Operations on Expenses**  
- Add an Expense: **`POST /api/expenses`**  
- Get All Expenses: **`GET /api/expenses`**  
- Update an Expense: **`PUT /api/expenses/:id`**  
- Delete an Expense: **`DELETE /api/expenses/:id`**  

---

## **✅ Conclusion**  
Your **Expense Tracker Backend** is now set up and ready to use! 🚀  
You can now connect the **frontend** and start tracking expenses.  

Need help? Feel free to ask! 😊
