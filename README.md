This project is an e-commerce application built using the MySql Express React Node stack with MySQL for relational database management. It supports user authentication, product management, and order placement, with plans to integrate PayPal for payments in the future.

## Features

- **Authentication**: Secure user login and registration.
- **Add to Cart**: Users can add products to their cart.
- **Place Order**: Users can place orders for products in their cart.
- **Context API**: Efficient state management across the application.
- **Relational Database**: Utilizes MySQL for handling relationships between data.

## Future Features

- **PayPal Payment Integration**: Planned for future implementation to allow users to make payments via PayPal.

## Tech Stack

- **Frontend**: React, Context API, Material-UI
- **Backend**: Node.js, Express, MySQL
- **Authentication**: JWT (JSON Web Token)
- **Database**: MySQL

## Installation

### Prerequisites

- Node.js (v14 or higher)
- MySQL
- Firebase account for any future image storage needs (if applicable)

### Setup

1. **Clone the repository:**

    ```bash
    git clone https://github.com/DavidBatoDev/ecommerce-mysql.git
    cd ecom
    ```

2. **Install dependencies:**

    - Frontend:

      ```bash
      cd frontend
      npm install
      ```

    - Backend:

      ```bash
      cd backend
      npm install
      ```

3. **Set up environment variables:**

    Create a `.env` file in the `backend` directory and add the following:

    ```env
    PORT=5000
    DB_HOST=your_mysql_host
    DB_USER=your_mysql_user
    DB_PASSWORD=your_mysql_password
    DB_NAME=your_database_name
    JWT_SECRET=your_jwt_secret
    ```

4. **Run the MySQL Database:**

    Ensure your MySQL server is running, and create the necessary database and tables.

5. **Run the application:**

    - Backend:

      ```bash
      cd backend
      npm start
      ```

    - Frontend:

      ```bash
      cd frontend
      npm start
      ```

6. **Access the application:**

    Open your browser and navigate to `http://localhost:3000`.

## Dependencies

### Frontend

```json
"dependencies": {
  "@emotion/react": "^11.11.1",
  "@emotion/styled": "^11.11.0",
  "@mui/icons-material": "^5.14.19",
  "@mui/material": "^5.14.20",
  "axios": "^1.7.4",
  "firebase": "^10.7.1",
  "react": "^18.2.0",
  "react-dom": "^18.2.0",
  "react-icons": "^5.3.0",
  "react-router-dom": "^6.20.1"
}
```

### Backend

```json
"dependencies": {
  "bcryptjs": "^2.4.3",
  "cors": "^2.8.5",
  "dotenv": "^16.4.5",
  "express": "^4.19.2",
  "jsonwebtoken": "^9.0.2",
  "mysql": "^2.18.1",
  "mysql2": "^3.11.0"
}
```

### In Multiple Screens:
![image](https://github.com/user-attachments/assets/edc21835-1b2c-4b6b-9597-8254e7206c54)
![image](https://github.com/user-attachments/assets/2edddb14-b6fe-48ab-964a-f2c3fb56d089)

### Authentication Page:
![image](https://github.com/user-attachments/assets/34fdbddd-c690-4402-a730-abd0f63aa15a)
![image](https://github.com/user-attachments/assets/42208107-d48c-459b-9fff-124fc0d5224d)

### Home Page:
![image](https://github.com/user-attachments/assets/6e2d3f5f-5b76-4f8e-915b-f15f293c8176)
![image](https://github.com/user-attachments/assets/f4d07197-20c7-4328-8e6e-eaf844c17ea5)

### Products View Page:
![image](https://github.com/user-attachments/assets/e441770f-7bea-433c-a24a-d8f2f7f3e023)

### Cart View Page:
![image](https://github.com/user-attachments/assets/bf4dd7bc-c226-4a09-a4ff-9328762a6aea)

### Checkout Page:
![image](https://github.com/user-attachments/assets/f748e29b-527f-4eb3-99e5-96f106756b80)

### Profile's Page:
![image](https://github.com/user-attachments/assets/a75b268a-a81b-4202-a5cb-e97bce45067b)

### Order's Component:
![image](https://github.com/user-attachments/assets/544622e2-20e9-41d6-b276-ee6119aadde1)

### Order Details Page:
![image](https://github.com/user-attachments/assets/68e7127f-c67e-4c64-93d7-c871b747da69)

