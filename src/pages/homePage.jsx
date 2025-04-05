// src/pages/HomePage.jsx
import { useNavigate } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa';
import { TbCategoryFilled } from 'react-icons/tb';
import SearchBar from '../components/searchBar/searchBar';
import WelcomeCard from '../components/welcomeCard/welcomeCard';
import VerseSection from '../components/verseSection/verseSection';
import CategoryCard from '../components/categoryCard/categoryCard';
import NewCard from '../components/newCard/newCard';
import newIcon from '../assets/new-icon.png';
import categoryIcon from '../assets/category-icon.png';
import '../styles/homePage.css';
import { useState, useEffect } from 'react';

const categorias = [
  { nome: 'Casamento', imagem: categoryIcon },
  { nome: '15 anos', imagem: categoryIcon },
  { nome: 'Adulto', imagem: categoryIcon },
  { nome: 'Meninas', imagem: categoryIcon },
  { nome: 'Meninos', imagem: categoryIcon },
  { nome: 'Heróis', imagem: categoryIcon },
  { nome: 'Jardim', imagem: categoryIcon },
  { nome: 'Princesas', imagem: categoryIcon },
  { nome: 'Ver todos', imagem: categoryIcon }
];

const novosProdutos = [
  {
    imagem: 'https://via.placeholder.com/200x140',
    nome: 'Bolo Casamento',
    preco: 150
  },
  {
    imagem: 'https://via.placeholder.com/200x140',
    nome: 'Bolo Infantil',
    preco: 120
  },
  {
    imagem: 'https://via.placeholder.com/200x140',
    nome: 'Bolo Adulto',
    preco: 180
  }
  // Adicione mais produtos conforme necessário
];

const HomePage = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();

  // Função para avançar o carrossel
  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % novosProdutos.length);
  };

  // Função para retroceder o carrossel
  const prevSlide = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + novosProdutos.length) % novosProdutos.length
    );
  };

  // Animação automática do carrossel
  useEffect(() => {
    const interval = setInterval(nextSlide, 3000); // Muda a cada 3 segundos
    return () => clearInterval(interval); // Limpar o intervalo ao desmontar
  }, []);

  return (
    <div className="homepage-container">
      <div className="search-bar-container">
        <SearchBar placeholder="Digite o nome ou tema do bolo..." />
        <button className="saiba-mais-button">Saiba mais</button>
        <FaUserCircle className="user-icon" onClick={() => navigate('/login')} />
      </div>
      <hr className="separator" />
      <VerseSection />
      <div className="welcome-card">
        <WelcomeCard />
      </div>
      <div className="category">
        <TbCategoryFilled className="category-icon" />
        <p>Categorias</p>
      </div>
      <CategoryCard categorias={categorias} />
      <div className="new-section">
        <img src={newIcon} alt="Novidades" className="new-icon" />
        <p className="new-title">New</p>
      </div>
      <div className="new-products-carousel">
        <button className="carousel-arrow left" onClick={prevSlide}>
          &#8592;
        </button>
        {novosProdutos.map((produto, index) => (
          <NewCard key={index} produto={produto} />
        ))}
        <button className="carousel-arrow right" onClick={nextSlide}>
          &#8594;
        </button>
      </div>
    </div>
  );
};

export default HomePage;
