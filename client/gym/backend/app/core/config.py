from pydantic import BaseSettings


class Settings(BaseSettings):
    project_name: str = "ai-workspace-platform-backend"
    debug: bool = True


settings = Settings()
