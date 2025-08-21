import { useState, useEffect } from "react";
import "./welcomeModal.css";

const WelcomeModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  //Com isso eu estou fazendo o modal abrir automaticamente quando a página carrega
  useEffect(() => {
    setIsOpen(true);
  }, []);

  const closeModal = () => {
    setIsOpen(false);
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Como alugar um bolo?</h2>
        <p>
          Selecione um produto, informe a data que deseja, nosso sistema ira
          verificar se esta data esta disponível e então você será redirecionado
          para o whatsApp da empresa para realizar o pagamento dos 50% do valor
          do aluguel com um funcionário.
        </p>
        <p>
          Clique em qualquer produto para ver mais detalhes, ou use as categorias para navegar de forma mais rápida.
        </p>
        <button className="close-btn" onClick={closeModal}>Entendi</button>
      </div>
    </div>
  );
};

export default WelcomeModal;
