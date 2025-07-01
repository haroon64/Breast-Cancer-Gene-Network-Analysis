import React from 'react';
import '../styles/Footer.css'; // Import your CSS styles

const Footer = () => {
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
                    <p className="footer-link" tabIndex={0}>Interactive Analysis</p>
                    <p className="footer-link" tabIndex={0}>Research paper</p>
                </div>

                <div className="footer-section">
                    <h3 className="footer-heading">Resources</h3>
                    <p className="footer-link" tabIndex={0}>GEO Datasets</p>
                    <p className="footer-link" tabIndex={0}>STRING Database</p>
                    <p className="footer-link" tabIndex={0}>DGIdb</p>
                </div>
            </div>
            <div className="footer-bottom">
                © 2024 Institute of Space Technology. All rights reserved.
            </div>
        </footer>
    );
};

export default Footer;
