from flask import Blueprint, request
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import os
import random
import string
import smtplib

test_email = Blueprint('test_email', __name__)

sender_email = os.getenv('EMAIL')
password = os.getenv('EMAIL_PASS')
receiver_email = os.getenv("EMAIL")

def generate_family_code(length=6):
    # Generate a random string of uppercase letters and digits
    return ''.join(random.choices(string.ascii_uppercase + string.digits, k=length))

def send_email(subject, body, recipient_email):
    sender_email = os.getenv('EMAIL')
    password = os.getenv('EMAIL_PASS')

    # Create the email
    msg = MIMEMultipart()
    msg['From'] = sender_email
    msg['To'] = recipient_email
    msg['Subject'] = subject

    # Attach the email body
    msg.attach(MIMEText(body, 'plain'))

    try:
        # Connect to the SMTP server
        with smtplib.SMTP_SSL('smtp.gmail.com', 465) as server:
            server.login(sender_email, password)
            # Send the email
            server.sendmail(sender_email, recipient_email, msg.as_string())
            print("Email sent successfully!")
    except Exception as e:
        print(f"Failed to send email: {e}")

def send_family_code_email(user_email, family_code):
    subject = "Your Family Code"
    body = f"Welcome! Your family code is {family_code}. You can use this code to access shared events and plans."
    send_email(subject, body, user_email)

@test_email.route('/send_test_email', methods=['GET'])
def send_test_email():
    user_email = os.getenv('EMAIL') 
    if not user_email:
        return "Recipient email not configured", 500  # Return error if no email is set in .env

    try:
        family_code = generate_family_code()
        send_family_code_email(user_email, family_code)  # Use environment variable for recipient email
        return "Test email sent!"
    except Exception as e:
        return f"Failed to send email: {e}"