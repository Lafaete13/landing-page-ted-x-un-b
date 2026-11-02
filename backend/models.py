import uuid
from datetime import datetime, timezone
from typing import Optional
from sqlmodel import SQLModel, Field

class Ingresso(SQLModel, table=True):
    # ID único e difícil de adivinhar (para o QR Code)
    id: str = Field(default_factory=lambda: str(uuid.uuid4()), primary_key=True)
    
    # Dados do formulário
    nome_completo: str
    email: str = Field(unique=True, index=True)
    cpf: str
    data_nascimento: str
    tipo_participante: str  # "aluno" ou "externo"
    
    # Dados da UnB (opcionais para comunidade externa)
    eh_aluno_unb: bool = Field(default=False)
    curso: Optional[str] = None
    matricula: Optional[str] = None
    
    # Controle da Portaria com Fuso Horário (UTC)
    status_checkin: bool = Field(default=False)
    criado_em: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))