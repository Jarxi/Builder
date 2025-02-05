import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState } from 'react';
import './App.css';
import Sidebar from './components/Sidebar';
import ProductResearchGuides from './pages/ProductResearchGuides';
import IdeaPads from './pages/IdeaPads';
import BuildProduct from './pages/BuildProduct';
import './styles/ProductResearchGuides.css';

function App() {
  const [currentPage, setCurrentPage] = useState('idea-pads');

  return (
    <Router>
      <div className="App">
        <div className="app-container">
          <Sidebar currentPage={currentPage} setCurrentPage={setCurrentPage} />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Navigate to="/idea-pads" replace />} />
              <Route path="/idea-pads" element={<IdeaPads />} />
              <Route path="/product-research" element={<ProductResearchGuides />} />
              <Route path="/build-product" element={<BuildProduct />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;
