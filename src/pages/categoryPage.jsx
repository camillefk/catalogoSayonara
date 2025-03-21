import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const CategoryPage = () => {
    const { categoria } = useParams(); // Pegamos a categoria da URL
    const [produtos, setProdutos] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        fetch(`http://localhost:5000/api/produtos?categoria=${categoria}`)
            .then(response => response.json())
            .then(data => {
                setProdutos(data);
                setLoading(false);
            })
            .catch(error => {
                console.error("Erro ao buscar produtos:", error);
                setLoading(false);
            });
    }, [categoria]);

    return (
        <div>
            <h1>Produtos da categoria: {categoria}</h1>
            {loading ? (
                <p>Carregando...</p>
            ) : produtos.length > 0 ? (
                <div className="product-list">
                    {produtos.map((produto) => (
                        <div key={produto._id} className="product-card">
                            <img src={produto.imagem} alt={produto.nome} />
                            <h3>{produto.nome}</h3>
                            <p>Preço: R$ {produto.preco.toFixed(2)}</p>
                        </div>
                    ))}
                </div>
            ) : (
                <p>Nenhum produto encontrado para essa categoria.</p>
            )}
        </div>
    );

};

export default CategoryPage;