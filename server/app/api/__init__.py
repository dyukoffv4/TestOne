from fastapi import APIRouter
from app.api.v1 import storage

router_v1 = APIRouter()
router_v1.include_router(storage.router)
