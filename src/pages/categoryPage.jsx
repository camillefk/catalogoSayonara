import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "../styles/categoryPage.css";
import "../components/newCard/newCard.css"; // importa o estilo do newCard

const CategoryPage = () => {
  const { categoria } = useParams();
  const categoriaDecodificada = decodeURIComponent(categoria);

  const [produtos, setProdutos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(
      `http://localhost:5000/api/produtos?categoria=${categoriaDecodificada}`
    )
      .then((response) => response.json())
      .then((data) => {
        setProdutos(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Erro ao buscar produtos:", error);
        setLoading(false);
      });
  }, [categoria]);

  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

  return (
    <div className="category-page-container">
      <div className="content-wrapper">
        <div className="category-header">
          <h1 className="category-title">Categoria: {categoriaDecodificada}</h1>
        </div>

        {loading ? (
          <p className="loading">Carregando...</p>
        ) : produtos.length > 0 ? (
          <div className="product-list">
            {produtos.map((produto) => (
              <div key={produto._id} className="new-card">
                <img
                  src={
                    produto.imagem.startsWith("/uploads")
                      ? `${API_URL}${produto.imagem}`
                      : `${API_URL}/uploads/${produto.imagem}`
                  }
                  alt={produto.nome}
                  className="new-card-image"
                  onError={(e) => (e.target.style.display = "none")}
                />
                <div className="new-card-info">
                  <p className="new-card-name">{produto.nome}</p>
                  <p className="new-card-price">R$ {produto.preco.toFixed(2)}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="no-products">Nenhum produto encontrado para essa categoria.</p>
        )}
      </div>
    </div>
  );
};

export default CategoryPage;
