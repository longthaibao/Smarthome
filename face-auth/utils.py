import base64
from io import BytesIO
import numpy as np
from PIL import Image

def base64_to_image(base64_string):
    """
    Convert a base64 encoded string representing an image to a numpy array.

    Parameters:
        base64_string (str): The base64 encoded string representing the image.

    Returns:
        numpy.ndarray: A numpy array representing the image.
    """
    image_data = base64.b64decode(base64_string)
    image = Image.open(BytesIO(image_data))
    image_array = np.array(image)
    
    return image_array
