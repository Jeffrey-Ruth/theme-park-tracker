from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.database import engine, Base
from app import models
from sqlalchemy import text
import requests

models.Base.metadata.create_all(bind=engine)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"message": "Theme Park Tracker API is running"}

@app.get("/test-db")
def test_db():
    with engine.connect() as conn:
        conn.execute(text("SELECT 1"))
    return {"message": "Database connected successfully"}

@app.get("/parks/wait-times")
def get_all_wait_times():
    park_ids = {
        "Magic Kingdom": 6,
        "EPCOT": 5,
        "Hollywood Studios": 7,
        "Animal Kingdom": 8,
        "Universal Studios Florida": 65,
        "Islands of Adventure": 66,
    }
    
    all_rides = []
    for park_name, park_id in park_ids.items():
        url = f"https://queue-times.com/parks/{park_id}/queue_times.json"
        response = requests.get(url)
        data = response.json()
        rides = [
            {**ride, "park": park_name}
            for land in data["lands"]
            for ride in land["rides"]
        ]
        all_rides.extend(rides)
    
    return {"rides": all_rides}