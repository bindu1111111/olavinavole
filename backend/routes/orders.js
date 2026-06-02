const express = require('express');
const {
  createOrder,
  getOrders,
  getOrderById,
  updateOrderStatus,
  confirmPayment,
  cancelOrder,
} = require('../controllers/orderController');
const auth = require('../middleware/auth');
const router = express.Router();

router.post('/', auth, createOrder);
router.get('/', auth, getOrders);
router.get('/:id', auth, getOrderById);
router.put('/:id/status', auth, updateOrderStatus);
router.post('/:id/confirm-payment', auth, confirmPayment);
router.delete('/:id/cancel', auth, cancelOrder);

module.exports = router;
