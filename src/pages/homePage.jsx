import { useNavigate } from 'react-router-dom';
import { FaUserCircle } from "react-icons/fa";
import { TbCategoryFilled } from "react-icons/tb";
import SearchBar from '../components/searchBar/searchBar';
import WelcomeCard from '../components/welcomeCard/welcomeCard';
import VerseSection from '../components/verseSection/verseSection';
import categoryIcon from '../assets/category-icon.png';
import '../styles/homePage.css';

const categorias = [
    { nome: "casamento", imagem: categoryIcon },
    { nome: "15 anos", imagem: categoryIcon },
    { nome: "adulto", imagem: categoryIcon },
    { nome: "meninas", imagem: categoryIcon },
    { nome: "meninos", imagem: categoryIcon },
    { nome: "heróis", imagem: categoryIcon },
    { nome: "jardim", imagem: categoryIcon },
    { nome: "princesas", imagem: categoryIcon },
    { nome: "todos", imagem: categoryIcon }
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
            <div className="category-card">
                {categorias.map((categoria) => (
                    <button
                        key={categoria}
                        className="category-button"
                        onClick={() => navigate(`/categoria/${categoria}`)}
                    >
                        <img src={categoria.imagem} alt={categoria.nome} className="category-image" />
                        {categoria.nome}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default HomePage;
