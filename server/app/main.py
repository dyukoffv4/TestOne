from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from app.api import router_v1

app = FastAPI(title='Cloakroom')
app.mount("/static", StaticFiles(directory="app/static"), name="static")
app.include_router(router_v1, prefix='/cloakroom')