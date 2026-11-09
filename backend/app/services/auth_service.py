from app.core.exceptions import AuthError
from app.core.security import create_access_token, verify_admin_credentials
from app.schemas.auth import LoginRequest, TokenResponse


class AuthService:
    def login(self, data: LoginRequest) -> TokenResponse:
        if not verify_admin_credentials(data.username, data.password):
            raise AuthError("Incorrect username or password")
        token, expires_at = create_access_token(data.username)
        return TokenResponse(access_token=token, expires_at=expires_at)
