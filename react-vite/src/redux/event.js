const GET_ALL_EVENTS = 'getAllEvents/get_all_events'


const getEvents = (event) => ({
    type: GET_ALL_EVENTS,
    payload: event
});

export const thunkGetAllEvents = () => async (dispatch) => {
    try {
        const res = await fetch(`/api/event/all_events`);
        if (res.ok) {
            const data = await res.json();

            if (data.errors) {
                console.error("Errors received from the server:", data.errors);
                return;
            }
            
            await dispatch(getEvents(data));
        } else {
            // Handle HTTP errors here (e.g., non-200 status codes)
            console.error("HTTP error:", res.statusText);
        }
    } catch (error) {
        // Handle any other errors (e.g., network issues)
        console.error("Fetch error:", error);
    }
};