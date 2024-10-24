from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, ValidationError
from app.models import User

import os


def family_code_matches(form, field):
    family_code = field.data

    # Query for a user matching the family code
    user = User.query.filter_by(family_code=family_code).first()

    # If no user is found, raise a validation error
    if not user:
        raise ValidationError('Invalid family code.')
    

def user_exists(form, field):
    # Checking if user exists
    email = field.data
    user = User.query.filter(User.email == email).first()
    if not user:
        raise ValidationError('Email provided not found.')

def password_matches(form, field):
    # Checking if password matches
    password = field.data
    email = form.data['email']
    user = User.query.filter(User.email == email).first()
    if not user:
        raise ValidationError('No such user exists.')
    if not user.check_password(password):
        raise ValidationError('Password was incorrect.')
    

class LoginForm(FlaskForm):
    email = StringField('email', validators=[DataRequired(), user_exists])
    password = StringField('password', validators=[DataRequired(), password_matches])
    family_code = StringField('Family Code', validators=[DataRequired(), family_code_matches])