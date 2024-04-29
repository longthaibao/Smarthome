from datetime import datetime
import io
import traceback
import os
from PIL import Image
from Adafruit_IO import MQTTClient, Client
from deepface import DeepFace
import numpy as np
from . import ImageManager
from config import FACE_REG_MODEL_NAME, ADAFRUIT_IO_USERNAME, ADAFRUIT_IO_KEY
from config import IMAGE_DB_DIR
from db import connection
import logging

class FaceException(Exception):
    def __init__(self, img_idx: int, error_msg: str):
        self.img_idx = img_idx
        self.error_msg = error_msg

    def __str__(self):
        return f"image {self.img_idx}, {self.error_msg}"

logger = logging.getLogger("faceveriflogger")

def start():
    """Start the module."""
    logger.info(f"Loading face verification model. Model name: {FACE_REG_MODEL_NAME}")
    DeepFace.build_model(FACE_REG_MODEL_NAME)
    DeepFace.find(f"{IMAGE_DB_DIR}/__startup__/obama_0.jpg", f"{IMAGE_DB_DIR}/__startup__", enforce_detection=False, silent=True)
    logger.info(f"Successfully loaded the model.")
    loop_verify()

def register(master_id: str, member_id: str, images: list[np.ndarray]):
    extracted_faces = []

    # extract faces from images. Ensure that each image contains exactly one face.
    for i, image in enumerate(images):
        try:
            extracted = DeepFace.extract_faces(image, align=False)
        except ValueError as e:
            # If the face detector detects no faces from the image.
            raise FaceException(i, str(e))

        if len(extracted) != 1:
            raise FaceException(i, f"detected {len(extracted)} faces.")

        np_face = (extracted[0]["face"] * 255)[:, :, ::-1]
        extracted_faces.append(np_face)

    ImageManager.save_images(master_id, member_id, extracted_faces)

def deregister(master_id: str, member_id: str):
    # remove all face data of the user from the database
    ImageManager.remove_images(master_id, member_id)

def loop_verify():
    client = MQTTClient(ADAFRUIT_IO_USERNAME, ADAFRUIT_IO_KEY)

    # add callback for each event.
    client.on_connect = __adafruit_on_connect
    client.on_disconnect = __adafruit_on_disconnect
    client.on_message = __adafruit_on_message

    client.connect()
    client.loop_background()

def __verify(master_id: str, image: np.ndarray):
    # Verify the input image against the images in the database

    # there can be multiple accepted faces in the incoming image, so the result has to be a list of
    # dataframe, each one corresponds to an identity.
    result_dfs = DeepFace.find(image, f"{IMAGE_DB_DIR}/{master_id}", enforce_detection=False, silent=True)

    verified = False
    member_ids = []

    for result_df in result_dfs:
        if len(result_df) < 1:
            continue

        verified = True

        # Retrieve the row that has the minimum distance and get its identity (file's directory)
        identity = result_df.loc[result_df['distance'].idxmin(), 'identity']

        member_id = os.path.split(identity)[1].split('_')[0]
        member_ids.append(member_id)

    return { 'verified': verified, 'member_ids': member_ids, 'master_id': master_id }

def __adafruit_on_message(client, feed_id: str, payload: str):
    master_id, feed_type = __parse_feed_name(feed_id)
    if feed_type == "door":
        return

    try:
        np_img = ImageManager.preprocess(payload)
        verif_result = __verify(master_id, np_img)
        if verif_result['verified']:
            # Member's face is detected, open the door
            logger.info(f"Face detected: {verif_result}")
            __handle_opening_door(master_id)

        # TODO: save the verification history
        img_b64 = ImageManager.convert_to_b64(np_img)
        connection.create_document("IOT", { "image": img_b64, "date": datetime.now()  })
    except Exception as e:
        print("an error occurred, payload = " + payload)
    

def __adafruit_on_connect(client):
    # TODO: Fetch all master's id

    # TODO: register all feeds of every user (camera feed, door feeed)
    client.subscribe(__get_image_feed_name("nam"))
    client.subscribe(__get_door_feed_name("nam"))

def __adafruit_on_disconnect(client):
    pass

def __get_image_feed_name(master_id):
    return f"{master_id}-camera"

def __get_door_feed_name(master_id):
    return f"{master_id}-door"

def __parse_feed_name(feed_name: str):
    split_pos = feed_name.rfind("-")
    assert split_pos != -1
    master_id, feed_type = feed_name[:split_pos], feed_name[split_pos + 1:]
    return master_id, feed_type

def __handle_opening_door(master_id: str):
    # TODO: Send signal to AdaFruit server that trigger the door of master's home to open.
    door_feed_name = __get_door_feed_name(master_id)
    ada_client = Client(ADAFRUIT_IO_USERNAME, ADAFRUIT_IO_KEY)
    door_feed = ada_client.feeds(door_feed_name)
    ada_client.send_data(door_feed.key, "1")
    logger.info(f"Door of master {master_id} is opened.")
