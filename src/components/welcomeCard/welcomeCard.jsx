import logo from "../../assets/logo.png";
import { FaUserCircle, FaWhatsapp, FaInstagram } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "./welcomeCard.css";

const WelcomeCard = () => {

  const navigate = useNavigate();

  return (
    <div className="welcome-card">
      <FaUserCircle
        className="user-icon"
        onClick={() => navigate("/login")}
      />

      <div className="card-content">
        <div className="text-container">
          <h1>Sayonara Bolos</h1>
          <p>
            Alugue bolos cenográficos deslumbrantes e feitos com carinho para casamentos, aniversários, festas de 15 anos e outras comemorações inesquecíveis. Navegue pelas categorias, escolha seu modelo favorito, confira a disponibilidade e faça sua reserva de forma rápida, prática e totalmente online!
          </p>
          <div className="buttons-container">
            <button className="button-card">Saber Mais</button>
            <a
              href="https://wa.me/558388992366"
              target="_blank"
              rel="noopener noreferrer"
              className="icon-button"
            >
              <FaWhatsapp />
            </a>
            <a
              href="https://instagram.com/sayonarabolos"
              target="_blank"
              rel="noopener noreferrer"
              className="icon-button"
            >
              <FaInstagram />
            </a>
          </div>
        </div>

        <img src={logo} alt="Logo Sayonara Bolos" className="logo-img" />
      </div>
    </div>
  );
};

export default WelcomeCard;
