const express = require('express');
const router = express.Router();
const salesController = require('../controllers/salesController');

// Existing CRUD routes
router.post('/', salesController.addSale);
router.get('/', salesController.getAllSales);
router.put('/:id', salesController.updateSale);
router.delete('/:id', salesController.deleteSale);

// New analytics routes
router.get('/analytics/top-selling', salesController.getTopSellingProducts);
router.get('/analytics/popular-categories', salesController.getPopularCategories);

module.exports = router;
