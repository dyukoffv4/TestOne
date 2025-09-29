from fastapi import APIRouter
from app.utils import storage

router = APIRouter(prefix='/save', tags=['save'])

@router.post('/{title}')
async def save(title: str, message: str, password: str | None = None):
    try:
        storage.put(title, message, password)
        return 'OK'
    except Exception as error:
        print(f'WARNING:  {str(error)}')
        return str(error)
