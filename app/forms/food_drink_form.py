from flask_wtf import FlaskForm
from wtforms import StringField,SelectField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import Event

class FoodDrinkForm(FlaskForm):
    name_of_food = StringField('Name Of Food', validators=[DataRequired()])
    name_of_drink = StringField('Name Of Drink', validators=[DataRequired()])
    type_of_food = SelectField('Type Of Food',choices=[
            ('', 'Select a type'),  
            ('italian', 'Italian'),
            ('chinese', 'Chinese'),
            ('mexican', 'Mexican'),
            ('indian', 'Indian'),
            ('american', 'American'),
            ('japanese', 'Japanese'),
            ('thai', 'Thai'),
            ('french', 'French'),
            ('greek', 'Greek'),
            ('spanish', 'Spanish'),
            ('vietnamese', 'Vietnamese'),
            ('korean', 'Korean'),
            ('mediterranean', 'Mediterranean'),
            ('seafood', 'Seafood'),
            ('vegetarian', 'Vegetarian'),
            ('vegan', 'Vegan'),
            ('gluten_free', 'Gluten-Free'),
            ('kosher', 'Kosher'),
            ('halal', 'Halal'),
            ('Other', 'Other')
        ],
        validators=[DataRequired()]
    )
    notes = StringField('Notes', validators=[DataRequired()])
