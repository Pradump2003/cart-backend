import Product from "../models/productModel.js";

// Add product
export const addProduct = async (req, res) => {
  const { name, price, stock } = req.body;
  try {
    const product = new Product({ name, price, stock });
    await product.save();
    res.json({ success: true, product });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// List products
export const listProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.json({ success: true, products });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
