# 💎 Earrings Store - Modern E-Commerce Platform

A full-stack, secure, and visually stunning e-commerce application for selling premium earrings. Built with modern technologies, featuring a beautiful UI/UX, secure authentication, shopping cart, order tracking, and payment integration.

## 🌟 Features

### Customer Features
- **Product Catalog**: Browse earrings with advanced filtering (category, material, price range)
- **Shopping Cart**: Add/remove items, update quantities
- **Secure Checkout**: SSL-encrypted payment processing
- **Order Tracking**: Real-time order status tracking with timeline
- **User Authentication**: Secure registration and login with JWT
- **Profile Management**: Manage personal information and addresses
- **Product Reviews**: Read and leave reviews for products
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile

### Security Features
- ✅ **SSL/TLS Encryption**: All data transmitted securely
- ✅ **Password Hashing**: bcryptjs for secure password storage
- ✅ **JWT Authentication**: Stateless authentication tokens
- ✅ **CORS Protection**: Configured CORS headers
- ✅ **Security Headers**: X-Frame-Options, X-Content-Type-Options, XSS Protection
- ✅ **Input Validation**: Express-validator for all inputs
- ✅ **Stripe Integration**: PCI-compliant payment processing

### UI/UX Design
- 🎨 **Modern Gradient Design**: Purple & Pink theme
- 📱 **Mobile Responsive**: Works on all device sizes
- ⚡ **Smooth Animations**: Fade-in and slide-up effects
- 🌈 **TailwindCSS**: Utility-first styling
- 🎯 **Intuitive Navigation**: Clear and easy-to-use interface
- 💫 **Product Cards**: Beautiful hover effects and displays
- 📊 **Order Timeline**: Visual representation of order progress

## 🛠️ Tech Stack

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - ODM for MongoDB
- **bcryptjs** - Password hashing
- **jsonwebtoken** - JWT authentication
- **Stripe** - Payment processing
- **Express-validator** - Input validation

### Frontend
- **Next.js** - React framework with SSR
- **React** - UI library
- **TailwindCSS** - CSS framework
- **Zustand** - State management
- **Axios** - HTTP client
- **React Icons** - Icon library

## 📋 Prerequisites

- Node.js (v14 or higher)
- MongoDB (v4.4 or higher)
- npm or yarn
- Stripe Account (for payment processing)

## 🚀 Installation & Setup

### 1. Clone the Repository
```bash
cd olavinavole
```

### 2. Backend Setup

```bash
cd backend

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Edit .env with your configuration
# MONGODB_URI=mongodb://localhost:27017/earring-store
# JWT_SECRET=your-super-secret-key
# STRIPE_SECRET_KEY=sk_test_your_key
# PORT=5000
```

### 3. Frontend Setup

```bash
cd ../frontend

# Install dependencies
npm install

# Create .env.local file
cp .env.example .env.local

# Edit .env.local with your configuration
# NEXT_PUBLIC_API_BASE_URL=http://localhost:5000/api
# NEXT_PUBLIC_STRIPE_PUBLIC_KEY=pk_test_your_key
```

### 4. Database Setup

Make sure MongoDB is running, then seed the database:

```bash
# From project root
cd backend
npm run seed  # Or: node ../seed.js
```

## 🏃 Running the Application

### Development Mode

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
# Server runs on http://localhost:5000
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
# App runs on http://localhost:3000
```

### Production Build

**Backend:**
```bash
cd backend
npm start
```

**Frontend:**
```bash
cd frontend
npm run build
npm start
```

## 📁 Project Structure

```
olavinavole/
├── backend/
│   ├── config/          # Database configuration
│   ├── models/          # Mongoose schemas (User, Product, Order, Cart)
│   ├── routes/          # API routes (auth, products, cart, orders)
│   ├── controllers/      # Business logic
│   ├── middleware/      # Authentication, validation
│   ├── server.js        # Express app entry point
│   └── package.json
│
├── frontend/
│   ├── pages/           # Next.js pages
│   │   ├── index.js     # Home page
│   │   ├── products/    # Product details
│   │   ├── cart.js      # Shopping cart
│   │   ├── checkout.js  # Checkout page
│   │   ├── orders/      # Order tracking
│   │   ├── login.js     # Login page
│   │   ├── register.js  # Registration page
│   │   └── profile.js   # User profile
│   ├── components/      # Reusable components
│   │   ├── Header.js
│   │   ├── Footer.js
│   │   ├── Layout.js
│   │   └── ProductCard.js
│   ├── store/           # Zustand state management
│   ├── utils/           # API utilities
│   ├── styles/          # CSS files
│   └── package.json
│
├── seed.js              # Database seeding script
└── README.md
```

## 🔑 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/profile` - Get user profile
- `PUT /api/auth/profile` - Update user profile

### Products
- `GET /api/products` - Get all products (with filters)
- `GET /api/products/:id` - Get product details
- `POST /api/products` - Create product (seller)
- `POST /api/products/:id/review` - Add review

### Cart
- `GET /api/cart` - Get cart
- `POST /api/cart/add` - Add to cart
- `POST /api/cart/remove` - Remove from cart
- `PUT /api/cart/update` - Update cart item
- `DELETE /api/cart/clear` - Clear cart

### Orders
- `POST /api/orders` - Create order
- `GET /api/orders` - Get user orders
- `GET /api/orders/:id` - Get order details
- `PUT /api/orders/:id/status` - Update order status
- `POST /api/orders/:id/confirm-payment` - Confirm payment
- `DELETE /api/orders/:id/cancel` - Cancel order

## 💳 Payment Integration

### Setting up Stripe

1. Create a Stripe account at [stripe.com](https://stripe.com)
2. Get your API keys from the dashboard
3. Add to `.env` files:
   ```
   STRIPE_SECRET_KEY=sk_test_...
   STRIPE_PUBLIC_KEY=pk_test_...
   ```

## 🔒 Security Best Practices

✅ All passwords hashed with bcrypt  
✅ JWT tokens for stateless authentication  
✅ CORS configured for frontend origin  
✅ Input validation on all routes  
✅ SQL injection protection via Mongoose  
✅ XSS protection headers  
✅ HTTPS ready (SSL certificates needed for production)  

## 📊 Database Schema

### User
```javascript
{
  firstName, lastName, email, password, phone,
  address: { street, city, state, postalCode, country },
  wishlist: [ObjectId],
  isVerified, timestamps
}
```

### Product
```javascript
{
  name, description, price, category, material, color,
  images: [String], stock, rating, numReviews,
  reviews: [{ user, rating, comment, createdAt }],
  seller: ObjectId, isActive, timestamps
}
```

### Order
```javascript
{
  orderNumber, user, items: [{ product, quantity, price }],
  shippingAddress, billingAddress,
  subtotal, shippingCost, tax, total,
  paymentMethod, paymentStatus, orderStatus,
  trackingNumber, timeline: [{ status, timestamp, message }],
  timestamps
}
```

### Cart
```javascript
{
  user: ObjectId, unique: true,
  items: [{ product, quantity, customization, addedAt }],
  totalItems, totalPrice, timestamps
}
```

## 🚨 Environment Variables

### Backend (.env)
```
MONGODB_URI=mongodb://localhost:27017/earring-store
JWT_SECRET=your-super-secret-jwt-key
STRIPE_SECRET_KEY=sk_test_your_key
STRIPE_PUBLIC_KEY=pk_test_your_key
PORT=5000
NODE_ENV=development
```

### Frontend (.env.local)
```
NEXT_PUBLIC_API_BASE_URL=http://localhost:5000/api
NEXT_PUBLIC_STRIPE_PUBLIC_KEY=pk_test_your_key
```

## 📱 User Workflows

### Buying an Earring
1. Browse products on home page
2. Filter by category, material, or price
3. Click product for details
4. Add to cart
5. Proceed to checkout
6. Enter shipping address
7. Select payment method
8. Place order
9. Track order status in real-time

### Creating an Account
1. Click "Sign Up"
2. Fill in name, email, password
3. Account created and logged in
4. Can now save addresses and order history

## 🐛 Troubleshooting

**MongoDB Connection Error**
```bash
# Make sure MongoDB is running
mongod

# Check connection string in .env
```

**Stripe Key Error**
```bash
# Get keys from Stripe dashboard
# Add to .env files correctly
# Restart servers
```

**Port Already in Use**
```bash
# Change PORT in backend .env
# Or kill the process:
lsof -i :5000
kill -9 <PID>
```

## 📝 Sample Login Credentials

After seeding, you can use:
- **Email**: seller@earrings.com
- **Password**: password123

## 🎯 Future Enhancements

- [ ] Email notifications
- [ ] Wishlist functionality
- [ ] Product recommendations
- [ ] Analytics dashboard
- [ ] Seller dashboard
- [ ] Advanced search with Elasticsearch
- [ ] Multi-language support
- [ ] Rating aggregation improvements

## 📄 License

This project is open source and available under the MIT License.

## 💪 Support

For issues and questions, please create an issue in the repository.

## 🙏 Credits

Built with ❤️ using modern web technologies. Thank you for using our e-commerce platform!

---

**Happy Selling! 💎✨**
