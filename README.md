# HOOKHA SHOP - Premium E-Commerce Platform

A luxury e-commerce platform for premium hookahs, shisha tobacco, and accessories built with modern web technologies.

## Features

### Core E-Commerce
- **Product Catalog**: Browse thousands of premium products with detailed information
- **Advanced Filtering**: Filter by category, brand, price range, and more
- **Smart Search**: Full-text search across products, brands, and categories
- **Shopping Cart**: Persistent cart storage with localStorage
- **Wishlist**: Save favorite products for later
- **Product Reviews**: User ratings and reviews system

### User Management
- **Age Verification**: Mandatory 21+ age verification on first visit
- **Authentication**: Secure user accounts with NextAuth.js
- **User Profiles**: Manage addresses, orders, and preferences
- **Order History**: Track all past purchases
- **Wholesale Account**: Special pricing for bulk buyers

### Catalog & Inventory
- **Product Variants**: Multiple sizes, colors, and options
- **Real-time Inventory**: Live stock tracking
- **3D Product Models**: Interactive 3D views (optional)
- **High-quality Images**: CDN-optimized product photography
- **Ratings & Reviews**: Community feedback and verification

### Shopping Experience
- **Responsive Design**: Optimized for mobile, tablet, and desktop
- **Glassmorphism UI**: Modern luxury aesthetic
- **Smooth Animations**: Framer Motion powered interactions
- **Dark Theme**: Eye-friendly interface with gold accents

### Payments & Orders
- **Multiple Payment Methods**: Stripe, PayPal, Bank Transfer
- **Order Management**: Real-time order tracking
- **Coupon System**: Percentage, fixed, and free shipping discounts
- **Tax Calculation**: Automatic tax computation
- **Shipping Integration**: Multiple carrier options

### Admin Dashboard
- **Product Management**: Add, edit, delete products
- **Order Management**: Process and track orders
- **User Management**: Handle customer accounts
- **Analytics**: Sales, traffic, and conversion metrics
- **Coupon Management**: Create and manage promotions

## Tech Stack

### Frontend
- **Next.js 15**: React framework with App Router
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Utility-first styling
- **Framer Motion**: Advanced animations
- **Zustand**: Lightweight state management
- **Three.js & React Three Fiber**: 3D product visualization

### Backend
- **Next.js API Routes**: Serverless backend
- **Prisma**: Type-safe ORM
- **PostgreSQL**: Relational database

### Services & APIs
- **NextAuth.js**: Authentication
- **Stripe**: Payment processing
- **Cloudinary**: Image storage and optimization
- **Resend**: Email delivery
- **Vercel**: Hosting & deployment

## Project Structure

```
.
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   ├── (routes)/          # Page routes
│   ├── layout.tsx         # Root layout
│   ├── globals.css        # Global styles
│   └── page.tsx           # Home page
├── components/            # React components
├── lib/                   # Utility functions
│   ├── db.ts             # Prisma client
│   ├── utils.ts          # Helper functions
│   ├── constants.ts      # App constants
│   └── store/            # Zustand stores
├── types/                # TypeScript types
├── prisma/              # Database schema
├── public/              # Static assets
├── tailwind.config.ts   # Tailwind configuration
├── next.config.js       # Next.js configuration
└── package.json         # Dependencies
```

## Getting Started

### Prerequisites
- Node.js 18+
- PostgreSQL 14+
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/msehtesham4628/HOOKHA-SHOP.git
cd HOOKHA-SHOP
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```

4. Configure database:
```bash
# Update DATABASE_URL in .env.local
npm run db:push
```

5. Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Database Schema

The Prisma schema includes models for:
- Users & Authentication
- Products & Categories
- Orders & Payments
- Reviews & Ratings
- Wishlists
- Coupons
- Wholesale Accounts
- Audit Logs

## API Endpoints

### Products
- `GET /api/products` - List products with filtering
- `GET /api/products/[slug]` - Get product details
- `GET /api/categories` - List categories
- `GET /api/brands` - List brands
- `GET /api/search` - Search products

### Orders
- `POST /api/orders` - Create order
- `GET /api/orders/[id]` - Get order details
- `PUT /api/orders/[id]` - Update order

### Auth
- `POST /api/auth/register` - Register user
- `POST /api/auth/login` - Login
- `POST /api/auth/logout` - Logout

## Environment Variables

See `.env.example` for required variables:
- Database URL
- Auth credentials
- Stripe keys
- Cloud storage credentials
- Email provider keys

## Features in Development

- [ ] Advanced 3D product viewer
- [ ] AI-powered recommendations
- [ ] Live chat support
- [ ] Virtual try-on
- [ ] Subscription service
- [ ] Mobile app (React Native)

## Contributing

Contributions are welcome! Please follow our coding standards and submit pull requests.

## License

Proprietary - All rights reserved

## Support

For support, email: support@hookha-shop.com

## Author

MOHD EHTESHAM (msehtesham4628)
