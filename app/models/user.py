from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin


class User(db.Model, UserMixin):
    __tablename__ = 'users'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(40), nullable=False, unique=True)
    last_name = db.Column(db.String(40), nullable=False, unique=True)
    # email = db.Column(db.String(255), nullable=False, unique=True)
    # hashed_password = db.Column(db.String(255), nullable=False)
    family_code = db.Column(db.String(10), nullable=True)
    
    created_events = db.relationship("Event", back_populates ="event_maker",cascade='all, delete-orphan')
    brought_food_drinks = db.relationship("FoodDrink", back_populates ="brought_by",cascade='all, delete-orphan')

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)
    
    def check_family_code(self, family_code):
        return self.family_code == family_code


    def to_dict(self):
        return {
            'id': self.id,
            'first_name': self.first_name,
            'last_name': self.last_name,
            'family_code': self.family_code
        }

