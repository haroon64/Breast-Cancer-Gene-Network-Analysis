import { useState } from 'react';
import '../styles/Drug_knowledgebase.css';
import { useNavigate } from "react-router-dom";
import "../styles/Interaction_knowledge_base.css";

const InteractionKnowledgebase = () => {
  const navigate = useNavigate();

  const [search, setSearch] = useState({
    geneA: '',
    geneB: '',
    confidence: '',
    EdgeWeight:'' ,
    interpretation: '',
    pathway: ''
  });

  const data = [
  {
    "Gene A": "LEP",
    "Gene B": "ADIPOQ",
    "Confidence Score": 0.994,
    "Edge Weight": 5.0,
    "Interpretation": "Very high confidence (co-functionality likely)",
    "Pathway": "Adipocytokine signaling pathway – Regulates energy balance, insulin sensitivity, and lipid metabolism via AMPK and JAK/STAT signaling."
  },
  {
    "Gene A": "LEP",
    "Gene B": "LPL",
    "Confidence Score": 0.828,
    "Edge Weight": 4.1,
    "Interpretation": "High confidence (possible functional association)",
    "Pathway": "Lipid metabolism – Coordinates lipid uptake and hydrolysis; involved in obesity and metabolic syndrome."
  },
  {
    "Gene A": "LEP",
    "Gene B": "CIDEC",
    "Confidence Score": 0.773,
    "Edge Weight": 3.9,
    "Interpretation": "High confidence (possible functional association)",
    "Pathway": "Adipogenesis regulation – Modulates lipid droplet formation and energy storage in adipocytes."
  },
  {
    "Gene A": "LEP",
    "Gene B": "CFD",
    "Confidence Score": 0.769,
    "Edge Weight": 3.8,
    "Interpretation": "High confidence (possible functional association)",
    "Pathway": "Inflammation and adipose tissue homeostasis – Links complement activation with metabolic inflammation."
  },
  {
    "Gene A": "LEP",
    "Gene B": "SPP1",
    "Confidence Score": 0.764,
    "Edge Weight": 3.8,
    "Interpretation": "High confidence (possible functional association)",
    "Pathway": "Inflammatory response – Crosstalk between adipokines and osteopontin in immune cell recruitment."
  },
  {
    "Gene A": "LEP",
    "Gene B": "RBP4",
    "Confidence Score": 0.741,
    "Edge Weight": 3.7,
    "Interpretation": "High confidence (possible functional association)",
    "Pathway": "Insulin resistance – Interaction disrupts insulin signaling and glucose uptake."
  },
  {
    "Gene A": "LEP",
    "Gene B": "RARRES2",
    "Confidence Score": 0.725,
    "Edge Weight": 3.6,
    "Interpretation": "High confidence (possible functional association)",
    "Pathway": "Adipose tissue inflammation – Coordinated role in chemokine signaling and adipocyte function."
  },
  {
    "Gene A": "LEP",
    "Gene B": "CIDEA",
    "Confidence Score": 0.687,
    "Edge Weight": 3.4,
    "Interpretation": "Moderate confidence (needs validation)",
    "Pathway": "Thermogenesis and lipid regulation – Interaction affects brown fat metabolism and energy dissipation."
  },
  {
    "Gene A": "LEP",
    "Gene B": "CD36",
    "Confidence Score": 0.663,
    "Edge Weight": 3.3,
    "Interpretation": "Moderate confidence (needs validation)",
    "Pathway": "Fatty acid uptake and inflammation – Jointly regulate lipid influx and macrophage activation."
  },
  {
    "Gene A": "LEP",
    "Gene B": "ACACB",
    "Confidence Score": 0.636,
    "Edge Weight": 3.2,
    "Interpretation": "Moderate confidence (needs validation)",
    "Pathway": "Fatty acid metabolism – Controls fatty acid biosynthesis and oxidation in energy homeostasis."
  },
  {
    "Gene A": "ADIPOQ",
    "Gene B": "CFD",
    "Confidence Score": 0.988,
    "Edge Weight": 4.9,
    "Interpretation": "Very high confidence (co-functionality likely)",
    "Pathway": "Adipose tissue immunity – Coordinates complement activity and anti-inflammatory adipokine signaling."
  },
  {
    "Gene A": "ADIPOQ",
    "Gene B": "CD36",
    "Confidence Score": 0.806,
    "Edge Weight": 4.0,
    "Interpretation": "High confidence (possible functional association)",
    "Pathway": "Fatty acid uptake – Enhances lipid transport and oxidation in adipocytes."
  },
  {
    "Gene A": "ADIPOQ",
    "Gene B": "RBP4",
    "Confidence Score": 0.799,
    "Edge Weight": 4.0,
    "Interpretation": "High confidence (possible functional association)",
    "Pathway": "Glucose homeostasis – Interaction impacts insulin sensitivity and adipokine signaling."
  },
  {
    "Gene A": "ADIPOQ",
    "Gene B": "LPL",
    "Confidence Score": 0.794,
    "Edge Weight": 4.0,
    "Interpretation": "High confidence (possible functional association)",
    "Pathway": "Lipid clearance – Promotes hydrolysis of triglyceride-rich lipoproteins in adipose tissue."
  },
  {
    "Gene A": "ADIPOQ",
    "Gene B": "RARRES2",
    "Confidence Score": 0.773,
    "Edge Weight": 3.9,
    "Interpretation": "High confidence (possible functional association)",
    "Pathway": "Adipose inflammatory regulation – Links chemokine signaling to adiponectin's anti-inflammatory role."
  },
  {
    "Gene A": "ADIPOQ",
    "Gene B": "CIDEA",
    "Confidence Score": 0.763,
    "Edge Weight": 3.8,
    "Interpretation": "High confidence (possible functional association)",
    "Pathway": "Energy expenditure – Regulates thermogenesis and lipid droplet stability."
  },
  {
    "Gene A": "ADIPOQ",
    "Gene B": "CIDEC",
    "Confidence Score": 0.743,
    "Edge Weight": 3.7,
    "Interpretation": "High confidence (possible functional association)",
    "Pathway": "Lipid droplet metabolism – Controls lipid storage and adipocyte hypertrophy."
  },
  {
    "Gene A": "ADIPOQ",
    "Gene B": "SPP1",
    "Confidence Score": 0.529,
    "Edge Weight": 2.6,
    "Interpretation": "Moderate confidence (needs validation)",
    "Pathway": "Metaflammation – Modulates inflammation in obesity via cytokine signaling."
  },
  {
    "Gene A": "ADIPOQ",
    "Gene B": "ACACB",
    "Confidence Score": 0.449,
    "Edge Weight": 2.2,
    "Interpretation": "Low confidence (weak functional link)",
    "Pathway": "Fatty acid biosynthesis – Enhances lipid oxidation through AMPK and acetyl-CoA control."
  },
  {
    "Gene A": "CFD",
    "Gene B": "CD36",
    "Confidence Score": 0.665,
    "Edge Weight": 3.3,
    "Interpretation": "Moderate confidence (needs validation)",
    "Pathway": "Innate immunity and lipid sensing – Co-regulate inflammatory responses in adipose tissue."
  },
  {
    "Gene A": "CFD",
    "Gene B": "CIDEC",
    "Confidence Score": 0.585,
    "Edge Weight": 2.9,
    "Interpretation": "Moderate confidence (needs validation)",
    "Pathway": "Metabolic inflammation – Links complement activation with adipocyte lipid metabolism."
  },
  {
    "Gene A": "CFD",
    "Gene B": "LPL",
    "Confidence Score": 0.583,
    "Edge Weight": 2.9,
    "Interpretation": "Moderate confidence (needs validation)",
    "Pathway": "Lipoprotein catabolism – Supports triglyceride breakdown and inflammatory signaling."
  },
  {
    "Gene A": "CFD",
    "Gene B": "RARRES2",
    "Confidence Score": 0.516,
    "Edge Weight": 2.6,
    "Interpretation": "Moderate confidence (needs validation)",
    "Pathway": "Immune-metabolic interface – Coordinates chemokine and complement pathways."
  },
  {
    "Gene A": "CFD",
    "Gene B": "RBP4",
    "Confidence Score": 0.508,
    "Edge Weight": 2.5,
    "Interpretation": "Moderate confidence (needs validation)",
    "Pathway": "Insulin resistance – Combined influence on glucose metabolism and complement activation."
  },
  {
    "Gene A": "CFD",
    "Gene B": "CIDEA",
    "Confidence Score": 0.461,
    "Edge Weight": 2.3,
    "Interpretation": "Low confidence (weak functional link)",
    "Pathway": "Inflammation and energy metabolism – Links immune response with thermogenesis."
  },
  {
    "Gene A": "CFD",
    "Gene B": "SPP1",
    "Confidence Score": 0.406,
    "Edge Weight": 2.0,
    "Interpretation": "Low confidence (weak functional link)",
    "Pathway": "Chronic inflammation – Enhances macrophage recruitment and cytokine secretion."
  },
  {
    "Gene A": "CDC20",
    "Gene B": "TOP2A",
    "Confidence Score": 0.98,
    "Edge Weight": 4.9,
    "Interpretation": "Very high confidence (co-functionality likely)",
    "Pathway": "Cell cycle regulation – Controls mitosis and chromosome condensation."
  },
  {
    "Gene A": "CDC20",
    "Gene B": "ZWINT",
    "Confidence Score": 0.968,
    "Edge Weight": 4.8,
    "Interpretation": "Very high confidence (co-functionality likely)",
    "Pathway": "Kinetochore-microtubule interaction – Ensures proper chromosomal alignment."
  },
  {
    "Gene A": "CDC20",
    "Gene B": "PRC1",
    "Confidence Score": 0.947,
    "Edge Weight": 4.7,
    "Interpretation": "Very high confidence (co-functionality likely)",
    "Pathway": "Cytokinesis – Regulates spindle midzone and mitotic exit."
  },
  {
    "Gene A": "CDC20",
    "Gene B": "DTL",
    "Confidence Score": 0.678,
    "Edge Weight": 3.4,
    "Interpretation": "Moderate confidence (needs validation)",
    "Pathway": "DNA replication checkpoint – Coordinates DNA repair and mitotic entry."
  },
  {
    "Gene A": "CDC20",
    "Gene B": "EZH2",
    "Confidence Score": 0.507,
    "Edge Weight": 2.5,
    "Interpretation": "Moderate confidence (needs validation)",
    "Pathway": "Epigenetic control of cell cycle – Links chromatin modification with proliferation."
  },
  {
    "Gene A": "TOP2A",
    "Gene B": "PRC1",
    "Confidence Score": 0.932,
    "Edge Weight": 4.7,
    "Interpretation": "Very high confidence (co-functionality likely)",
    "Pathway": "Mitotic progression – Involved in chromosome segregation and spindle formation."
  },
  {
    "Gene A": "TOP2A",
    "Gene B": "ZWINT",
    "Confidence Score": 0.875,
    "Edge Weight": 4.4,
    "Interpretation": "High confidence (possible functional association)",
    "Pathway": "Spindle checkpoint – Ensures chromosomal stability during division."
  },
  {
    "Gene A": "TOP2A",
    "Gene B": "DTL",
    "Confidence Score": 0.822,
    "Edge Weight": 4.1,
    "Interpretation": "High confidence (possible functional association)",
    "Pathway": "Replication licensing – Controls progression into mitosis."
  },
  {
    "Gene A": "TOP2A",
    "Gene B": "EZH2",
    "Confidence Score": 0.626,
    "Edge Weight": 3.1,
    "Interpretation": "Moderate confidence (needs validation)",
    "Pathway": "Proliferation and chromatin regulation – Coordinates epigenetic control and cell division."
  },
  {
    "Gene A": "TOP2A",
    "Gene B": "ZBTB16",
    "Confidence Score": 0.447,
    "Edge Weight": 2.2,
    "Interpretation": "Low confidence (weak functional link)",
    "Pathway": "Transcriptional regulation in mitosis – Affects stem cell renewal and differentiation."
  },
  {
    "Gene A": "ZWINT",
    "Gene B": "PRC1",
    "Confidence Score": 0.825,
    "Edge Weight": 4.1,
    "Interpretation": "High confidence (possible functional association)",
    "Pathway": "Spindle midzone dynamics – Assists in final stages of cell division."
  },
  {
    "Gene A": "ZWINT",
    "Gene B": "DTL",
    "Confidence Score": 0.819,
    "Edge Weight": 4.1,
    "Interpretation": "High confidence (possible functional association)",
    "Pathway": "Checkpoint signaling – Coordinates kinetochore attachment and DNA replication."
  },
  {
    "Gene A": "ZWINT",
    "Gene B": "EZH2",
    "Confidence Score": 0.517,
    "Edge Weight": 2.6,
    "Interpretation": "Moderate confidence (needs validation)",
    "Pathway": "Mitotic chromatin silencing – Regulates gene repression during cell division."
  },
  {
    "Gene A": "CIDEA",
    "Gene B": "CIDEC",
    "Confidence Score": 0.958,
    "Edge Weight": 4.8,
    "Interpretation": "Very high confidence (co-functionality likely)",
    "Pathway": "Lipid droplet fusion – Critical for energy storage in adipocytes."
  },
  {
    "Gene A": "CIDEA",
    "Gene B": "CD36",
    "Confidence Score": 0.509,
    "Edge Weight": 2.5,
    "Interpretation": "Moderate confidence (needs validation)",
    "Pathway": "Fatty acid transport – Controls entry and storage of lipids in adipose tissue."
  },
  {
    "Gene A": "CIDEA",
    "Gene B": "LPL",
    "Confidence Score": 0.42,
    "Edge Weight": 2.1,
    "Interpretation": "Low confidence (weak functional link)",
    "Pathway": "Triglyceride metabolism – Modulates fatty acid storage in brown adipose tissue."
  },
  {
    "Gene A": "CIDEC",
    "Gene B": "CD36",
    "Confidence Score": 0.759,
    "Edge Weight": 3.8,
    "Interpretation": "High confidence (possible functional association)",
    "Pathway": "Lipid influx – Regulates fatty acid uptake and droplet expansion."
  },
  {
    "Gene A": "CIDEC",
    "Gene B": "GPD1",
    "Confidence Score": 0.521,
    "Edge Weight": 2.6,
    "Interpretation": "Moderate confidence (needs validation)",
    "Pathway": "Glycerolipid biosynthesis – Enhances triglyceride storage."
  },
  {
    "Gene A": "CIDEC",
    "Gene B": "LPL",
    "Confidence Score": 0.461,
    "Edge Weight": 2.3,
    "Interpretation": "Low confidence (weak functional link)",
    "Pathway": "Lipid turnover – Promotes fat accumulation through lipolytic regulation."
  },
  {
    "Gene A": "PRC1",
    "Gene B": "DTL",
    "Confidence Score": 0.624,
    "Edge Weight": 3.1,
    "Interpretation": "Moderate confidence (needs validation)",
    "Pathway": "Cell cycle control – Facilitates transition from S phase to mitosis."
  },
  {
    "Gene A": "PRC1",
    "Gene B": "EZH2",
    "Confidence Score": 0.563,
    "Edge Weight": 2.8,
    "Interpretation": "Moderate confidence (needs validation)",
    "Pathway": "Epigenetic control of mitosis – Links chromatin structure to division."
  },
  {
    "Gene A": "CD36",
    "Gene B": "LPL",
    "Confidence Score": 0.877,
    "Edge Weight": 4.4,
    "Interpretation": "High confidence (possible functional association)",
    "Pathway": "Lipoprotein clearance – Combines receptor-mediated uptake with hydrolysis."
  },
  {
    "Gene A": "CD36",
    "Gene B": "ACACB",
    "Confidence Score": 0.541,
    "Edge Weight": 2.7,
    "Interpretation": "Moderate confidence (needs validation)",
    "Pathway": "Fatty acid regulation – Governs lipid uptake and synthesis balance."
  },
  {
    "Gene A": "CD36",
    "Gene B": "EDNRB",
    "Confidence Score": 0.491,
    "Edge Weight": 2.5,
    "Interpretation": "Low confidence (weak functional link)",
    "Pathway": "Vascular inflammation – Influences endothelial signaling and lipid sensing."
  },
  {
    "Gene A": "LPL",
    "Gene B": "SPP1",
    "Confidence Score": 0.463,
    "Edge Weight": 2.3,
    "Interpretation": "Low confidence (weak functional link)",
    "Pathway": "Obesity-associated inflammation – Integrates lipid metabolism and cytokine signaling."
  },
  {
    "Gene A": "LPL",
    "Gene B": "ACACB",
    "Confidence Score": 0.428,
    "Edge Weight": 2.1,
    "Interpretation": "Low confidence (weak functional link)",
    "Pathway": "Fatty acid flux – Controls synthesis and breakdown balance."
  },
  {
    "Gene A": "LPL",
    "Gene B": "RBP4",
    "Confidence Score": 0.426,
    "Edge Weight": 2.1,
    "Interpretation": "Low confidence (weak functional link)",
    "Pathway": "Dyslipidemia and insulin resistance – Interferes with glucose homeostasis."
  },
  {
    "Gene A": "LPL",
    "Gene B": "GPD1",
    "Confidence Score": 0.416,
    "Edge Weight": 2.1,
    "Interpretation": "Low confidence (weak functional link)",
    "Pathway": "Triglyceride formation – Connects lipolysis to glycerol backbone synthesis."
  },
  {
    "Gene A": "EZH2",
    "Gene B": "ZBTB16",
    "Confidence Score": 0.852,
    "Edge Weight": 4.3,
    "Interpretation": "High confidence (possible functional association)",
    "Pathway": "Stem cell fate and epigenetic regulation – Governs lineage commitment."
  },
  {
    "Gene A": "EZH2",
    "Gene B": "DTL",
    "Confidence Score": 0.475,
    "Edge Weight": 2.4,
    "Interpretation": "Low confidence (weak functional link)",
    "Pathway": "Chromatin remodeling in replication – Coordinates histone methylation with licensing."
  },
  {
    "Gene A": "EZH2",
    "Gene B": "SFRP1",
    "Confidence Score": 0.4,
    "Edge Weight": 2.0,
    "Interpretation": "Low confidence (weak functional link)",
    "Pathway": "Wnt pathway silencing – Represses signaling in cell fate decisions."
  },
  {
    "Gene A": "RBP4",
    "Gene B": "RARRES2",
    "Confidence Score": 0.693,
    "Edge Weight": 3.5,
    "Interpretation": "Moderate confidence (needs validation)",
    "Pathway": "Inflammatory adipokine signaling – Modulates immune-metabolic pathways."
  },
  {
    "Gene A": "SPP1",
    "Gene B": "COL10A1",
    "Confidence Score": 0.549,
    "Edge Weight": 2.7,
    "Interpretation": "Moderate confidence (needs validation)",
    "Pathway": "Bone remodeling – Regulates ECM turnover in skeletal development."
  },
  {
    "Gene A": "SPP1",
    "Gene B": "MMP1",
    "Confidence Score": 0.534,
    "Edge Weight": 2.7,
    "Interpretation": "Moderate confidence (needs validation)",
    "Pathway": "ECM degradation – Facilitates matrix remodeling in inflammation."
  },
  {
    "Gene A": "SPP1",
    "Gene B": "GPC3",
    "Confidence Score": 0.471,
    "Edge Weight": 2.4,
    "Interpretation": "Low confidence (weak functional link)",
    "Pathway": "Cell proliferation and migration – Integrates cytokine and growth signaling."
  },
  {
    "Gene A": "S100B",
    "Gene B": "S100P",
    "Confidence Score": 0.698,
    "Edge Weight": 3.5,
    "Interpretation": "Moderate confidence (needs validation)",
    "Pathway": "Calcium signaling – Enhances cell proliferation and metastasis."
  },
  {
    "Gene A": "ADAMTS5",
    "Gene B": "COL10A1",
    "Confidence Score": 0.662,
    "Edge Weight": 3.3,
    "Interpretation": "Moderate confidence (needs validation)",
    "Pathway": "Cartilage ECM degradation – Active in osteoarthritis and chondrogenesis."
  },
  {
    "Gene A": "ADAMTS5",
    "Gene B": "MMP1",
    "Confidence Score": 0.646,
    "Edge Weight": 3.2,
    "Interpretation": "Moderate confidence (needs validation)",
    "Pathway": "Joint inflammation – Drives matrix remodeling in arthritis."
  },
  {
    "Gene A": "COL10A1",
    "Gene B": "MMP1",
    "Confidence Score": 0.618,
    "Edge Weight": 3.1,
    "Interpretation": "Moderate confidence (needs validation)",
    "Pathway": "Endochondral ossification – Coordinates matrix remodeling."
  },
  {
    "Gene A": "COL10A1",
    "Gene B": "SFRP1",
    "Confidence Score": 0.482,
    "Edge Weight": 2.4,
    "Interpretation": "Low confidence (weak functional link)",
    "Pathway": "Chondrogenesis regulation – Involves Wnt pathway modulation."
  },
  {
    "Gene A": "MMP1",
    "Gene B": "SFRP1",
    "Confidence Score": 0.52,
    "Edge Weight": 2.6,
    "Interpretation": "Moderate confidence (needs validation)",
    "Pathway": "Tissue remodeling – Coordinates inflammation and Wnt signaling."
  },
  {
    "Gene A": "ACACB",
    "Gene B": "GPD1",
    "Confidence Score": 0.528,
    "Edge Weight": 2.6,
    "Interpretation": "Moderate confidence (needs validation)",
    "Pathway": "Lipogenesis – Integrates fatty acid synthesis and glycerol metabolism."
  },
  {
    "Gene A": "GPD1",
    "Gene B": "ADH1B",
    "Confidence Score": 0.426,
    "Edge Weight": 2.1,
    "Interpretation": "Low confidence (weak functional link)",
    "Pathway": "Redox and ethanol metabolism – Links lipid synthesis with NADH balance."
  }
];
// Define the column map for dynamic rendering and mapping
  const columnMap = [
    { label: "Gene A", key: "Gene A", searchKey: "geneA" },
    { label: "Gene B", key: "Gene B", searchKey: "geneB" },
    { label: "Confidence Score", key: "Confidence Score", searchKey: "confidence" },
    { label: "Edge Weight", key: "Edge Weight", searchKey: "EdgeWeight" },
    { label: "Interpretation", key: "Interpretation", searchKey: "interpretation" },
    { label: "Pathway", key: "Pathway", searchKey: "pathway" }
  ];

  // Map data to normalized keys for easier filtering and rendering
  const normalizedData = data.map(item => ({
    geneA: item["Gene A"] || "",
    geneB: item["Gene B"] || "",
    confidence: item["Confidence Score"] !== undefined ? item["Confidence Score"] : "",
    EdgeWeight: item["Edge Weight"] !== undefined ? item["Edge Weight"] : "",
    interpretation: item["Interpretation"] || "",
    pathway: item["Pathway"] || ""
  }));

  const handleSearchChange = (field, value) => {
    setSearch(prev => ({ ...prev, [field]: value }));
  };

  const filteredData = normalizedData.filter(item =>
    Object.keys(search).every(key => {
      const itemValue = item[key];
      const searchValue = search[key].toLowerCase();

      if (!searchValue) return true;

      if (typeof itemValue === "number") {
        return itemValue.toString().toLowerCase().includes(searchValue);
      } else if (typeof itemValue === "string") {
        return itemValue.toLowerCase().includes(searchValue);
      }
      return false;
    })
  );
  return (
    <div className="drug-container">
      <div className="filters">
        <h2>Interaction Gene Knowledgebase</h2>
        <p>
          The Interaction Gene Knowledge-Based system integrates comprehensive
          information on gene-gene interactions to facilitate
          research in genomics and personalized medicine. Built on curated
          biomedical databases and enriched with interaction metadata, this
          knowledge base enables users to explore how genes influence one
          another, respond to external agents like drugs, and play roles in
          complex biological pathways. It serves as a crucial resource for
          identifying therapeutic targets and understanding disease mechanisms. With querying
          features, it empowers researchers to conduct in-depth analysis of
          molecular networks.
        </p>
      </div>

      <div className="display-count">
        Displaying interactions 1 - {filteredData.length} of {data.length} in total
      </div>

      <table className="interaction-table">
        <thead>
          <tr>
            {columnMap.map(col => (
              <th
                key={col.key}
                style={
                  col.searchKey === "interpretation" || col.searchKey === "pathway"
                    ? { minWidth: "350px" }
                    : { minWidth: "100px" }
                }
              >
                {col.label}
              </th>
            ))}
          </tr>
          <tr>
            {columnMap.map((col, idx) => (
              <th
                key={idx}
                style={
                  col.searchKey === "interpretation" || col.searchKey === "pathway"
                    ? { minWidth: "350px" }
                    : { minWidth: "100px" }
                }
              >
                <input
                  type="text"
                  placeholder={`Search ${col.label}`}
                  value={search[col.searchKey]}
                  onChange={e => handleSearchChange(col.searchKey, e.target.value)}
                />
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {filteredData.length > 0 ? (
            filteredData.map((item, index) => (
              <tr key={index} onClick={() => handleDetailsClick(item)} style={{ cursor: "pointer" }}>
                {columnMap.map(col => (
                  <td key={col.key}>{item[col.searchKey]}</td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={columnMap.length} className="no-results">No results found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};


export default InteractionKnowledgebase;