// controllers/product_controller.js
const Product = require("../models/Product_models");

// Criar novo produto
exports.createProduct = async (req, res, next) => {
  try {
    const product = new Product(req.body);
    const savedProduct = await product.save();
    res.status(201).json(savedProduct);
  } catch (err) {
    next(err);
  }
};

// Buscar todos os produtos
exports.getProducts = async (req, res, next) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (err) {
    next(err);
  }
};

// Buscar produto por ID
exports.getProductById = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Produto não encontrado" });
    res.status(200).json(product);
  } catch (err) {
    next(err);
  }
};

// Atualizar produto
exports.updateProduct = async (req, res, next) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedProduct) return res.status(404).json({ message: "Produto não encontrado" });
    res.status(200).json(updatedProduct);
  } catch (err) {
    next(err);
  }
};

// Deletar produto
exports.deleteProduct = async (req, res, next) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if (!deletedProduct) return res.status(404).json({ message: "Produto não encontrado" });
    res.status(200).json({ message: "Produto deletado com sucesso" });
  } catch (err) {
    next(err);
  }
};
