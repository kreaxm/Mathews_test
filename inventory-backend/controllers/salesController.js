const Sale = require('../models/Sales');
const Product = require('../models/Product'); // Import your product model to fetch product details

// Add sale
exports.addSale = async (req, res) => {
  try {
    const newSale = new Sale(req.body);
    const saved = await newSale.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all sales
exports.getAllSales = async (req, res) => {
  try {
    const sales = await Sale.find({});
    res.json(sales);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update sale
exports.updateSale = async (req, res) => {
  try {
    const updated = await Sale.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ error: "Sale not found" });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete sale
exports.deleteSale = async (req, res) => {
  try {
    const deleted = await Sale.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: "Sale not found" });
    res.json({ message: "Sale deleted" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get top-selling products in the last 30 days
exports.getTopSellingProducts = async (req, res) => {
  try {
    const fromDate = new Date();
    fromDate.setDate(fromDate.getDate() - 30);

    const topSelling = await Sale.aggregate([
      { $match: { saleDate: { $gte: fromDate } } },
      { $group: { _id: '$sku', totalSold: { $sum: '$quantitySold' } } },
      { $sort: { totalSold: -1 } },
      { $limit: 5 }
    ]);

    // Get product details for each SKU
    const results = await Promise.all(topSelling.map(async (item) => {
      const product = await Product.findOne({ sku: item._id });
      return product ? {
        sku: item._id,
        productName: product.productName,
        category: product.category,
        totalSold: item.totalSold,
        price: product.price,
      } : null;
    }));

    res.json(results.filter(r => r !== null));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get most popular categories in the last 30 days
exports.getPopularCategories = async (req, res) => {
  try {
    const fromDate = new Date();
    fromDate.setDate(fromDate.getDate() - 30);

    const categorySales = await Sale.aggregate([
      { $match: { saleDate: { $gte: fromDate } } },
      {
        $lookup: {
          from: 'products',
          localField: 'sku',
          foreignField: 'sku',
          as: 'productDetails'
        }
      },
      { $unwind: '$productDetails' },
      {
        $group: {
          _id: '$productDetails.category',
          totalSold: { $sum: '$quantitySold' }
        }
      },
      { $sort: { totalSold: -1 } },
      { $limit: 5 }
    ]);

    res.json(categorySales);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
