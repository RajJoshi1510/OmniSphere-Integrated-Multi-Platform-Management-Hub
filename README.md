# 🌟 OmniSphere Enterprise Platform

A unified enterprise multi-platform ecosystem containing **5 complete MERN full-stack projects**.

---

## 📁 Directory Structure & Port Allocation

```text
OmniSphere Enterprise Platform/
├── 1-Car-Rental/
│   ├── frontend/            # React + Vite (Port 5174)
│   └── backend/             # Express API (Port 4001) — MongoDB: Car-Rental
│
├── 2-Hotel-Booking/
│   ├── frontend/            # React + Vite (Port 5175)
│   ├── backend/             # Express API (Port 5001) — MongoDB: stayeasy
│   └── shared/              # Common TypeScript Types
│
├── 3-Ecommerce/
│   ├── frontend/            # React + Vite (Port 5176)
│   └── backend/             # Express API (Port 5002) — MongoDB: shopnow
│
├── 4-Social-Media/
│   ├── frontend/            # React + Redux (Port 5177)
│   └── backend/             # Express API (Port 5000) — MongoDB: connectverse
│
├── 5-Food-Delivery/
│   ├── frontend/            # Customer App (Port 5178)
│   ├── backend/             # Express API (Port 4000) — MongoDB: yummix
│   └── admin/               # Kitchen Admin App (Port 5179)
│
├── start-all.bat            # One-click start: boots MongoDB & all 5 projects
├── stop-all.bat             # One-click stop: terminates all running node processes
└── runner.js                # Master Node.js process supervisor
```

---

## 🚀 Direct Working Links

| # | Platform Name | Frontend UI Link | Backend API Link | MongoDB Database |
|---|---------------|------------------|------------------|------------------|
| 1 | **OmniDrive (Car Rental)** | [http://localhost:5174](http://localhost:5174) | [http://localhost:4001](http://localhost:4001) | `Car-Rental` |
| 2 | **OmniStay (Hotel Booking)** | [http://localhost:5175](http://localhost:5175) | [http://localhost:5001](http://localhost:5001) | `stayeasy` |
| 3 | **OmniMart (E-Commerce)** | [http://localhost:5176](http://localhost:5176) | [http://localhost:5002](http://localhost:5002) | `shopnow` |
| 4 | **OmniSocial (Social Media)** | [http://localhost:5177](http://localhost:5177) | [http://localhost:5000](http://localhost:5000) | `connectverse` |
| 5 | **OmniBite (Food Delivery)** | Customer: [http://localhost:5178](http://localhost:5178)<br>Admin: [http://localhost:5179](http://localhost:5179) | [http://localhost:4000](http://localhost:4000) | `yummix` |

---

## 🔑 Login Credentials (Direct Access)

### 1. Unified Credentials (Works Across All Apps)
- **Universal Admin Account:**
  - Email: `admin@omnidrive.com`
  - Password: `Password123!` (or `password123` on apps without symbol check)
- **Universal User/Customer Account:**
  - Email: `raj.joshi@example.com`
  - Password: `Password123!` (or `password123`)

---

### 2. Platform-Specific Native Seeded Accounts

#### 1. OmniDrive (Car Rental)
- **Admin:** `het@admin.com` / `123456789`
- **Owner / Fleet Manager:** `example11@gmail.com` / `123456789`
- **Customer / User:** `example1@gmail.com` / `123456789`

#### 2. OmniStay (Hotel Booking)
- **Admin:** `test@user.com` / `12345678`
- **Hotel Owner:** `owner@hotel.com` / `12345678`
- **Guest / User:** `guest@user.com` / `12345678`

#### 3. OmniMart (E-Commerce)
- **Admin:** `admin@shopnow.com` / `password123`
- **Customer / User:** `raj.joshi@example.com` / `password123`

#### 4. OmniSocial (Social Media)
- **Admin:** `admin@connectverse.local` / `Admin@123456`
- **Demo User:** `ada.walker@pulse.demo` / `Demo1234!`
- **Demo User 2:** `marcus.reed@pulse.demo` / `Demo1234!`

#### 5. OmniBite (Food Delivery)
- **Admin / Restaurant Kitchen:** `admin@yummix.com` / `password123`
- **Customer / User:** `customer@yummix.com` / `password123`

---

## 🗄️ MongoDB Database Direct Storage

- **Connection URI (MongoDB Compass / Shell):**
  ```text
  mongodb://localhost:27017
  ```
- All 5 databases store data directly into local MongoDB:
  1. `Car-Rental` — Cars, Bookings, Pricing rules, Coupons, Users
  2. `stayeasy` — Hotels, Bookings, Reviews, Analytics, Users
  3. `shopnow` — Products, Orders, Categories, Users
  4. `connectverse` — Posts, Comments, Likes, Follows, Users
  5. `yummix` — Foods, Restaurants, Orders, Carts, Users
- Any booking, order, post, or registration created through the frontend or API is immediately written and persisted in MongoDB.

---

## ⚡ How to Run

1. **One-Click Start:**
   Double-click `start-all.bat` (automatically starts MongoDB & launches all 11 services concurrently).
2. **One-Click Stop:**
   Double-click `stop-all.bat` (safely stops all node processes and releases ports).
"# OmniSphere-Integrated-Multi-Platform-Management-Hub" 
"# OmniSphere-Integrated-Multi-Platform-Management-Hub" 
