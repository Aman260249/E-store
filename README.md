# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project. 





🚀 TechAndGear - Full Stack E-Commerce Platform
A premium, high-performance e-commerce web application built with the MERN stack, featuring a sleek Apple-inspired UI, secure authentication, and a robust product management system. 



✨ Key Features
🛒 Frontend (User Experience)
Apple-Inspired UI: Minimalist, clean, and responsive design using Tailwind CSS.

Dynamic Product Catalog: Categorized product listings (Mobile, Audio, Laptops) with advanced filtering.

Smart Shopping Cart: Real-time cart updates, persistent storage, and free shipping progress bars.

Secure Checkout: Multi-step checkout process with form validation and order summary.

Authentication Guards: Protected routes and action-locks ensuring only logged-in users can add to cart or checkout.

Search & Discovery: High-speed search functionality to find products instantly.



⚙️ Backend (Infrastructure)
RESTful API: Robust API built with Node.js and Express.js.

Secure Auth: JWT (JSON Web Token) based authentication for secure user sessions.

Database: MongoDB integration for flexible and scalable data management.

Order Management: Systematic order processing and storage in the database 



Layer	Technology
Frontend	React.js, Tailwind CSS, Lucide-React (Icons), Axios
Backend	Node.js, Express.js
Database	MongoDB (NoSQL)
Routing	React Router Dom v6
State Mgmt	React Context API 




TechAndGear/
├── client/                # React Frontend
│   ├── src/
│   │   ├── components/    # Reusable UI (Navbar, Footer, etc.)
│   │   ├── context/       # Cart & Auth State
│   │   ├── pages/         # Page Components (Home, Cart, Checkout)
│   │   └── App.js         # Routing Logic
├── server/                # Express Backend
│   ├── models/            # MongoDB Schemas (User, Product, Order)
│   ├── routes/            # API Endpoints
│   └── server.js          # Entry Point
└── README.md 


🚀 Getting Started  

Clone the repository

git clone https://github.com/your-username/tech-and-gear.git
cd tech-and-gear 


Setup Backend 

cd server
npm install
# Create a .env file and add your MONGO_URI and JWT_SECRET
npm start 



Setup Frontend 


cd client
npm install
npm run dev 



🛡️ Security Implementation
The project implements a Private Route logic and Auth Guards. Users are automatically redirected from the checkout page if no valid session is found in localStorage. All API requests to sensitive endpoints are protected via JWT middleware on the backend.

🤝 Contributing
Contributions, issues, and feature requests are welcome! Feel free to check the issues page.
