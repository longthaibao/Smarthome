from pydantic import BaseModel

class RefImg(BaseModel):
    user_id: str
    image: str

class FaceRegistrationPayload(BaseModel):
    master_id: str          # id of the home master
    member_id: str          # member id
    images: list[str]       # multiple images in base64 format

class DeregisterBody(BaseModel):
    master_id: str
    member_id: str

class VerifResult(BaseModel):
    user_id: str | None

class Image(BaseModel):
    img: str
