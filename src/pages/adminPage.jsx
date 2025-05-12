import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { nomeDasCategorias } from '../utils/categorias';
import '../styles/adminPage.css';

const AdminPage = () => {
    const navigate = useNavigate();
    const [produtos, setProdutos] = useState([]);
    const [versiculo, setVersiculo] = useState('');
    const [novoVersiculo, setNovoVersiculo] = useState('');
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [produtoEditando, setProdutoEditando] = useState(null);
    const [mostrarModal, setMostrarModal] = useState(false);

    const [mostrarModalAdicionar, setMostrarModalAdicionar] = useState(false);
    const [novoProduto, setNovoProduto] = useState({
        nome: '',
        categoria: '',
        preco: '',
        imagem: '',
        altura: '',
        diametro: ''
    });

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
            const response = await fetch('http://localhost:5000/api/verses');
            const data = await response.json();
            setNovoVersiculo(data.text || 'Nenhum versículo disponível');
        } catch (err) {
            console.error('Erro ao buscar versículo', err);
        }
    };

    const atualizarVersiculo = async () => {
        try {
            await fetch('http://localhost:5000/api/verses', {
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

    const abrirModalEdicao = (produto) => {
        setProdutoEditando(produto);
        setMostrarModal(true);
    };

    const fecharModal = () => {
        setMostrarModal(false);
        setProdutoEditando(null);
    };

    const handleEditarProduto = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append('nome', produtoEditando.nome);
            formData.append('categoria', produtoEditando.categoria);
            formData.append('preco', produtoEditando.preco);
            formData.append('altura', produtoEditando.altura);
            formData.append('diametro', produtoEditando.diametro);
            if (produtoEditando.imagem instanceof File) {
                formData.append('imagem', produtoEditando.imagem);
            }

            const response = await fetch(`http://localhost:5000/api/produtos/${produtoEditando._id}`, {
                method: 'PUT',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                body: formData,
            });
    
            if (response.ok) {
                alert('Produto atualizado com sucesso!');
                fecharModal();
                buscarProdutos();
            } else {
                alert('Erro ao atualizar produto');
            }
        } catch (err) {
            console.error('Erro ao editar produto:', err);
        }
    };

    const handleAdicionarProduto = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append('nome', novoProduto.nome);
            formData.append('categoria', novoProduto.categoria);
            formData.append('preco', novoProduto.preco);
            formData.append('altura', novoProduto.altura);
            formData.append('diametro', novoProduto.diametro);
            if (novoProduto.imagem) {
                formData.append('imagem', novoProduto.imagem);
            }

            const response = await fetch('http://localhost:5000/api/produtos', {
                method: 'POST',
                headers: {
                  Authorization: `Bearer ${token}`
                },
                body: formData,
              });

            if (response.ok) {
                alert('Produto adicionado com sucesso!');
                setMostrarModalAdicionar(false);
                setNovoProduto({
                    nome: '',
                    categoria: '',
                    preco: '',
                    imagem: '',
                    altura: '',
                    diametro: ''
                });
                buscarProdutos();
            } else {
                alert('Erro ao adicionar produto');
            }
        } catch (err) {
            console.error('Erro ao adicionar produto:', err);
        }
    };

    const handleExcluirProduto = async (id) => {
        if (!window.confirm('Tem certeza que deseja excluir este bolo?')) return;

        try {
            await fetch(`http://localhost:5000/api/produtos/${id}`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            setProdutos(produtos.filter((produto) => produto._id !== id));
            alert('Produto excluído com sucesso!');
        } catch (err) {
            console.error('Erro ao excluir produto:', err);
            alert('Erro ao excluir produto');
        }
    };

    return (
        <div className="admin-container">
            <header className="admin-header">
                <h1>Painel Administrativo</h1>
                <button className="logout-button" onClick={logout}>Sair</button>
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
                <button className="botao-adicionar" onClick={() => setMostrarModalAdicionar(true)}>Adicionar Novo Bolo</button>
                <ul className="produtos-lista">
                    {produtos.map((produto) => (
                        <li className="produto-item" key={produto._id}>
                            {produto.nome} - {produto.categoria}
                            <div className="produto-card">
                            <img src={`http://localhost:5000${produto.imagem}`} alt={produto.nome} className="imagem-produto" />
                            <h3 className="produto-nome">{produto.nome}</h3>
                            <p className="produto-preco">R$ {parseFloat(produto.preco).toFixed(2)}</p>
                            <div className="botoes-acoes">
                                <button className="botao-editar" onClick={() => abrirModalEdicao(produto)}>Editar</button>
                                <button className="botao-excluir" onClick={() => handleExcluirProduto(produto._id)}>Excluir</button>
                            </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </section>

            {mostrarModal && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h3>Editar Produto</h3>
                        <form onSubmit={handleEditarProduto}>
                            <input
                            type="text"
                            placeholder="Nome do bolo"
                            value={produtoEditando?.nome || ''}
                            onChange={(e) => setProdutoEditando({ ...produtoEditando, nome: e.target.value })}
                            />
                            <select
                            value={produtoEditando?.categoria || ''}
                            onChange={(e) => setProdutoEditando({ ...produtoEditando, categoria: e.target.value })}
                            >
                                <option value="">Selecione uma categoria</option>
                                {nomesDasCategorias.map((categoria, index) => (
                                    <option key={index} value={categoria}>{categoria}</option>
                                ))}
                            </select>
                            <input
                                type="number"
                                placeholder="Preço"
                                value={produtoEditando?.preco || ''}
                                onChange={(e) => setProdutoEditando({ ...produtoEditando, preco: e.target.value })}
                            />
                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => setProdutoEditando({ ...produtoEditando, imagem: e.target.files[0] })}
                            />
                            <input
                                type="text"
                                placeholder="Altura"
                                value={produtoEditando?.altura || ''}
                                onChange={(e) => setProdutoEditando({ ...produtoEditando, altura: e.target.value })}
                            />
                            <input
                                type="text"
                                placeholder="Diâmetro"
                                value={produtoEditando?.diametro || ''}
                                onChange={(e) => setProdutoEditando({ ...produtoEditando, diametro: e.target.value })}
                            />
                            <div className="modal-botoes">
                                <button type="submit">Salvar</button>
                                <button type="button" onClick={fecharModal}>Cancelar</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {mostrarModalAdicionar && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h3>Adicionar Bolo</h3>
                        <form onSubmit={handleAdicionarProduto}>
                            <input
                                type="text"
                                placeholder="Nome do Bolo"
                                value={novoProduto.nome}
                                onChange={(e) => setNovoProduto({ ...novoProduto, nome: e.target.value })}
                                required
                            />
                            <select
                                value={novoProduto.categoria}
                                onChange={(e) => setNovoProduto({ ...novoProduto, categoria: e.target.value })}
                                required
                            >
                                <option value="">Selecione uma categoria</option>
                                {nomesDasCategorias.map((categoria, index) => (
                                    <option key={index} value={categoria}>{categoria}</option>
                                ))}
                            </select>
                            <input
                                type="number"
                                placeholder="Preço"
                                value={novoProduto.preco}
                                onChange={(e) => setNovoProduto({ ...novoProduto, preco: e.target.value})}
                                required
                            />
                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => setNovoProduto({ ...novoProduto, imagem: e.target.files[0] })}
                            />
                            <input
                                type="text"
                                placeholder="Altura"
                                value={novoProduto.altura}
                                onChange={(e) => setNovoProduto({ ...novoProduto, altura: e.target.value })}
                            />
                            <input
                                type="text"
                                placeholder="Diâmetro"
                                value={novoProduto.diametro}
                                onChange={(e) => setNovoProduto({ ...novoProduto, diametro: e.target.value })}
                            />
                            <div className="modal-botoes">
                                <button type="submit">Adicionar</button>
                                <button type="button" onClick={() => setMostrarModalAdicionar(false)}>Cancelar</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        


        
        </div>
    );
};

export default AdminPage;