const express = require('express');
const router = express.Router();
const supplierController = require('../controllers/supplierController');

// Create a new supplier
router.post('/', supplierController.addSupplier);

// Get all suppliers
router.get('/', supplierController.getAllSuppliers);

// Update supplier by id
router.put('/:id', supplierController.updateSupplier);

// Delete supplier by id
router.delete('/:id', supplierController.deleteSupplier);

module.exports = router;
