import os

PORT = 8000 # application's port.
FACE_REG_MODEL_NAME = "VGG-Face"                        # model used for face recognition task.
IMAGE_DB_DIR = os.path.join(os.getcwd(), "image-db")   # directory to the folder storing face images.

ADAFRUIT_IO_KEY = ''
ADAFRUIT_IO_USERNAME = ''

FIREBASE_PROJECT_ID = ''
FIREBASE_CRED_PATH = os.path.join(os.getcwd(), '')

CLOUDINARY_API_KEY = ''
CLOUDINARY_API_SECRET = ''
CLOUDINARY_NAME = ''
