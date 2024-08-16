import { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { thunkSignup } from "../../redux/session";
import "./SignupForm.css"


function SignupFormModal() {
  const dispatch = useDispatch();
  
  const [first_name, setFirst_name] = useState("");
  const [last_name, setLast_name] = useState("");
  const [family_code, setFamily_code] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();
  const [showModal, setShowModal] = useState(false);
  const [isSignupOpen, setIsSignupOpen] = useState(false);




  const handleSubmit = async (e) => {
    e.preventDefault();

    // if (password !== confirmPassword) {
    //   return setErrors({
    //     confirmPassword:
    //       "Confirm Password field must be the same as the Password field",
    //   });
    // }

    const serverResponse = await dispatch(
      thunkSignup({
        first_name,
        last_name,
        family_code,
      })
    );

    if (serverResponse) {
      setErrors(serverResponse);
    } else {
      closeModal();
    }
  };

  return (
    <div className="signup-form">
      {/* <button className="form-close" onClick={onClose}>&times;</button> */}
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>
            First Name:
            <input
              type="text"
              value={first_name}
              onChange={(e) => setFirst_name(e.target.value)}
              placeholder="Real First Name"
              required
            />
          </label>
        </div>
        <div className="form-group">
          <label>
            Last Name:
            <input
              type="text"
              value={last_name}
              onChange={(e) => setLast_name(e.target.value)}
              placeholder="Real Last Name"
              required
            />
          </label>
        </div>
        <div className="form-group">
          <label>
            Family Code:
            <input
              type="text"
              value={family_code}
              onChange={(e) => setFamily_code(e.target.value)}
              placeholder="Family Code Given"
              required
            />
          </label>
        </div>
        <button type="submit" className="form-button">Sign Up</button>
      </form>
    </div>
  );
}

export default SignupFormModal;
