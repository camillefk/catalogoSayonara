// src/pages/HomePage.jsx
import { useNavigate } from "react-router-dom";
import { TbCategoryFilled } from "react-icons/tb";
import WelcomeCard from "../components/welcomeCard/welcomeCard";
import VerseSection from "../components/verseSection/verseSection";
import CategoryTop from '../components/categoryTop/categoryTop';
import NewCard from "../components/newCard/newCard";
import newIcon from "../assets/new-icon.png";
import categorias from "../utils/categorias";
import "../styles/homePage.css";
import { useState, useEffect } from "react";

const HomePage = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [novosProdutos, setNovosProdutos] = useState([]);

  useEffect(() => {
    const buscarNovosProdutos = async () => {
      try {
        const res = await fetch(
          "http://localhost:5000/api/produtos?mostrarEmNew=true"
        );
        const data = await res.json();
        setNovosProdutos(data);
        setCurrentIndex(0);
      } catch (error) {
        console.error("Erro ao buscar produtos:", error);
      }
    };

    buscarNovosProdutos();
  }, []);
  const navigate = useNavigate();

  // Função para avançar o carrossel
  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % novosProdutos.length);
  };

  // Função para retroceder o carrossel
  const prevSlide = () => {
    setCurrentIndex(
      (prevIndex) =>
        (prevIndex - 1 + novosProdutos.length) % novosProdutos.length
    );
  };

  // Animação automática do carrossel
  useEffect(() => {
    const interval = setInterval(nextSlide, 3000); // Muda a cada 3 segundos
    return () => clearInterval(interval); // Limpar o intervalo ao desmontar
  }, []);

  return (
    <div className="homepage-container">
      <WelcomeCard />
      <div className="verse-wrapper">
        <VerseSection />
      </div>
      <div className="content-wrapper">
        <hr />
        <div className="category">
          <div className="category-header">
            <TbCategoryFilled className="category-icon" />
            <p className="category-title">Categorias</p>
          </div>
          <p className="category-description">
            Temos o bolo ideal para cada momento especial! Escolha uma categoria
            abaixo:
          </p>
        </div>
      </div>
      <CategoryTop />
      

      <div className="new-section">
        <img src={newIcon} alt="Novidades" className="new-icon" />
        <p className="new-title">New</p>
      </div>

      <div className="new-products-carousel">
        <button className="carousel-arrow left" onClick={prevSlide}>
          &#8592;
        </button>

        {novosProdutos.length > 0 ? (
          novosProdutos.map((produto, index) =>
            produto ? (
              <NewCard key={index} produto={produto} />
            ) : (
              <p key={index}>Produto inválido</p>
            )
          )
        ) : (
          <p>Nenhum produto novo disponível</p>
        )}

        <button className="carousel-arrow right" onClick={nextSlide}>
          &#8594;
        </button>
      </div>
    </div>
  );
};

export default HomePage;
