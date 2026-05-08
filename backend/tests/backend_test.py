"""Backend API tests for AutoSolutions.in marketing site."""
import os
import pytest
import requests

BASE_URL = os.environ.get("REACT_APP_BACKEND_URL", "https://bot-solutions-india.preview.emergentagent.com").rstrip("/")
API = f"{BASE_URL}/api"


@pytest.fixture(scope="module")
def session():
    s = requests.Session()
    s.headers.update({"Content-Type": "application/json"})
    return s


# ---------- Health & Stats ----------
class TestHealth:
    def test_health_endpoint(self, session):
        r = session.get(f"{API}/health", timeout=15)
        assert r.status_code == 200
        data = r.json()
        assert data["status"] == "healthy"

    def test_root_endpoint(self, session):
        r = session.get(f"{API}/", timeout=15)
        assert r.status_code == 200
        assert "status" in r.json()


class TestPublicStats:
    def test_stats_keys_present(self, session):
        r = session.get(f"{API}/stats/public", timeout=15)
        assert r.status_code == 200
        data = r.json()
        for key in ["businesses_automated", "messages_sent", "satisfaction_pct", "uptime"]:
            assert key in data, f"Missing key: {key}"
        assert isinstance(data["businesses_automated"], int)
        assert isinstance(data["messages_sent"], int)
        assert isinstance(data["satisfaction_pct"], int)


# ---------- Leads CRUD ----------
class TestLeadsCreate:
    def test_create_lead_minimal(self, session):
        payload = {
            "name": "TEST_Minimal User",
            "business_type": "clinic",
            "phone": "+919999000001",
        }
        r = session.post(f"{API}/leads", json=payload, timeout=15)
        assert r.status_code == 200, r.text
        data = r.json()
        assert data["success"] is True
        assert isinstance(data["lead_id"], str) and len(data["lead_id"]) > 0
        assert "message" in data

    def test_create_lead_full_fields(self, session):
        payload = {
            "name": "TEST_Full Fields",
            "business_type": "restaurant",
            "phone": "+919999000002",
            "email": "test_full@example.com",
            "message": "I want WhatsApp automation",
        }
        r = session.post(f"{API}/leads", json=payload, timeout=15)
        assert r.status_code == 200, r.text
        data = r.json()
        assert data["success"] is True
        # Verify persistence by fetching list
        list_r = session.get(f"{API}/leads", timeout=15)
        assert list_r.status_code == 200
        leads = list_r.json()
        match = [l for l in leads if l.get("id") == data["lead_id"]]
        assert match, "Created lead not found in list"
        lead = match[0]
        assert lead["name"] == payload["name"]
        assert lead["email"] == payload["email"]
        assert lead["business_type"] == payload["business_type"]


class TestLeadsValidation:
    def test_missing_name_returns_422(self, session):
        r = session.post(f"{API}/leads", json={"business_type": "cafe", "phone": "+911111111"}, timeout=15)
        assert r.status_code == 422

    def test_missing_phone_returns_422(self, session):
        r = session.post(f"{API}/leads", json={"name": "TEST_no_phone", "business_type": "cafe"}, timeout=15)
        assert r.status_code == 422

    def test_missing_business_type_returns_422(self, session):
        r = session.post(f"{API}/leads", json={"name": "TEST_no_bt", "phone": "+911111111"}, timeout=15)
        assert r.status_code == 422

    def test_invalid_email_returns_422(self, session):
        r = session.post(
            f"{API}/leads",
            json={
                "name": "TEST_bad_email",
                "business_type": "cafe",
                "phone": "+911111111",
                "email": "not-an-email",
            },
            timeout=15,
        )
        assert r.status_code == 422


class TestLeadsList:
    def test_list_leads_no_object_id_leak(self, session):
        # Create one to make sure list isn't empty
        session.post(
            f"{API}/leads",
            json={"name": "TEST_list_check", "business_type": "retail", "phone": "+919999000003"},
            timeout=15,
        )
        r = session.get(f"{API}/leads", timeout=15)
        assert r.status_code == 200
        leads = r.json()
        assert isinstance(leads, list)
        assert len(leads) >= 1
        for lead in leads:
            assert "_id" not in lead, "MongoDB _id should not be exposed"
            assert "id" in lead
            assert "name" in lead
            assert "phone" in lead
            assert "business_type" in lead

    def test_list_leads_sorted_recent_first(self, session):
        # Create two leads in order
        a = session.post(
            f"{API}/leads",
            json={"name": "TEST_sort_A", "business_type": "hospital", "phone": "+919999000010"},
            timeout=15,
        ).json()
        b = session.post(
            f"{API}/leads",
            json={"name": "TEST_sort_B", "business_type": "hospital", "phone": "+919999000011"},
            timeout=15,
        ).json()
        r = session.get(f"{API}/leads", timeout=15)
        assert r.status_code == 200
        leads = r.json()
        ids = [l["id"] for l in leads]
        # B was created after A; B should appear before A
        assert b["lead_id"] in ids and a["lead_id"] in ids
        assert ids.index(b["lead_id"]) < ids.index(a["lead_id"])
