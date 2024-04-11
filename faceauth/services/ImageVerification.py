import io
import os
from PIL import Image
from deepface import DeepFace
import numpy as np
from . import ImageManager
from config import IMAGE_DB_DIR


class FaceException(Exception):
    def __init__(self, img_idx: int, error_msg: str):
        self.img_idx = img_idx
        self.error_msg = error_msg

    def __str__(self):
        return f"image {self.img_idx}, {self.error_msg}"

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

def verify(master_id: str, image: np.ndarray):
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
