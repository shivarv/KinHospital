from datetime import date, datetime, timedelta

from fastapi.testclient import TestClient

API = "/api/v1"


def future_day(days: int = 5) -> str:
    return (date.today() + timedelta(days=days)).isoformat()


def booking_payload(start_at: str, **overrides) -> dict:
    payload = {
        "full_name": "Asha Menon",
        "age": 34,
        "gender": "female",
        "country": "India",
        "phone": "+91 98765 43210",
        "email": "asha@example.com",
        "preferred_language": "English",
        "patient_timezone": "Asia/Kolkata",
        "start_at": start_at,
        "concerns": ["skin-hair"],
        "message": "Hair fall for three months",
    }
    return payload | overrides


def slots(client: TestClient, day: str, tz: str) -> list[dict]:
    res = client.get(f"{API}/consultations/slots", params={"date": day, "tz": tz})
    assert res.status_code == 200, res.text
    return res.json()


def test_clinic_day_has_24_half_hour_slots_from_9am_to_9pm(client: TestClient):
    day_slots = slots(client, future_day(), "Asia/Kolkata")
    assert len(day_slots) == 24
    assert day_slots[0]["label"] == "9:00 AM"
    assert day_slots[-1]["label"] == "8:30 PM"


def test_slots_are_shown_in_patient_time_zone_across_clinic_days(client: TestClient):
    # 9am-9pm IST spans two calendar days in New York, but a New York day still holds 24 slots.
    ny = slots(client, future_day(), "America/New_York")
    assert len(ny) == 24
    # IST is 9.5-10.5 h ahead of New York, so the NY day starts mid-clinic-day and ends in the next one.
    assert ny[0]["label"] == "12:00 AM"
    assert ny[-1]["label"] == "11:30 PM"


def test_unknown_time_zone_is_rejected(client: TestClient):
    res = client.get(f"{API}/consultations/slots", params={"date": future_day(), "tz": "Mars/Base"})
    assert res.status_code == 422


def test_booking_removes_slot_and_blocks_double_booking(client: TestClient):
    day = future_day()
    first = slots(client, day, "Asia/Kolkata")[0]["start"]

    res = client.post(f"{API}/consultations/bookings", json=booking_payload(first))
    assert res.status_code == 201, res.text
    assert res.json()["reference"].startswith("KIN-")

    assert first not in {s["start"] for s in slots(client, day, "Asia/Kolkata")}

    again = client.post(f"{API}/consultations/bookings", json=booking_payload(first, email="other@example.com"))
    assert again.status_code == 409


def test_booking_outside_slot_grid_is_rejected(client: TestClient):
    first = datetime.fromisoformat(slots(client, future_day(), "Asia/Kolkata")[0]["start"])
    off_grid = (first + timedelta(minutes=7)).isoformat()
    res = client.post(f"{API}/consultations/bookings", json=booking_payload(off_grid))
    assert res.status_code == 400


def test_booking_beyond_window_is_rejected(client: TestClient):
    far = (date.today() + timedelta(days=60)).isoformat()
    res = client.post(f"{API}/consultations/bookings", json=booking_payload(f"{far}T04:30:00Z"))
    assert res.status_code == 400


def test_booking_requires_a_concern(client: TestClient):
    start = slots(client, future_day(), "Asia/Kolkata")[0]["start"]
    res = client.post(f"{API}/consultations/bookings", json=booking_payload(start, concerns=[]))
    assert res.status_code == 422


def test_holiday_removes_all_slots(client: TestClient, admin_headers: dict[str, str]):
    day = future_day(6)
    res = client.post(f"{API}/admin/holidays", json={"date": day, "reason": "Diwali"}, headers=admin_headers)
    assert res.status_code == 201, res.text
    assert slots(client, day, "Asia/Kolkata") == []


def test_unavailable_weekday_has_no_slots(client: TestClient, admin_headers: dict[str, str]):
    day = date.today() + timedelta(days=7)
    week = [
        {"day_of_week": d, "is_available": d != day.weekday(), "start_time": "09:00", "end_time": "21:00"}
        for d in range(7)
    ]
    assert client.put(f"{API}/admin/availability", json=week, headers=admin_headers).status_code == 200
    assert slots(client, day.isoformat(), "Asia/Kolkata") == []
