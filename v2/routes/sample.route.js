const express = require("express");

const {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/sample.controller");

const router = express.Router();

// creating routes for the product controller
router.get("/products", getProducts);
router.get("/products/:id", getProduct);
router.post("/products", createProduct);
router.patch("/products/:id", updateProduct);
router.delete("/products/:id", deleteProduct);

// exporting the router
module.exports = router;
