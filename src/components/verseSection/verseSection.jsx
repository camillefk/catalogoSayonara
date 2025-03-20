import { useState, useEffect } from 'react';
import './verseSection.css';

const VerseSection = () => {
    const [verse, setVerse] = useState("");

    useEffect(() => {
        const fetchVerse = async () => {
          try {
            const response = await fetch("http://localhost:5000/api/verses");
            const data = await response.json();
            setVerse(data.text);
          } catch (error) {
            console.error("Erro ao buscar o versículo:", error);
          }
        };
    
        fetchVerse();
      }, []);
    
      return (
        <div className="verse-section">
          <h2>Versículo do Dia</h2>
          <p>{verse || "Nenhum versículo disponível no momento."}</p>
        </div>
      );
    };
    
    export default VerseSection;