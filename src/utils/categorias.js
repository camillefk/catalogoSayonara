import categoryIcon from '../assets/category-icon.png';

const categorias = [
  { nome: 'Jardim', imagem: categoryIcon },
  { nome: 'Princesas', imagem: categoryIcon },
  { nome: 'Fazendinha', imagem: categoryIcon },
  { nome: '15 anos', imagem: categoryIcon },
  { nome: 'Personagens', imagem: categoryIcon },
  { nome: 'Disney', imagem: categoryIcon },
  { nome: 'Heróis', imagem: categoryIcon },
  { nome: 'Fundo do Mar', imagem: categoryIcon },
  { nome: 'Carros', imagem: categoryIcon },
  { nome: 'Adulto', imagem: categoryIcon },
  { nome: 'Casamento', imagem: categoryIcon },
  { nome: 'Sereia', imagem: categoryIcon },
  { nome: 'Futebol', imagem: categoryIcon },
  { nome: 'Barbie', imagem: categoryIcon },
  { nome: 'Circo', imagem: categoryIcon },
  { nome: 'Safari', imagem: categoryIcon },
  { nome: 'Natal', imagem: categoryIcon },
  { nome: 'ABC', imagem: categoryIcon },
  { nome: 'Chá Revelação', imagem: categoryIcon },
  { nome: 'Bosque', imagem: categoryIcon },
  { nome: 'Meninos', imagem: categoryIcon },
  { nome: 'Meninas', imagem: categoryIcon },
  { nome: 'Diversos', imagem: categoryIcon },
  { nome: 'Todos', imagem: categoryIcon },
];

export const nomesDasCategorias = categorias.map(cat => cat.nome);

export default categorias;
