import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { thunkGetAllEvents } from '../../redux/event';
import { NavLink } from 'react-router-dom';
import './Event.css';

const Events = () => {
    const dispatch = useDispatch();
    const allEvents = useSelector((state) => state.eventReducer.allEvents);

    useEffect(() => {
        dispatch(thunkGetAllEvents());
    }, [dispatch]);

    return (
        <div>
            <h1>Events</h1>
            <div className="events-container">
                {allEvents?.map((event) => (
                    <NavLink to={`/event/${event.id}`} key={event.id} style={{ textDecoration: 'none' }}>
                        <div className="event-card">
                            <p className="event-name">{event.name}</p>
                            <p>{event.location}</p>
                            <p>{event.organizer}</p>
                            <p>{event.event_date}</p> {/* Added event_date */}
                        </div>
                    </NavLink>
                ))}
            </div>
        </div>
    );
};

export default Events;