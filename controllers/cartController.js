import Cart from "../models/Cart.js";
import Product from "../models/Product.js";

// Add product to cart
export const getCartTotal = async (req, res) => {
  try {
    const userId = req.headers.userid || "anonymousUser";

    const cart = await Cart.findOne({ userId }).populate("products.productId");
    if (!cart || cart.products.length === 0) {
      return res.status(200).json({
        subtotal: 0,
        tax: 0,
        total: 0,
        products: [],
      });
    }

    // Filter out null products (deleted or invalid)
    const validProducts = cart.products.filter(p => p.productId !== null);

    const subtotal = validProducts.reduce(
      (acc, item) => acc + item.productId.price * item.quantity,
      0
    );

    const tax = parseFloat((subtotal * 0.1).toFixed(2));
    const total = subtotal + tax;

    res.status(200).json({
      subtotal,
      tax,
      total,
      products: validProducts,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};


// Get cartTotal
export const getCartTotal = async (req, res) => {
  try {
    const userId = req.headers.userid || "anonymousUser";

    
    const cart = await Cart.findOne({ userId }).populate("products.productId");
    if (!cart || cart.products.length === 0) {
      return res.status(200).json({
        subtotal: 0,
        tax: 0,
        total: 0,
        products: [],
      });
    }

    const subtotal = cart.products.reduce(
      (acc, item) => acc + item.productId.price * item.quantity,
      0
    );

    const tax = parseFloat((subtotal * 0.1).toFixed(2));
    const total = subtotal + tax;

    res.status(200).json({ subtotal, tax, total, products: cart.products });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
