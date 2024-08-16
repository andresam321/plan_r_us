from app.models import db, environment, SCHEMA, FoodDrink
from sqlalchemy.sql import text

def seed_food_drinks():
    food_drinks = [
        {
            'event_id': 1,  # Adjust as necessary
            'brought_by_id': 1,  # Adjust as necessary
            'name_of_food': 'Grilled Burgers',
            'name_of_drink': 'Lemonade',
            'type_of_food': 'Main Course',
            'notes': 'Contains gluten. Vegetarian option available.'
        },
        {
            'event_id': 1,  # Adjust as necessary
            'brought_by_id': 2,  # Adjust as necessary
            'name_of_food': 'Potato Salad',
            'name_of_drink': 'Iced Tea',
            'type_of_food': 'Side Dish',
            'notes': 'Vegan-friendly.'
        },
        {
            'event_id': 1,  # Adjust as necessary
            'brought_by_id': 3,  # Adjust as necessary
            'name_of_food': 'Roast Turkey',
            'name_of_drink': 'Apple Cider',
            'type_of_food': 'Main Course',
            'notes': 'Seasoned with herbs and spices.'
        },
        {
            'event_id': 1,  # Adjust as necessary
            'brought_by_id': 3,  # Adjust as necessary
            'name_of_food': 'Cheese Platter',
            'name_of_drink': 'Sparkling Water',
            'type_of_food': 'Appetizer',
            'notes': 'Assorted cheeses with gluten-free crackers.'
        },
        {
            'event_id': 1,  # Adjust as necessary
            'brought_by_id': 2,  # Adjust as necessary
            'name_of_food': 'Christmas Cookies',
            'name_of_drink': 'Hot Chocolate',
            'type_of_food': 'Dessert',
            'notes': 'Cookies decorated with icing.'
        }
    ]

    [db.session.add(FoodDrink(**food_drink)) for food_drink in food_drinks]
    db.session.commit()

def undo_food_drinks():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.food_drink RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM food_drink"))

    db.session.commit()