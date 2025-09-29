from fastapi import APIRouter
from app.api.routes import load, save, user

router = APIRouter()
router.include_router(load.router)
router.include_router(save.router)
router.include_router(user.router)
