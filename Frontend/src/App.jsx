import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Research_page from "./pages/Research_page";
import Header from "./pages/Header";
import Drug_knowledgebase from "./pages/Drug_knowledgebase";
import DrugDetails from "./pages/Drug_details";
import GeneKnowledgeBase from "./pages/Gene_knowledge_base";
import Network3d from "./pages/Network3d";
import InteractionKnowledgebase from "./pages/Interaction_knowledegebase";
import Advance_drug_doping from "./pages/Advance_drug_doping";
import SimplerDrugDoping from "./pages/Simpler_drug_doping";
import Footer from "./pages/Footer"; // Import Footer

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/Research_page" element={<Research_page />} />
        <Route path="/Drug_knowledgebase" element={<Drug_knowledgebase />} />
        <Route path="/DrugDetails" element={<DrugDetails />} />
        <Route path="/Network3d" element={<Network3d />} />
        <Route path="/Gene_knowledge_base" element={<GeneKnowledgeBase />} />
        <Route path="/Interaction_knowledgebase" element={<InteractionKnowledgebase />} />
        <Route path="/Advance_drug_doping" element={<Advance_drug_doping />} />
        <Route path="/Simpler_drug_doping" element={<SimplerDrugDoping />} />
        {/* Add more routes as needed */}
      </Routes>
      <Footer /> {/* Add Footer here */}
    </Router>
  );
}

export default App;
