import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/homePage';
import CategoryPage from './pages/categoryPage';
import LoginPage from './pages/loginPage';
import AdminPage from './pages/adminPage';


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/categoria/:categoria" element={<CategoryPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/admin" element={<AdminPage />} />
 
      </Routes>
    </Router>
  );
};

export default App;
