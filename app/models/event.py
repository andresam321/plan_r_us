from .db import db, environment, SCHEMA



class Event(db.Model):
    __tablename__ = "events"
    
    if environment == "production":
        __table_args__ = {'schema':SCHEMA}
    
    id = db.Column(db.Integer, primary_key=True)
    # attending_event = db.Column(db.String(100), nullable = False)
    creator_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    name = db.Column(db.String(100), nullable = False)
    description = db.Column(db.String(100), nullable = False)
    event_date = db.Column(db.String(100), nullable = False)
    location = db.Column(db.String(100), nullable = False)
    organizer = db.Column(db.String(100), nullable = False)
    cut_of_date_to_bring_items = db.Column(db.String(100), nullable = False)
    
    event_maker = db.relationship('User', back_populates='created_events')
    food_drinks = db.relationship('FoodDrink', back_populates='event', cascade='all, delete-orphan')
    attendees = db.relationship('EventAttendance', back_populates='event',cascade="all, delete-orphan")
    
    def to_dict(self):
        return {
            "id":self.id,
            "name":self.name,
            "decription":self.description,
            "event_date":self.event_date,
            "location":self.location,
            "organizer":self.organizer        

        }