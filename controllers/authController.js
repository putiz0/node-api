// controllers/authController.js
export const login = (req, res) => {
  const { username, password } = req.body;

  // usuário fixo (pode depois jogar no banco)
  if (username === "mikayas" && password === "nssogames123") {
    return res.json({
      success: true,
      message: "Login realizado com sucesso!",
      token: "fake-jwt-token-12345"
    });
  }

  return res.status(401).json({
    success: false,
    message: "Usuário ou senha inválidos!"
  });
};
