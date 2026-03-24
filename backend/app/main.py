from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
from app.database import connect_db, close_db
from app.routes import services, blog, contact

@asynccontextmanager
async def lifespan(app: FastAPI):
    await connect_db()
    yield
    await close_db()

app = FastAPI(
    title="Escritório Atlântica API",
    description="API do site Escritório Atlântica",
    version="1.0.0",
    lifespan=lifespan,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Em produção, substitua pelo domínio do Vercel
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(services.router, prefix="/api/servicos", tags=["Serviços"])
app.include_router(blog.router, prefix="/api/blog", tags=["Blog"])
app.include_router(contact.router, prefix="/api/contato", tags=["Contato"])

@app.get("/")
async def root():
    return {"message": "Escritório Atlântica API está rodando!"}

@app.get("/health")
async def health():
    return {"status": "ok"}
