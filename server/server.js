const express = require('express');
const cors = require('cors');
const products = require('./data/products.json');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Serve static files from the public folder (the uploaded local images)
app.use(express.static(path.join(__dirname, '../client/public')));

// API Endpoint to get all products
app.get('/api/products', (req, res) => {
  res.json(products);
});

// API Endpoint to get a single product by ID
app.get('/api/products/:id', (req, res) => {
  const product = products.find(p => p.id === parseInt(req.params.id));
  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ message: 'Product not found' });
  }
});

// Serve frontend in production
app.use(express.static(path.join(__dirname, '../client/dist')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/dist/index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
