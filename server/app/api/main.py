from fastapi import APIRouter
from app.api.routes import load, save

router = APIRouter()
router.include_router(load.router)
router.include_router(save.router)
