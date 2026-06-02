# API Documentation

Base URL: `http://localhost:5000/api`

## Authentication Endpoints

### Register User
```
POST /auth/register
Content-Type: application/json

{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "password": "securepassword123"
}

Response:
{
  "message": "User registered successfully",
  "token": "eyJhbGc...",
  "user": {
    "id": "507f...",
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com"
  }
}
```

### Login
```
POST /auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "securepassword123"
}

Response:
{
  "message": "User logged in successfully",
  "token": "eyJhbGc...",
  "user": { ... }
}
```

### Get Profile
```
GET /auth/profile
Authorization: Bearer <token>

Response:
{
  "_id": "507f...",
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "phone": "+1...",
  "address": { ... },
  "wishlist": [],
  "isVerified": true
}
```

### Update Profile
```
PUT /auth/profile
Authorization: Bearer <token>
Content-Type: application/json

{
  "firstName": "Jane",
  "lastName": "Doe",
  "phone": "+1...",
  "address": {
    "street": "123 Main St",
    "city": "New York",
    "state": "NY",
    "postalCode": "10001",
    "country": "USA"
  }
}

Response:
{
  "message": "Profile updated successfully",
  "user": { ... }
}
```

## Product Endpoints

### Get All Products
```
GET /products?category=studs&minPrice=20&maxPrice=100&search=gold

Query Parameters:
- category: studs|hoops|drops|chandeliers|custom
- material: gold|silver|platinum|rose-gold|copper|mixed
- minPrice: number
- maxPrice: number
- search: string

Response:
{
  "count": 5,
  "products": [
    {
      "_id": "507f...",
      "name": "Gold Pearl Studs",
      "price": 45.99,
      "description": "...",
      "category": "studs",
      "material": "gold",
      "images": ["url1", "url2"],
      "stock": 15,
      "rating": 4.5,
      "numReviews": 12,
      "seller": { ... }
    }
  ]
}
```

### Get Product Details
```
GET /products/:productId

Response:
{
  "_id": "507f...",
  "name": "Gold Pearl Studs",
  "price": 45.99,
  "description": "...",
  "images": [...],
  "reviews": [
    {
      "user": { ... },
      "rating": 5,
      "comment": "Beautiful earrings!",
      "createdAt": "2024-01-01T12:00:00Z"
    }
  ],
  "seller": {
    "_id": "507f...",
    "firstName": "Jane",
    "lastName": "Smith",
    "email": "seller@example.com"
  }
}
```

### Create Product (Seller)
```
POST /products
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "Silver Hoops",
  "description": "Classic silver hoops",
  "price": 35.99,
  "category": "hoops",
  "material": "silver",
  "color": "Silver",
  "images": ["url1"],
  "stock": 20
}

Response:
{
  "message": "Product created successfully",
  "product": { ... }
}
```

### Add Product Review
```
POST /products/:productId/review
Authorization: Bearer <token>
Content-Type: application/json

{
  "rating": 5,
  "comment": "Excellent quality!"
}

Response:
{
  "message": "Review added successfully",
  "product": { ... }
}
```

## Cart Endpoints

### Get Cart
```
GET /cart
Authorization: Bearer <token>

Response:
{
  "_id": "507f...",
  "user": "507f...",
  "items": [
    {
      "_id": "507f...",
      "product": {
        "_id": "507f...",
        "name": "Gold Pearl Studs",
        "price": 45.99,
        "images": ["url1"]
      },
      "quantity": 2,
      "customization": {
        "engraving": "JD"
      }
    }
  ],
  "totalItems": 2,
  "totalPrice": 91.98
}
```

### Add to Cart
```
POST /cart/add
Authorization: Bearer <token>
Content-Type: application/json

{
  "productId": "507f...",
  "quantity": 1,
  "customization": {
    "engraving": "JD",
    "notes": "Gift for sister"
  }
}

Response:
{
  "message": "Item added to cart",
  "cart": { ... }
}
```

### Update Cart Item
```
PUT /cart/update
Authorization: Bearer <token>
Content-Type: application/json

{
  "productId": "507f...",
  "quantity": 3
}

Response:
{
  "message": "Cart updated",
  "cart": { ... }
}
```

### Remove from Cart
```
POST /cart/remove
Authorization: Bearer <token>
Content-Type: application/json

{
  "productId": "507f..."
}

Response:
{
  "message": "Item removed from cart",
  "cart": { ... }
}
```

### Clear Cart
```
DELETE /cart/clear
Authorization: Bearer <token>

Response:
{
  "message": "Cart cleared",
  "cart": { items: [], totalItems: 0, totalPrice: 0 }
}
```

## Order Endpoints

### Create Order
```
POST /orders
Authorization: Bearer <token>
Content-Type: application/json

{
  "shippingAddress": {
    "firstName": "John",
    "lastName": "Doe",
    "street": "123 Main St",
    "city": "New York",
    "state": "NY",
    "postalCode": "10001",
    "country": "USA",
    "phone": "+1..."
  },
  "billingAddress": { ... },
  "paymentMethod": "credit_card|paypal|stripe"
}

Response:
{
  "message": "Order created successfully",
  "order": {
    "_id": "507f...",
    "orderNumber": "ORD-1704067200000-5432",
    "user": "507f...",
    "items": [...],
    "total": 150.50,
    "orderStatus": "pending",
    "paymentStatus": "pending",
    "timeline": [
      {
        "status": "pending",
        "message": "Order placed successfully",
        "timestamp": "2024-01-01T12:00:00Z"
      }
    ]
  }
}
```

### Get Orders
```
GET /orders
Authorization: Bearer <token>

Response:
{
  "count": 3,
  "orders": [ ... ]
}
```

### Get Order Details
```
GET /orders/:orderId
Authorization: Bearer <token>

Response:
{
  "_id": "507f...",
  "orderNumber": "ORD-...",
  "items": [...],
  "shippingAddress": { ... },
  "total": 150.50,
  "orderStatus": "processing",
  "paymentStatus": "completed",
  "trackingNumber": "1Z999AA10123456784",
  "timeline": [...]
}
```

### Update Order Status (Admin/Seller)
```
PUT /orders/:orderId/status
Authorization: Bearer <token>
Content-Type: application/json

{
  "status": "shipped",
  "trackingNumber": "1Z999AA10123456784",
  "message": "Package dispatched"
}

Response:
{
  "message": "Order status updated",
  "order": { ... }
}
```

### Confirm Payment
```
POST /orders/:orderId/confirm-payment
Authorization: Bearer <token>
Content-Type: application/json

{
  "orderId": "507f...",
  "paymentIntentId": "pi_..."
}

Response:
{
  "message": "Payment confirmed",
  "order": { ... }
}
```

### Cancel Order
```
DELETE /orders/:orderId/cancel
Authorization: Bearer <token>

Response:
{
  "message": "Order cancelled",
  "order": {
    ...
    "orderStatus": "cancelled"
  }
}
```

## Health Check

### API Health
```
GET /health

Response:
{
  "status": "API is running"
}
```

## Error Responses

### 400 Bad Request
```
{
  "errors": [
    {
      "msg": "Invalid email",
      "param": "email"
    }
  ]
}
```

### 401 Unauthorized
```
{
  "message": "No token, authorization denied"
}
```

### 404 Not Found
```
{
  "message": "Product not found"
}
```

### 500 Internal Server Error
```
{
  "message": "Something went wrong",
  "error": "Error details"
}
```

## Authentication Header

All authenticated endpoints require:
```
Authorization: Bearer <your_jwt_token>
```

Replace `<your_jwt_token>` with the token received from login or register.

## Rate Limiting

Currently not implemented. Add for production:
```javascript
const rateLimit = require('express-rate-limit');
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});
app.use(limiter);
```
