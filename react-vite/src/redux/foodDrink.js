const GET_ALL_FOOD_DRINKS_BY_EVENT_ID = "getAllFoodDrinksByEventId/GET_ALL_FOOD_DRINKS_BY_EVENT_ID"
const ADD_FOOD_DRINKS_TO_EVENT = "addFoodDrinksToEvent/ADD_FOOD_DRINKS_TO_EVENT"

const getFoodDrink = (foodDrink) => ({
    type:GET_ALL_FOOD_DRINKS_BY_EVENT_ID,
    payload:foodDrink
})

const addFoodDrinksToEvent = (foodDrink) => ({
    type:ADD_FOOD_DRINKS_TO_EVENT,
    payload:foodDrink
})

export const thunkAddFoodDrinksToEvent = (foodDrink_id, formData) => async (dispatch) => {
    try {
        const res = await fetch(`/api/food_drink/${foodDrink_id}/food_drink/event`, {
            method: "POST",
            body: formData,
            headers: {
                'Content-Type': 'multipart/form-data' // Make sure to set the correct Content-Type for FormData
            }
        });
        if (res.ok) {
            const data = await res.json();
            await dispatch(addFoodDrinksToEvent(data));
        } else {
            console.error("HTTP error:", res.statusText);
        }
    } catch (error) {
        console.error('Error fetching goodies:', error);
    }
};


export const thunkGetAllFoodDrinksByEvent = (id) => async (dispatch) => {
    try {
        const res = await fetch(`/api/food_drink/event/${id}/food-drinks`);
        if (res.ok) {
            const data = await res.json();

            if (data) {
                dispatch(getFoodDrink(data.food_drinks));
                return;
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
    case GET_ALL_FOOD_DRINKS_BY_EVENT_ID:
        const newState = { ...state };
            action.payload.forEach((foodDrink) => {
                newState[foodDrink.id] = foodDrink;
            });
        return newState;
    case ADD_FOOD_DRINKS_TO_EVENT:{
        const newState = { ...state };
            newState[action.payload.id] = action.payload;
            // console.log("100",action.payload)
            return newState;
        }
        default:
            return state;
    
    }

}

export default foodDrinkReducer