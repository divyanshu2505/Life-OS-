from fastapi import APIRouter

router = APIRouter()

@router.get('/posts')
async def posts():
    return []
