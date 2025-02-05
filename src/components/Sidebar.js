import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Sidebar = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <span className="start-text">Start</span>
      </div>
      <nav className="sidebar-nav">
        <ul>
          <div className="sidebar-section">
            <span className="section-title">Idea station</span>
            <li>
              <Link 
                to="/idea-pads" 
                className={`sidebar-link ${currentPath === '/idea-pads' ? 'active' : ''}`}
              >
                <span className="nav-icon">📝</span>
                Idea Pads
              </Link>
            </li>
          </div>
          <div className="sidebar-section">
            <span className="section-title">Ready to build</span>
            <li>
              <Link 
                to="/build-product" 
                className={`sidebar-link ${currentPath === '/build-product' ? 'active' : ''}`}
              >
                <span className="nav-icon">🛠️</span>
                Build it
              </Link>
            </li>
            <li>
              <a href="#" className="sidebar-link">
                <span className="nav-icon">🚀</span>
                Deploy it
              </a>
            </li>
          </div>
          <div className="sidebar-section">
            <span className="section-title">Go to market</span>
            <li>
              <a href="#" className="sidebar-link">
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