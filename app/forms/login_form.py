from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, ValidationError
from app.models import User

import os

FAMILY_CODE = os.environ.get('FAMILY_CODE')

def family_code_matches(form, field):
    family_code = field.data
    user = User.query.filter(User.first_name == form.data['first_name']).first()
    if not user or user.family_code != family_code:
        raise ValidationError('Invalid first name or family code.')

class LoginForm(FlaskForm):
    first_name = StringField('First Name', validators=[DataRequired()])
    family_code = StringField('Family Code', validators=[DataRequired(), family_code_matches])