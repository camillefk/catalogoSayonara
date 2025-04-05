import React from 'react';
import './newCard.css';

const NewCard = ({ produto }) => {
    return (
        <div className="new-card">
            <img src={produto.imagem} alt={produto.nome} className='new-card-image' />
            <div className="new-card-info">
                <p className='new-card-name'>{produto.nome}</p>
                <p className='new-card-price'>{produto.preco}</p>
            </div>
        </div>
    );
};

export default NewCard;