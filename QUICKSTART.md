# 🚀 Quick Start Guide

Get your Earrings Store up and running in 5 minutes!

## Prerequisites
- Node.js v14+
- MongoDB running locally or Atlas
- Git

## 1️⃣ Clone & Navigate
```bash
git clone <your-repo>
cd olavinavole
```

## 2️⃣ Backend Setup
```bash
cd backend

# Install packages
npm install

# Create .env file
cat > .env << EOF
MONGODB_URI=mongodb://localhost:27017/earring-store
JWT_SECRET=your-secret-key-change-this
PORT=5000
NODE_ENV=development
EOF

# Seed database with sample data
npm run seed

# Start development server
npm run dev
```

✅ Backend running at http://localhost:5000

## 3️⃣ Frontend Setup
```bash
cd ../frontend

# Install packages
npm install

# Create .env.local file
cat > .env.local << EOF
NEXT_PUBLIC_API_BASE_URL=http://localhost:5000/api
EOF

# Start development server
npm run dev
```

✅ Frontend running at http://localhost:3000

## 🎯 Test the App

1. **Visit**: http://localhost:3000
2. **Click "Sign Up"** to create account
3. **Browse products** (8 sample earrings included)
4. **Add to cart** & checkout
5. **Track orders** in real-time

## 📊 Sample Data

After seeding, you have:
- 8 beautiful earring products
- Sample seller account
- Different categories: studs, hoops, drops, chandeliers
- Materials: gold, silver, platinum, rose-gold, copper

## 🔐 Security Setup

For production, update these environment variables:

**Backend (.env)**
```
JWT_SECRET=<generate-a-strong-random-string>
STRIPE_SECRET_KEY=sk_live_your_production_key
```

**Frontend (.env.local)**
```
NEXT_PUBLIC_STRIPE_PUBLIC_KEY=pk_live_your_production_key
```

## 🐳 Docker Setup (Optional)

```bash
# Build and run all services
docker-compose up -d

# Stop services
docker-compose down
```

## 🔗 API Testing

Test the API with curl:

```bash
# Register
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"firstName":"John","lastName":"Doe","email":"john@example.com","password":"password123"}'

# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"john@example.com","password":"password123"}'

# Get Products
curl http://localhost:5000/api/products
```

## 📱 Features to Try

✨ **Browse & Filter**: Use category, material, price filters
🛒 **Shopping Cart**: Add items, update quantities
💳 **Checkout**: Complete purchase flow
📦 **Order Tracking**: Monitor order status
👤 **Profile**: Manage account info
⭐ **Reviews**: Read product reviews

## ❓ Need Help?

Check these files:
- [README.md](./README.md) - Full documentation
- [backend/README.md](./backend/README.md) - Backend docs
- [frontend/README.md](./frontend/README.md) - Frontend docs

## 🎉 You're Ready!

The app is fully functional with:
- ✅ User authentication
- ✅ Product catalog
- ✅ Shopping cart
- ✅ Order management
- ✅ Order tracking
- ✅ Beautiful UI/UX
- ✅ Mobile responsive
- ✅ Secure (SSL ready, JWT auth)

Happy selling! 💎✨
