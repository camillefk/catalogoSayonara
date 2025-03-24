import { useNavigate } from 'react-router-dom';
import { FaUserCircle } from "react-icons/fa";
import { TbCategoryFilled } from "react-icons/tb";
import SearchBar from '../components/searchBar/searchBar';
import WelcomeCard from '../components/welcomeCard/welcomeCard';
import VerseSection from '../components/verseSection/verseSection';
import CategoryCard from '../components/categoryCard/categoryCard';
import newIcon from '../assets/new-icon.png';

import categoryIcon from '../assets/category-icon.png';
import '../styles/homePage.css';

const categorias = [
    { nome: "Casamento", imagem: categoryIcon },
    { nome: "15 anos", imagem: categoryIcon },
    { nome: "Adulto", imagem: categoryIcon },
    { nome: "Meninas", imagem: categoryIcon },
    { nome: "Meninos", imagem: categoryIcon },
    { nome: "Heróis", imagem: categoryIcon },
    { nome: "Jardim", imagem: categoryIcon },
    { nome: "Princesas", imagem: categoryIcon },
    { nome: "Ver todos", imagem: categoryIcon }
];

const HomePage = () => {
    const navigate = useNavigate();

    return (
        <div className="homepage-container">
            <div className="search-bar-container">
                <SearchBar placeholder="Digite o nome ou tema do bolo..." />
                <button className="saiba-mais-button">Saiba mais</button>
                <FaUserCircle className="user-icon" onClick={() => navigate("/login")} />
            </div>
            <hr className="separator" />
            <VerseSection />
            <div className="welcome-card">
                <WelcomeCard />
            </div>
            <div className="category">
                <TbCategoryFilled className='category-icon' />
                <p>Categorias</p>
            </div>
            <CategoryCard categorias={categorias} />
            <div className="new-section">
                <img src="{newIcon}" alt="Novidades" className="new-icon" />
                <p className="new-title">New</p>
            </div>
        </div>
    );
};

export default HomePage;
