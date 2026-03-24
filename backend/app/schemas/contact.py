from pydantic import BaseModel, EmailStr
from typing import Optional
from datetime import datetime

class ContactMessage(BaseModel):
    nome: str
    email: EmailStr
    telefone: Optional[str] = None
    assunto: str
    mensagem: str

class ContactResponse(BaseModel):
    id: str
    nome: str
    email: str
    assunto: str
    lido: bool
    criado_em: datetime
