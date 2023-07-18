const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// Endpoint to handle the "Add to cart" button click
router.post('/add-to-cart', async (req, res) => {
  const { id } = req.body;

  try {
    const product = await Product.findByIdAndUpdate(id, { $inc: { clickCount: 1 } }, { new: true });

    if (!product) {
      return res.status(404).json({ success: false, error: 'Product not found' });
    }

    return res.status(200).json({ success: true, clickCount: product.clickCount });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, error: 'Server error' });
  }
});

  
  

// Endpoint to get the click count for a product
router.get('/click-count/:productId', async (req, res) => {
  const { productId } = req.params;

  try {
    const product = await Product.findOne({ productId });

    if (product) {
      res.status(200).json({ clickCount: product.clickCount });
    } else {
      res.status(404).json({ error: 'Product not found' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
