from fastapi import APIRouter, HTTPException
from typing import List
from datetime import datetime
from bson import ObjectId
from app.database import get_database
from app.schemas.service import ServiceCreate, ServiceResponse

router = APIRouter()

def serialize_service(service) -> dict:
    service["id"] = str(service["_id"])
    del service["_id"]
    return service

@router.get("/", response_model=List[dict])
async def listar_servicos():
    db = get_database()
    servicos = await db.servicos.find().sort("ordem", 1).to_list(100)
    return [serialize_service(s) for s in servicos]

@router.get("/{slug}", response_model=dict)
async def detalhe_servico(slug: str):
    db = get_database()
    servico = await db.servicos.find_one({"slug": slug})
    if not servico:
        raise HTTPException(status_code=404, detail="Serviço não encontrado")
    return serialize_service(servico)

@router.post("/", response_model=dict, status_code=201)
async def criar_servico(servico: ServiceCreate):
    db = get_database()
    novo = servico.model_dump()
    novo["criado_em"] = datetime.utcnow()
    resultado = await db.servicos.insert_one(novo)
    novo["id"] = str(resultado.inserted_id)
    del novo["_id"]
    return novo
