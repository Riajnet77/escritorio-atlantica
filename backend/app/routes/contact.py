from fastapi import APIRouter, HTTPException
from datetime import datetime
from app.database import get_database
from app.schemas.contact import ContactMessage

router = APIRouter()

@router.post("/", response_model=dict, status_code=201)
async def enviar_mensagem(mensagem: ContactMessage):
    db = get_database()
    nova = mensagem.model_dump()
    nova["lido"] = False
    nova["criado_em"] = datetime.utcnow()
    resultado = await db.contatos.insert_one(nova)
    return {
        "sucesso": True,
        "mensagem": "Mensagem enviada com sucesso! Entraremos em contato em breve.",
        "id": str(resultado.inserted_id)
    }

@router.get("/", response_model=list)
async def listar_mensagens():
    db = get_database()
    mensagens = await db.contatos.find().sort("criado_em", -1).to_list(100)
    for m in mensagens:
        m["id"] = str(m["_id"])
        del m["_id"]
    return mensagens
