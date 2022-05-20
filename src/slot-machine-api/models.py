from sqlalchemy import Column, String, Integer, Numeric, Identity
from database import Base


class Record(Base):
    __tablename__ = "records"
    id = Column(Integer, Identity(always=True, start=1, cycle=True), primary_key="true",)
    player = Column(String)
    day = Column(String)
    earnings = Column(Numeric(scale=2))

