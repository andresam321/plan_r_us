from .db import db, environment, SCHEMA, add_prefix_for_prod



class EventAttendance(db.Model):
    __tablename__ ='event_attendance'

    if environment == "production":
        __table_args__ = {'schema':SCHEMA}
        
    user_id = db.Column(db.Integer,db.ForeignKey('users.id'), primary_key=True)
    event_id = db.Column(db.Integer,db.ForeignKey('events.id'), primary_key=True)

    user = db.relationship('User', back_populates='attending_events')
    event = db.relationship('Event', back_populates='attendees')


    def to_dict(self):
        return {
            'user_id': self.user_id,
            'event_id': self.event_id,
            'user': self.user.to_dict() if self.user else None,
            'event': self.event.to_dict() if self.event else None
        }