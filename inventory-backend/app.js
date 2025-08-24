require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const productRoutes = require('./routes/productRoutes');
const supplierRoutes = require('./routes/supplierRoutes'); 
const salesRoutes = require('./routes/salesRoutes');       

const app = express();

// Middleware
app.use(cors({
  origin: 'http://localhost:4200' // allow only Angular dev server
}));
app.use(express.json());

// Routes
app.use('/api/products', productRoutes);
app.use('/api/suppliers', supplierRoutes); 
app.use('/api/sales', salesRoutes);        

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log('MongoDB connected');
  app.listen(5000, () => console.log('Server running on port 5000'));
})
.catch((err) => console.error('MongoDB error:', err));
