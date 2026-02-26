# app/services/encryption_service.py

from cryptography.fernet import Fernet
from app.core.config import settings

fernet = Fernet(settings.ENCRYPTION_KEY)

def encrypt_data(data: str) -> str:
    return fernet.encrypt(data.encode()).decode()

def decrypt_data(token: str) -> str:
    return fernet.decrypt(token.encode()).decode()