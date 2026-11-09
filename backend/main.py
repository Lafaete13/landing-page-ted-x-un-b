from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlmodel import Session, select, SQLModel
from typing import Optional
from pydantic import BaseModel
import qrcode
import io
import base64

from database import engine, get_db
from models import Ingresso

app = FastAPI(title="API Ingressos TEDx UnB")

# Libera o acesso para o Next.js fazer requisições sem bloqueio de CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/api/ingressos/total")
def obter_total_ingressos(db: Session = Depends(get_db)):
    # Se você estiver salvando em uma lista em memória ou banco, calcule o total aqui.
    # Exemplo com lista em memória: total = len(lista_de_ingressos)
    # Exemplo com banco SQL (SQLAlchemy): total = db.query(IngressoModel).count()
    
    # Substitua 'total_registros' pela variável real do seu banco/lista:
    total_registros = len(db.exec(select(Ingresso)).all())
    
    return {"total": total_registros}

@app.on_event("startup")
def on_startup():
    SQLModel.metadata.create_all(engine)

# Schema para validação dos dados recebidos do formulário
class IngressoCreate(BaseModel):
    nome_completo: str
    email: str
    cpf: Optional[str] = None         # <-- Adicionado!
    tipo_participante: str            # <-- Adicionado!
    eh_aluno_unb: bool = False
    matricula: Optional[str] = None

# Função auxiliar para gerar a imagem do QR Code em Base64
def gerar_qr_code_base64(conteudo: str) -> str:
    qr = qrcode.QRCode(version=1, box_size=10, border=3)
    qr.add_data(str(conteudo))
    qr.make(fit=True)
    img = qr.make_image(fill_color="black", back_color="white")
    
    buffered = io.BytesIO()
    img.save(buffered, format="PNG")
    img_str = base64.b64encode(buffered.getvalue()).decode("utf-8")
    return f"data:image/png;base64,{img_str}"

@app.api_route("/", methods=["GET", "HEAD"])
def home():
    return {"status": "API TEDx UnB Online!"}

# 1. Rota para cadastrar e emitir ingresso
@app.post("/api/ingressos", status_code=201)
def criar_ingresso(dados: IngressoCreate, db: Session = Depends(get_db)):
    # 1. Trava de limite de 100 ingressos
    total_ingressos = len(db.exec(select(Ingresso)).all())
    if total_ingressos >= 100:
        raise HTTPException(
            status_code=400, 
            detail="Ingressos esgotados! O limite de 100 vagas para o evento foi atingido."
        )

    # 2. Valida se o e-mail já foi cadastrado
    statement = select(Ingresso).where(Ingresso.email == dados.email)
    ingresso_existente = db.exec(statement).first()
    if ingresso_existente:
        raise HTTPException(status_code=400, detail="Este e-mail já possui um ingresso garantido.")
    
    # 3. Salva no banco de dados Supabase
    novo_ingresso = Ingresso(**dados.model_dump())
    db.add(novo_ingresso)
    db.commit()
    db.refresh(novo_ingresso)
    
    # 4. Gera o QR Code dinâmico com o ID único (UUID) do banco
    qr_code_image = gerar_qr_code_base64(str(novo_ingresso.id))
    
    # 5. Retorna os dados para o Frontend (incluindo o QR Code em base64)
    return {
        "id": str(novo_ingresso.id),
        "nome_completo": novo_ingresso.nome_completo,
        "email": novo_ingresso.email,
        "qr_code_base64": qr_code_image
    }

# 2. Rota para a Portaria/Credenciamento (Validar QR Code)
@app.post("/api/validar/{ingresso_id}")
def validar_ingresso(ingresso_id: str, db: Session = Depends(get_db)):
    ingresso = db.get(Ingresso, ingresso_id.trim() if hasattr(ingresso_id, 'trim') else ingresso_id)
    
    if not ingresso:
        raise HTTPException(status_code=404, detail="Ingresso não encontrado ou inválido.")
    
    if ingresso.status_checkin:
        return {
            "valido": False,
            "status": "ALERTA",
            "mensagem": "ATENÇÃO: Ingresso já foi utilizado anteriormente!",
            "participante": ingresso.nome_completo
        }
    
    # Marca como utilizado no banco
    ingresso.status_checkin = True
    db.add(ingresso)
    db.commit()
    
    return {
        "valido": True,
        "status": "SUCESSO",
        "mensagem": "Credenciamento realizado com sucesso!",
        "participante": ingresso.nome_completo
    }