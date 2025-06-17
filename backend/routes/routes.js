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
    const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`;
    cb(null, uniqueName);
  }
});

const upload = multer({ storage });


//rota para listar produtos por categoria
router.get("/produtos", async (req, res) => {
  try {
    const { categoria, mostrarEmNew } = req.query;
    const filtro = {};

    if (categoria && categoria !== 'todos') filtro.categoria = categoria;
    if (mostrarEmNew === 'true') filtro.mostrarEmNew = true;

    const produtos = await Produto.find(filtro);

    res.json(produtos);
  } catch (error) {
    res.status(500).json({ message: "Erro ao buscar produtos", error });
  }
});

//rota para adicionar um produto
router.post('/produtos', upload.single('imagem'), async (req, res) => {
  try {
    const { nome, categoria, preco, altura, diametro, mostrarEmNew = false } = req.body;

    const imagem = req.file ? `/uploads/${req.file.filename}` : '';

    const novoProduto = new Produto({ nome, categoria, preco, imagem, altura, diametro, mostrarEmNew });

    await novoProduto.save();
    res.status(201).json(novoProduto);
  } catch (err) {
    res.status(500).json({ message: 'Erro ao adicionar produto', error: err });
  }                             
});
//rota para editar um produto
router.put(
  '/produtos/:id',
  upload.single('imagem'),                      
  async (req, res) => {
    try {
      const {
        nome, categoria, preco, altura, diametro, mostrarEmNew
      } = req.body;

      const updateData = {
        nome, categoria, preco, altura, diametro, mostrarEmNew
      };

      // se veio arquivo, atualiza caminho da imagem
      if (req.file) updateData.imagem = `/uploads/${req.file.filename}`;

      const produto = await Produto.findByIdAndUpdate(
        req.params.id,
        updateData,
        { new: true, runValidators: true }
      );

      res.json(produto);
    } catch (err) {
      res.status(400).json({ message: 'Erro ao editar produto', error: err });
    }
  }
);


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
