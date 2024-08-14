from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash


class Event(db.model):
    __tablename__ = "events"
    
    if environment == "production":
        __table_args__ = {'schema':SCHEMA}
    
    id = db.Column(db.Integer, primary_key=True)
    