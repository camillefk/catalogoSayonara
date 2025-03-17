const express = require('express');
const router = express.Router();
const Verse = require('../models/verseModel');

//obter o versívulo mais recente
router.get('/', async (req, res) => {
    try {
        const verse = await Verse.findOne().sort({ creatdAt: -1 }); //pega o mais recente
        res.json(verse || { message: "Nenhum versículo disponível" });
    } catch (error) {
        res.status(500).json({ error: "Erro ao buscar o versículo" });
    }
});

//adcionar ou atualizar o versículo 
router.post('/', async (req, res) => {
    try {
        const { text } = req.body;
        if (!text) return res.status(400).json({ error: "Oversículo não pode estar vazio "});

        await Verse.deleteMany(); //remove o versículo anterior
        const newVerse = new Verse({ text });
        await newVerse.save();

        res.json({ message: "Versículo atualizado com sucesso" });
    } catch (error) {
        res.status(500).json({ error: "Erro ao salvar o versículo "});
    }
});

module.exports = router;