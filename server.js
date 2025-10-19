import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";

import productRoutes from "./routes/products_routes.js";
import authRoutes from "./routes/authRoutes.js";

dotenv.config();
const app = express();

// ✅ CORS LIBERADO TEMPORARIAMENTE
app.use(
  cors({
    origin: "*", // permite qualquer origem
  })
);

app.use(express.json());

// ✅ Rotas principais
app.use("/api/products", productRoutes);
app.use("/api/auth", authRoutes);

// ✅ Conexão MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    dbName: "afiliados",
  })
  .then(() => console.log("✅ MongoDB conectado com sucesso"))
  .catch((err) => console.error("❌ Erro ao conectar ao MongoDB:", err));

// ✅ Inicialização do servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`🚀 Servidor rodando na porta ${PORT} - Ambiente pronto!`)
);
