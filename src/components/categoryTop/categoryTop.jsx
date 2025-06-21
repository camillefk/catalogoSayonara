import './categoryTop.css';
import { useNavigate } from 'react-router-dom';
import categorias from '../../utils/categorias';

const principais = ['Jardim', 'Princesas', 'Fazendinha', '15 anos', 'Fundo do Mar'];

export default function CategoryTop() {
  const navigate = useNavigate();

  const categoriasPrincipais = categorias.filter(cat => principais.includes(cat.nome));
  const outrasCategorias = categorias.filter(cat => !principais.includes(cat.nome));

  const handleClick = (nome) => {
    const categoriaUrl = encodeURIComponent(nome);
    navigate(`/categoria/${categoriaUrl}`);
  };

  return (
    <div className="category-top-container">
      <div className="categorias-principais">
        {categoriasPrincipais.map(cat => (
          <div
            key={cat.nome}
            className="categoria-icon"
            onClick={() => handleClick(cat.nome)}
          >
            <img src={cat.imagem} alt={cat.nome} />
            <span>{cat.nome}</span>
          </div>
        ))}
      </div>

      <div className="outras-categorias">
        {outrasCategorias.map(cat => (
          <p key={cat.nome} onClick={() => handleClick(cat.nome)}>
            {cat.nome}
          </p>
        ))}
      </div>
    </div>
  );
}
