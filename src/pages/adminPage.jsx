import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/adminPage.css';

const AdminPage = () => {
    const navigate = useNavigate();
    const [produtos, setProdutos] = useState([]);
    const [versiculo, serVersiculo] = useState('');
    const [novoVersiculo, setNovoVersiculo] = useState('');
    const [token, setToken] = useState(localStorage.getItem('token'));

    useEffect(() => {
        if (!token) {
            navigate('/login');
        } else {
            buscarProdutos();
            buscarVersiculo();
        }
    }, []);

    const buscarProdutos = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/produtos');
            const data = await response.json();
            setProdutos(data);
        } catch (err) {
            console.error('Erro ao buscar produtos:', err);
        }
    };

    const buscarVersiculo = async () => {
        try {
            const response = await ('http://localhost:5000/api/versiculo');
            const data = await response.json();
            setNovoVersiculo(data.text || 'Nenhum versículo disponível');
        } catch (err) {
            console.error('Erro ao buscar versículo', err);
        }
    };

    const atualizarVersiculo = async () => {
        try {
            await fetch('http://localhost:5000/api/versiculo', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                  Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({ text: novoVersiculo}),
            });
            setNovoVersiculo(novoVersiculo);
            setNovoVersiculo('');
            alert('Versículo atualizado!');
        } catch (err) {
            console.error('Erro ao atualizar versículo:', err);
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        navigate('/');
    };

    return (
        <div className="admin-container">
            <header className="admin-header">
                <h1>Painel Administrativo</h1>
                <button className="logout-button">Sair</button>
            </header>

            <section className="versiculo-section">
                <h2>Versículo do Dia</h2>
                <p className="versiculo-text">{versiculo}</p>
                <textarea
                    className="versiculo-input"
                    placeholder='Digite um novo versículo aqui...'
                    value={novoVersiculo}
                    onChange={(e) => setNovoVersiculo(e.target.value)}
                />
                <button className="update-botton" onClick={atualizarVersiculo}>Atualizar Versículo</button>
            </section>

            <section className="produtos-section">
                <h2>Produtos Cadastrados</h2>
                <ul className="produtos-lista">
                    {produtos.map((produto) => (
                        <li className="produto-item" key={produto._id}>
                            <span>{produto.nome} - {produto.categoria}</span>
                            <div className="botoes-acoes">
                                <button
                                    className="botao-editar"
                                    onClick={() => console.log('Editar', produto._id)}
                                >Editar
                                </button>
                                <button
                                    className="botao-excluir"
                                    onClick={() => console.log('Excluir', produto._id)}
                                >Excluir
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            </section>
        


        
        </div>
    );
};

export default AdminPage;