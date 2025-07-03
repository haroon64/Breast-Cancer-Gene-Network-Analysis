import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Header.css';
import logoImage from '../assets/bc1.jpg';

const Header = () => {
  const [openMenu, setOpenMenu] = useState(null);
  const navigate = useNavigate();
  const hideTimeout = useRef(null);

  const handleMouseEnter = (menu) => {
    if (hideTimeout.current) {
      console.log(hideTimeout.current);
      
      clearTimeout(hideTimeout.current);
      hideTimeout.current = null;
    }
    setOpenMenu(menu);
  };

  const handleMouseLeave = () => {
    hideTimeout.current = setTimeout(() => {
      setOpenMenu(null);
    }, 300); // Slightly shorter delay for better UX
  };

  return (
    <div className="header-container">
      <header className="header">
        <div className="header-left" onClick={() => navigate('/')}>
          <img src={logoImage} alt="Breast Cancer Logo" className="logo-img" />
          <h1 className="logo-text">BreastNetRx</h1>
        </div>

        <nav className="nav">
          <div
            className="nav-item has-dropdown"
            onMouseEnter={() => handleMouseEnter('explore')}
            onMouseLeave={handleMouseLeave}
          >
            <button className="nav-button">Explore</button>
            {openMenu === 'explore' && (
              <div
                className="dropdown"
                onMouseEnter={() => handleMouseEnter('explore')}
                onMouseLeave={handleMouseLeave}
              >
                <div className="dropdown-item">
                  <a onClick={() => navigate('/Gene_knowledge_base')} className="dropdown-title" href="#">Gene Knowledgebase</a>
                  <p className="dropdown-description">
                    Dig into essential Gene information
                  </p>
                </div>
                <div
                  className="dropdown-item"
                  onClick={() => navigate('/Drug_knowledgebase')}
                >
                  <a className="dropdown-title" href="#">
                    Drug Knowledgebase
                  </a>
                  <p className="dropdown-description">
                    Dig into essential Drug information
                  </p>
                </div>
                <div className="dropdown-item">
                  <a onClick={() => navigate('/Interaction_knowledgebase')} className="dropdown-title" href="#">
                    Interaction Knowledgebase
                  </a>
                  <p className="dropdown-description">
                    Learn how genes interact
                  </p>
                </div>
              </div>
            )}
          </div>

          <div
            className="nav-item has-dropdown"
            onMouseEnter={() => handleMouseEnter('discovery')}
            onMouseLeave={handleMouseLeave}
          >
            <button className="nav-button">For Drug Discovery</button>
            {openMenu === 'discovery' && (
              <div
                className="dropdown"
                onMouseEnter={() => handleMouseEnter('discovery')}
                onMouseLeave={handleMouseLeave}
              >
                <a onClick={() => navigate('/Advance_drug_doping')} className="dropdown-link" href="#">Advanced Drug Doping </a>
                <a className="dropdown-link" onClick={() => navigate('/Simpler_drug_doping')} href="#">Basic Drug Doping</a>
              </div>
            )}
          </div>

          <button
            className="nav-button"
            onClick={() => navigate('/Research_page')}
          >
            For Your Research
          </button>
          <button className="nav-button" onClick={() => navigate('/Network3d')}>Protein Gene Network</button>
        </nav>
      </header>
    </div>
  );
};

export default Header;
