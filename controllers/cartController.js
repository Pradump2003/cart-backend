
You said:
import Cart from "../models/Cart.js";
import Product from "../models/Product.js";

// Add product to cart
export const addToCart = async (req, res) => {
  try {
    const userId = req.body.userId || "anonymousUser";
    const { productId, quantity } = req.body;

    if (!productId || !quantity)
      return res.status(400).json({ success: false, message: "ProductId and quantity required" });

    // Find or create cart 
    let cart = await Cart.findOne({ userId });
    if (!cart) cart = new Cart({ userId, products: [] });

    const existingProduct = cart.products.find(
      (p) => p.productId.toString() === productId
    );

    if (existingProduct) {
      existingProduct.quantity += quantity;
    } else {
      cart.products.push({ productId, quantity });
    }

    await cart.save();
    res.status(200).json({ success: true, cart });
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
