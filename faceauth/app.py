from contextlib import asynccontextmanager
import logging
import os
from services import Notification
from fastapi import FastAPI, Response, status
from services import ImageVerification, ImageManager
from models import *
from config import *
from db import image_db

logger = logging.getLogger(__name__)
logging.basicConfig(filename="faceverif.log", encoding="utf-8", level=logging.DEBUG,
                    format="%(asctime)s %(message)s")

@asynccontextmanager
async def lifespan(app: FastAPI):
    """This script will run on the startup of the server."""
    ImageVerification.start()
    Notification.start()
    image_db.start()

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
async def register(payload: FaceRegistrationPayload, res: Response):
    preprocessed = []

    for b64_img in payload.images:
        preprocessed.append(ImageManager.preprocess(b64_img))

    try:
        ImageVerification.register(payload.master_id, payload.member_id, preprocessed)
    except ImageVerification.FaceException as e:
        res.status_code = status.HTTP_202_ACCEPTED
        return { "result": "failed", "img": e.img_idx, "reason": e.error_msg }

    return { "result": "successful" }

@app.post("/deregister")
async def deregister(data: DeregisterBody):
    ImageVerification.deregister(data.master_id, data.member_id)
