import crud
from fastapi import FastAPI
import schemas
from starlette.middleware.cors import CORSMiddleware
from typing import List

origins = [
    "http://127.0.0.1:8000"
]

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.post("/add_record/", response_model=schemas.Record)
def add_record(record: schemas.Record):
    return crud.add_record(record)


@app.get("/records/", response_model=List[schemas.Record])
def get_records():
    return crud.get_records()


@app.get("/leaderboard/", response_model=List[schemas.Record])
def get_leaderboard():
    return crud.get_leaderboard()


@app.get("/search/{search}", response_model=List[schemas.Record])
def get_search_results(search: str):
    return crud.search_records(search)
