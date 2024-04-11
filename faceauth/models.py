from pydantic import BaseModel

class RefImg(BaseModel):
    user_id: str
    image: str

class FaceRegistrationData(BaseModel):
    user_id: str

class DeregisterBody(BaseModel):
    master_id: str
    member_id: str


class VerifData(BaseModel):
    captured_img: str
    references: list[RefImg]

class VerifResult(BaseModel):
    user_id: str | None

class Image(BaseModel):
    img: str
