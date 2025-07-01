
from pydantic import BaseModel
from pymongo import MongoClient
from bson import ObjectId
from typing import List

from fastapi import APIRouter, HTTPException
import json
import numpy as np
from starlette.responses import JSONResponse
import logging
import sys
from app.models import NetworkData,DrugInfo
from app.database import mongodb_client,Collection
from app.services import (
   
    create_drug,
    get_drug_by_name,
    update_drug,
    get_all_drugs
)


router2 = APIRouter()



@router2.post("/drugs", response_model=dict)
async def create_drug_route(drug: DrugInfo):
    return create_drug(drug)

@router2.get("/drugs/{drug_id}", response_model=dict)
async def read_drug(drug_id: str, ):
    drug = get_drug_by_name(drug_id)
    if not drug:
        raise HTTPException(status_code=404, detail="Drug not found")
    return drug

@router2.put("/drugs/{drug_name}", response_model=dict)
async def update_drug_route(drug_name: str, drug: DrugInfo, ):
    updated = update_drug(drug_name, drug, Collection)
    if not updated:
        raise HTTPException(status_code=404, detail="Drug not found")
    return updated

@router2.get("/drugs/", response_model=List[dict])
async def list_drugs():
    return get_all_drugs()