from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash


class FoodDrink(db.Model):
    __tablename__ = "food_drink"
    
    if environment == "production":
        __table_args__ = {'schema':SCHEMA}
    
    id = db.Column(db.Integer, primary_key=True)
    event_id = db.Column(db.Integer, db.ForeignKey('events.id'))
    brought_by_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    name_of_food = db.Column(db.String(50), nullable = False)
    name_of_drink = db.Column(db.String(50))
    type_of_food = db.Column(db.String(50), nullable = False)
    notes = db.Column(db.String(150))
    
    event = db.relationship('Event', backref='food_drinks')
    
    brought_by = db.relationship('User', backref='brought_food_drinks')
    
    def to_dict(self):
        return {
            "id":self.id,
            "name_of_food":self.name_of_food,
            "name_of_drink":self.name_of_drink,
            "type_of_food": self.type_of_food
        }
    