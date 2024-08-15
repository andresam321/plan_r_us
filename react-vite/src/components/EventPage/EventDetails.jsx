import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { thunkGetAllFoodDrinksByEvent } from '../../redux/foodDrink';
import { thunkGetEventById } from '../../redux/event';
import AddFoodAndDrinks from '../FoodDrink/AddFoodAndDrinks';
import OpenModalButton from "../OpenModalButton/OpenModalButton";
import { useParams } from 'react-router-dom';
import UpdateFoodAndDrink from '../FoodDrink/UpdateFoodAndDrink';
import DeleteFoodAndDrink from '../FoodDrink/DeleteFoodAndDrink';
import "./EventDetails.css"

const EventDetails = () => {
    const dispatch = useDispatch();
    const { id } = useParams();
    console.log("Event ID:", id);
    const singleEvent = useSelector((state) => state.eventReducer[id]);

    const allFoodDrinksForEvent = useSelector((state) => Object.values(state.foodDrinkReducer));
    console.log("line16", singleEvent)
    console.log("line17", allFoodDrinksForEvent)

    const userId = useSelector((state) => state.session.user.id)
    console.log("line25", userId)

    // Separate items brought by the logged-in user
    const userItems = allFoodDrinksForEvent.filter(item => item.brought_by.id === userId);
    const otherItems = allFoodDrinksForEvent.filter(item => item.brought_by.id !== userId);

    // Combine arrays with user items first
    const sortedItems = [...userItems, ...otherItems];

    useEffect(() => {
        dispatch(thunkGetEventById(id));
        dispatch(thunkGetAllFoodDrinksByEvent(id))
    }, [dispatch, id]);

return (
    <div className="event-details-container">
            <div className="event-header">
                {!userItems.length && (
                    <div>
                        <OpenModalButton
                            buttonText="Add Food or Drinks"
                            className="add-food-drinks-button"
                            modalComponent={<AddFoodAndDrinks eventId={id} />}
                        />
                    </div>
                )}

                <h1 className="event-title">{singleEvent?.name}</h1>
                <p className="event-location">Location: {singleEvent?.location}</p>
                <p className="event-date">Date: {singleEvent?.event_date}</p>
                <p className="event-organizer">Organizer: {singleEvent?.organizer}</p>
                <p className="event-cutoff">Cutoff Date To Decide What You're Bringing: {singleEvent?.cut_of_date_to_bring_items}</p>
            </div>
            <div className="food-drink-section">
                <h2 className="section-title">Food and Drinks</h2>
                <div className="food-drink-list">
                    {sortedItems.map((foodDrink) => (
                        <div key={foodDrink.id} className="food-drink-item">
                            <div className="food-drink-header">
                                <div className="food-drink-brought-by">
                                    <span className="brought-by-name">{`${foodDrink.brought_by.first_name} ${foodDrink.brought_by.last_name}`}</span>
                                </div>
                                <div className="food-drink-name">
                                    {foodDrink.name_of_food}
                                </div>
                            </div>
                            {foodDrink.brought_by.id === userId && (
                                <div className="button-container">
                                    <OpenModalButton
                                        buttonText="Update Food Drink"
                                        className="open-modal-button"
                                        modalComponent={<UpdateFoodAndDrink foodDrinkId={foodDrink.id} />}
                                    />
                                    <OpenModalButton
                                        buttonText="Delete Item"
                                        className="open-modal-button"
                                        modalComponent={<DeleteFoodAndDrink foodDrinkId={foodDrink.id} />}
                                    />
                                </div>
                            )}

                            <p className="food-drink-type">Type: {foodDrink.type_of_food}</p>
                            {foodDrink.notes && <p className="food-drink-notes">Notes: {foodDrink?.notes}</p>}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
export default EventDetails;