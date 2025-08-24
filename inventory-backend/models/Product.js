const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  productName: { type: String, required: true },
  category: { type: String },
  sku: { type: String, required: true, unique: true },
  description: { type: String },
  price: { type: Number, required: true },
  stockQuantity: { type: Number, default: 0 },
  reorderLevel: { type: Number, default: 10 },
  supplier: {
    name: String,
    contact: String,
    phone: String
  },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Product', productSchema);
