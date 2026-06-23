"""Tests for FEAT-001: Feature Title"""
import pytest
from httpx import AsyncClient

pytestmark = [pytest.mark.anyio, pytest.mark.feature("FEAT-001")]


@pytest.mark.ac("AC1")
async def test_list_entities_returns_empty_initially(client: AsyncClient):
    # Given no entities exist
    # When the client requests the entity list
    response = await client.get("/entities/")
    # Then the response is 200 with an empty list
    assert response.status_code == 200
    assert isinstance(response.json(), list)


@pytest.mark.ac("AC2")
async def test_create_entity_returns_201(client: AsyncClient):
    # Given valid entity data
    payload = {"name": "Test Entity"}
    # When the client creates an entity
    response = await client.post("/entities/", json=payload)
    # Then the entity is created and returned
    assert response.status_code == 201
    data = response.json()
    assert data["name"] == "Test Entity"
    assert "id" in data


@pytest.mark.ac("AC2")
async def test_created_entity_appears_in_list(client: AsyncClient):
    # Given an entity was created
    await client.post("/entities/", json={"name": "Listed Entity"})
    # When the client requests the entity list
    response = await client.get("/entities/")
    # Then the created entity appears in the list
    names = [e["name"] for e in response.json()]
    assert "Listed Entity" in names
