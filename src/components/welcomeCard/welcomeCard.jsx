import logo from "../../assets/logo.png";
import "./welcomeCard.css";

const WelcomeCard = () => {
  return (
    <div className="welcome-card">
      <div className="card-side">
        <div className="text-container">
          <h1>Sayonara Bolos</h1>
          <p>
            Alugue bolos cenográficos deslumbrantes para casamentos,
            aniversários e eventos especiais. Escolha seu modelo, confira a
            disponibilidade e reserve de forma simples e rápida!
          </p>
        </div>
        <img src={logo} alt="Logo Sayonara Bolos" className="logo-img" />
      </div>

      <button className="button-card">Saber Mais</button>
    </div>
  );
};

export default WelcomeCard;
