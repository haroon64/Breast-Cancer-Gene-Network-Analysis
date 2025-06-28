import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import NetworkVisualization from "./pages/NetworkVisualization";
import Header from "./pages/Header";
import Drug_knowledgebase from "./pages/Drug_knowledgebase";
import DrugDetails from "./pages/Drug_details";
import GeneKnowledgeBase from "./pages/Gene_knowledge_base";
import Network3d from "./pages/Network3d";
import InteractionKnowledgebase from "./pages/Interaction_knowledegebase";
import DoxorubicinDrug from "./pages/Doxorubicin_drug";
import SimplerDrugDoping from "./pages/Simpler_drug_doping";

function App() {
  return (
    <Router>
        <Header />
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/NetworkVisualization" element={<NetworkVisualization />} />
        <Route path="/Drug_knowledgebase" element={<Drug_knowledgebase />} />
        <Route path="/DrugDetails" element={<DrugDetails />} />
         <Route path="/Network3d" element={<Network3d />} />
        <Route path="/Gene_knowledge_base" element={<GeneKnowledgeBase />} />
        <Route path="/Interaction_knowledgebase" element={<InteractionKnowledgebase />} />
        <Route path="/Doxorubicin_Drug" element={<DoxorubicinDrug />} />
        <Route path="/Simpler_drug_doping" element={<SimplerDrugDoping />} />
       
        {/* Add more routes as needed */}
      </Routes>
    </Router>
  );
}

export default App;
