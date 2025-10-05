from fastapi import APIRouter, Response
from app.services import storage, StorageError
from app.models.schemas.v1.storage import *

# Todo: Исправить и убрать
table = {'ARGS.WRONG': 400, 'TITLE.EXIST': 400, 'TITLE.NOT.EXIST': 404, 'PASSWORD.WRONG': 403}

router = APIRouter(tags=['storage'])

@router.post('/save', status_code=201, response_model=RespBody)
async def save(body: SaveBody, response: Response):
    try:
        storage.put(body.title, body.message, body.password)
        return RespBody(message='DONE')
    except StorageError as error:
        response.status_code = table[error.code]
        return RespBody(error=error.code, message=str(error))

@router.get('/load', status_code=200, response_class=RespBody)
async def load(body: LoadBody, response: Response):
    try:
        message = storage.get(body.title, body.password)
        return RespBody(message=message)
    except StorageError as error:
        response.status_code = table[error.code]
        return RespBody(error=error.code, message=str(error))
