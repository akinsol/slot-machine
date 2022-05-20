from typing import Optional
from pydantic import BaseModel, BaseConfig

BaseConfig.arbitrary_types_allowed = True


class Record(BaseModel):
    id: Optional[int]
    player: Optional[str]
    day: Optional[str]
    earnings: Optional[float]

    class Config:
        orm_mode = True

