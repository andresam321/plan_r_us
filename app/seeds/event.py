from app.models import db, environment, SCHEMA, Event
from sqlalchemy.sql import text

def seed_events():
    events = [
        {
            'creator_id': 1,  # Adjust as necessary
            'name': 'Test',
            'description': 'i will run test on this event.',
            'event_date': '2024-08-31',
            'location': 'the cave',
            'organizer': 'am pm',
            'cut_of_date_to_bring_items': '2400-08-16 23:59:59'
        },
        # {
        #     'creator_id': 2,  # Adjust as necessary
        #     'name': 'Thanksgiving Dinner',
        #     'description': 'Annual family gathering for Thanksgiving dinner.',
        #     'event_date': '2024-11-28',
        #     'location': '456 Elm St, San Francisco, CA',
        #     'organizer': 'Jane Smith',
        #     'cut_of_date_to_bring_items': '2024-11-27 23:59:59'
        # },
    ]

    


    [db.session.add(Event(**event)) for event in events]
    db.session.commit()
    

def undo_events():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.events RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM events"))

    db.session.commit()