from typing import Optional
from sqlmodel import Field, SQLModel
from datetime import datetime, timezone
import uuid

class Ingresso(SQLModel, table=True):
    # ID único e difícil de adivinhar (ótimo para o QR Code)
    id: str = Field(default_factory=lambda: str(uuid.uuid4()), primary_key=True)
    
    # Dados do formulário
    nome_completo: str
    email: str = Field(unique=True, index=True)
    data_nascimento: str
    
    # Dados da UnB (opcionais)
    eh_aluno_unb: bool = Field(default=False)
    curso: Optional[str] = None
    matricula: Optional[str] = None
    
    # Controle da Portaria com Fuso Horário (UTC)
    status_checkin: bool = Field(default=False)
    criado_em: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))