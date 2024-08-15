import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { thunkAddFoodDrinksToEvent } from '../../redux/foodDrink';
import { useModal } from '../../context/Modal';
import { useParams } from 'react-router-dom';
import "./AddFoodAndDrink.css"


const AddFoodAndDrinks = () => {
const dispatch = useDispatch();
const {closeModal} = useModal()
const {id} = useParams()
const [name_of_food, setName_of_food] = useState('')
const [name_of_drink, setName_of_drink] = useState('')
const [type_of_food, setType_of_food] = useState('')
const [notes, setNotes] = useState('')
const [errors, setErrors] = useState({});



const foodTypes = [
    { value: '', label: 'Select a type' },
    { value: 'italian', label: 'Italian' },
    { value: 'chinese', label: 'Chinese' },
    { value: 'mexican', label: 'Mexican' },
    { value: 'indian', label: 'Indian' },
    { value: 'american', label: 'American' },
    { value: 'japanese', label: 'Japanese' },
    { value: 'thai', label: 'Thai' },
    { value: 'french', label: 'French' },
    { value: 'greek', label: 'Greek' },
    { value: 'spanish', label: 'Spanish' },
    { value: 'vietnamese', label: 'Vietnamese' },
    { value: 'korean', label: 'Korean' },
    { value: 'mediterranean', label: 'Mediterranean' },
    { value: 'seafood', label: 'Seafood' },
    { value: 'vegetarian', label: 'Vegetarian' },
    { value: 'vegan', label: 'Vegan' },
    { value: 'gluten_free', label: 'Gluten-Free' },
    { value: 'kosher', label: 'Kosher' },
    { value: 'halal', label: 'Halal' },
    { value: 'other', label: 'Other' }
];



const validateForm = () => {
    const errors = {};
    if (!name_of_food && !name_of_drink) {
        errors.name = "At least one of food or drink must be specified.";
    }
    if (name_of_food.length > 50) {
        errors.nameOfFood = "Food name must be less than 50 characters.";
    }
    if (name_of_drink.length > 50) {
        errors.name_of_drink = "Drink name must be less than 50 characters.";
    }
    if (type_of_food === '') {
        errors.type_of_food = "Please select a type of food.";
    }
    return errors;
};



const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors);
        return;
    }


    const formData = new FormData();
    formData.append('name_of_food',name_of_food);
    formData.append('name_of_drink',name_of_drink);
    formData.append('type_of_food',type_of_food);
    formData.append('notes',notes);

    try {
        const res = await dispatch(thunkAddFoodDrinksToEvent(id,formData)); 
        console.log("Response:", res);
        closeModal() 
    } catch (error) {
        console.error("Error creating goodies:", error);
    }
};

return (
<div className="add-food-drinks-container">
        <h2>Add Food and Drinks</h2>
        <form onSubmit={handleSubmit}>
        <div className="form-group">
            <label htmlFor="name_of_food">Food Name:</label>
            <input
                type="text"
                id="name_of_food"
                value={name_of_food}
                onChange={(e) => setName_of_food(e.target.value)}
                className={`form-control`}
            />
            {/* {errors.nameOfFood && <p className="error">{errors.nameOfFood}</p>} */}
        </div>

        <div className="form-group">
            <label htmlFor="name_of_drink">Drink Name:</label>
            <input
                type="text"
                id="name_of_drink"
                value={name_of_drink}
                onChange={(e) => setName_of_drink(e.target.value)}
                className={`form-control`}
            />
            {/* {errors.nameOfDrink && <p className="error">{errors.nameOfDrink}</p>} */}
        </div>

        <div className="form-group">
            <label htmlFor="type_of_food">Type of Food:</label>
            <select
                id="type_of_food"
                value={type_of_food}
                onChange={(e) => setType_of_food(e.target.value)}
                className={`form-control`}
            >
            {foodTypes.map((option) => (
                <option key={option.value} value={option.value}>
                    {option.label}
                </option>
                ))}
            </select>
            {/* {errors.typeOfFood && <p className="error">{errors.typeOfFood}</p>} */}
        </div>

        <div className="form-group">
            <label htmlFor="notes">Notes:</label>
            <textarea
                id="notes"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="form-control"
            />
        </div>

        {/* {errors.name && <p className="error">{errors.name}</p>} */}

        <div className="form-group">
            <button
                type="submit"
                className="submit-button"
                // disabled={Object.keys(errors).length > 0}
                >
                Submit
            </button>
        </div>
        </form>
    </div>
);
};

export default AddFoodAndDrinks