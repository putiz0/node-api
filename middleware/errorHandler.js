// middleware/errorHandler.js
module.exports = (err, req, res, next) => {
  console.error("🔥 Erro:", err.message);

  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || "Erro interno no servidor",
    stack: process.env.NODE_ENV === "development" ? err.stack : undefined
  });
};