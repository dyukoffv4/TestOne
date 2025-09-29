from fastapi import APIRouter
from app.utils import connect

router = APIRouter(prefix='/user', tags=['user'])

@router.post('/{name}')
async def user(name: str, condition: int = 1):
    try:
        if condition == 1:
            if connect.attach(name):
                return 'OK'
            return 'NOT OK'
        if condition == 0:
            if connect.detach(name):
                return 'OK'
            return 'NOT OK'
    except Exception as error:
        print(f'WARNING:  {str(error)}')
        return str(error)

@router.post('/list')
async def ulist(specific: int | None = None):
    try:
        if specific == 1:
            return connect.getAttachedUsers()
        if specific == 0:
            return connect.getDetachedUsers()
        return connect.getAllUsers()
    except Exception as error:
        print(f'WARNING:  {str(error)}')
        return str(error)
