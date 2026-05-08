from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict, EmailStr
from typing import List, Optional
import uuid
from datetime import datetime, timezone


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / ".env")

# MongoDB connection
mongo_url = os.environ["MONGO_URL"]
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ["DB_NAME"]]

app = FastAPI(title="AutoSolutions.in API")
api_router = APIRouter(prefix="/api")


# ----------- Models -----------
class LeadCreate(BaseModel):
    name: str = Field(..., min_length=1, max_length=120)
    business_type: str = Field(..., min_length=1, max_length=80)
    phone: str = Field(..., min_length=4, max_length=24)
    email: Optional[EmailStr] = None
    message: Optional[str] = Field(default="", max_length=2000)


class Lead(BaseModel):
    model_config = ConfigDict(extra="ignore")

    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    business_type: str
    phone: str
    email: Optional[str] = None
    message: Optional[str] = ""
    created_at: datetime = Field(
        default_factory=lambda: datetime.now(timezone.utc)
    )


class LeadResponse(BaseModel):
    success: bool
    lead_id: str
    message: str


# ----------- Routes -----------
@api_router.get("/")
async def root():
    return {"message": "AutoSolutions.in API", "status": "ok"}


@api_router.get("/health")
async def health():
    return {"status": "healthy", "service": "autosolutions-api"}


@api_router.post("/leads", response_model=LeadResponse)
async def create_lead(payload: LeadCreate):
    lead = Lead(**payload.model_dump())
    doc = lead.model_dump()
    doc["created_at"] = doc["created_at"].isoformat()
    try:
        await db.leads.insert_one(doc)
    except Exception as e:
        logging.exception("lead insert failed")
        raise HTTPException(status_code=500, detail="Could not save lead") from e
    return LeadResponse(
        success=True,
        lead_id=lead.id,
        message="Thanks! Our team will reach out within 24 hours.",
    )


@api_router.get("/leads", response_model=List[Lead])
async def list_leads(limit: int = 100):
    cursor = db.leads.find({}, {"_id": 0}).sort("created_at", -1).limit(limit)
    results = await cursor.to_list(limit)
    for r in results:
        if isinstance(r.get("created_at"), str):
            try:
                r["created_at"] = datetime.fromisoformat(r["created_at"])
            except ValueError:
                r["created_at"] = datetime.now(timezone.utc)
    return results


@api_router.get("/stats/public")
async def public_stats():
    """Lightweight static showcase stats for the marketing site."""
    return {
        "businesses_automated": 500,
        "messages_sent": 10_000_000,
        "satisfaction_pct": 98,
        "uptime": "24/7",
    }


app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get("CORS_ORIGINS", "*").split(","),
    allow_methods=["*"],
    allow_headers=["*"],
)

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s - %(name)s - %(levelname)s - %(message)s",
)
logger = logging.getLogger(__name__)


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
