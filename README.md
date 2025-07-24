# 🏟️ Sportiva - Sports Club Management System (SCMS)

**Sportiva** is a modern and responsive web application designed to streamline sports club management. Built using the MERN Stack, it provides a full-featured system for booking courts, managing users, tracking payments, and handling administrative tasks efficiently.

🔗 **Live Site:** [https://sportiva-scms.netlify.app/](https://sportiva-scms.netlify.app/)  
🔧 **Server API:** [https://sports-club-management-system-serve-iota.vercel.app/](https://sports-club-management-system-serve-iota.vercel.app/)

---

## 👤 Admin Credentials

- ✉️ Email: `admin07@gmail.com`  
- 🔐 Password: `Admin07`

---

## 📸 Screenshot

![Sportiva Screenshot](https://i.postimg.cc/ydTC1J1d/localhost-5173-2.png)

---

## 🚀 Features

- 🔐 **Authentication & Role-based Access** – User, Member, and Admin roles supported
- 🎾 **Court Booking System** – Users can book courts with flexible time slots
- 💳 **Stripe Payment Integration** – Secure and dynamic pricing system with coupon support
- 🏷️ **Coupon/Promotion Management** – Discounts with flat or percentage logic for better marketing
- ⭐ **Ratings & Reviews** – Authenticated users can rate and comment on courts
- 📊 **Dynamic Admin Panel** – Manage courts, users, members, bookings, and content
- 🧑‍🤝‍🧑 Manage members, courts, bookings
- 🖼️ **100% Pixel-Perfect UI**
- 🌈 Responsive UI with animations (Framer Motion + React Awesome Reveal)
- 🔎 **Search & Filter Support** – Easily find members, bookings, and courts with search functionality
- 📊 **Admin Dashboard Stats** – CountUp based dynamic stats with beautiful UI

---

## 🛠️ Tech Stack

- **Frontend:** React, TailwindCSS, React Router, React Hook Form, TanStack, Axios  
- **Backend:** Node.js, Express.js, MongoDB, Firebase  
- **UI Enhancements:** Framer Motion, React Awesome Reveal, React Icons  
- **Payment Gateway:** Stripe  
- **Database Hosting:** MongoDB Atlas  
- **Deployment:** Netlify (Client) & Vercel (Server)

---

## ⚙️ Installation Guide

> Make sure Node.js (v18+) is installed

### 🔽 Clone this repository

```bash
git clone https://github.com/mdshahariarhafizofficial/sports-club-management-system.git
cd sports-club-management-system

📦 Install dependencies
npm install
cd server
npm install

🧪 Environment Variables
Create .env files in both root and /server folder:

Client .env (root)
ini
Copy
Edit
VITE_API_URL=https://your-server-url.vercel.app/
Server .env (/server)
ini
Copy
Edit
MONGODB_URI=your_mongodb_connection
JWT_SECRET=your_secret_key
STRIPE_SECRET_KEY=your_stripe_key
▶️ Run the project
bash
Copy
Edit
# Run client
npm run dev

# In another terminal, run server
cd server
npm run dev

```
---

## 👨‍💻 Developer Info

- **Name:** Md. Shahariar Hafiz  
- **Email:** shahariar.works@gmail.com  
- **GitHub:** [mdshahariarhafizofficial](https://github.com/mdshahariarhafizofficial)  
- **LinkedIn:** [devshahariarhafiz](https://www.linkedin.com/in/devshahariarhafiz)


---

> Thank you for visiting Sportiva! Your all-in-one club booking and management solution.
