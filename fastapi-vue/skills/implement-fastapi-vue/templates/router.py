from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from app.database import get_session
from app.schemas.ENTITY import ENTITYCreate, ENTITYUpdate, ENTITYResponse
from app.services import entity_service

router = APIRouter(prefix="/entities", tags=["entities"])


@router.get("/", response_model=list[ENTITYResponse])
async def list_entities(session: AsyncSession = Depends(get_session)):
    return await entity_service.get_all(session)


@router.get("/{entity_id}", response_model=ENTITYResponse)
async def get_entity(entity_id: int, session: AsyncSession = Depends(get_session)):
    item = await entity_service.get_by_id(session, entity_id)
    if not item:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Not found")
    return item


@router.post("/", response_model=ENTITYResponse, status_code=status.HTTP_201_CREATED)
async def create_entity(data: ENTITYCreate, session: AsyncSession = Depends(get_session)):
    return await entity_service.create(session, data)


@router.put("/{entity_id}", response_model=ENTITYResponse)
async def update_entity(entity_id: int, data: ENTITYUpdate, session: AsyncSession = Depends(get_session)):
    item = await entity_service.update(session, entity_id, data)
    if not item:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Not found")
    return item


@router.delete("/{entity_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_entity(entity_id: int, session: AsyncSession = Depends(get_session)):
    deleted = await entity_service.delete(session, entity_id)
    if not deleted:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Not found")
