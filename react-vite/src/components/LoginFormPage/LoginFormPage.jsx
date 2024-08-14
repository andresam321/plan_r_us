import { useState } from "react";
import { thunkLogin } from "../../redux/session";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import "./LoginForm.css";

function LoginFormPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [first_name, setFirst_name] = useState("");
  const [family_code, setFamily_code] = useState("");
  const [errors, setErrors] = useState({});

  if (sessionUser) return <Navigate to="/" replace={true} />;

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
      navigate("/");
    }
  };

  return (
    <>
      <h1>Log In</h1>
      {errors.length > 0 &&
        errors.map((message) => <p key={message}>{message}</p>)}
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
            type="password"
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

export default LoginFormPage;
