// models/Product.js
import mongoose from "mongoose";


const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  currency: { type: String, required: true }, // BRL, USD, EUR
  description: { type: String },
  platform: { type: String, required: true }, // Amazon, Mercado Livre
  region: { type: String, required: true },   // Brasil, EUA, Europa
  image: { type: String, required: true },    // URL
  affiliateLink: { type: String, required: true }, // Link do afiliado
}, { timestamps: true });

const Product = mongoose.model("Product", productSchema);

export default Product;
