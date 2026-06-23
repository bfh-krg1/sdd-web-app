from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from app.models.ENTITY import ENTITY
from app.schemas.ENTITY import ENTITYCreate, ENTITYUpdate


async def get_all(session: AsyncSession) -> list[ENTITY]:
    result = await session.execute(select(ENTITY).order_by(ENTITY.id))
    return list(result.scalars().all())


async def get_by_id(session: AsyncSession, entity_id: int) -> ENTITY | None:
    result = await session.execute(select(ENTITY).where(ENTITY.id == entity_id))
    return result.scalar_one_or_none()


async def create(session: AsyncSession, data: ENTITYCreate) -> ENTITY:
    item = ENTITY(**data.model_dump())
    session.add(item)
    await session.commit()
    await session.refresh(item)
    return item


async def update(session: AsyncSession, entity_id: int, data: ENTITYUpdate) -> ENTITY | None:
    item = await get_by_id(session, entity_id)
    if not item:
        return None
    for field, value in data.model_dump(exclude_unset=True).items():
        setattr(item, field, value)
    await session.commit()
    await session.refresh(item)
    return item


async def delete(session: AsyncSession, entity_id: int) -> bool:
    item = await get_by_id(session, entity_id)
    if not item:
        return False
    await session.delete(item)
    await session.commit()
    return True
