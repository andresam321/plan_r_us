from flask import Blueprint, request, jsonify
from app.models import db, Event,FoodDrink
from app.forms import FoodDrinkForm
from flask_login import current_user, login_user, logout_user, login_required

food_drink_routes = Blueprint("food_drink",__name__)






@food_drink_routes.route("/all_food_drinks")
@login_required
def all_food_drinks():
    all_food_drinks = FoodDrink.query.all()
    return {"food_drinks": [all_food_drink.to_dict() for all_food_drink in all_food_drinks]},200



@food_drink_routes.route("/event/<int:event_id>")
@login_required
def food_drinks_by_event(event_id):

    food_drinks = FoodDrink.query.filter_by(event_id=event_id).all()
    

    food_drinks_list = [food_drink.to_dict() for food_drink in food_drinks]

    return {"food_drinks":food_drinks_list},200




@food_drink_routes.route("/<int:event_id>/event", methods=["POST"])
@login_required
def create_food_drink(event_id):
    
    form = FoodDrinkForm()
    form["csrf_token"].data = request.cookies["csrf_token"] 
    

    if form.validate_on_submit():
        new_food_drink = FoodDrink(
            event_id = event_id,
            brought_by_id = current_user.id,
            name_of_food=form.data["name_of_food"],
            name_of_drink=form.data["name_of_drink"],
            type_of_food=form.data["type_of_food"],
            notes=form.data["notes"]
        )
        db.session.add(new_food_drink)
        db.session.commit()
        
        return new_food_drink.to_dict(),201
    else:
        return {"errors": form.errors}
            

@food_drink_routes.route("/<int:food_drink_id>/event", methods=["PUT"])
@login_required
def update_food_drink(food_drink_id):
    
    food_drink = FoodDrink.query.get(food_drink_id)
    
    form = FoodDrinkForm()
    form["csrf_token"].data = request.cookies["csrf_token"] 
    
    if not food_drink:
        return {"message":"Food Drink Couldnt be Found"},404

    if form.validate_on_submit():
        food_drink.name_of_food=form.data["name_of_food"]
        food_drink.name_of_drink=form.data["name_of_drink"]
        food_drink.type_of_food=form.data["type_of_food"]
        food_drink.notes=form.data["notes"]
        
        db.session.commit()
        
        return food_drink.to_dict(),201
    else:
        return {"errors": form.errors}
    

@food_drink_routes.route("/<int:id>", methods = ["DELETE"])
@login_required
def delete_food_drinl(id):
    food_drink = FoodDrink.query.get(id)
    
    if not food_drink:
        return {"message": "food_drink couldnt be found"},404
    else:
        db.session.delete(food_drink)
        db.session.commit()
        
        return {"message": "Successfully deleted food_drink"}, 200