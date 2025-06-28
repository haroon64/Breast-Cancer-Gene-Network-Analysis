# models.py
from pydantic import BaseModel
from typing import List, Optional

# Schema for network interactions
class Interaction(BaseModel):
    preferredName_A: str
    preferredName_B: str
    score: float

# Schema for response metrics
class NetworkMetrics(BaseModel):
    nodes: int
    edges: int
    avg_neighbors: Optional[float]
    diameter: Optional[float]
    radius: Optional[float]
    char_path_length: Optional[float]
    clustering_coefficient: Optional[float]
    density: Optional[float]
    heterogeneity: Optional[float]
    centralization: Optional[float]
    connected_components: int

# Schema for gene removal request
class RemoveGeneRequest(BaseModel):
    gene: str

# Schema for edge weight modification request
class ModifyEdgeRequest(BaseModel):
    gene1: str
    gene2: str
    width: float  # Factor to reduce weight (0.1 - 1.0)
class NetworkData(BaseModel):
    nodes: list  # List of nodes (example: [{'id': 1, 'name': 'Node 1'}, ...])
    edges: list  # List of edges (example: [{'source': 1, 'target': 2}, ...])
from typing import Union, Optional, Literal
from pydantic import BaseModel, model_validator


class Weight(BaseModel):
  
    molecular_weight: Optional[float] = None
    monoisotopic_mass: Optional[float] = None
    protein_weight: Optional[str] = None



class DrugInfo(BaseModel):
    drug_name: str
    description: str
    type: Literal["Small Molecule", "Biotech"]
    summary: str
    brand_names: str
    generic_name: str
    background: str
    groups: str
    weight:Weight

    chemical_formula: str
    image_url: Optional[str] = None
