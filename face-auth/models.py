from pydantic import BaseModel

class RefImg(BaseModel):
    ref_img: str
    user_id: str

class VerifData(BaseModel):
    verif_id: str
    captured_img: str
    references: list[RefImg]

class VerifResult(BaseModel):
    user_id: str | None
