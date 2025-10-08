import mongoose from "mongoose";
import dotenv from "dotenv";
import Product from "../models/Product.js";

dotenv.config();
mongoose.connect(process.env.MONGO_URI);

const products = [
  { name: "Laptop", price: 1000, stock: 10 },
  { name: "Phone", price: 500, stock: 20 },
  { name: "Headphones", price: 100, stock: 50 },
  { name: "Keyboard", price: 50, stock: 30 },
  { name: "Mouse", price: 30, stock: 40 },
];

const seedProducts = async () => {
  try {
    await Product.deleteMany();
    await Product.insertMany(products);
    console.log("Products seeded successfully!");
    mongoose.disconnect();
  } catch (err) {
    console.log(err);
    mongoose.disconnect();
  }
};

seedProducts();

