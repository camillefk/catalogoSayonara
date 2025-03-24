import { useNavigate } from 'react-router-dom';
import './categoryCard.css';

const CategoryCard = ({ categorias}) => {
    const navigate = useNavigate();

    return (
        <div className="category-card">
            {categorias.map((categoria) => (
                <button
                    key={categoria.nome}
                    className='category-button'
                    onClick={() => navigate(`/categoria/${categoria.nome.toLowerCase()}`)}
                >
                    <img src={categoria.imagem} alt={categoria.nome} className="category-image" />
                    {categoria.nome}
                </button>
            ))}
        </div>
    );
};

export default CategoryCard;