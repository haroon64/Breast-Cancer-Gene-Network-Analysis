import { useState } from 'react';
import '../styles/Gene_knowledgeBase.css';

const GeneKnowledgeBase = () => {
  const [search, setSearch] = useState({
    symbol: '',
    full_name: '',
    role: '',
    targeted_drugs: '',
    links: '',
  });

const data = [
    {
        "symbol": "ACACB",
        "full_name": "Acetyl\u2011CoA Carboxylase \u03b2",
        "role": "Central to lipid metabolism; inhibition impairs breast cancer growth & malignancy",
        "links": {
            "ncbi": "https://www.ncbi.nlm.nih.gov/gene/?term=ACACB",
            "dgidb": "https://dgidb.org/search_interactions?genes=ACACB"
        }
    },
    {
        "symbol": "ADAMTS5",
        "full_name": "ADAM Metallopeptidase with TS motifs 5",
        "role": "Degrades Fibulin\u20112 in ECM, promoting invasion",
        "links": {
            "ncbi": "https://www.ncbi.nlm.nih.gov/gene/?term=ADAMTS5",
            "dgidb": "https://dgidb.org/search_interactions?genes=ADAMTS5"
        }
    },
    {
        "symbol": "ADH1B",
        "full_name": "Alcohol Dehydrogenase 1B",
        "role": "Polymorphisms modulate breast cancer risk linked to alcohol intake",
        "links": {
            "ncbi": "https://www.ncbi.nlm.nih.gov/gene/?term=ADH1B",
            "dgidb": "https://dgidb.org/search_interactions?genes=ADH1B"
        }
    },
    {
        "symbol": "ADIPOQ",
        "full_name": "Adiponectin C1Q/Collagen Domain",
        "role": "Suppresses BC cell proliferation; higher levels linked to improved prognosis",
        "links": {
            "ncbi": "https://www.ncbi.nlm.nih.gov/gene/?term=ADIPOQ",
            "dgidb": "https://dgidb.org/search_interactions?genes=ADIPOQ"
        }
    },
    {
        "symbol": "CD36",
        "full_name": "CD36 Molecule",
        "role": "Enhances fatty acid uptake and metastasis; inhibition sensitizes cells to therapy",
        "links": {
            "ncbi": "https://www.ncbi.nlm.nih.gov/gene/?term=CD36",
            "dgidb": "https://dgidb.org/search_interactions?genes=CD36"
        }
    },
    {
        "symbol": "CDC20",
        "full_name": "Cell Division Cycle 20",
        "role": "Overexpressed in ER+ & TNBC\u2014linked to poor outcome & chemoresistance",
        "links": {
            "ncbi": "https://www.ncbi.nlm.nih.gov/gene/?term=CDC20",
            "dgidb": "https://dgidb.org/search_interactions?genes=CDC20"
        }
    },
    {
        "symbol": "CFD",
        "full_name": "Complement Factor D",
        "role": "Supports tumor stem-like cells in fat-rich microenvironments",
        "links": {
            "ncbi": "https://www.ncbi.nlm.nih.gov/gene/?term=CFD",
            "dgidb": "https://dgidb.org/search_interactions?genes=CFD"
        }
    },
    {
        "symbol": "CIDEA",
        "full_name": "Cell Death-Inducing DFFA-Like Effector A",
        "role": "Reduced in metastatic BC; epigenetic downregulation \u2192 poor prognosis",
        "links": {
            "ncbi": "https://www.ncbi.nlm.nih.gov/gene/?term=CIDEA",
            "dgidb": "https://dgidb.org/search_interactions?genes=CIDEA"
        }
    },
    {
        "symbol": "CIDEC",
        "full_name": "Cell Death-Inducing DFFA-Like Effector C",
        "role": "Likely similar to CIDEA; lipid metabolism regulator (needs further investigation)",
        "links": {
            "ncbi": "https://www.ncbi.nlm.nih.gov/gene/?term=CIDEC",
            "dgidb": "https://dgidb.org/search_interactions?genes=CIDEC"
        }
    },
    {
        "symbol": "COL10A1",
        "full_name": "Collagen Type X \u03b11",
        "role": "Overexpressed in invasive BC, suggesting ECM remodeling functions",
        "links": {
            "ncbi": "https://www.ncbi.nlm.nih.gov/gene/?term=COL10A1",
            "dgidb": "https://dgidb.org/search_interactions?genes=COL10A1"
        }
    },
    {
        "symbol": "DTL",
        "full_name": "Denticleless E3 Ubiquitin Ligase",
        "role": "Upregulated in aggressive BC; contributes to genomic instability",
        "links": {
            "ncbi": "https://www.ncbi.nlm.nih.gov/gene/?term=DTL",
            "dgidb": "https://dgidb.org/search_interactions?genes=DTL"
        }
    },
    {
        "symbol": "EDNRB",
        "full_name": "Endothelin Receptor Type B",
        "role": "Methylation status linked to angiogenesis and metastasis",
        "links": {
            "ncbi": "https://www.ncbi.nlm.nih.gov/gene/?term=EDNRB",
            "dgidb": "https://dgidb.org/search_interactions?genes=EDNRB"
        }
    },
    {
        "symbol": "EZH2",
        "full_name": "Enhancer of Zeste Homolog 2",
        "role": "Overexpressed in TNBC/metastasis; EZH2 inhibition + AKT blockade limits growth",
        "links": {
            "ncbi": "https://www.ncbi.nlm.nih.gov/gene/?term=EZH2",
            "dgidb": "https://dgidb.org/search_interactions?genes=EZH2"
        }
    },
    {
        "symbol": "GPD1",
        "full_name": "Glycerol\u20113\u2011Phosphate Dehydrogenase 1",
        "role": "Metabolic enzyme altered in BC; part of abnormal glycerol metabolism",
        "links": {
            "ncbi": "https://www.ncbi.nlm.nih.gov/gene/?term=GPD1",
            "dgidb": "https://dgidb.org/search_interactions?genes=GPD1"
        }
    },
    {
        "symbol": "LEP",
        "full_name": "Leptin",
        "role": "Promotes proliferation, EMT; SNPs associated with increased risk",
        "links": {
            "ncbi": "https://www.ncbi.nlm.nih.gov/gene/?term=LEP",
            "dgidb": "https://dgidb.org/search_interactions?genes=LEP"
        }
    },
    {
        "symbol": "LPL",
        "full_name": "Lipoprotein Lipase",
        "role": "Supports tumor lipid supply; elevated in BC tissues",
        "links": {
            "ncbi": "https://www.ncbi.nlm.nih.gov/gene/?term=LPL",
            "dgidb": "https://dgidb.org/search_interactions?genes=LPL"
        }
    },
    {
        "symbol": "MMP1",
        "full_name": "Matrix Metallopeptidase 1",
        "role": "Degrades ECM, facilitating invasion/metastasis; inhibitors under study",
        "links": {
            "ncbi": "https://www.ncbi.nlm.nih.gov/gene/?term=MMP1",
            "dgidb": "https://dgidb.org/search_interactions?genes=MMP1"
        }
    },
    {
        "symbol": "PRC1",
        "full_name": "Protein Regulator of Cytokinesis 1",
        "role": "Overexpressed in high-grade BC; tied to proliferation",
        "links": {
            "ncbi": "https://www.ncbi.nlm.nih.gov/gene/?term=PRC1",
            "dgidb": "https://dgidb.org/search_interactions?genes=PRC1"
        }
    },
    {
        "symbol": "RARRES2",
        "full_name": "Chemerin (Retinoic Acid Responder 2)",
        "role": "Modulates immune microenvironment and cell trafficking",
        "links": {
            "ncbi": "https://www.ncbi.nlm.nih.gov/gene/?term=RARRES2",
            "dgidb": "https://dgidb.org/search_interactions?genes=RARRES2"
        }
    },
    {
        "symbol": "RBP4",
        "full_name": "Retinol Binding Protein 4",
        "role": "Elevated in obesity-related BC; potential biomarker",
        "links": {
            "ncbi": "https://www.ncbi.nlm.nih.gov/gene/?term=RBP4",
            "dgidb": "https://dgidb.org/search_interactions?genes=RBP4"
        }
    },
    {
        "symbol": "S100P",
        "full_name": "S100 Calcium-Binding Protein P",
        "role": "Increases tumor proliferation and metastasis; poor outcome marker",
        "links": {
            "ncbi": "https://www.ncbi.nlm.nih.gov/gene/?term=S100P",
            "dgidb": "https://dgidb.org/search_interactions?genes=S100P"
        }
    },
    {
        "symbol": "TOP2A",
        "full_name": "DNA Topoisomerase II \u03b1",
        "role": "Amplification predicts anthracycline response; overexpression = higher grade & poor prognosis",
        "links": {
            "ncbi": "https://www.ncbi.nlm.nih.gov/gene/?term=TOP2A",
            "dgidb": "https://dgidb.org/search_interactions?genes=TOP2A"
        }
    },
    {
        "symbol": "ZBTB16",
        "full_name": "Zinc Finger BTB Domain 16",
        "role": "Acts as tumor suppressor; downregulation may aid progression",
        "links": {
            "ncbi": "https://www.ncbi.nlm.nih.gov/gene/?term=ZBTB16",
            "dgidb": "https://dgidb.org/search_interactions?genes=ZBTB16"
        }
    },
    {
        "symbol": "ZWINT",
        "full_name": "ZW10-Interacting Kinetochore Protein",
        "role": "Essential for mitosis; overexpressed in BC; related to proliferation",
        "links": {
            "ncbi": "https://www.ncbi.nlm.nih.gov/gene/?term=ZWINT",
            "dgidb": "https://dgidb.org/search_interactions?genes=ZWINT"
        }
    }
];

  // Map table columns to data keys for searching
  const columnMap = [
    { label: 'Symbol', key: 'symbol' },
    { label: 'Full Name', key: 'full_name' },
    { label: 'Breast Cancer Role & Significance', key: 'role' },

    { label: 'NCBI / DGIdb', key: 'links' }
  ];

  // Handle input change for each column
  const handleSearchChange = (field, value) => {
    setSearch((prev) => ({
      ...prev,
      [field]: value
    }));
  };

  // Filter data based on search values
  const filteredData = data.filter((gene) => {
    // Symbol
    const symbolMatch = gene.symbol.toLowerCase().includes(search.symbol.toLowerCase());
    // Full Name
    const fullNameMatch = gene.full_name.toLowerCase().includes(search.full_name.toLowerCase());
    // Role
    const roleMatch = gene.role.toLowerCase().includes(search.role.toLowerCase());
    // Targeted Drugs
 
    // Links (search both NCBI and DGIdb)
    const linksValue = `${gene.links.ncbi} ${gene.links.dgidb}`.toLowerCase();
    const linksMatch = linksValue.includes(search.links.toLowerCase());

    return symbolMatch && fullNameMatch && roleMatch  && linksMatch;
  });

  return (
    <div className="drug-container">
     <div className="filters">
        <h2 >Gene Knowledge Base</h2>
      <p>The Gene Knowledge Base provides a curated overview of genes implicated in breast cancer, highlighting their biological roles and therapeutic relevance. It integrates information on gene symbols, full names, functions in tumorigenesis. This resource emphasizes genes involved in metabolism, cell cycle regulation, apoptosis, immune modulation, and extracellular matrix remodeling. Each gene entry includes authoritative links to NCBI and DGIdb for deeper exploration and validation.</p>

     </div>
      
      <table className="gene-table">
        <thead>
          <tr>
            {columnMap.map((col, idx) => (
              <th key={idx}>{col.label}</th>
            ))}
          </tr>
          <tr>
            {columnMap.map((col, idx) => (
              <th key={idx}>
                <input
                  type="text"
                  placeholder={`Search ${col.label}`}
                  value={search[col.key]}
                  onChange={(e) => handleSearchChange(col.key, e.target.value)}
                />
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {filteredData.map((gene, index) => (
            <tr key={index}>
              <td>{gene.symbol}</td>
              <td>{gene.full_name}</td>
              <td>{gene.role}</td>
          
              <td>
                <a href={gene.links.ncbi} target="_blank" rel="noopener noreferrer">NCBI</a> |{" "}
                <a href={gene.links.dgidb} target="_blank" rel="noopener noreferrer">DGIdb</a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default GeneKnowledgeBase;