from fastapi import APIRouter

from app.api.deps import AdminUser
from app.schemas.auth import LoginRequest, TokenResponse
from app.services.auth_service import AuthService

router = APIRouter(prefix="/auth", tags=["admin: auth"])


@router.post("/login", response_model=TokenResponse)
def login(data: LoginRequest):
    return AuthService().login(data)


@router.get("/me")
def me(admin: AdminUser) -> dict[str, str]:
    return {"username": admin}
