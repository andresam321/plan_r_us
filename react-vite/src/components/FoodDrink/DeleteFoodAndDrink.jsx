import { useModal } from "../../context/Modal";
import { useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { thunkDeleteFoodDrink } from "../../redux/foodDrink";
import "./DeleteFoodDrink.css"



const DeleteFoodAndDrink = ({foodDrinkId}) => {

    // const { parking_spotId } = useParams();
    const dispatch = useDispatch();
    const { closeModal } = useModal();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);


const handleDelete = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const res = await dispatch(thunkDeleteFoodDrink(foodDrinkId));
            setIsLoading(false);
            closeModal() 
        } catch (error) {
            setIsLoading(false);
            alert("An error occurred. Please try again.");
        }
    };



return (
<div className="delete-container">
            <form onSubmit={handleDelete} className="delete-form">
                <div className="delete-header">
                    <h2>Confirm Delete</h2>
                </div>
                <div className="delete-message">
                    <p>Are you sure you want to delete this item?</p>
                </div>
                <div className="delete-buttons">
                    <button type="submit" className="delete-button" disabled={isLoading}>
                        {isLoading ? "Deleting..." : "Delete"}
                    </button>
                    <button type="button" onClick={() => closeModal()} className="cancel-button">
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
};

export default DeleteFoodAndDrink