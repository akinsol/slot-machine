from database import Session
import models
import schemas


def add_record(record: schemas.Record):
    s = Session()
    new_record = models.Record(player=record.player, day=record.day, earnings=record.earnings)
    s.add(new_record)
    s.commit()
    s.refresh(new_record)
    s.close()


def get_leaderboard():
    s = Session()
    leaderboard = s.query(models.Record).order_by(models.Record.earnings.desc()).limit(10).all()
    s.close()
    return leaderboard


def get_records():
    s = Session()
    records = s.query(models.Record).all()
    s.close()
    return records


def search_records(search):
    s = Session()
    records = s.query(models.Record).filter(models.Record.player.ilike(search))\
        .order_by(models.Record.earnings.desc()).all()
    s.close()
    return records
