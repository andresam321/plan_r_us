import { useState,useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { thunkAddEvent, thunkGetAllEvents } from '../../redux/event';
import { useNavigate } from 'react-router-dom';
import { useModal } from '../../context/Modal';
import './AddEvent.css';

const AddEvent = () => {
    const navigate = useNavigate();
    const { closeModal } = useModal();
    const dispatch = useDispatch();
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [event_date, setEvent_date] = useState('');
    const [location, setLocation] = useState('');
    const [organizer, setOrganizer] = useState('');
    const [cut_of_date_to_bring_items, setCut_of_date_to_bring_items] = useState('');
    const [errors, setErrors] = useState({});

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('name', name);
        formData.append('description', description);
        formData.append('event_date', event_date);
        formData.append('location', location);
        formData.append('organizer', organizer);
        formData.append('cut_of_date_to_bring_items', cut_of_date_to_bring_items);

        try {
            const res = await dispatch(thunkAddEvent(formData));
            closeModal();
            navigate('/events');
            
        } catch (error) {
            console.error("Error creating event:", error);
            setErrors({ form: "An error occurred while creating the event. Please try again." });
        }
    };

    useEffect(() => {
        dispatch(thunkGetAllEvents());
    }, [dispatch]);


    return (
        <div className="add-event-container">
            <h2>Add New Event</h2>
            <form onSubmit={handleSubmit} className="add-event-form">
                {errors.form && <p className="error-message">{errors.form}</p>}
                
                <div className="form-group">
                    <label>Event Name</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Description</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    ></textarea>
                </div>

                <div className="form-group">
                    <label>Event Date</label>
                    <input
                        type="date"
                        value={event_date}
                        onChange={(e) => setEvent_date(e.target.value)}
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Address:</label>
                    <input
                        type="text"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Organizer</label>
                    <input
                        type="text"
                        value={organizer}
                        onChange={(e) => setOrganizer(e.target.value)}
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Cut-off Date To Add Items</label>
                    <input
                        type="date"
                        value={cut_of_date_to_bring_items}
                        onChange={(e) => setCut_of_date_to_bring_items(e.target.value)}
                        required
                    />
                </div>

                <button type="submit" className="submit-button">Add Event</button>
            </form>
        </div>
    );
};

export default AddEvent;