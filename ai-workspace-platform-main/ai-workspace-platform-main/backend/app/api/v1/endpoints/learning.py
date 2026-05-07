from fastapi import APIRouter

router = APIRouter()

@router.get('/courses')
async def list_courses():
    return []
