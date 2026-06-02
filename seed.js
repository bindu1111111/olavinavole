const mongoose = require('mongoose');
const Product = require('./backend/models/Product');
const User = require('./backend/models/User');
require('dotenv').config();

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/earring-store', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    // Create a demo seller
    let seller = await User.findOne({ email: 'seller@earrings.com' });
    if (!seller) {
      seller = await User.create({
        firstName: 'Earring',
        lastName: 'Shop',
        email: 'seller@earrings.com',
        password: 'password123',
        isVerified: true,
      });
    }

    // Sample products
    const products = [
      {
        name: 'Gold Pearl Studs',
        description: 'Beautiful handcrafted gold earrings with pearl accents. Perfect for everyday wear.',
        price: 45.99,
        category: 'studs',
        material: 'gold',
        color: 'White',
        images: ['https://via.placeholder.com/400x400?text=Gold+Pearl+Studs'],
        stock: 15,
        seller: seller._id,
      },
      {
        name: 'Silver Hoop Earrings',
        description: 'Classic silver hoops with elegant design. Timeless and versatile.',
        price: 35.99,
        category: 'hoops',
        material: 'silver',
        color: 'Silver',
        images: ['https://via.placeholder.com/400x400?text=Silver+Hoops'],
        stock: 20,
        seller: seller._id,
      },
      {
        name: 'Rose Gold Chandelier',
        description: 'Luxurious rose gold chandelier earrings with crystal embellishments.',
        price: 89.99,
        category: 'chandeliers',
        material: 'rose-gold',
        color: 'Rose Gold',
        images: ['https://via.placeholder.com/400x400?text=Rose+Gold+Chandelier'],
        stock: 8,
        seller: seller._id,
      },
      {
        name: 'Emerald Drop Earrings',
        description: 'Stunning emerald drop earrings with white gold setting.',
        price: 125.99,
        category: 'drops',
        material: 'gold',
        color: 'Green',
        images: ['https://via.placeholder.com/400x400?text=Emerald+Drops'],
        stock: 5,
        seller: seller._id,
      },
      {
        name: 'Diamond Studs',
        description: 'Premium diamond studs - the perfect investment piece.',
        price: 299.99,
        category: 'studs',
        material: 'platinum',
        color: 'White',
        images: ['https://via.placeholder.com/400x400?text=Diamond+Studs'],
        stock: 3,
        seller: seller._id,
      },
      {
        name: 'Turquoise Boho Earrings',
        description: 'Bohemian style turquoise earrings with copper wire wrapping.',
        price: 29.99,
        category: 'drops',
        material: 'copper',
        color: 'Turquoise',
        images: ['https://via.placeholder.com/400x400?text=Turquoise+Boho'],
        stock: 25,
        seller: seller._id,
      },
      {
        name: 'Pearl Chandelier Mix',
        description: 'Multi-layered chandelier earrings combining pearls and cubic zirconia.',
        price: 79.99,
        category: 'chandeliers',
        material: 'mixed',
        color: 'Mixed',
        images: ['https://via.placeholder.com/400x400?text=Pearl+Chandelier'],
        stock: 12,
        seller: seller._id,
      },
      {
        name: 'Minimalist Gold Studs',
        description: 'Simple yet elegant gold studs perfect for any occasion.',
        price: 39.99,
        category: 'studs',
        material: 'gold',
        color: 'Gold',
        images: ['https://via.placeholder.com/400x400?text=Gold+Studs'],
        stock: 30,
        seller: seller._id,
      },
    ];

    // Insert products if they don't exist
    for (const product of products) {
      const exists = await Product.findOne({ name: product.name });
      if (!exists) {
        await Product.create(product);
      }
    }

    console.log('✓ Database seeded successfully');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();
