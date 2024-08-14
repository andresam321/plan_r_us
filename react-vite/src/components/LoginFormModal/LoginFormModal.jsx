import { useState } from "react";
import { thunkLogin } from "../../redux/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./LoginForm.css";

function LoginFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [first_name, setFirst_name] = useState("");
  const [family_code, setFamily_code] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const serverResponse = await dispatch(
      thunkLogin({
        first_name,
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
    <>
      <h1>Log In</h1>
      <form onSubmit={handleSubmit}>
        <label>
          First Name:
          <input
            type="text"
            value={first_name}
            onChange={(e) => setFirst_name(e.target.value)}
            required
          />
        </label>
        {/* {errors.email && <p>{errors.email}</p>} */}
        <label>
          Family Code:
          <input
            type="text"
            value={family_code}
            onChange={(e) => setFamily_code(e.target.value)}
            required
          />
        </label>
        {/* {errors.password && <p>{errors.password}</p>} */}
        <button type="submit">Log In</button>
      </form>
    </>
  );
}

export default LoginFormModal;
