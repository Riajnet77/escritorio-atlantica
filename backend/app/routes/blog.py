from fastapi import APIRouter, HTTPException
from typing import List
from datetime import datetime
from app.database import get_database
from app.schemas.blog import BlogPostCreate

router = APIRouter()

def serialize_post(post) -> dict:
    post["id"] = str(post["_id"])
    del post["_id"]
    return post

@router.get("/", response_model=List[dict])
async def listar_posts():
    db = get_database()
    posts = await db.blog.find({"publicado": True}).sort("criado_em", -1).to_list(50)
    return [serialize_post(p) for p in posts]

@router.get("/{slug}", response_model=dict)
async def detalhe_post(slug: str):
    db = get_database()
    post = await db.blog.find_one({"slug": slug, "publicado": True})
    if not post:
        raise HTTPException(status_code=404, detail="Post não encontrado")
    return serialize_post(post)

@router.post("/", response_model=dict, status_code=201)
async def criar_post(post: BlogPostCreate):
    db = get_database()
    novo = post.model_dump()
    novo["criado_em"] = datetime.utcnow()
    resultado = await db.blog.insert_one(novo)
    novo["id"] = str(resultado.inserted_id)
    del novo["_id"]
    return novo
