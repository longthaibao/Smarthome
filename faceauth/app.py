from contextlib import asynccontextmanager
import logging
import os
from typing import Annotated
from fastapi import FastAPI, Form, Response, UploadFile, status
from deepface import DeepFace
from services import ImageVerification, ImageManager
from models import *
from config import *

logger = logging.getLogger(__name__)
logging.basicConfig(filename="faceverif.log", encoding="utf-8", level=logging.DEBUG,
                    format="%(asctime)s %(message)s")

@asynccontextmanager
async def lifespan(app: FastAPI):
    """This script will run on the startup of the server."""

    logger = logging.getLogger("faceveriflogger")
    logger.info(f"Loading face verification model. Model name: {FACE_REG_MODEL_NAME}")
    DeepFace.build_model(FACE_REG_MODEL_NAME)
    yield

    # create directory used to store image data
    try:
        os.mkdir(IMAGE_DB_DIR)
    except FileExistsError as e:
        pass

    """After the server is finished, all lines of code below here are executed."""
    return

app = FastAPI(debug=True, lifespan=lifespan)

@app.post("/register")
async def register(master_id: Annotated[str, Form()], member_id: Annotated[str, Form()], images: list[UploadFile], res: Response):
    preprocessed = []

    for image_file in images:
        raw_img = await image_file.read()
        preprocessed.append(ImageManager.preprocess(raw_img))

    try:
        ImageVerification.register(master_id, member_id, preprocessed)
    except ImageVerification.FaceException as e:
        res.status_code = status.HTTP_202_ACCEPTED
        return { "result": "failed", "img": e.img_idx, "reason": e.error_msg }

    return { "result": "successful" }

@app.post("/deregister")
async def deregister(data: DeregisterBody):
    ImageVerification.deregister(data.master_id, data.member_id)

@app.post("/verify")
async def verify(master_id: Annotated[str, Form()], member_id: Annotated[str, Form()], image: UploadFile):
    raw_img = await image.read()
    preprocessed_img = ImageManager.preprocess(raw_img)
    verif_result = ImageVerification.verify(master_id, preprocessed_img)
    return verif_result
