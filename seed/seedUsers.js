import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "../models/User.js";

dotenv.config();
mongoose.connect(process.env.MONGO_URI);

const users = [
  { name: "John Doe", email: "john@example.com" },
  { name: "Jane Smith", email: "jane@example.com" },
];

const seedUsers = async () => {
  try {
    await User.deleteMany();
    await User.insertMany(users);
    console.log("Users seeded successfully!");
    mongoose.disconnect();
  } catch (err) {
    console.log(err);
    mongoose.disconnect();
  }
};

seedUsers();


