import io
import base64
from PIL import Image
from config import IMAGE_DB_DIR
import fnmatch
import numpy as np
import os
import cv2
import cloudinary.uploader

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

def upload_image(master_id: str, np_img: np.ndarray) -> str:
    """Upload an image to the image server.

    Returns:
        An url (str) to the uploaded image.
    """

    # TODO: Implement this function that is used to upload an image to the cloud.
    image = Image.fromarray(np_img)
    buff = io.BytesIO()
    image.save(buff, format="PNG")
    # move the buffer cursor to the beginning
    buff.seek(0)
    result = cloudinary.uploader.upload(buff)
    return result["url"]

def preprocess(pre_img: bytes | str) -> np.ndarray:
    if type(pre_img) is bytes:
        with Image.open(io.BytesIO(pre_img)) as img:
            rgb_img = img.convert('RGB')
            return np.array(rgb_img)
    else:
        b64_img = pre_img
        # Decode the base64 string
        decoded_bytes = base64.b64decode(b64_img)
        
        # Convert bytes to PIL Image
        image = Image.open(io.BytesIO(decoded_bytes))
        
        # Convert PIL Image to numpy array
        numpy_array = np.array(image)
        
        return numpy_array

def convert_to_b64(np_img: np.ndarray) -> str:
    # Convert the NumPy array to an image
    image = Image.fromarray(np_img)

    # Create a BytesIO object to hold the image data
    image_buffer = io.BytesIO()

    # Save the image to the BytesIO object in PNG format
    image.save(image_buffer, format="PNG")

    # Convert the image data to a Base64 string
    base64_str = base64.b64encode(image_buffer.getvalue()).decode("utf-8")

    return base64_str
