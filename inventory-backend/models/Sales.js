const mongoose = require('mongoose');

const saleSchema = new mongoose.Schema({
  sku: { 
    type: String, 
    required: true 
  },
  quantitySold: { 
    type: Number, 
    required: true, 
    min: 1 
  },
  saleDate: { 
    type: Date, 
    default: Date.now 
  },
  totalPrice: { 
    type: Number, 
    required: true 
  }
}, { timestamps: true });

module.exports = mongoose.model('Sales', saleSchema);
