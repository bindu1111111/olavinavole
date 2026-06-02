const express = require('express');
const {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  addReview,
} = require('../controllers/productController');
const auth = require('../middleware/auth');
const router = express.Router();

router.get('/', getAllProducts);
router.get('/:id', getProductById);
router.post('/', auth, createProduct);
router.put('/:id', auth, updateProduct);
router.post('/:id/review', auth, addReview);

module.exports = router;
