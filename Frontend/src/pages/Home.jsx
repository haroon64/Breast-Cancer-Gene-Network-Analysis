import React, { useState } from "react";
import '../styles/Home.css';

import { useNavigate } from "react-router-dom";

const Home = () => {
  
  const toggleDropdown = (menu) => {
    setDropdownOpen(dropdownOpen === menu ? null : menu);
  };

  return (
      <h1>Home</h1>
    // <div className="container">
      
    //   <section style={{ backgroundColor: "#ff85a2", padding: "1.5px", color: "white" }}>
    //   </section>
    //   {/* Search Bar */}
    //   <h2 className="search-text">Search our knowledgebase's 500,000+ drugs and drug products:</h2>
    //   <div className="search-bar">
       
    //     <div className="search-container">
    //       <div className="search-box">
    //         <select className="search-category">
    //           <option>Drugs</option>
    //           <option>Pathways</option>
    //           <option>Targets</option>
    //         </select>
    //         <input type="text" placeholder="Type your search" className="search-input" />
    //         <button className="search-button">🔍</button>
    //       </div>
    //     </div>
    //   </div>

    //   {/* Banner Section */}
    //   <section className="banner">
    //     <div className="banner-content">
    //       <h2 className="banner-title">Introducing the Newest, Most Powerful Version of DrugBank</h2>
    //       <p className="banner-text">
    //         The wait is over! DrugBank has evolved to give scientists, researchers, and biotech teams <span className="bold">AI-powered, real-time insights</span> all in one <span className="bold">comprehensive intelligence platform</span>.
    //       </p>
    //       <button className="request-button">REQUEST EARLY ACCESS</button>
    //     </div>
    //   </section>
     
    
    // </div>
  );
};

export default Home;
