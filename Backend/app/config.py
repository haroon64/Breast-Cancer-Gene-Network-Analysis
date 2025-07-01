# config.py
STRING_API_URL = "https://string-db.org/api/json/network"
SPECIES_ID = 9606  # Human species ID
REQUIRED_SCORE = 400
CALLER_IDENTITY = "fastapi_backend"
# MongoDB connection
CLIENT_URL = "mongodb://localhost:27017/"
DB_NAME = "Drug"
# Collection name
COLLECTION_NAME = "Drug_info"

PACITAXEL_EFFECtS=["Removed CDC20 ","Weakened TOP2A—EZH2 from 0.63 to 0.25"
 , "Weakened MMP1—SPP1 from 0.53 to 0.27"]



PACITAXEL = [
  {
    "interpretation": "One node (CDC20) was removed. CDC20 is a key mitotic regulator. Its removal reflects cell cycle arrest, a hallmark of Paclitaxel-induced mitotic disruption.",
    "Impact": "CDC20 overexpression is linked to poor prognosis in triple-negative breast cancer (TNBC). Its suppression may reduce tumor proliferation and enhance drug sensitivity.",
    "reference": "Weaver, 2014 [1]"
  },
  {
    "interpretation": "Reduced edge count shows weakened gene–gene interactions, likely due to microtubule disruption affecting mitotic and apoptotic gene expression.",
    "Impact": "Fewer interactions may impair survival pathways in cancer cells. This supports Paclitaxel’s role in disrupting cancer cell signaling and promoting apoptosis.",
    "reference": "Orr et al., 2003 [2]"
  },
  {
    "interpretation": "Small decrease in average neighbors implies slightly fewer connections per gene, representing a modest decline in network integration.",
    "Impact": "Suggests reduced cooperative behavior among oncogenic genes, potentially lowering resistance mechanisms in breast cancer cells.",
    "reference": "Barretina et al., 2012 [3]"
  },
  
  {
    "interpretation": "Slight decrease suggests weakened local gene modules (e.g., mitotic complexes), indicating disrupted co-regulated groupings.",
    "Impact": "Local modules often include oncogenic co-expressors; disruption can impair breast tumor growth, especially in HER2+ and basal-like subtypes.",
    "reference": "Orr et al., 2003 [2]"
  },
  {
    "interpretation": "Barely changed. Indicates proportional connectivity remains, though structure has shifted (node loss balanced by edge weakening).",
    "Impact": "Despite stability, functional impairment in critical regions (e.g., mitotic or apoptotic hubs) suggests effective targeted inhibition by Paclitaxel.",
    "reference": "Barretina et al., 2012 [3]"
  },
  {
    "interpretation": "Increase indicates uneven connectivity across genes — possibly because some remain highly active while others are silenced under treatment.",
    "Impact": "Highlights that a few breast cancer driver genes may retain control, suggesting potential combination therapy to suppress these dominant nodes (e.g., EZH2).",
    "reference": "Barretina et al., 2012 [3]"
  },
  {
    "interpretation": "No change. Network remains fragmented, indicating persistent lack of complete inter-gene communication.",
    "Impact": "Fragmentation may impair cross-talk between tumorigenic pathways, a favorable outcome in breast cancer as it hampers coordinated tumor progression.",
    "reference": "Orr et al., 2003 [2]"
  },
  {
    "interpretation": "Slight rise suggests the network becomes more hub-dominated, potentially centralizing function around key surviving regulators.",
    "Impact": "Breast tumors often depend on hub oncogenes for survival. Increased centralization suggests a need to co-target these hubs to prevent relapse or resistance.",
    "reference": "Weaver, 2014 [1]"
  },

  
 
]

VINCRISTINE_DOXORUBICIN_CYCLOPHOSPHAMIDE_EFFECTS=[ 
    "Removed CDC20 (affected by drugs)",
 "Removed TOP2A (affected by drugs)",
 "Removed PRC1 (affected by drugs)",
 "Weakened LEP—ADIPOQ from 0.99 to 0.40",
 "Weakened SPP1—MMP1 from 0.53 to 0.27",
 "Weakened CIDEC—CFD from 0.58 to 0.23]"]
VINCRISTINE_DOXORUBICIN_CYCLOPHOSPHAMIDE=[
  {
    "interpretation": "3 nodes removed (CDC20, PRC1, TOP2A) indicate direct drug targeting.",
    "Impact": "These genes are central to mitotic progression and DNA replication. Their removal impairs tumor proliferation.",
    "reference": "Satyanarayana et al., 2017; Nitiss, 2009"
  },
  {
    "interpretation": "13 edges lost, major signaling disruptions in protein interaction network.",
    "Impact": "Indicates reduced crosstalk between cancer-driving modules like ECM remodeling and chromatin maintenance.",
    "reference": "Li et al., 2013"
  },
  {
    "interpretation": "Lower connectivity between nodes; less redundancy in signaling.",
    "Impact": "Impairs compensatory signaling loops often exploited by resistant breast cancer subtypes (e.g. basal-like).",
    "reference": "Balko et al., 2012"
  },
  
  {
    "interpretation": "Local interconnectedness of nodes reduced.",
    "Impact": "Indicates that therapy dismantles local protein complexes (e.g., mitotic or ECM complexes).",
    "reference": "Zhou et al., 2019"
  },
  {
    "interpretation": "Slight increase, more compact interaction among remaining nodes.",
    "Impact": "Surviving modules (e.g., inflammation-related adipokine network) become tighter, possibly for survival adaptation.",
    "reference": "Iyengar et al., 2016"
  },
  {
    "interpretation": "Greater variation in node degree, some nodes become more central.",
    "Impact": "Suggests formation of hub vulnerabilities; key proteins may now carry greater network influence (e.g., MMP1, SPP1).",
    "reference": "Jeong et al., 2001"
  },
  {
    "interpretation": "Network remains split into two isolated regions.",
    "Impact": "Suggests modular response to therapy — different functional zones (e.g., metabolic vs. proliferative) react independently.",
    "reference": "Hanahan & Weinberg, 2011"
  },
  {
    "interpretation": "Network control shifts to fewer dominant nodes.",
    "Impact": "Network becomes more fragile. Further targeting of these central hubs may cripple tumor signaling.",
    "reference": "Blais et al., 2021"
  },

   
  
  
]

PACITAXEL_SIROLIMUS_EFFECTS = [" Removed CDC20 (affected by drugs)",
 "Removed EZH2 (affected by drugs)",
  "Removed TOP2A (affected by drugs)",
  "Removed PRC1 (affected by drugs)",
  "Weakened MMP1—SPP1 from 0.53 to 0.27",
  "Weakened LEP—ADIPOQ from 0.99 to 0.30",
  "Weakened CIDEC—CFD from 0.58 to 0.23",]

PACITAXEL_SIROLIMUS=[
  {
    "interpretation": "Four genes (CDC20, EZH2, TOP2A, PRC1) removed; key regulators of mitosis, chromatin, and replication.",
    "Impact": "All four are overexpressed in aggressive breast cancer subtypes; their inhibition is linked to reduced tumor growth and mitotic arrest.",
    "reference": "Zhou et al. (2015), Xu et al. (2020)"
  },
  {
    "interpretation": "Disruption of gene–gene communication due to edge loss.",
    "Impact": "Decreased crosstalk between proliferative and survival pathways may impair cancer cell adaptability.",
    "reference": "Barabási et al. (2011)"
  },
  {
    "interpretation": "Less average connectivity between genes.",
    "Impact": "Suggests lower network redundancy; cancer cells may become more vulnerable to stress.",
    "reference": "Jeong et al. (2001)"
  },
  
  {
    "interpretation": "Loss of local modules/co-regulated groups.",
    "Impact": "Indicates collapse of key complexes like mitotic kinases, histone modifiers, and metabolic regulators.",
    "reference": "Spirin & Mirny (2003)"
  },
  {
    "interpretation": "Slight increase due to compacting of remaining clusters.",
    "Impact": "Remaining interactions may belong to stress-response genes or residual survival pathways.",
    "reference": "Valente et al. (2008)"
  },
  {
    "interpretation": "More uneven degree distribution across nodes.",
    "Impact": "May reveal compensatory survival hubs (e.g., LEP, LPL, SFRP1) activated post-treatment.",
    "reference": "Albert et al. (2000)"
  },
  {
    "interpretation": "Fewer nodes hold more network control.",
    "Impact": "Reflects emergence of secondary driver genes or potential targets in residual disease.",
    "reference": "Yu et al. (2007)"
  },
   {
    "interpretation": "Subdivision of network into isolated parts.",
    "Impact": "Suggests functional decoupling of processes like inflammation (e.g., SPP1), cell cycle, and metabolism — a hallmark of therapy response.",
    "reference": "Barabási et al. (2011), Ideker & Krogan (2012)"
  },
  
 
 
   
]


DOXORUBICIN_VORINOSTAT_EFFECTS=[
   " Removed EZH2 (affected by drugs)",
  "Removed TOP2A (affected by drugs)",
  "Removed PRC1 (affected by drugs)",
  "Removed CDC20 (affected by drugs)",
  "Removed S100B (affected by drugs)",
  "Weakened MMP1—SPP1 from 0.53 to 0.27",
  "Weakened LEP—ADIPOQ from 0.99 to 0.30",
  "Weakened CIDEC—CFD from 0.58 to 0.23",
]

DOXORUBICIN_VORINOSTAT=[

  {
    "interpretation": "5 nodes removed (EZH2, S100B, TOP2A, PRC1, CDC20) due to targeted inhibition.",
    "Impact": "These genes are oncogenic drivers in breast cancer. Inhibition leads to reduced tumor proliferation and progression.",
    "reference": "EZH2 overexpression promotes triple-negative breast cancer (Bachmann et al., 2006). TOP2A is a predictive biomarker (Di Leo et al., 2008)."
  },
  {
    "interpretation": "Disruption of 18 edges shows weakened interactions.",
    "Impact": "Lower connectivity reflects impaired oncogenic signaling, especially in mitotic and DNA repair pathways.",
    "reference": "CDC20–PRC1 axis is critical for mitotic progression in breast tumors (Wang et al., 2014)."
  },
  {
    "interpretation": "Slight reduction in mean gene connectivity.",
    "Impact": "Fewer interactions suggest effective attenuation of functional pathways sustaining tumorigenesis.",
    "reference": "Vorinostat reduces inter-gene synergy in luminal breast cancer models (Maddocks et al., 2009)."
  },
  
  {
    "interpretation": "Decreased modularity and co-regulation.",
    "Impact": "Breakup of tight modules (e.g., EMT, lipid metabolism) indicates therapy breaking cooperative cancer circuits.",
    "reference": "HDAC inhibition reduces clustering in EMT-related gene sets (Yoo et al., 2012)."
  },
  {
    "interpretation": "Slight increase due to retained interactions in a smaller graph.",
    "Impact": "Core pathways (e.g., inflammation, metabolism) remain dense, which may serve as residual resistance modules.",
    "reference": "Breast tumors can shift toward compact pro-survival clusters post-treatment (Rodriguez-Barrueco et al., 2013)."
  },
  {
    "interpretation": "Minimal change in degree variability.",
    "Impact": "Central nodes (e.g., LEP, MMP1) may retain their roles, suggesting backup signaling hubs that resist therapy.",
    "reference": "Compensatory rewiring via secondary hubs is common in resistant breast tumors (Zhou et al., 2018)."
  },
   {
    "interpretation": "Fragmentation increased, more isolated gene clusters.",
    "Impact": "Splitting into 4 subgraphs may represent complete shutdown of coordinated oncogenic programs.",
    "reference": "Functional disconnection is a strong predictor of therapy success in breast cancer PPI networks (Wang et al., 2012)."
  },
  {
    "interpretation": "More dominance by few central nodes.",
    "Impact": "Indicates vulnerability: removal of a few key nodes post-therapy could collapse remaining tumor networks.",
    "reference": "Increased centralization is predictive of tumor fragility post-HDACi treatment (Cheng et al., 2016)."
  },
 
 
]


DOXORUBICIN_EFFECTS = ["Removed TOP2A","Weakened interaction between EZH2 and CDC20"]
DOXORUBICIN=[
  {
    "interpretation": "TOP2A removed due to Doxorubicin inhibition, reducing network size.",
    "Impact": "TOP2A is a crucial DNA topoisomerase involved in replication and transcription. It is often overexpressed in high-grade, proliferative breast cancers. Inhibiting TOP2A through Doxorubicin leads to DNA strand breaks and apoptosis, effectively targeting rapidly dividing cancer cells.",
    "reference": "Barabási et al., 2011"
  },
  {
    "interpretation": "Reduced due to removal of gene and weakened interactions (EZH2–CDC20).",
    "Impact": "The reduced edge count reflects a breakdown in the gene regulatory and signaling network. This weakens mitotic fidelity and coordination of pathways often upregulated in breast cancer, limiting the cell's ability to recover from therapeutic stress.",
    "reference": "Barabási et al., 2011"
  },
  {
    "interpretation": "Slightly fewer interactions per gene due to reduced connectivity.",
    "Impact": "A decrease in average neighbors per gene implies lower co-regulation and functional collaboration. This disrupts signaling between oncogenes and tumor suppressors, undermining cooperative behavior that supports cancer progression.",
    "reference": "Jeong et al., 2001"
  },
   {
    "interpretation": "Weakened local modularity; genes are less tightly co-regulated.",
    "Impact": "A lower clustering coefficient reflects reduced formation of functional protein complexes. In breast cancer, this impairs the formation of modules like cell cycle control complexes or hormone receptor transcription units.",
    "reference": "Watts & Strogatz, 1998"
  },
   {
    "interpretation": "Lower density suggests more sparsely connected network.",
    "Impact": "Decreased density reflects the loosening of the tightly knit oncogenic network. Such loss of interconnectivity indicates reduced robustness of tumor-promoting pathways, making cancer cells more sensitive to therapeutic interventions.",
    "reference": "Barabási & Oltvai, 2004"
  },
   
  {
    "interpretation": "Increased variance in node degree; more hub-centric structure.",
    "Impact": "Higher heterogeneity indicates an uneven distribution of interactions—certain oncogenes like EZH2 become central while others are marginalized. This creates vulnerability, where inhibiting the key hubs could collapse the network.",
    "reference": "Newman, 2002"
  },
  {
    "interpretation": "Component count remains same but internal structure degraded.",
    "Impact": "The persistence of two disconnected components implies systemic fragmentation. In breast cancer, this could reflect separation between metabolic and proliferative gene modules, hindering the cancer’s ability to adapt or survive under stress.",
    "reference": "Albert et al., 2000"
  },
   {
    "interpretation": "More centralized network—fewer genes hold more connections.",
    "Impact": "Increased centralization shows that the network relies more on a few central regulators. Breast cancer cells with such topology may be more sensitive to drugs that target these hub genes (e.g., EZH2, CDC20), enabling precision targeting.",
    "reference": "Freeman, 1979"
  },

 
  
  
 

 
  
]


