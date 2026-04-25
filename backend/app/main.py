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

BLOCKLIST = {
    "Universal Studios Florida - Single Rider",
    "Islands of Adventure - Single Rider",
    "Halloween Horror Nights",
    "Harry Potter and the Escape from Gringotts™ Single Rider",
    "Expedition Everest - Legend of the Forbidden Mountain Single Rider",
    "Fast & Furious - Supercharged™ Single Rider",
    "MEN IN BLACK™ Alien Attack!™ Single Rider",
    "Millennium Falcon: Smugglers Run Single Rider",
    "Remy's Ratatouille Adventure Single Rider",
    "Revenge of the Mummy™ Single Rider",
    "Star Wars: Rise of the Resistance Single Rider",
    "Test Track Presented by Chevrolet Single Rider",
    "Fallout",
    "Five Nights at Freddy's",
    "Jason Universe",
    "Monstruos 3",
    "Poltergeist",
    "Scarecrow: Music by Slash",
    "Terrifier",
    "Terror Tram: Blumhouse",
    "WWE Wyatt Sicks",
    "Chainsaw Man",
    "Dolls: Let’s Play Dead",
    "El Artista: A Spanish Haunting",
    "Five Nights At Freddy’s",
    "Gálkn: Monsters of the North",
    "Grave of Flesh",
    "Hatchet and Chains: Demon Bounty Hunters",
    "JASON UN1V3RSE",
    "WWE Presents: The Horrors of the Wyatt Sicks",
    "Hagrid's Magical Creatures Motorbike Adventure™ Single Rider",
    "Harry Potter and the Forbidden Journey™ Single Rider",
    "The Amazing Adventures of Spider-Man® Single Rider",
    "The Incredible Hulk Coaster® Single Rider",
    "Harry Potter and the Battle at the Ministry™ Single Rider",
    "Mario Kart™: Bowser's Challenge Single Rider",
    "Mine-Cart Madness™ Single Rider",
    "Monsters Unchained: The Frankenstein Experiment Single Rider",
    "Stardust Racers Single Rider",
    "Curse of the Werewolf Single Rider",
    




}

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
        "Islands of Adventure": 64,
        "Epic Universe": 334,
    }
    
    all_rides = []
    for park_name, park_id in park_ids.items():
        url = f"https://queue-times.com/parks/{park_id}/queue_times.json"
        response = requests.get(url)
        data = response.json()
        seen_names = set()
        for land in data["lands"]:
            for ride in land["rides"]:
                if ride["name"] not in BLOCKLIST and ride["name"] not in seen_names:
                    seen_names.add(ride["name"])
                    all_rides.append({**ride, "park": park_name})
    
    return {"rides": all_rides}