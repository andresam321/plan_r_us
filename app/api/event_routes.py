from flask import Blueprint, request
from app.models import db, Event
from app.forms import EventForm
from flask_login import current_user, login_user, logout_user, login_required


event_routes = Blueprint("event",__name__)



@event_routes.route('/all_events')
@login_required
def all_events():
    all_events = Event.query.all()
    return{"events": [all_event.to_dict() for all_event in all_events]}, 200


@event_routes.route("/<int:id>")
@login_required
def event_by_id(id):
    event = Event.query.get(id)
    if not event:
        return {"message":"Event coulndt be found"}, 400
    return event.to_dict(),200

@event_routes.route("/new", methods=['POST'])
@login_required
def create_event():
    form = EventForm()
    form["csrf_token"].data = request.cookies.get("csrf_token")

    if form.validate_on_submit():
        new_event = Event(
            creator_id=current_user.id,
            name=form.data["name"],
            description=form.data["description"],
            event_date=form.data["event_date"],
            location=form.data["location"],
            organizer=form.data["organizer"],
            cut_of_date_to_bring_items=form.data["cut_of_date_to_bring_items"]
        )
        db.session.add(new_event)
        db.session.commit()
        
        return new_event.to_dict(), 201
    else:
        return form.errors, 400


@event_routes.route("/<int:id>", methods = ["DELETE"])
@login_required
def delete_event(id):
    event = Event.query.get(id)
    
    if not event:
        return {"message": "event couldnt be found"},404
    else:
        db.session.delete(event)
        db.session.commit()
        
        return {"message": "Successfully deleted event"}, 200