import React, { useState } from 'react';
import '../styles/Drug_knowledgebase.css';
import { useNavigate } from "react-router-dom";

const DrugKnowledgeBase = () => {
  const navigate = useNavigate();
  
  const [search, setSearch] = useState({
    drug: '',
    kingdom: '',
    superclass: '',
    class: '',
    subclass: ''
  });

  const data = [
    {
      drug: 'Docetaxel',
      kingdom: 'Organic Compounds',
      superclass: 'Lipids and lipid-like molecules',
      class: 'Prenol lipids',
      subclass: 'Diterpenoids'
    },
    {
      drug: 'Cetuximab',
      kingdom: 'Organic compounds',
      superclass: 'Organic acids and derivatives',
      class: 'Carboxylic acids and derivatives',
      subclass: 'Amino acids, peptides, and analogues'
    },
  
    {
      drug: 'Daunorubicin',
      kingdom: 'Organic Compounds',
      superclass: 'Phenylpropanoids and polyketides',
      class: 'Anthracyclines',
      subclass: 'Not Available'
    },
    {
      drug: 'Paclitaxel',
      kingdom: 'Organic Compounds',
      superclass: 'Lipids and lipid-like molecules',
      class: 'Prenol lipids',
      subclass: 'Diterpenoids'
    },
    {
      drug: 'Doxorubicin',
      kingdom: 'Organic Compounds',
      superclass: 'Phenylpropanoids and polyketides',
      class: 'Anthracyclines',
      subclass: 'Not Available'
    },
    {
      drug: 'Sirolimus',
      kingdom: 'Organic Compounds',
      superclass: 'Phenylpropanoids and polyketides',
      class: 'Macrolide lactams',
      subclass: 'Not Available'
    },
    {
      drug: 'Leflunomide',
      kingdom: 'Organic Compounds',
      superclass: 'Benzenoids',
      class: 'Benzene and substituted derivatives',
      subclass: 'Anilides'
    },
    {
      drug: 'Tacrolimus',
      kingdom: 'Organic Compounds',
      superclass: 'Phenylpropanoids and polyketides',
      class: 'Macrolide lactams',
      subclass: 'Not Available'
    },
     {
    drug: "Vorinostat",
    kingdom: "Organic compounds",
    superclass: "Benzenoids",
    class: "Benzene and substituted derivatives",
    subclass: "Not Available"
  },

 
  {
    drug: "Teniposide",
    kingdom: "Organic compounds",
    superclass: "Phenylpropanoids and polyketides",
    class: "Lignans, neolignans and related substances",
    subclass: "Not Available"
  },
  {
    drug: "Amsacrine",
    kingdom: "Organic compounds",
    superclass: "Organoheterocyclic compounds",
    class: "Acridines and derivatives",
    subclass: "Not Available"
  },
  {
    drug: "Mitoxantrone",
    kingdom: "Organic compounds",
    superclass: "Phenylpropanoids and polyketides",
    class: "Anthracenediones",
    subclass: "Not Available"
  },
  {
    drug: "Idarubicin",
    kingdom: "Organic compounds",
    superclass: "Phenylpropanoids and polyketides",
    class: "Anthracyclines",
    subclass: "Not Available"
  },
  
  {
    drug: "Dexrazoxane",
    kingdom: "Organic compounds",
    superclass: "Organic nitrogen compounds",
    class: "Diazepines and derivatives",
    subclass: "Not Available"
  },
  {
    drug: "Vincristine",
    kingdom: "Organic compounds",
    superclass: "Organoheterocyclic compounds",
    class: "Alkaloids and derivatives",
    subclass: "Not Available"
  },

  {
    drug: "Fluorouracil",
    kingdom: "Organic compounds",
    superclass: "Organic nitrogen compounds",
    class: "Organoheterocyclic compounds",
    subclass: "Pyrimidines and derivatives"
  },
  {
    drug: "Epirubicin",
    kingdom: "Organic compounds",
    superclass: "Phenylpropanoids and polyketides",
    class: "Anthracyclines",
    subclass: "Not Available"
  },
  {
    drug: "Etoposide",
    kingdom: "Organic compounds",
    superclass: "Phenylpropanoids and polyketides",
    class: "Lignans, neolignans and related substances",
    subclass: "Not Available"
  },
 
  {
    drug: "Streptozocin",
    kingdom: "Organic compounds",
    superclass: "Organic nitrogen compounds",
    class: "Nitrosamines and derivatives",
    subclass: "Not Available"
  },
 
 

  ];

  const handleSearchChange = (field, value) => {
    setSearch(prev => ({ ...prev, [field]: value }));
  };

  const filteredData = data.filter(item =>
    Object.keys(search).every(key =>
      item[key].toLowerCase().includes(search[key].toLowerCase())
    )
  );

  const handleDetailsClick = (drug) => {
    const drug_name = drug.drug
    navigate("/DrugDetails", { state: { drug_name } });
  };

  return (
    <div className="drug-container">
      <div className="filters">
        <h2>Chemical Structure Classification</h2>
        <p>
        This page presents a categorized view of various drugs based on their chemical structure and biological classification. It serves as a knowledge base that helps users understand the composition and grouping of drugs in terms of their organic nature and chemical families. Such classifications are essential for researchers and healthcare professionals to study drug behavior, interactions, and development. The structured layout aids in quick comparisons and better insight into the biochemical properties of different drugs.
        </p>
      </div>

      <div className="display-count">
        Displaying classifications 1 - {filteredData.length} of {data.length} in total
      </div>

      <table className="drug-table">
        <thead>
          <tr>
            {['DRUG', 'KINGDOM', 'SUPERCLASS', 'CLASS', 'SUBCLASS'].map((head, idx) => (
              <th key={idx}>{head}</th>
            ))}
            <th>Action</th>
          </tr>
          <tr>
            {['drug', 'kingdom', 'superclass', 'class', 'subclass'].map((field, idx) => (
              <th key={idx}>
                <input
                  type="text"
                  placeholder={`Search ${field}`}
                  value={search[field]}
                  onChange={(e) => handleSearchChange(field, e.target.value)}
                />
              </th>
            ))}
            <th>
              <button
                className="clear-button"
                onClick={() => setSearch({
                  drug: '',
                  kingdom: '',
                  superclass: '',
                  class: '',
                  subclass: ''
                })}
              >
                CLEAR
              </button>
            </th>
          </tr>
        </thead>
        <tbody>
          {filteredData.length > 0 ? (
            filteredData.map((item, index) => (
              <tr key={index}>
                <td className="drug-name">{item.drug}</td>
                <td>{item.kingdom}</td>
                <td>{item.superclass}</td>
                <td>{item.class}</td>
                <td>{item.subclass}</td>
                <td>
                  <button
                    className="details-button"
                    onClick={() => handleDetailsClick(item)}
                  >
                    Details
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="no-results">No results found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default DrugKnowledgeBase;
