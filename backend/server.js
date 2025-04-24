const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const produtoRoutes = require('./routes/routes');
const verseRoutes = require('./routes/verseRoutes');
const auth = require('./routes/auth');

dotenv.config(); //para carregar as variaveis do arquivo .env

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Conectado ao MongoDB'))
  .catch((err) => console.log('Erro ao conectar ao MongoDB', err));


const app = express();
app.use(cors()); //comunicaçao entre front e back
app.use(express.json()); //faz o back entender o json no corpo das requisiçoes

const PORT = process.env.PORT || 5000;

app.use('/api', produtoRoutes); //faz as rotas ficarem acessíveis em /api/produtos, etc (?)
app.use('/api/verses', verseRoutes); //rota para versículo
app.use('/api', auth);

app.get('/', (req, res) => {
    res.send('Backend está funcionando!');
});

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});

app.use('/uploads', express.static('uploads'));



