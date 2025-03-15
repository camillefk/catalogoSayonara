import { useNavigate } from 'react-router-dom';
import { FaUserCircle } from "react-icons/fa";
import SearchBar from '../components/searchBar/searchBar';
import '../styles/homePage.css';

const homePage = () => {
    const navigate = useNavigate();

    return (
        <div className="homepage-container">
            <div className="search-bar-container">
                <SearchBar placeholder= "Digite o nome ou tema do bolo..." />
                <button className="saiba-mais-button">Saiba mais</button>
                <FaUserCircle className="user-icon" onClick={() => navigate("/login")} />
            </div>
            <hr className="separator" />
        </div>
    );
};

export default homePage;