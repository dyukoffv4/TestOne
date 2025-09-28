from fastapi import APIRouter
from app.db import storage

router = APIRouter(prefix='/load', tags=['load'])

@router.get('/{title}')
async def load(title: str, password: str | None = None):
    try:
        return storage.get(title, password)
    except Exception as error:
        print(f'WARNING:  {str(error)}')
        return str(error)
