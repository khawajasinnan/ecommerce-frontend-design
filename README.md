<div align="center">

# 🛒 E-Commerce Marketplace

**A modern, fully responsive e-commerce frontend built with React 19 & Vite**

![React](https://img.shields.io/badge/React-19.2-61DAFB?style=for-the-badge&logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-7.3-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Express](https://img.shields.io/badge/Express-5.2-000000?style=for-the-badge&logo=express&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-17-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-Custom-1572B6?style=for-the-badge&logo=css3&logoColor=white)

[Live Demo](#) · [Features](#-features) · [Screenshots](#-screenshots) · [Getting Started](#-getting-started) · [Tech Stack](#-tech-stack)

</div>

---

## 📋 Overview

A pixel-perfect e-commerce marketplace UI inspired by Alibaba/Amazon, featuring a complete shopping experience from product browsing to checkout. Built with a focus on **premium aesthetics**, **smooth animations**, and **responsive design**.

This project includes a React frontend with a Node.js/Express backend and PostgreSQL database for product data and cart management.

---

## ✨ Features

### 🏠 Homepage
- Hero banner with rotating promotional content
- Deals & offers section with countdown timer
- Category panels with product previews
- Recommended products grid
- Newsletter subscription section
- Supplier inquiry form

### 🛍️ Product Listing
- **Smart Filtering** — by Category, Brand, Features, Price Range, Condition, and Star Rating
- **Dynamic Breadcrumb** — updates based on selected filters and search queries
- **Grid / List View Toggle** — switch between card grid and detailed list layouts
- **Active Filter Chips** — removable badges showing current filters
- **Search Integration** — filter products by search query from the header
- **Pagination** — 6 items per page with page navigation

### 📦 Product Detail
- Image gallery with thumbnail selector
- Product specifications and description
- Star ratings and order count
- Quantity selector and add-to-cart
- Wishlist toggle
- Tabbed content (Description, Reviews, Shipping, About Seller)
- Related products carousel
- "You may like" sidebar recommendations

### 🛒 Shopping Cart
- Item quantity adjustment (+/-)
- Remove individual items
- Real-time price calculations (subtotal, discount, tax)
- Order summary sidebar
- Proceed to checkout flow

### 💳 Checkout
- Multi-step process (Shipping → Payment → Confirmation)
- Multiple payment methods (Card, PayPal, COD)
- Order summary sidebar
- Success state with order confirmation

### 🔐 Authentication
- Sign In / Sign Up forms
- Two-column layout with branded panel
- Google social login option
- Success animation on submit

### 🎨 UI/UX Polish
- **Scroll-Reveal Animations** — elements fade in as they enter the viewport
- **Hover Effects** — lift, shadow, and image zoom on cards
- **Micro-Animations** — filter chips, pagination pulse, button hover lift
- **Dropdown Menus** — Profile, Message, and Orders header menus
- **Responsive Design** — mobile-first breakpoints at 600px and 900px
- **Focus Accessibility** — visible focus rings for keyboard navigation

---

## 📸 Screenshots

<details>
<summary><b>🏠 Homepage</b></summary>
<br>
<img src="docs/screenshots/homepage.png" alt="Homepage" width="100%">
</details>

<details>
<summary><b>🛍️ Product Listing</b></summary>
<br>
<img src="docs/screenshots/products.png" alt="Product Listing" width="100%">
</details>

<details>
<summary><b>📦 Product Detail</b></summary>
<br>
<img src="docs/screenshots/product-detail.png" alt="Product Detail" width="100%">
</details>

<details>
<summary><b>🛒 Shopping Cart</b></summary>
<br>
<img src="docs/screenshots/cart.png" alt="Shopping Cart" width="100%">
</details>

<details>
<summary><b>🔐 Authentication</b></summary>
<br>
<img src="docs/screenshots/auth.png" alt="Authentication" width="100%">
</details>

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18+ and **npm**
- **PostgreSQL** 14+ (for backend features)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/khawajasinnan/ecommerce-frontend-design.git
   cd ecommerce-frontend-design
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up the database** (optional — the frontend works without it)
   ```bash
   # Create the database and tables
   chmod +x setup-db.sh
   ./setup-db.sh

   # Configure the .env file
   echo "DATABASE_URL=postgresql://your_user:your_password@localhost:5432/ecommerce_db" > .env
   echo "PORT=5000" >> .env

   # Seed sample data
   npm run seed
   ```

4. **Start the development server**
   ```bash
   # Frontend only (port 3001)
   npm run dev

   # Frontend + Backend together
   npm run dev:all
   ```

5. **Open your browser**
   ```
   http://localhost:3001
   ```

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | React 19, React Router v7 |
| **Build Tool** | Vite 7.3 |
| **Styling** | Vanilla CSS with CSS Custom Properties |
| **Animations** | CSS transitions + IntersectionObserver |
| **Backend** | Express 5.2 (Node.js) |
| **Database** | PostgreSQL with `pg` driver |
| **State Management** | React Context API (CartContext) |

---

## 📁 Project Structure

```
ecommerce-web-design/
├── public/                  # Static assets (images, icons, flags)
│   └── assets/
│       ├── Image/tech/      # Product images (electronics)
│       └── Layout/          # Brand logos, cloth images
├── server/                  # Express backend
│   ├── index.js             # Server entry point
│   ├── db.js                # PostgreSQL connection pool
│   ├── seed.js              # Database seeding script
│   └── routes/
│       ├── products.js      # Product API endpoints
│       └── cart.js           # Cart API endpoints
├── src/
│   ├── main.jsx             # App entry point
│   ├── App.jsx              # Router & layout
│   ├── index.css            # Design system (CSS variables)
│   ├── animations.css       # Global animations & scroll-reveal
│   ├── components/
│   │   ├── Header/          # Navigation, search, dropdowns
│   │   └── Footer/          # Site footer
│   ├── context/
│   │   └── CartContext.jsx   # Cart state management
│   ├── hooks/
│   │   └── useScrollReveal.js # IntersectionObserver hook
│   └── pages/
│       ├── Home/            # Landing page
│       ├── ProductListing/  # Product grid with filters
│       ├── ProductDetail/   # Single product view
│       ├── Cart/            # Shopping cart
│       ├── Checkout/        # Multi-step checkout
│       └── Auth/            # Sign in / Sign up
├── docs/screenshots/        # README screenshots
├── vite.config.js           # Vite configuration
├── package.json
└── .env                     # Environment variables
```

---

## 🎨 Design System

The project uses a consistent design system defined in `src/index.css`:

| Token | Value | Usage |
|-------|-------|-------|
| `--primary` | `#0D6EFD` | Buttons, links, active states |
| `--gray-700` | `#1C1C1C` | Headings, primary text |
| `--gray-400` | `#8B96A5` | Secondary text, icons |
| `--success` | `#00B517` | In-stock, shipping labels |
| `--warning` | `#FF9017` | Star ratings |
| `--danger` | `#FA3434` | Sale prices, badges |
| `--radius-sm` | `6px` | Cards, inputs |
| `--shadow-md` | `0 4px 16px` | Card hover shadow |

---

## 📡 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/products` | List products (with filtering & sorting) |
| `GET` | `/api/products/:id` | Get product details |
| `GET` | `/api/products/:id/related` | Get related products |
| `GET` | `/api/cart` | Get cart items |
| `POST` | `/api/cart` | Add item to cart |
| `PUT` | `/api/cart/:id` | Update cart item quantity |
| `DELETE` | `/api/cart/:id` | Remove cart item |
| `GET` | `/api/cart/count` | Get total cart count |
| `GET` | `/api/health` | Health check |

### Query Parameters (Products)

```
GET /api/products?category=Electronics&brand=Canon&minPrice=100&maxPrice=1000&rating=4&sort=lowest
```

| Param | Values |
|-------|--------|
| `category` | Electronics, Mobile accessory, Smartphones, Modern tech, Clothing |
| `brand` | Samsung, Apple, Huawei, Pocco, Lenovo, Canon, GoPro |
| `sort` | featured, lowest, highest, rating |
| `minPrice` / `maxPrice` | number |
| `rating` | 1–5 |
| `search` | text |

---

## 🧩 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start Vite dev server (frontend only) |
| `npm run server` | Start Express backend |
| `npm run dev:all` | Start frontend + backend concurrently |
| `npm run seed` | Seed the PostgreSQL database |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the ISC License.

---

<div align="center">

**Built with ❤️ by [Khawaja Sinnan](https://github.com/khawajasinnan)**

</div>
