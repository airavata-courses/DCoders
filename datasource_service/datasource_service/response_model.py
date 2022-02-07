from pydantic import BaseModel


class ResponseModel(BaseModel):
    year: int
    month: int
    day: int
    radar: str
    encoded_image: str
