const GET_ALL_EVENTS = 'getAllEvents/get_all_events'
const GET_EVENT_BY_ID = "getEventById/get_event_by_id"


const getEvents = (events) => ({
    type: GET_ALL_EVENTS,
    payload: events
});

const getEventById = (event) => ({
    type:GET_EVENT_BY_ID,
    payload: event
})


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
            
            dispatch(getEvents(data));
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
                allEvents: action.payload.events,
            };
        }
        case GET_EVENT_BY_ID: {
            return {
                ...state,
                [action.payload.id]: action.payload
        }
    }
        default:
            return state;
    }
}

export default eventReducer;