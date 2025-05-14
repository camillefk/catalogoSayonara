import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './categoryCard.css';

const CATEGORIES_PER_PAGE = 12;

const CategoryCard = ({ categorias}) => {
    const navigate = useNavigate();
    const [paginaAtual, setPaginaAtual] = useState(0); 

    const totalPaginas = Math.ceil(categorias.length / CATEGORIES_PER_PAGE);
    const categoriasVisiveis = categorias.slice(
        paginaAtual * CATEGORIES_PER_PAGE,
        (paginaAtual + 1) * CATEGORIES_PER_PAGE
    );

    const irParaProxima = () => {
        if (paginaAtual < totalPaginas - 1) {
            setPaginaAtual(paginaAtual + 1);
        }
    };

    const irParaAnterior = () => {
        if (paginaAtual > 0) {
            setPaginaAtual(paginaAtual -1);
        }
    };

     return (
        <div className="category-card-wrapper">
            <AnimatePresence mode="wait">
                <motion.div
                    key={paginaAtual}
                    className="category-card"
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    transition={{ duration: 0.3 }}
                >
                    {categoriasVisiveis.map((categoria) => (
                        <button
                            key={categoria.nome}
                            className="category-button"
                            onClick={() =>
                                navigate(`/categoria/${encodeURIComponent(categoria.nome)}`)
                            }
                        >
                            <img
                                src={categoria.imagem}
                                alt={categoria.nome}
                                className="category-image"
                            />
                            {categoria.nome}
                        </button>
                    ))}
                </motion.div>
            </AnimatePresence>

            <div className="navigation-arrows">
                {paginaAtual > 0 && (
                    <button className="arrow left-arrow" onClick={irParaAnterior}>
                        ◀
                    </button>
                )}
                {paginaAtual < totalPaginas - 1 && (
                    <button className="arrow right-arrow" onClick={irParaProxima}>
                        ▶
                    </button>
                )}
            </div>
        </div>
    );
};

export default CategoryCard;