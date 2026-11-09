from fastapi.testclient import TestClient

API = "/api/v1"


def test_admin_routes_require_login(client: TestClient):
    assert client.get(f"{API}/admin/appointments/").status_code == 401
    assert client.get(f"{API}/admin/appointments/", headers={"Authorization": "Bearer nonsense"}).status_code == 401


def test_wrong_password_is_rejected(client: TestClient):
    res = client.post(f"{API}/admin/auth/login", json={"username": "admin", "password": "wrong"})
    assert res.status_code == 401


def test_product_lifecycle(client: TestClient, admin_headers: dict[str, str]):
    created = client.post(
        f"{API}/admin/products/",
        json={
            "name": "Rhus Tox 30C",
            "category": "homeopathy",
            "short_description": "Traditionally used for stiffness.",
            "price": "8.00",
        },
        headers=admin_headers,
    )
    assert created.status_code == 201, created.text
    product_id = created.json()["id"]

    public = client.get(f"{API}/products/", params={"category": "homeopathy"}).json()
    assert any(p["id"] == product_id for p in public)

    hidden = client.patch(f"{API}/admin/products/{product_id}", json={"is_active": False}, headers=admin_headers)
    assert hidden.status_code == 200
    assert all(p["id"] != product_id for p in client.get(f"{API}/products/").json())

    assert client.delete(f"{API}/admin/products/{product_id}", headers=admin_headers).status_code == 204


def test_settings_update_validates_time_zone(client: TestClient, admin_headers: dict[str, str]):
    bad = client.patch(f"{API}/admin/settings", json={"timezone": "Nowhere/City"}, headers=admin_headers)
    assert bad.status_code == 422
    ok = client.patch(f"{API}/admin/settings", json={"consultation_fee": "35.00"}, headers=admin_headers)
    assert ok.status_code == 200
    assert client.get(f"{API}/consultations/info").json()["consultation_fee"] == "35.00"


def test_diet_chart_pdf_for_every_condition(client: TestClient):
    conditions = client.get(f"{API}/diet/conditions").json()
    assert len(conditions) == 7
    for c in conditions:
        for diet_type in ("veg", "nonveg"):
            params = {"condition": c["slug"], "diet_type": diet_type, "name": "Ravi"}
            res = client.get(f"{API}/diet/chart", params=params)
            assert res.status_code == 200
            assert res.headers["content-type"] == "application/pdf"
            assert res.content.startswith(b"%PDF")


def test_unknown_diet_condition_is_404(client: TestClient):
    res = client.get(f"{API}/diet/chart", params={"condition": "unknown", "diet_type": "veg"})
    assert res.status_code == 404
