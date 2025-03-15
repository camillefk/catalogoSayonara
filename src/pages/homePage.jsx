import { useNavigate } from 'react-router-dom';
import { FaUser } from 'react-icons/fa';
import SearchBar from '../components/searchBar/searchBar';
//import '../styles/homePage';

const homePage = () => {
    const navigate = useNavigate();

    return (
        <div className="homepage-container">
            <div className="search-bar-container">
                <SearchBar placeholder= "Buscar produtos..." />
                <button className="saiba-mais-button">Saiba mais</button>
                <FaUser className="user-icon" onClick={() => navigate("/login")} />
            </div>
            <hr className="separator" />
        </div>
    );
};

export default homePage;