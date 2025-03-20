const express = require('express');
const Produto = require('../models/Produto');
const router = express.Router();

//rota para listar produtos por categoria
router.get("/produtos", async (req, res) => {
  try {
    const { categoria } = req.query;
    let produtos;

    if (categoria && categoria !== "todos") {
      produtos = await Produto.find({ categoria });
    } else {
      produtos = await Produto.find();
    }

    res.json(produtos);
  } catch (error) {
    res.status(500).json({ message: "Erro ao buscar produtos", error });
  }
});

//rota para listar todos os produtos
router.get('/produtos', async (req, res) => {
  try {
    const produtos = await Produto.find();
    res.json(produtos);
  } catch (err) {
    res.status(500).send('Erro ao buscar produtos');
  }
});

//rota para adicionar um produto
router.post('/produtos', async (req, res) => {
  const { nome, categoria, preco, imagem, altura, diametro, indisponibilidade } = req.body;
  const novoProduto = new Produto({ nome, categoria, preco, imagem, altura, diametro, indisponibilidade });

  try {
    await novoProduto.save();
    res.status(201).json(novoProduto);
  } catch (err) {
    res.status(400).send('Erro ao adicionar produto');
  }
});

//rota para editar um produto
router.put('/produtos/:id', async (req, res) => {
  try {
    const produto = await Produto.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(produto);
  } catch (err) {
    res.status(400).send('Erro ao editar produto');
  }
});

//rota para excluir um produto
router.delete('/produtos/:id', async (req, res) => {
  try {
    await Produto.findByIdAndDelete(req.params.id);
    res.send('Produto excluído');
  } catch (err) {
    res.status(400).send('Erro ao excluir produto');
  }
});

module.exports = router;
