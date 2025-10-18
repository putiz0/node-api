import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";

import productRoutes from "./routes/products_routes.js";
import authRoutes from "./routes/authRoutes.js";

dotenv.config();
const app = express();

// ✅ Configuração de segurança e compatibilidade CORS
const allowedOrigins = [
  "http://localhost:5173",     // Ambiente local (Vite)
  "http://127.0.0.1:5173",
  "https://globalafiliados.vercel.app", // exemplo de domínio futuro
  "https://globalafiliados.netlify.app"
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("CORS não permitido"));
      }
    },
    credentials: true,
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
