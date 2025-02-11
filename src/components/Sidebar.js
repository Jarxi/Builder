import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div 
      className="topnav"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      <div className="topnav-trigger">
        <span className="start-text">Start</span>
      </div>
      <nav className={`topnav-content ${isVisible ? 'visible' : ''}`}>
        <ul>
          <div className="nav-section">
            <span className="section-title">Idea station</span>
            <li>
              <Link 
                to="/idea-pads" 
                className={`nav-link ${currentPath === '/idea-pads' ? 'active' : ''}`}
              >
                <span className="nav-icon">📝</span>
                Idea Pads
              </Link>
            </li>
          </div>
          <div className="nav-section">
            <span className="section-title">Ready to build</span>
            <li>
              <Link 
                to="/build-product" 
                className={`nav-link ${currentPath === '/build-product' ? 'active' : ''}`}
              >
                <span className="nav-icon">🛠️</span>
                Build it
              </Link>
            </li>
            <li>
              <a href="#" className="nav-link">
                <span className="nav-icon">🚀</span>
                Deploy it
              </a>
            </li>
          </div>
          <div className="nav-section">
            <span className="section-title">Go to market</span>
            <li>
              <a href="#" className="nav-link">
                <span className="nav-icon">📈</span>
                Market it
              </a>
            </li>
          </div>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar; 