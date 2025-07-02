import React from 'react';
import '../styles/Footer.css'; // Import your CSS styles
import { useNavigate } from "react-router-dom";




const Footer = () => {
  const navigate = useNavigate();

    
    const PrintPDF = () => {
   
    const pdfWindow = window.open("/Breast_Cancer_NX.pdf", "_blank");
    if (pdfWindow) {
      pdfWindow.focus();
      pdfWindow.onload = function () {
        pdfWindow.print();
      };
    }}

    const handleClick1 = () => {
    window.open('https://www.ncbi.nlm.nih.gov/gds/', '_blank');
  };

  const handleClick2 = () => {
    window.open('https://string-db.org/', '_blank');
  };
  const handleClick3 = () => {
    window.open('https://dgidb.org/', '_blank');
  };


    

    return (
        <footer className="footer">
            <div className="footer-container">
                <div className="footer-section">
                    <h3 className="footer-heading">Contact Information</h3>
                    <p>Institute of Space Technology, Islamabad Pakistan</p>
                    <p>Email: research@ist.edu.pk</p>
                </div>

                <div className="footer-section">
                    <h3 className="footer-heading">Quick Links</h3>
                    <p onClick={() => navigate('/Research_page')} className="footer-link" tabIndex={0}>Interactive Analysis</p>
                    <p onClick={PrintPDF}className="footer-link" tabIndex={0}>Research paper</p>
                </div>

                <div className="footer-section">
                    <h3 className="footer-heading">Resources</h3>
                    <p onClick={handleClick1} className="footer-link" tabIndex={0}>GEO Datasets</p>
                    <p onClick={handleClick2} className="footer-link" tabIndex={0}>STRING Database</p>
                    <p onClick={handleClick3} className="footer-link" tabIndex={0}>DGIdb</p>
                </div>
            </div>
            <div className="footer-bottom">
                © 2024 Institute of Space Technology. All rights reserved.
            </div>
        </footer>
    );
};

export default Footer;
