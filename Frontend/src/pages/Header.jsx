// src/components/Header.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Header.css';
import logoImage from '../assets/bc1.jpg';

const Header = () => {
    const [openMenu, setOpenMenu] = useState(null);
    const navigate = useNavigate();

  return (
    <div className="header-container">
      <header className="header">
        <div className="header-left" onClick={() => navigate('/')}>
          <img src={logoImage} alt="Breast Cancer Logo" className="logo-img" />
          <h1 className="logo-text">Breast Cancer</h1>
        </div>

        <nav className="nav">
          <div
            className="nav-item has-dropdown"
            onMouseEnter={() => setOpenMenu('explore')}
            onMouseLeave={() => setOpenMenu(null)}
          >
            <button className="nav-button">Explore</button>
            {openMenu === 'explore' && (
              <div className="dropdown">
                <div className="dropdown-item">
                  <a  onClick={() => navigate('/Gene_knowledge_base')} className="dropdown-title" href="#">Gene Knowledgebase</a>
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
            onMouseEnter={() => setOpenMenu('discovery')}
            onMouseLeave={() => setOpenMenu(null)}
          >
            <button className="nav-button">For Drug Discovery</button>
            {openMenu === 'discovery' && (
              <div className="dropdown">
                <a onClick={() => navigate('/Doxorubicin_Drug')} className="dropdown-link" href="#">Advanced Drug Doping </a>
         
                <a className="dropdown-link" onClick={() => navigate('/Simpler_drug_doping')} href="#">simpler Drug Doping</a>
             
              </div>
            )}
          </div>

          <button
            className="nav-button"
            onClick={() => navigate('/NetworkVisualization')}
          >
            For Your Research
          </button>
          <button className="nav-button"  onClick={() => navigate('/Network3d')}>Protein Gene Network</button>
        </nav>
      </header>
    </div>
  );
};

export default Header;
