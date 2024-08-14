from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, ValidationError
from app.models import User

import os

FAMILY_CODE = os.environ.get('FAMILY_CODE')

def family_code_matches(form, field):
    if field.data != FAMILY_CODE:
        raise ValidationError('Family code is incorrect.')


class SignUpForm(FlaskForm):
    first_name = StringField('First Name', validators=[DataRequired()])
    last_name = StringField('Last Name', validators=[DataRequired()])
    family_code = StringField('Family Code', validators=[DataRequired(), family_code_matches])
