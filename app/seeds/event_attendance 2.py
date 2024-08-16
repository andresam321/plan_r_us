from app.models import db, environment, SCHEMA
from sqlalchemy.sql import text

def seed_event_attendance():
    attendances = [
        {'user_id': 1, 'event_id': 1},
        {'user_id': 2, 'event_id': 1},
        {'user_id': 3, 'event_id': 1},
    ]

    for attendance in attendances:
        db.session.execute(
            text("INSERT INTO event_attendance (user_id, event_id) VALUES (:user_id, :event_id)")
            .params(user_id=attendance['user_id'], event_id=attendance['event_id'])
        )
    db.session.commit()


def undo_event_attendance():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.event_attendance RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM event_attendance"))

    db.session.commit()