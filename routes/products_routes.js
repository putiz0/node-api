import express from "express";
import Product from "../models/Product_models.js";

const router = express.Router();

// 📌 Listar todos os produtos
router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: "Erro ao buscar produtos" });
  }
});

// 📌 Buscar produto por ID
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ error: "Produto não encontrado" });
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: "Erro ao buscar produto" });
  }
});

// 📌 Adicionar produto
router.post("/", async (req, res) => {
  try {
    const newProduct = new Product(req.body);
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// 📌 Atualizar produto por ID
router.put("/:id", async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ error: "Produto não encontrado" });
    }

    res.json(updatedProduct);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// 📌 Excluir produto
router.delete("/:id", async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if (!deletedProduct) {
      return res.status(404).json({ error: "Produto não encontrado" });
    }
    res.json({ message: "Produto excluído com sucesso" });
  } catch (err) {
    res.status(500).json({ error: "Erro ao excluir produto" });
  }
});

export default router;
