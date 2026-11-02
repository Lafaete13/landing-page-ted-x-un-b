import os
from sqlmodel import create_engine, Session
from dotenv import load_dotenv

# Carrega a URL do arquivo .env
load_dotenv()
DATABASE_URL = os.getenv("DATABASE_URL")

# Cria o motor de conexão com o banco
engine = create_engine(DATABASE_URL, echo=True)

# Função para usar nas rotas do FastAPI
def get_db():
    with Session(engine) as session:
        yield session