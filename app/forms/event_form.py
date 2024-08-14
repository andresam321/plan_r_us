from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import Event


class EventForm(FlaskForm):
    name = StringField('name', validators=[DataRequired()])
    description = StringField('Description', validators=[DataRequired()])
    event_date = StringField('Event Date', validators=[DataRequired()])
    location = StringField('Location', validators=[DataRequired()])
    organizer = StringField('Organizer', validators=[DataRequired()])
    cut_of_date_to_bring_items = StringField('Cut Of Date To Bring Items', validators=[DataRequired()])
    