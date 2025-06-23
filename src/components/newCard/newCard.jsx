import './newCard.css';

const NewCard = ({ produto }) => {
  if (!produto) return null;

  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

  console.log("Imagem recebida:", produto.imagem);

  return (
    <div className="new-card">
      <img
        src={
          produto.imagem.startsWith("/uploads")
            ? `${API_URL}${produto.imagem}`
            : `${API_URL}/uploads/${produto.imagem}`
        }
        alt={produto.nome || "Imagem do produto"}
        className="new-card-image"
        onError={(e) => (e.target.style.display = "none")}
      />

      <div className="new-card-info">
        <p className="new-card-name">{produto.nome}</p>
        <p className="new-card-price">{produto.preco}</p>
      </div>
    </div>
  );
};

export default NewCard;
