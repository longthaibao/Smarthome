import io
from PIL import Image
from config import IMAGE_DB_DIR
import fnmatch
import numpy as np
import os
import cv2

def save_images(home_id: str, user_id: str, images: list[np.ndarray]):
    try:
        if not os.path.isdir(IMAGE_DB_DIR + f"/{home_id}"):
            os.mkdir(IMAGE_DB_DIR + f"/{home_id}")
    except FileExistsError as e:
        pass

    home_img_db = IMAGE_DB_DIR + f"/{home_id}/"
    for i, np_img in enumerate(images):
        cv2.imwrite(f"{home_img_db}/{user_id}_{i}.jpg", cv2.cvtColor(np_img, cv2.COLOR_RGB2BGR))

def remove_images(home_id: str, user_id: str):
    home_img_db = IMAGE_DB_DIR + f"/{home_id}/"

    try:
        for img_file in os.listdir(home_img_db):
            if fnmatch.fnmatch(img_file, f"{user_id}_*"):
                os.remove(f"{home_img_db}/{img_file}")
    except FileNotFoundError as e:
        return

def preprocess(binary_img: bytes) -> np.ndarray:
    with Image.open(io.BytesIO(binary_img)) as img:
        rgb_img = img.convert('RGB')
        return np.array(rgb_img)

