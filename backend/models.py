from typing import Optional
from sqlmodel import Field, SQLModel
from datetime import datetime, timezone
import uuid

class Ingresso(SQLModel, table=True):
    id: Optional[str] = Field(default=None, primary_key=True)
    nome_completo: str
    email: str
    cpf: str
    data_nascimento: str
    tipo_participante: str
    eh_aluno_unb: bool = False
    curso: Optional[str] = None
    matricula: Optional[str] = None
    status_checkin: bool = False