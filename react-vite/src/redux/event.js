const GET_ALL_EVENTS = 'getAllEvents/get_all_events'
const GET_EVENT_BY_ID = "getEventById/get_event_by_id"
const CREATE_EVENT = "createEvent/CREATE_EVENT"
const UPDATE_EVENT = "updateEvent/UPDATE_EVENT"
const DELETE_EVENT = "deleteEvent/DELETE_EVENT"


const getEvents = (events) => ({
    type: GET_ALL_EVENTS,
    payload: events
});

const getEventById = (event) => ({
    type:GET_EVENT_BY_ID,
    payload: event
})

const addEvent = (event) => ({
    type:CREATE_EVENT,
    payload: event
})

const updateEvent = (event) => ({
    type:UPDATE_EVENT,
    payload: event
})

const deleteEvent = (event) => ({
    type:DELETE_EVENT,
    payload: event
})

export const thunkUpdateEvent = (eventId, formData) => async (dispatch) => {
    try {
        const res = await fetch(`/api/event/${eventId}`, {
            method: 'PUT',
            body: formData
        });

        if (res.ok) {
            const data = await res.json();
            dispatch(updateEvent(data)); // Adjust if using a different action creator
        } else {
            const errorData = await res.json();
            throw new Error(errorData.message || "Failed to update event");
        }
    } catch (error) {
        console.error("Error updating event:", error);
        throw error; // Propagate error for handling in the component
    }
};

export const thunkDeleteEvent = (eventId) => async (dispatch) => {
    const res = await fetch(`/api/event/${eventId}`, {
        method: "DELETE"
    });
    const data = await res.json();
    if (res.ok) {
        await dispatch(deleteEvent(eventId));
        return data;
    } else {
        return { "errors": data };
    }

}

export const thunkAddEvent = (event) => async (dispatch) => {
    const res = await fetch(`/api/event/new`, {
        method: "POST",
        body: event
    })
    if (res.ok) {
        const data = await res.json();
        if (data.errors) {
            return;
        }

        await dispatch(addEvent(data))
        return data
    } else {
        const errorData = await res.json();
        return { errors: errorData.errors };
    
    }

}


export const thunkGetEventById = (id) => async (dispatch) => {
    // console.log(`Fetching event with ID: ${id}`);
    try {
        const res = await fetch(`/api/event/${id}`);
        // console.log("Response Status:", res.status);
        if (res.ok) {
            const data = await res.json();
            // console.log("Fetched Data:", data);
            if (data) {
                dispatch(getEventById(data));
            } else {
                console.error("Received empty data from the server");
            }
        } else {
            console.error("HTTP error:", res.statusText);
        }
    } catch (error) {
        console.error("Fetch error:", error);
    }
};

export const thunkGetAllEvents = () => async (dispatch) => {
    try {
        const res = await fetch(`/api/event/all_events`);
        if (res.ok) {
            const data = await res.json();

            if (data.errors) {
                console.error("Errors received from the server:", data.errors);
                return;
            }
            
            dispatch(getEvents(data.events));
        } else {
            // Handle HTTP errors here (e.g., non-200 status codes)
            console.error("HTTP error:", res.statusText);
        }
    } catch (error) {
        // Handle any other errors (e.g., network issues)
        console.error("Fetch error:", error);
    }
};

function eventReducer(state = {}, action) {
    switch (action.type) {
        case GET_ALL_EVENTS: {
            return {
                ...state,
                allEvents: action.payload,
            };
        }
        case GET_EVENT_BY_ID: {
        return {
            ...state,
            [action.payload.event.id]: {
                ...action.payload.event,
                food_drinks: action.payload.food_drinks
        }
    }
}

        case CREATE_EVENT: {
            const newState = { ...state };
            newState[action.payload.id] = action.payload
            return newState
        }
        case UPDATE_EVENT:{
            return {
                ...state,
                [action.payload.id]: action.payload,
            };
        }
        case DELETE_EVENT: {
            const newState = { ...state };
            delete newState[action.payload];
            return newState;
        }
        default:
            return state;
    }
}

export default eventReducer;