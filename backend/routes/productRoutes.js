const express = require("express");
const router = express.Router();
const Products = require("../models/product.model");
const Stores = require("../models/store.model");
router.get("/:storeid", async (req, res) => {
  try {
    const { storeid } = req.params;
    const store = await Stores.findById({ _id: storeid });
    if (!store) {
      return res.status(404).json({ error: "Store not found" });
    } else {
      const products = await Products.find({ storeId: storeid });
      return res.status(200).json({ store: store, products: products });
    }
  } catch (err) {
    return res.status(500).json({ error: err });
  }
});

module.exports = router;
