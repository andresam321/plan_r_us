from app.models import db, environment, SCHEMA, Event
from sqlalchemy.sql import text

def seed_events():
    events = [
        {
            'creator_id': 1,  # Adjust as necessary
            'name': 'Summer Pot Luck',
            'description': 'A fun summer BBQ with family and friends.',
            'event_date': '2024-08-31',
            'location': '478 Lincoln Cir Millbrae, CA 94030',
            'organizer': 'Rene Mercado AKA MR AKA MR AKA MR AKA ',
            'cut_of_date_to_bring_items': '2024-08-20 23:59:59'
        },
        {
            'creator_id': 2,  # Adjust as necessary
            'name': 'Thanksgiving Dinner',
            'description': 'Annual family gathering for Thanksgiving dinner.',
            'event_date': '2024-11-28',
            'location': '456 Elm St, San Francisco, CA',
            'organizer': 'Jane Smith',
            'cut_of_date_to_bring_items': '2024-11-27 23:59:59'
        },
    ]

    


    [db.session.add(Event(**event)) for event in events]
    db.session.commit()
    

def undo_events():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.events RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM owners"))

    db.session.commit()