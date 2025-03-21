import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/homePage";
import CategoryPage from "./pages/categoryPage";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/categoria/:categoria" element={<CategoryPage />} />
      </Routes>
    </Router>
  );
};

export default App;
