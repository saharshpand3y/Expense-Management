# **Expense Management Application**
## **Overview**
This project is a full-stack expense management application designed to help users track their expenses, gain insights into their spending habits, and manage their finances efficiently. It includes user authentication using JWT (JSON Web Token), expense tracking functionality, and an endpoint to provide spending insights.

---

## **Approach Taken**
- **Frontend:**
    - Developed using React with React Router for client-side routing.
    - Hosted on Vercel for fast and scalable deployment.
    - The frontend communicates with the backend using RESTful APIs.

- **Backend:**
    - Built with Node.js and Express.js.
    - Implements JWT-based authentication for secure user login and session management.
    - Includes endpoints for managing expenses and retrieving spending insights.
    - Hosted on an AWS EC2 instance.

- **Database:**
    - Uses MongoDB as the database to store user data, expenses, and other related information.

- **Deployment:**
    - Frontend hosted on Vercel.
    - Backend hosted on an AWS EC2 instance with proper CORS configuration to allow communication between the frontend and backend.

---

## **Project Features**

- **User Authentication:**: Secure login and signup using JWT.
- **Expense Management:**: Add, edit, delete, and list expenses.
- **Spending Insights:**: Analyze spending patterns and generate insights.
- **Responsive Design:**: The frontend is designed to work seamlessly across devices.

---

## **Documentation**
### **1.  JWT Implementation**
  -  **What is JWT?**
        JWT (JSON Web Token) is used for secure user authentication. It allows the backend to verify the identity of a user and manage their session without storing sensitive data on the server.


        **How JWT is Used in This Project:**
         
     - **Login:**
        - When a user logs in, the backend validates their credentials.
        - If valid, a JWT is generated using the user's unique ID and a secret key.
        - The JWT is sent to the frontend and stored in the browser (usually in localStorage or cookies).

     - **Protected Routes:**
        - For accessing protected endpoints (e.g., adding expenses), the frontend includes the JWT in the request headers (Authorization: Bearer <token>).
        - The backend verifies the JWT before processing the request.
    
     - **Token Expiry:**
        - Tokens are configured to expire after a set period (e.g., 24 hours). The user must log in again after expiry.


### **2. Expense Management**
  - **Endpoints for Expense Management:**
        
    The backend provides the following endpoints for managing expenses:

    - **Add Expense:**

        - Method: POST
        - Endpoint: /api/expenses
        - Request Body:
            ```bash
                {
                "title": "Groceries",
                "amount": 50,
                "category": "Food",
                "date": "2025-01-31"
                }

            ```
        - Description: Adds a new expense for the authenticated user.

    - **Get All Expenses:**
        - Method: GET
        - Endpoint: /api/expenses
        - Description: Retrieves all expenses for the authenticated user.

    - **Delete Expense:**
        - Method: DELETE
        - Endpoint: /api/expenses/:id
        - Description: Deletes an expense by ID.


  - **Database Schema:**

    The MongoDB schema for expenses:

    ```bash
    const mongoose = require("mongoose");

    const expenseSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    title: { type: String, required: true },
    amount: { type: Number, required: true },
    category: { type: String, required: true },
    date: { type: Date, default: Date.now },
    });

    module.exports = mongoose.model("Expense", expenseSchema);

    ```

### **3. Spending Insights Endpoint**
  **Purpose:**
    The spending insights endpoint provides aggregated data to help users understand their spending habits, such as total spending, spending by category, and monthly trends.

  **Endpoint Details:**
    
- Method: GET

- Endpoint: /api/insights

- Description: Returns insights based on the user's expenses.

---

## **How to Run the Project**

### **Clone the Repository**
```bash
git clone https://github.com/saharshpand3y/Expense-Management.git
cd Expense-Management
```

### **1. Backend:**
 - **Install dependencies:** ``` bun install ```
 - **Set environment variables:** 
    - ```JWT_SECRET```
    - ```MONGO_URI```

 - **Start the server:** ```bun run index.js```


### **2. Frontend:**
 - **Install dependencies:** ```bun install```
 - **Set** ```VITE_BACKEND_URL``` **environment variable in** ```.env```
 - **Build for Production:** ```bun run build```
 - **Start the app:** ```bunx serve dist --single```

### **3. Deployment:**
 - **Deploy the frontend to Vercel.**
 - **Host the backend on AWS EC2 or any preferred server.**

