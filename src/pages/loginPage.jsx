import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
    const [user, setUser] = useState('');
    const [password, setPassword] = useState('');
    const [erro, setErro] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        const response = await fetch('http://localhost:5000/api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ user, password }),
          });

          const data = await response.json();

          if (response.ok) {
            localStorage.setItem('token', data.token);
            navigate('/admin');
          } else {
            setErro(data.mensagem || 'Login inválido');
          }
    };

    return (
      <div className="login-container">
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <input
          type='text'
          placeholder='Usuário'
          value={user}
          onChange={(e) => setUser(e.target.value)}
          required
          />
          <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          />
          {erro && <p className='erro'>{erro}</p>}
          <button type="submit">Entrar</button>
        </form>
      </div>
    );
};

export default LoginPage;