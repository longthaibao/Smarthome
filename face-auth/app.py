from contextlib import asynccontextmanager
import logging
from fastapi import FastAPI
from deepface import DeepFace
from utils import base64_to_image
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

    """After the server is finished, all lines of code below here are executed."""
    return

app = FastAPI(debug=True, lifespan=lifespan)

@app.post("/verify")
async def verify(images: VerifData) -> VerifResult:
    """Endpoint for verifying a captured image against a list of reference images.

    Args:
        images (VerifData): Verification data containing the captured image and a list of reference images with user IDs.

    Returns:
        VerifResult: Result of the verification process, including the identified user ID if verification is successful.
    """

    logger = logging.getLogger("faceveriflogger")
    logger.info(f"Start verifying face. The incoming base64-encoded camera face image: {images.captured_img[:10]}...")
    np_captured = base64_to_image(images.captured_img)

    for reference in images.references:
        np_ref_img = base64_to_image(reference.ref_img)
        try:
            ver_result = DeepFace.verify(np_ref_img, np_captured, model_name=FACE_REG_MODEL_NAME)
            if ver_result['verified']:
                logger.info(f"Result: recognized, verif_id={images.verif_id}, user_id={reference.user_id}")
                return VerifResult(user_id=reference.user_id)
            else:
                logger.info(f"Result: unrecognized. verif_id={images.verif_id}, user_id={reference.user_id})")
        except ValueError as e:
            logger.error(f"An error occurred. verif_id={images.verif_id}, user_id={reference.user_id}, Reason: {e}")
            continue

    
    return VerifResult(user_id=None)
