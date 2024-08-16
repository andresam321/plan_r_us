import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { thunkGetAllFoodDrinksByEvent } from '../../redux/foodDrink';
import { thunkGetEventById } from '../../redux/event';
import AddFoodAndDrinks from '../FoodDrink/AddFoodAndDrinks';
import OpenModalButton from "../OpenModalButton/OpenModalButton";
import { useParams } from 'react-router-dom';
import UpdateFoodAndDrink from '../FoodDrink/UpdateFoodAndDrink';
import DeleteFoodAndDrink from '../FoodDrink/DeleteFoodAndDrink';
import UpdateEvent from './UpdateEvent';
import DeleteEvent from './DeleteEvent';
import "./EventDetails.css"

const EventDetails = () => {
    const dispatch = useDispatch();
    const { id } = useParams();

    // Get the single event including food and drink data
    const singleEvent = useSelector((state) => state.eventReducer[id]);

    console.log("line20",singleEvent)

    const userId = useSelector((state) => state.session.user.id);

    console.log("line24",userId)
    // Ensure food/drinks are included in singleEvent
    const allFoodDrinksForEvent = singleEvent?.food_drinks || [];

    // Separate items brought by the logged-in user
    const userItems = allFoodDrinksForEvent.filter(item => item.brought_by.id === userId);
    const otherItems = allFoodDrinksForEvent.filter(item => item.brought_by.id !== userId);

    // Combine arrays with user items first
    const sortedItems = [...userItems, ...otherItems];

    useEffect(() => {
        const fetchData = async () => {
            try {
                await dispatch(thunkGetEventById(id))
                await dispatch(thunkGetAllFoodDrinksByEvent(id));
            } catch (error) {
                console.error("Error fetching event or food/drinks data:", error);
            }
        };

        fetchData();
    }, [dispatch, id]);

const canUpdateEvent = singleEvent && singleEvent.creator_id === userId;
console.log("line46",canUpdateEvent)

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
                {canUpdateEvent && (
                    <div>
                        <OpenModalButton
                            buttonText="Update Event"
                            className="add-food-drinks-button"
                            modalComponent={<UpdateEvent eventId={id} />}
                        />
    
                        <OpenModalButton
                            buttonText="Delete Event"
                            className="add-food-drinks-button"
                            modalComponent={<DeleteEvent />}
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

                            <p className="food-drink-type">Type of Food: {foodDrink.type_of_food}</p>
                            <p className="food-drink-type">Type of Drinks: {foodDrink.name_of_drink}</p>
                            {foodDrink.notes && <p className="food-drink-notes">Notes: {foodDrink.notes}</p>}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
export default EventDetails;