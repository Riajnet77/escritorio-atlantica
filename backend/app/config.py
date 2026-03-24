from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    MONGODB_URL: str = "mongodb://localhost:27017"
    DB_NAME: str = "escritorio_atlantica"
    SECRET_KEY: str = "change-this-in-production"
    EMAIL_HOST: str = ""
    EMAIL_PORT: int = 587
    EMAIL_USER: str = ""
    EMAIL_PASS: str = ""
    EMAIL_TO: str = ""

    class Config:
        env_file = ".env"

settings = Settings()
