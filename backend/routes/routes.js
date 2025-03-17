const express = require('express');
const Produto = require('../models/Produto');
const router = express.Router();

// Rota para listar todos os produtos
router.get('/produtos', async (req, res) => {
  try {
    const produtos = await Produto.find();
    res.json(produtos);
  } catch (err) {
    res.status(500).send('Erro ao buscar produtos');
  }
});

// Rota para adicionar um novo produto
router.post('/produtos', async (req, res) => {
  const { nome, preco, imagem, altura, diametro, indisponibilidade } = req.body;
  const novoProduto = new Produto({ nome, preco, imagem, altura, diametro, indisponibilidade });

  try {
    await novoProduto.save();
    res.status(201).json(novoProduto);
  } catch (err) {
    res.status(400).send('Erro ao adicionar produto');
  }
});

// Rota para editar um produto
router.put('/produtos/:id', async (req, res) => {
  try {
    const produto = await Produto.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(produto);
  } catch (err) {
    res.status(400).send('Erro ao editar produto');
  }
});

// Rota para excluir um produto
router.delete('/produtos/:id', async (req, res) => {
  try {
    await Produto.findByIdAndDelete(req.params.id);
    res.send('Produto excluído');
  } catch (err) {
    res.status(400).send('Erro ao excluir produto');
  }
});

module.exports = router;
