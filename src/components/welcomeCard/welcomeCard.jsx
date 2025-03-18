import logo from '../../assets/logo.png'; 
import './welcomeCard.css';

const WelcomeCard = () => {
    return (
        <div className="welcome-card">
            
            <h1>Sayonara Bolos</h1>
            <div className="card-side">
            <p>Alugue bolos cenográficos deslumbrantes para casamentos, aniversários e eventos especiais.
            Escolha seu modelo, confira a disponibilidade e reserve de forma simples e rápida!
            </p>
            <img src={logo} alt="Logo Sayonara Bolos" width="100" className="logo-img" />
            </div>
            
            <button className='button-card'>Ver Bolos</button>
        </div>
    );
};

export default WelcomeCard;
