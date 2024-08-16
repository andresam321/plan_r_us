const GET_ALL_FOOD_DRINKS_BY_EVENT_ID = "getAllFoodDrinksByEventId/GET_ALL_FOOD_DRINKS_BY_EVENT_ID"
const ADD_FOOD_DRINKS_TO_EVENT = "addFoodDrinksToEvent/ADD_FOOD_DRINKS_TO_EVENT"
const UPDATE_FOOD_DRINK_FROM_EVENT = "updateFoodDrinkFromEvent/UPDATE_FOOD_DRINK_FROM_EVENT"
const DELETE_FOOD_DRINK = "deleteFoodDrink/DELETE_FOOD_DRINK"
const CLEAR_FOOD_DRINKS = "clearFoodDrinks/CLEAR_FOOD_DRINKS";

const getFoodDrink = (foodDrink) => ({
    type:GET_ALL_FOOD_DRINKS_BY_EVENT_ID,
    payload:foodDrink
})

const addFoodDrinksToEvent = (foodDrink) => ({
    type:ADD_FOOD_DRINKS_TO_EVENT,
    payload:foodDrink
})

const editFoodDrink = (foodDrink) => ({
    type:UPDATE_FOOD_DRINK_FROM_EVENT,
    payload:foodDrink

})

const deleteFoodDrink = (foodDrink) => ({
    type:DELETE_FOOD_DRINK,
    payload:foodDrink
})

export const clearFoodDrinks = () => ({
    type: CLEAR_FOOD_DRINKS,
});


export const thunkDeleteFoodDrink = (foodDrinkId) => async (dispatch) => {
    const res = await fetch(`/api/food_drink/${foodDrinkId}`, {
        method: "DELETE"
    });
    const data = await res.json();
    if (res.ok) {
        await dispatch(deleteFoodDrink(foodDrinkId));
        return foodDrinkId;
    } else {
        return { "errors": data };
    }

}


export const thunkEditFoodDrink = (foodDrinkId, foodDrink) => async (dispatch) => {
    try {
        const res = await fetch(`/api/food_drink/${foodDrinkId}/event`, {
            method: "PUT",
            body: foodDrink,
        });
        if (res.ok) {
            const data = await res.json();
            dispatch(editFoodDrink(data)); // Ensure this action updates the Redux store
        } else {
            const errorData = await res.json();
            console.error("HTTP error:", errorData.message || res.statusText);
        }
    } catch (error) {
        console.error('Error updating food/drink:', error);
    }
};

export const thunkAddFoodDrinksToEvent = (event_id, formData) => async (dispatch) => {
    try {
        const res = await fetch(`/api/food_drink/${event_id}/event`, {
            method: "POST",
            body: formData,
        });
        if (res.ok) {
            const data = await res.json();
            await dispatch(addFoodDrinksToEvent(data.food_drinks));
        } else {
            console.error("HTTP error:", res.statusText);
        }
    } catch (error) {
        console.error('Error fetching goodies:', error);
    }
};


export const thunkGetAllFoodDrinksByEvent = (id) => async (dispatch) => {
    try {
        const res = await fetch(`/api/food_drink/event/${id}`);
        if (res.ok) {
            const data = await res.json();

            if (data) {
                await dispatch(getFoodDrink(data));
            } else {
                console.error("Received empty data from the server");
            }
        } else {
            // Handle HTTP errors here (e.g., non-200 status codes)
            console.error("HTTP error:", res.statusText);
        }
    } catch (error) {
        // Handle any other errors (e.g., network issues)
        console.error("Fetch error:", error);
    }
}


function foodDrinkReducer(state = {}, action) {
    switch(action.type){
    case GET_ALL_FOOD_DRINKS_BY_EVENT_ID: {
            const newState = { ...state };
            // console.log("ownerReducer", action.payload);
            action.payload.food_drinks.forEach((foodDrink) => {
                newState[foodDrink.id] = foodDrink;
            });
            return newState;
        }
    case ADD_FOOD_DRINKS_TO_EVENT:{
        const newState = { ...state };
            newState[action.payload.id] = action.payload;
            // console.log("100",action.payload)
            return newState;
        }
    case UPDATE_FOOD_DRINK_FROM_EVENT:{
        console.log("Reducer Action Payload:", action.payload);
        return {
                ...state,
            [action.payload.id]: action.payload,
        };
    }
    case DELETE_FOOD_DRINK:{
        const newState = { ...state };
        delete newState[action.payload];
        return newState;

    }
    
        default:
            return state;
    
    }

}

export default foodDrinkReducer