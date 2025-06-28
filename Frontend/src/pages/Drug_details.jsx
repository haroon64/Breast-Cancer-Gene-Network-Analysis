import React, { useState, useEffect } from 'react'; 
import { useLocation } from "react-router-dom";
import chemicalImage from '../assets/chemical.jpg';
import '../styles/Drug_details.css';

const DrugDetails = () => {
    const location = useLocation();
    const { drug_name } = location.state;
    const [drugData, setDrugData] = useState(null);  // <-- define state

    useEffect(() => {
        const fetchDrugDetails = async () => {
            try {
                const response = await fetch(`http://127.0.0.1:8000/drug_info/drugs/${drug_name}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch drug details');
                }
                const data = await response.json();
                console.log(data); 
                setDrugData(data);  // <-- store the data in state
            } catch (error) {
                console.error('Error fetching drug details:', error);
            }
        };
      
        fetchDrugDetails();
    }, [drug_name]);

    const formatChemicalFormula = (formula) => {
        return formula.replace(/(\d+)/g, '<sub>$1</sub>');
    };

    const Detail = ({ label, value }) => (
        <div className="detail-section">
            <h3 className="label">{label}</h3>
            <p
              className="value"
              dangerouslySetInnerHTML={{ __html: value }}
            ></p>
        </div>
    );

    if (!drugData) {
      return <div>Loading...</div>; // <-- wait until data is fetched
    }

    return (
        <div className="info-container">
            <div className="info-header">
                <h1 className="info-title">{drug_name}</h1>
                <img src={chemicalImage} alt="Chemical" />
            </div>

            <div className="info-card">
                <div className="info-content">
                    <div className="info-image">
                        <img src={drugData.image_url} alt="Drug structure" />
                    </div>

                    <div className="info-details">
                        <Detail label="Description" value={drugData.description} />
                        <Detail label="Type" value={drugData.type} />
                        <Detail className="chemical-formula" label="Chemical Formula" value={formatChemicalFormula(drugData.chemical_formula)} />
                    </div>

                    <div style={{ borderTop: "2px dotted gray", width: "100%" }}></div>
                </div>

                <div className="other-details">
                    <Detail label="Summary" value={drugData.summary} />
                    <Detail label="Brand Names" value={drugData.brand_names} />
                    <Detail label="Background" value={drugData.background} />
                    <Detail label="Generic Name" value={drugData.generic_name} />
                    <Detail label="Groups" value={drugData.groups} />
                </div>

                <div className="detail-section">
                    <h3 className="label">Weight</h3>
                    <ul className="detail-list">
                    {drugData.weight.molecular_weight >0 && (
                        <li>Molecular Weight: <span>{drugData.weight.molecular_weight}</span></li>
                    )}
                     {drugData.weight.monoisotopic_mass >0 && (
                        <li>Monoisotopic Mass: <span>{drugData.weight.monoisotopic_mass}</span></li>
                    )}
                        {drugData.weight.protein_weight && (
                            <li>Protein Weight: <span>{drugData.weight.protein_weight}</span></li>
                        )}
                    </ul>
                </div>

              
            </div>
        </div>
    );
};

export default DrugDetails;
