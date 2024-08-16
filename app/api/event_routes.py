from flask import Blueprint, request, jsonify
from app.models import db, Event,FoodDrink
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
        return {"message": "Event couldn't be found"}, 404
    
    # Fetch related food_drink items
    food_drinks = FoodDrink.query.filter(FoodDrink.event_id == id).all()
    
    # Convert food_drink items to dict
    food_drinks_list = [food_drink.to_dict() for food_drink in food_drinks]
    
    # Return event data along with related food_drink items
    return jsonify({"event": event.to_dict(),"food_drinks": food_drinks_list}), 200


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
    
@event_routes.route("/<int:id>", methods=['PUT'])
@login_required
def update_event(id):
    event = Event.query.get(id)  # Note: `Event` should be capitalized
    if not event:
        return {"message": "Event couldn't be found"}, 404

    form = EventForm()
    form["csrf_token"].data = request.cookies.get("csrf_token")

    if form.validate_on_submit():
        event.name = form.data["name"]
        event.description = form.data["description"]
        event.event_date = form.data["event_date"]
        event.location = form.data["location"]
        event.organizer = form.data["organizer"]
        event.cut_of_date_to_bring_items = form.data["cut_of_date_to_bring_items"]
        
        db.session.commit()
        
        return event.to_dict(), 200  # Changed from 201 to 200 for update requests
    else:
        return {"errors":form.errors}, 400



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