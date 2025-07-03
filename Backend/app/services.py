# services.py
import requests
import pandas as pd
import networkx as nx
from app.config import STRING_API_URL, SPECIES_ID, REQUIRED_SCORE, CALLER_IDENTITY
import numpy as np
from app.models import DrugInfo
from app.database import mongodb_client,Collection




# Fetch gene interactions from STRING API
def fetch_gene_network(selected_genes: list):
    params = {
        "identifiers": "%0d".join(selected_genes),
        "species": SPECIES_ID,
        "network_type": "functional",
        "required_score": REQUIRED_SCORE,
        "caller_identity": CALLER_IDENTITY
    }
    response = requests.get(STRING_API_URL, params=params)
    print("response from string Api ",response)
    print("json",response.json())
    return response.json() if response.status_code == 200 else []

# Create network graph from fetched interactions
def create_network_graph(interactions):
    
    G = nx.Graph()
    for interaction in interactions:
        G.add_edge(interaction["preferredName_A"], interaction["preferredName_B"], weight=interaction["score"])
     
    return G

# Compute network metrics
def calculate_metrics(G):
    """Calculate graph metrics with NaN handling."""
  



    metrics = {
    "nodes": G.number_of_nodes(),
    "edges": G.number_of_edges(),
    "avg_neighbors": np.mean([d for _, d in G.degree()]) if G.number_of_nodes() > 0 else 0,
    "diameter": nx.diameter(G) if nx.is_connected(G) else None,
    "radius": nx.radius(G) if nx.is_connected(G) else None,

    # Weighted shortest path metrics (only for connected graphs)
    "char_path_length": nx.average_shortest_path_length(G, weight="weight") if nx.is_connected(G) else None,
    
    # Weighted closeness centrality average
    "avg_closeness_weighted": np.mean(list(nx.closeness_centrality(G, distance="weight").values())) if G.number_of_nodes() > 0 else 0,

    # Weighted betweenness centrality average
    "avg_betweenness_weighted": np.mean(list(nx.betweenness_centrality(G, weight="weight").values())) if G.number_of_nodes() > 0 else 0,

    # Note: NetworkX does not support weighted clustering directly; needs manual approach or ignore
    "clustering_coefficient": nx.average_clustering(G, weight="weight"),

    "density": nx.density(G),

    # Degree assortativity (still unweighted, unless you model something custom)
    "heterogeneity": nx.degree_pearson_correlation_coefficient(G) if G.number_of_edges() > 0 else 0,

    # Degree centralization (unweighted)
    "centralization": max(dict(G.degree()).values()) / (G.number_of_nodes() - 1) if G.number_of_nodes() > 1 else 0,

    "connected_components": nx.number_connected_components(G),
}

    # Convert NaN or inf values to 0
    for key, value in metrics.items():
        if isinstance(value, float) and (np.isnan(value) or np.isinf(value)):
            metrics[key] = 0

    return metrics

# Modify network - remove gene
def remove_gene(graph, gene):
    print(graph ,gene)
    if gene in graph:
        print(9)
        graph.remove_node(gene)
        print(10)
    return graph

# Modify network - reduce interaction strength
def modify_edge_weight(graph, gene1, gene2, width):
    if graph.has_edge(gene1, gene2) and 0.1 <= width <= 1:
        print(100)
        print("width: ",width)
        print(graph[gene1][gene2]["weight"])
              
        graph[gene1][gene2]["weight"] = width
        print(graph[gene1][gene2]["weight"])
        print("graph:", graph)
        print(2000)
    return graph






def drug_helper(drug) -> dict:
    drug["_id"] = str(drug["_id"])
    return drug

def create_drug(drug: DrugInfo, ) -> dict:
    result = Collection.insert_one(drug.dict())
    new_drug = Collection.find_one({"_id": result.inserted_id})
    return drug_helper(new_drug)

def get_drug_by_name(drug_name: str) -> dict:
    drug = Collection.find_one({"drug_name": drug_name})
    if drug:
        return drug_helper(drug)
    return None

def update_drug(drug_id: str, drug: DrugInfo) -> dict:
    updated = Collection.find_one_and_update(
        {"_id": ObjectId(drug_id)},
        {"$set": drug.dict()},
        return_document=True
    )
    if updated:
        return drug_helper(updated)
    return None

def get_all_drugs() -> list:
    return [drug_helper(drug) for drug in Collection.find()]
def apply_paclitaxel_effects(graph: nx.Graph) -> nx.Graph:
    G_modified = graph.copy()
    # Remove CDC20
    if "CDC20" in G_modified:
        G_modified.remove_node("CDC20")
    # Weaken specific interactions
    weakened_edges = [
        ("TOP2A", "EZH2", 0.4),
        ("MMP1", "SPP1", 0.5)
    ]
    for node1, node2, factor in weakened_edges:
        if node1 in G_modified and node2 in G_modified and G_modified.has_edge(node1, node2):
            G_modified[node1][node2]['weight'] *= factor
    return G_modified

def apply_doxorubicin_effects(graph: nx.Graph) -> nx.Graph:
    G_modified1 = graph.copy()
    # Remove specific nodes
    nodes_to_remove = ["TOP2A"]
    for node in nodes_to_remove:
        if node in G_modified1:
            G_modified1.remove_node(node)
    # Weaken specific interactions
    weakened_edges = [
        ("EZH2", "CDC20", 0.5),
        
    ]
    for node1, node2, factor in weakened_edges:
        if node1 in G_modified1 and node2 in G_modified1 and G_modified1.has_edge(node1, node2):
            G_modified1[node1][node2]['weight'] *= factor
    return G_modified1


def apply_paclitaxel_sirolimus_effects(graph: nx.Graph) -> nx.Graph:
    G_modified = graph.copy()
    print("\n⚙ Applying Combination Therapy (Paclitaxel + Sirolimus)...")

    # Nodes to remove (merged targets)
    nodes_to_remove = ["CDC20", "EZH2", "TOP2A", "PRC1"]
    for node in nodes_to_remove:
        if node in G_modified:
            G_modified.remove_node(node)
            print(f" - Removed {node} (affected by drugs)")

    # Combined weakened edges
    weakened_edges = [
        ("MMP1", "SPP1", 0.5),        # Paclitaxel & Sirolimus
        ("TOP2A", "EZH2", 0.4),       # Paclitaxel
        ("LEP", "ADIPOQ", 0.3),       # Sirolimus
        ("CIDEC", "CFD", 0.4)         # Sirolimus
    ]
    for node1, node2, factor in weakened_edges:
        if node1 in G_modified and node2 in G_modified and G_modified.has_edge(node1, node2):
            original_weight = G_modified[node1][node2]['weight']
            G_modified[node1][node2]['weight'] *= factor
            print(f" - Weakened {node1}—{node2} from {original_weight:.2f} to {G_modified[node1][node2]['weight']:.2f}")

    return G_modified

def apply_vorinostat_doxorubicin_effects(graph: nx.Graph) -> nx.Graph:
    G_modified = graph.copy()
    print("\n⚙ Applying Combination Therapy (Vorinostat + Doxorubicin)...")

    # Nodes removed due to drug targeting
    nodes_to_remove = ["EZH2", "TOP2A", "PRC1", "CDC20", "S100B"]
    for node in nodes_to_remove:
        if node in G_modified:
            G_modified.remove_node(node)
            print(f" - Removed {node} (affected by drugs)")

    # Edges weakened due to epigenetic or downstream inhibition
    weakened_edges = [
        ("MMP1", "SPP1", 0.5),        # Shared downstream
        ("LEP", "ADIPOQ", 0.3),       # Vorinostat
        ("CIDEC", "CFD", 0.4),        # Vorinostat
        ("TOP2A", "EZH2", 0.4)        # Both
    ]
    for node1, node2, factor in weakened_edges:
        if node1 in G_modified and node2 in G_modified and G_modified.has_edge(node1, node2):
            original_weight = G_modified[node1][node2]['weight']
            G_modified[node1][node2]['weight'] *= factor
            print(f" - Weakened {node1}—{node2} from {original_weight:.2f} to {G_modified[node1][node2]['weight']:.2f}")

    return G_modified

def apply_vincristine_doxorubicin_cyclophosphamide_effects(graph: nx.Graph) -> nx.Graph:
    G_modified = graph.copy()
    print("\n⚙ Applying Combination Therapy (Vincristine + Doxorubicin + Cyclophosphamide)...")

    # Nodes to remove (known direct targets or severely affected)
    nodes_to_remove = ["CDC20", "TOP2A", "PRC1"]  # TOP2A = target of Doxorubicin; PRC1, CDC20 = mitotic regulators (Vincristine)
    for node in nodes_to_remove:
        if node in G_modified:
            G_modified.remove_node(node)
            print(f" - Removed {node} (affected by drugs)")

    # Weakened edges (pathways or known interactions downregulated)
    weakened_edges = [
        ("EZH2", "TOP2A", 0.3),     # Topoisomerase II and chromatin modifier interaction
        ("LEP", "ADIPOQ", 0.4),     # Adipokine pathway modulation by Cyclophosphamide
        ("SPP1", "MMP1", 0.5),      # ECM remodeling suppression (Cyclophosphamide effect)
        ("CIDEC", "CFD", 0.4)       # Metabolic network weakened by VAC therapy
    ]
    for node1, node2, factor in weakened_edges:
        if node1 in G_modified and node2 in G_modified and G_modified.has_edge(node1, node2):
            original_weight = G_modified[node1][node2]['weight']
            G_modified[node1][node2]['weight'] *= factor
            print(f" - Weakened {node1}—{node2} from {original_weight:.2f} to {G_modified[node1][node2]['weight']:.2f}")

    return G_modified