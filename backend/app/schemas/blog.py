from pydantic import BaseModel
from typing import Optional, List
from datetime import datetime

class BlogPostBase(BaseModel):
    titulo: str
    slug: str
    resumo: str
    conteudo: str
    autor: str = "Equipe Atlântica"
    tags: List[str] = []
    imagem_url: Optional[str] = None
    publicado: bool = True

class BlogPostCreate(BlogPostBase):
    pass

class BlogPostResponse(BlogPostBase):
    id: str
    criado_em: datetime

    class Config:
        from_attributes = True
