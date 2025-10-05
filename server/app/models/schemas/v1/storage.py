from pydantic import BaseModel

class LoadBody(BaseModel):
    title: str
    password: str | None = None

class SaveBody(BaseModel):
    title: str
    message: str
    password: str | None = None

class RespBody(BaseModel):
    error: str | None = None
    message: str
