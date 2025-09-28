from fastapi import FastAPI
from app.api import router

app = FastAPI(title='Cloakroom')
app.include_router(router, prefix='/cloakroom')
