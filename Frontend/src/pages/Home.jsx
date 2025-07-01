import React, { useState } from "react";
import '../styles/Home.css';
import Network from '../assets/Network-Photoroom.png';
import { useNavigate } from "react-router-dom";
import haroon from '../assets/haroon1.jpg';

const Home = () => {


  const PrintPDF = () => {
   
    const pdfWindow = window.open("/Breast_Cancer_NX.pdf", "_blank");
    if (pdfWindow) {
      pdfWindow.focus();
      pdfWindow.onload = function () {
        pdfWindow.print();
      };
    }}

     const handleOpenGitHub = () => {
    window.open("https://github.com/haroon64/Breast-Cancer-Gene-Network-Analysis", "_blank");
  };

  
   const DownloadZip = () => {
  
    const link = document.createElement('a');
    link.href = '/Preprocessed_Data_set.rar'; // relative to public folder
    link.download = 'Preprocessed_Data_set.rar';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  


  return (
       <div className="Home-Container">
        <div className="Home-Header">
          <h1>Advancing Biomarker Discovery in Breast Cancer</h1>
         
          <p>Precision Oncology through Biomarker Discovery and Drug-Target Network Simulation</p>
          <div className="Home-Network">

             <img src={Network} alt="Network" className=""/>

            
          </div>

          
       </div>
       <div className="Home-Description">
        <h1>What is Network Doping in Breast Cancer?</h1>
        <p>This web platform showcases an innovative approach for identifying potential biomarkers and therapeutic drug targets in breast cancer using interactive gene networks. By simulating drug effects on gene interaction networks (a method known as network doping), we visualize how treatments may influence tumor behavior and identify candidate interventions.

        Our research combines differential gene expression analysis, protein-protein interaction networks, and drug-gene interaction databases to create a comprehensive view of how targeted therapies can disrupt cancer networks at the molecular level.</p>
       </div>
       <div className="Home-Stats-Container">
        <h1>Research Impact</h1>
        <p>Quantifying our discoveries in breast cancer network analysis</p>


       <div className="stats-container"> 
       <div className="Home-Stats">

        
        <h1>28</h1>
        <h3>Biomarkers Identified</h3>
        

       </div>
         <div className="Home-Stats">
          
        
        <h1>5</h1>
        <h3>Interaction Knowledge</h3>

       </div>
        <div className="Home-Stats">
        
        <h1>65+</h1>
        <h3>Gene-Gene Interaction</h3>

        </div>
      <div className="Home-Stats">
        
        <h1>15%</h1>
        <h3>Network Disruption</h3>

       </div>
       </div>
       </div>

       
       
      
       
       <div className="Discoveries">

        <h1>Key Discoveries and Insights</h1>
        <div className="discoveries-container">

        <div className="Discoveries-info">
          <h3>EZH2 & TOP2A Targeting</h3>
          <p>Major therapeutic targets identified through network analysis, showing significant impact on cancer cell survival pathways.</p>
        </div>
           <div className="Discoveries-info">
          <h3>Combination Therapy Impact</h3>
          <p>Dual drug treatment resulted in 15% node loss and 23% edge disruption, indicating effective network fragmentation.</p>
        </div>
      
        <div className="Discoveries-info">
          <h3>Combination Therapy Impact</h3>
          <p>Increased centralization from 0.12 to 0.18 post-treatment, suggesting more targeted therapeutic effects.</p>
        </div>
         <div className="Discoveries-info">
          <h3>Biomarker Validation</h3>
          <p>28 potential biomarkers identified with high confidence scores for diagnostic and prognostic applications.</p>
        </div>

       </div>
        </div>
       
       <div className="Research-material">
        <h1>Research Materials & Data Access</h1>
        <div className="discoveries-container">
        <div className="Research-box">
          <h3>Full Research Paper</h3>
          <p>Complete methodology, results, and discussion of network doping approach in breast cancer research.</p>
          <button onClick={PrintPDF}>Download PDF</button>
        </div>

         <div className="Research-box">
          <h3>Processed Datasets</h3>
          <p>Access to cleaned and normalized gene expression data, network files, and analysis results.</p>
          <button onClick={DownloadZip}>Download Data</button>
        </div>
         <div className="Research-box">

          <h3>Source Code </h3>
          <p>Complete analysis pipeline including R scripts, network analysis tools, and visualization code.</p>
          <button onClick={handleOpenGitHub}>View Github</button>
          </div>
        </div>

        </div>

        <div className="Research-Team">
          <h1>Research Team</h1>
          <div className="Team-container">
          <div className="Team-Members">
             <img src="" alt="" className=""/>
            <h3>Tayyiba Arshad</h3>
            <h4> Research Supervisor</h4>
            <p>Faculty advisor with expertise in computational oncology and systems biology.</p>
          
          </div>

           <div className="Team-Members">
             <img src="" alt="" className=""/>
            <h3>Abdullah Saqib</h3>
            <h4> Lead Researcher</h4>
            <p>Specialized in bioinformatics and network analysis for cancer research applications.</p>
          
          </div>
          

          <div className="Team-Members">
            <img src={haroon} alt="" className=""/>
            <h3>Haroon Siddique</h3>
            <h4> Lead Researcher</h4>
            <p>Specialized in bioinformatics and network analysis for cancer research applications.</p>
          
          </div>
          </div>


        </div>

       </div>

       

       
   
     
    
    
  );
};

export default Home;
