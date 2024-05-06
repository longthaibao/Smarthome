from firebase_admin.credentials import Certificate
import numpy as np
import firebase_admin
import firebase_admin.messaging as messaging
import config
from services import ImageManager

def start():
    # firebase credential
    cred = Certificate(config.FIREBASE_CRED_PATH)

    firebase_admin.initialize_app(cred, options={
            "projectId": config.FIREBASE_PROJECT_ID,
        })

def send_notification(master_id, img_url, verif_result):
    reg_tk = __get_registration_token(master_id)

    if verif_result['verified']:
        notif_title = "A member comes into the house!"
    else:
        notif_title = "There may be a guest coming to your house!"

    notif = messaging.Notification(notif_title, image=img_url)
    message = messaging.Message(token=reg_tk, notification=notif, data={ "message": "Hello world" })
    print("message's id = " + messaging.send(message))

def __get_registration_token(master_id):
    # TODO: Implement this function that is used to retrieve registration token belonging to the
    # home master's device.
    return "e4XC4wthnTS7kEos04c46q:APA91bGpSOZG4EsDfejLRentA_AAxiKE7AKnyR3kJx4Hv49SXmIiYRmxSItOM63XIUDYf1_7YSL-czrQRtfLb-HKyiyalgcOtNr331jOE3nbyRMf96jE8BUPKUwATsU_Z7o3X6tpZ2cm"
