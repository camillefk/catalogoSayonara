import NewCard from '../newCard/newCard';
import './productCarousel.css';

const ProductCarousel = ({ produtos, prevSlide, nextSlide }) => {
    return (
        <div className="new-products-carousel">
            <button className="carousel-arrow left" onClick={prevSlide}>&#8592</button>
            {produtos.length > 0 ? (
                produtos.map((produto, index) =>
                produto ? (
                    <NewCard key={index} produto={produto} />
                ) : (
                    <p key={index}>Produto Inválido</p>
                )
            )
            ) : (
                <p>Nenhum produto novo disponível</p>
            )}

            <button className="carousel-arrow right" onClick={nextSlide}>&#8594</button>
        </div>
    );
};

export default ProductCarousel;