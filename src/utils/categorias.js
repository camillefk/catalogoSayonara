import jardimIcon from '../assets/jardim.png';
import princesasIcon from '../assets/princesas.png';
import fazendinhaIcon from '../assets/fazendinha.png';
import quinzeIcon from '../assets/quinze.png';
import tartarugaIcon from '../assets/tartaruga.png';

const categorias = [
  { nome: 'Jardim', imagem: jardimIcon },
  { nome: 'Princesas', imagem: princesasIcon },
  { nome: 'Fazendinha', imagem: fazendinhaIcon },
  { nome: '15 anos', imagem: quinzeIcon },
  { nome: 'Personagens' },
  { nome: 'Disney' },
  { nome: 'Heróis' },
  { nome: 'Fundo do Mar', imagem: tartarugaIcon },
  { nome: 'Carros' },
  { nome: 'Adulto' },
  { nome: 'Casamento' },
  { nome: 'Sereia' },
  { nome: 'Futebol' },
  { nome: 'Barbie' },
  { nome: 'Circo' },
  { nome: 'Safari' },
  { nome: 'Natal' },
  { nome: 'ABC' },
  { nome: 'Chá Revelação' },
  { nome: 'Bosque' },
  { nome: 'Meninos' },
  { nome: 'Meninas' },
  { nome: 'Diversos' },
  { nome: 'Todos' },
];

export const nomesDasCategorias = categorias.map(cat => cat.nome);

export default categorias;
