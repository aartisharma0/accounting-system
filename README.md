 **Accounting System — Full Stack Application**  
A complete personal accounting system built using:

- **Next.js (Frontend)**
- **Yii2 REST API (Backend)**
- **MySQL Database**

This project allows users to manage **income, expenses, accounts, summaries, and reports** with a clean UI and powerful filtering options.

---

# Features

### Transaction Management  
- Add, edit, delete income & expenses  
- Attach transactions to accounts  
- Categories, descriptions, amounts, dates  

### Multi-Account Support  
- Cash, Bank, Credit Card, etc.  
- Filter transactions by account  
- Display account name + type everywhere  

### Filters  
- Date range  
- Type (income/expense)  
- Category  
- Account  

### Overview Dashboard  
- Total income  
- Total expenses  
- Balance  

### Monthly Report  
- Income vs expenses for selected month  
- Filter by account  

### REST API (Yii2)  
- Clean, structured, CORS-enabled  
- Fully compatible with Next.js frontend  

---

# Project Structure

```
accounting-system/
│
├── frontend/          # Next.js application
│   ├── components/
│   ├── lib/
│   ├── pages/
│   ├── public/
│   └── styles/
│
└── backend-yii/       # Yii2 REST API
    ├── controllers/
    ├── models/
    ├── config/
    ├── migrations/
    └── web/
```

---

# Requirements

- Node.js 18+
- PHP 8.1+
- Composer
- MySQL / MariaDB
- Git

---

# Backend Setup (Yii2 REST API)

### 1. Install dependencies
```bash
cd backend-yii
composer install
```

### 2. Configure database  
Edit:

```
backend-yii/config/db.php
```

Example:

```php
'dsn' => 'mysql:host=localhost;dbname=accounting_system',
'username' => 'root',
'password' => '',
```

### 3. Create database tables

#### Account table
```sql
CREATE TABLE account (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  type VARCHAR(50) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

#### Transaction table
```sql
CREATE TABLE transaction (
  id INT AUTO_INCREMENT PRIMARY KEY,
  date DATE NOT NULL,
  description VARCHAR(255) NOT NULL,
  amount DECIMAL(10,2) NOT NULL,
  type ENUM('income','expense') NOT NULL,
  category VARCHAR(100),
  account_id INT,
  FOREIGN KEY (account_id) REFERENCES account(id)
);
```

### 4. Insert sample accounts
```sql
INSERT INTO account (name, type) VALUES
('Saving Account', 'Bank'),
('Cash Wallet', 'Cash'),
('Credit Card', 'Credit Card');
```

### 5. Start backend server
```bash
php yii serve --port=8080
```

Backend runs at:

**http://localhost:8080**

---

# Frontend Setup (Next.js)

### 1. Install dependencies
```bash
cd frontend
npm install
```

### 2. Create environment file  
Create:

```
frontend/.env.local
```

Add:

```
NEXT_PUBLIC_API_BASE_URL=http://localhost:8080
```

### 3. Start development server
```bash
npm run dev
```

Frontend runs at:
 **http://localhost:3000**

---

# 🔌 API Endpoints

### Transactions
| Method | Endpoint |
|--------|----------|
| GET | `/transactions` |
| GET | `/transactions/{id}` |
| POST | `/transactions` |
| PUT | `/transactions/{id}` |
| DELETE | `/transactions/{id}` |

### Accounts
| Method | Endpoint |
|--------|----------|
| GET | `/accounts` |
| POST | `/accounts` |
| PUT | `/accounts/{id}` |
| DELETE | `/accounts/{id}` |

### Summary
| Method | Endpoint |
|--------|----------|
| GET | `/summary` |

### Report
| Method | Endpoint |
|--------|----------|
| GET | `/report?month=YYYY-MM&account_id=` |

---

# How to Use the Application

### 1️⃣ Open the frontend  
     http://localhost:3000

### 2️⃣ Add accounts (optional via SQL or API)

### 3️⃣ Add transactions  
- Choose type (income/expense)  
- Select account  
- Enter amount, category, description  

### 4️⃣ View transactions  
- Filter by date, type, category, account  

### 5️⃣ Check overview  
- Total income  
- Total expenses  
- Balance  

### 6️⃣ Generate monthly report  
- Select month  
- Select account  

---

**Thank You - Aarti Sharma**
