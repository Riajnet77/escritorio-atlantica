from pydantic import BaseModel, Field
from typing import Optional, List
from datetime import datetime

class ServiceBase(BaseModel):
    titulo: str
    slug: str
    descricao_curta: str
    descricao_completa: str
    icone: Optional[str] = "briefcase"
    destaque: bool = False
    ordem: int = 0

class ServiceCreate(ServiceBase):
    pass

class ServiceResponse(ServiceBase):
    id: str
    criado_em: datetime

    class Config:
        from_attributes = True
