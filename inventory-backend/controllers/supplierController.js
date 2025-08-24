const Supplier = require('../models/Supplier');

// Add supplier
exports.addSupplier = async (req, res) => {
  try {
    const newSupplier = new Supplier(req.body);
    const saved = await newSupplier.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all suppliers
exports.getAllSuppliers = async (req, res) => {
  try {
    const suppliers = await Supplier.find({});
    res.json(suppliers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update supplier
exports.updateSupplier = async (req, res) => {
  try {
    const updated = await Supplier.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ error: "Supplier not found" });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete supplier
exports.deleteSupplier = async (req, res) => {
  try {
    const deleted = await Supplier.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: "Supplier not found" });
    res.json({ message: "Supplier deleted" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
