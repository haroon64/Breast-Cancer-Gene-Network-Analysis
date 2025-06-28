from fastapi import APIRouter, HTTPException
import json
import numpy as np
from starlette.responses import JSONResponse
import logging
import sys
from app.models import NetworkData
from app.config import DOXORUBICIN,VINCRISTINE_DOXORUBICIN_CYCLOPHOSPHAMIDE_EFFECTS,DOXORUBICIN_VORINOSTAT_EFFECTS,PACITAXEL_SIROLIMUS_EFFECTS,DOXORUBICIN_EFFECTS,DOXORUBICIN_VORINOSTAT,PACITAXEL,PACITAXEL_EFFECtS,PACITAXEL_SIROLIMUS,VINCRISTINE_DOXORUBICIN_CYCLOPHOSPHAMIDE,PACITAXEL_SIROLIMUS

from app.services import (
    fetch_gene_network,
    create_network_graph,
    calculate_metrics,
    remove_gene,
    modify_edge_weight
    ,apply_paclitaxel_effects,
    apply_doxorubicin_effects,
    apply_paclitaxel_sirolimus_effects,
    apply_vorinostat_doxorubicin_effects,
    apply_vincristine_doxorubicin_cyclophosphamide_effects


)
from app.models import Interaction, NetworkMetrics, RemoveGeneRequest, ModifyEdgeRequest

router = APIRouter()

# Global variable for storing the network graph
G = None
print("This is a fresh execution of fetch_network()")
 # Forces output to appear in terminal

logging.info("Fetch network function is running!")


logging.basicConfig(level=logging.INFO)

def sanitize_metrics(metrics):
    """Convert NaN and inf values in metrics to None."""
    def fix_json_serialization(obj):
        if isinstance(obj, float) and (np.isnan(obj) or np.isinf(obj)):
            return None
        return obj
    return json.loads(json.dumps(metrics, default=fix_json_serialization))

@router.get("/fetch-network1")
async def fetch_network1():
        print("hi")
        print(1)
        print("🚀 This is a fresh execution of fetch_network1()")
        sys.stdout.flush()  # Forces output to appear in terminal

        logging.info("🔥 Fetch network1 function is running!")
        """Fetches gene interaction network and metrics using only the given array of genes."""
        global G
        logging.info("Step 1: Function fetch_network1() called")
        print(2, flush=True)
        selected_genes = [
             "GPD1" ,"EZH2","CDC20",
            "RBP4", "S100B", "S100P", "SFRP1",  "TOP2A", "ZBTB16", "ZWINT"
        ]

        # Fetch interactions ONLY for the given genes
        interactions = fetch_gene_network(selected_genes)

        if not interactions:
            raise HTTPException(status_code=500, detail="Failed to fetch network data")

        # Create network graph
        G = create_network_graph(interactions)
        if G is None:
            raise HTTPException(status_code=500, detail="Failed to create network graph")

        # Convert graph into frontend-friendly format
        nodes = [{"id": node, "label": node, "group": 1} for node in G.nodes()]
        edges = [{"from": edge[0], "to": edge[1], "weight": G.edges[edge]["weight"]} for edge in G.edges()]
        print(7)
        if "LEP" in G and "ADIPOQ" in G["LEP"]:
            print(G.edges["LEP", "ADIPOQ"])

        response_data = {
            "nodes": nodes,
            "edges": edges,
        }
        print(response_data)

        return JSONResponse(content=response_data)


@router.get("/fetch-network")
async def fetch_network():
    print("hi")
   
    print(1)
    print("🚀 This is a fresh execution of fetch_network()")
    sys.stdout.flush()  # Forces output to appear in terminal

    logging.info("🔥 Fetch network function is running!")
    """Fetches gene interaction network and metrics."""
    global G 
    logging.info("Step 1: Function fetch_network() called")
    print(2, flush=True)
    selected_genes = [
        "ACACB", "ADAMTS5", "ADH1B", "ADIPOQ", "CD36", "CDC20", "CFD", "CIDEA", "CIDEC",
        "COL10A1", "DTL", "EDNRB", "EZH2", "GPC3", "GPD1", "LEP", "LPL", "MMP1", "PRC1", "RARRES2",
        "RBP4", "S100B", "S100P", "SFRP1", "SPP1", "TOP2A", "ZBTB16", "ZWINT"
    ]  
    
    # Fetch interactions
    interactions = fetch_gene_network(selected_genes)
    # raise HTTPException(status_code=500, detail="Failed to fetch network data")
    

    if not interactions:
        raise HTTPException(status_code=500, detail="Failed to fetch network data")
   

    # Create network graph
    G = create_network_graph(interactions)
    if G is None:
        raise HTTPException(status_code=500, detail="Failed to create network graph")

    # Compute metrics
    metrics = calculate_metrics(G)
    safe_metrics = sanitize_metrics(metrics)

    

    # ✅ Convert graph into frontend-friendly format
    nodes = [{"id": node, "label": node, "group": 1} for node in G.nodes()]
    edges = [{"from": edge[0], "to": edge[1], "weight": G.edges[edge]["weight"] } for edge in G.edges()]
    print(7)
    print(G.edges["LEP", "ADIPOQ"])


    response_data = {
        "nodes": nodes,
        "edges": edges,
        "metrics": safe_metrics,
       
    }
    print(response_data)

    return JSONResponse(content=response_data)
@router.post("/remove-gene")
async def remove_gene_api(request: RemoveGeneRequest):
    print(1)
    """Removes a gene from the network graph."""
    global G
    if not G:
        raise HTTPException(status_code=400, detail="No active network found")
    
    G = remove_gene(G, request.gene)
    print("done")
    return {"message": f"Gene {request.gene} removed successfully"}

@router.post("/modify-edge")
async def modify_edge_api(request: ModifyEdgeRequest):
    """Modifies the edge weight in the network graph."""
    global G
    if not G:
        raise HTTPException(status_code=400, detail="No active network found")
    
    
    G = modify_edge_weight(G, request.gene1, request.gene2, request.width)
    nodes = [{"id": node, "label": node, "group": 1} for node in G.nodes()]
    edges = [{"from": edge[0], "to": edge[1], "weight": G.edges[edge]["weight"] } for edge in G.edges()]
   
    
    response_data = {
        "nodes": nodes,
        "edges": edges,
        
       
    }
    print(response_data)

    return {"message": f"Interaction strength between {request.gene1} and {request.gene2} modified"}

@router.get("/compute-metrics")
async def compute_new_metrics():
    """Computes and returns updated network metrics."""
    global G
    if not G:
        raise HTTPException(status_code=400, detail="No active network found")
    
    # Compute updated metrics
    new_metrics = calculate_metrics(G)
    safe_metrics = sanitize_metrics(new_metrics)
    print(safe_metrics)
    return JSONResponse(content={"metrics": safe_metrics})

@router.get("/apply-doxorubicin")
async def apply_doxorubicin_api():
    global G
    if not G:
        raise HTTPException(status_code=400, detail="No active network found")

    # ✅ Call service function to apply Paclitaxel effects
    G_modified1 = apply_doxorubicin_effects(G)

    # Optionally replace global graph if needed
    G = G_modified1

    # Compute new metrics
    new_metrics = calculate_metrics(G_modified1)
    safe_metrics = sanitize_metrics(new_metrics)
    print("new_matrics:",new_metrics)

    # Prepare frontend-friendly graph
    nodes = [{"id": node, "label": node, "group": 1} for node in G_modified1.nodes()]
    edges = [
        {"from": u, "to": v, "weight": G_modified1[u][v]["weight"]}
        for u, v in G_modified1.edges()
    ]
    print(edges)
    doxorubicin = DOXORUBICIN   
    return JSONResponse(content={
        "message": "Paclitaxel effects applied",
        "nodes": nodes,
        "edges": edges,
        "metrics": safe_metrics,
        "explanation":doxorubicin,
        "effects":DOXORUBICIN_EFFECTS   

    })

@router.get("/apply-paclitaxel")
async def apply_paclitaxel_api():
    global G
    if not G:
        raise HTTPException(status_code=400, detail="No active network found")

    # ✅ Call service function to apply Paclitaxel effects
    G_modified = apply_paclitaxel_effects(G)

    # Optionally replace global graph if needed
    G = G_modified

    # Compute new metrics
    new_metrics = calculate_metrics(G_modified)
    safe_metrics = sanitize_metrics(new_metrics)

    # Prepare frontend-friendly graph
    nodes = [{"id": node, "label": node, "group": 1} for node in G_modified.nodes()]
    edges = [
        {"from": u, "to": v, "weight": G_modified[u][v]["weight"]}
        for u, v in G_modified.edges()
    ]
    pacitaxel = PACITAXEL   
    return JSONResponse(content={
        "message": "Paclitaxel effects applied",
        "nodes": nodes,
        "edges": edges,
        "metrics": safe_metrics,
        "explanation":pacitaxel,
        "effects":PACITAXEL_EFFECtS

    })



@router.get("/apply-paclitaxel-sirolimus")
async def apply_paclitaxel_sirolimus_api():
    global G
    if not G:
        raise HTTPException(status_code=400, detail="No active network found")

    # ✅ Call service function to apply Paclitaxel effects
    G_modified = apply_paclitaxel_sirolimus_effects(G)

    # Optionally replace global graph if needed
    G = G_modified

    # Compute new metrics
    new_metrics = calculate_metrics(G_modified)
    safe_metrics = sanitize_metrics(new_metrics)

    # Prepare frontend-friendly graph
    nodes = [{"id": node, "label": node, "group": 1} for node in G_modified.nodes()]
    edges = [
        {"from": u, "to": v, "weight": G_modified[u][v]["weight"]}
        for u, v in G_modified.edges()
    ]
    pacitaxel_sirolimus = PACITAXEL_SIROLIMUS   
    return JSONResponse(content={
        "message": "Paclitaxel and Sirolimus effects applied",
        "nodes": nodes,
        "edges": edges,
        "metrics": safe_metrics,
        "explanation":pacitaxel_sirolimus,
        "effects":PACITAXEL_SIROLIMUS_EFFECTS

    })

@router.get("/apply-vorinostat-doxorubicin")
async def apply_vorinostat_doxorubicin_api():
    global G
    if not G:
        raise HTTPException(status_code=400, detail="No active network found")

    # ✅ Call service function to apply Vorinostat + Doxorubicin effects
    G_modified = apply_vorinostat_doxorubicin_effects(G)

    # Optionally replace global graph if needed
    G = G_modified

    # Compute new metrics
    new_metrics = calculate_metrics(G_modified)
    safe_metrics = sanitize_metrics(new_metrics)

    # Prepare frontend-friendly graph
    nodes = [{"id": node, "label": node, "group": 1} for node in G_modified.nodes()]
    edges = [
        {"from": u, "to": v, "weight": G_modified[u][v]["weight"]}
        for u, v in G_modified.edges()
    ]
    vorinostat_doxorubicin = DOXORUBICIN_VORINOSTAT   
    return JSONResponse(content={
        "message": "Vorinostat + Doxorubicin effects applied",
        "nodes": nodes,
        "edges": edges,
        "metrics": safe_metrics,
        "explanation":vorinostat_doxorubicin,
        "effects":DOXORUBICIN_VORINOSTAT_EFFECTS

    })


@router.get("/apply-vincristine-doxorubicin-cyclophosphamide")
async def apply_vincristine_doxorubicin_cyclophosphamide_api():
    global G
    if not G:
        raise HTTPException(status_code=400, detail="No active network found")

    # ✅ Call service function to apply Vincristine + Doxorubicin + Cyclophosphamide effects
    G_modified = apply_vincristine_doxorubicin_cyclophosphamide_effects(G)

    # Optionally replace global graph if needed
    G = G_modified

    # Compute new metrics
    new_metrics = calculate_metrics(G_modified)
    safe_metrics = sanitize_metrics(new_metrics)

    # Prepare frontend-friendly graph
    nodes = [{"id": node, "label": node, "group": 1} for node in G_modified.nodes()]
    edges = [
        {"from": u, "to": v, "weight": G_modified[u][v]["weight"]}
        for u, v in G_modified.edges()
    ]
    vincristine_doxorubicin_cyclophosphamide = VINCRISTINE_DOXORUBICIN_CYCLOPHOSPHAMIDE   
    return JSONResponse(content={
        "message": "Vincristine + Doxorubicin + Cyclophosphamide effects applied",
        "nodes": nodes,
        "edges": edges,
        "metrics": safe_metrics,
        "explanation":vincristine_doxorubicin_cyclophosphamide,
        "effects":VINCRISTINE_DOXORUBICIN_CYCLOPHOSPHAMIDE_EFFECTS

    })