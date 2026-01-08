const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());
app.use(express.static("public"));
app.use("/images", express.static("images"));

mongoose.connect("mongodb://localhost:27017/ecommerce")
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

const ProductSchema = new mongoose.Schema({
  name: String,
  price: Number,
  image: String
});

const Product = mongoose.model("Product", ProductSchema);

// ADD SAMPLE PRODUCTS (RUN ONCE)
app.get("/init-products", async (req, res) => {
  await Product.deleteMany({}); // clear old data

  await Product.insertMany([
    { name: "Laptop", price: 55000, image: "laptop.jpg" },
    { name: "Mobile", price: 15000, image: "mobile.jpg" },
    { name: "Headphone", price: 2000, image: "headphone.jpg" }
  ]);

  res.send("Products initialized");
});

// GET PRODUCTS
app.get("/products", async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

app.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});
