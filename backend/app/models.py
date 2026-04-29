from sqlalchemy import Column, Integer, String, DateTime
from sqlalchemy.sql import func
from app.database import Base

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, nullable=False)
    email = Column(String, unique=True, nullable=False)
    password = Column(String, nullable=False)
    created_at = Column(DateTime, default=func.now())

class Favorite(Base):
    __tablename__ = "favorites"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, nullable=False)
    ride_id = Column(Integer, nullable=False)

class RideLog(Base):
    __tablename__ = "ride_logs"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, nullable=False)
    ride_id = Column(Integer, nullable=False)
    ride_count = Column(Integer, default=0)

class RideDetail(Base):
    __tablename__ = "ride_details"

    id = Column(Integer, primary_key=True, index=True)
    ride_id = Column(Integer, unique=True, nullable=False)
    name = Column(String, nullable=False)
    height_requirement = Column(String, nullable=True)
    year_opened = Column(Integer, nullable=True)
    speed = Column(String, nullable=True)