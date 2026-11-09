from zoneinfo import ZoneInfo, ZoneInfoNotFoundError, available_timezones

from pydantic import AfterValidator

_VALID_ZONES = available_timezones()


def _check_timezone(value: str) -> str:
    if value not in _VALID_ZONES:
        raise ValueError(f"Unknown time zone '{value}'")
    try:
        ZoneInfo(value)
    except ZoneInfoNotFoundError as exc:  # pragma: no cover - tzdata is a dependency
        raise ValueError(f"Unknown time zone '{value}'") from exc
    return value


# Annotate a `str` field with this to require a valid IANA zone name.
TimeZoneName = AfterValidator(_check_timezone)
