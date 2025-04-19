const express = require("express");
const router = express.Router();
const Product = require("../models/product.model");
const Order = require("../models/order.model");
router.post("/", async (req, res) => {
  const { customerName, items } = req.body;

  try {
    let total = 0;

    const populatedItems = await Promise.all(
      items.map(async ({ productId, quantity }) => {
        const product = await Product.findById(productId);
        if (!product || product.quantity < quantity) {
          throw new Error(
            `Product unavailable or insufficient: ${product?.name || "Unknown"}`
          );
        }

        // Decrease stock
        product.quantity -= quantity;
        await product.save();

        total += product.price * quantity;

        return { product: product._id, quantity };
      })
    );

    const newOrder = new Order({
      customerName,
      items: populatedItems,
      totalAmount: total,
    });

    const saved = await newOrder.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
