from datetime import UTC, datetime, timedelta
from secrets import compare_digest

import jwt

from app.core.config import get_settings
from app.core.exceptions import AuthError

_ALGORITHM = "HS256"


def verify_admin_credentials(username: str, password: str) -> bool:
    s = get_settings()
    # Evaluate both comparisons so timing doesn't reveal which one failed.
    user_ok = compare_digest(username.encode(), s.admin_username.encode())
    pass_ok = compare_digest(password.encode(), s.admin_password.encode())
    return user_ok and pass_ok


def create_access_token(subject: str) -> tuple[str, datetime]:
    s = get_settings()
    expires_at = datetime.now(UTC) + timedelta(minutes=s.jwt_expire_minutes)
    token = jwt.encode({"sub": subject, "exp": expires_at}, s.jwt_secret, algorithm=_ALGORITHM)
    return token, expires_at


def decode_access_token(token: str) -> str:
    try:
        payload = jwt.decode(token, get_settings().jwt_secret, algorithms=[_ALGORITHM])
    except jwt.PyJWTError as exc:
        raise AuthError("Your admin session has expired. Sign in again.") from exc
    return str(payload["sub"])
