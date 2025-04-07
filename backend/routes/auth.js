// routes/authRoutes.js
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

router.post('/login', async (req, res) => {
  const { user, password } = req.body;

console.log('ENV USER:', process.env.USER);
console.log('ENV HASH:', process.env.PASSWORD_HASH);
console.log('ENV JWT:', process.env.JWT_SECRET);




  console.log('tentativa de login:', user, password);

  if (user !== process.env.USER) {
    console.log('usuário inválido');
    return res.status(401).json({ mensagem: 'Usuário inválido' });
  }

  const senhaCorreta = await bcrypt.compare(password, process.env.PASSWORD_HASH);
  if (!senhaCorreta) {
    console.log('senha incorreta');
    return res.status(401).json({ mensagem: 'Senha incorreta' });
  }

  const token = jwt.sign({ user }, process.env.JWT_SECRET, { expiresIn: '1h' });

  res.json({ token });
});

module.exports = router;
