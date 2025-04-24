const express = require('express');
const Produto = require('../models/Produto');
const router = express.Router();
const multer = require('multer');
const path = require('path');

//configuracao do armazenamento
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); //pasta onde os arquivos vao ser salvos
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    cb(null, Date.now() + ext); //nome único??

  }
});

const upload = multer({ storage });


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
router.post('/produtos', upload.single('imagem'), async (req, res) => {
  try {
    const { nome, categoria, preco, altura, diametro } = req.body;
    const imagem = req.file ? `/uploads/${req.file.filename}` : '';

    const novoProduto = new Produto({ nome, categoria, preco, imagem, altura, diametro });

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

//rota para adicionar uma nova data de indisponibilidade a um produto
router.patch('/produtos/:id/indisponibilidade', async (req, res) => {
  const { data } = req.body;

  if (!data) {
    return res.status(400).json({ message: "A data é obrigatória." });
  }

  try {
    const produto = await Produto.findById(req.params.id);
    if (!produto) {
      return res.status(404).json({ message: "Produto não encontrado." });
    }

    //para evitar duplicidade
    if (!produto.indisponibilidade.includes(data)) {
      produto.indisponibilidade.push(data);
      await produto.save();
    }

    res.json(produto);
  } catch (err) {
    res.status(500).json({ message: "Erro ao adicionar data de indisponibilidade", error: err.message });
  }
});

module.exports = router;
