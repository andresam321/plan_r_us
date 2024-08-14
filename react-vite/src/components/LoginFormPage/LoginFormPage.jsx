import { useState, useEffect } from "react";
import { thunkLogin } from "../../redux/session";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import "./LoginForm.css";

function LoginFormPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [first_name, setFirst_name] = useState("");
  const [family_code, setFamily_code] = useState("");
  const [errors, setErrors] = useState({});
  const [touchedFields, setTouchedFields] = useState({});


  useEffect(() => {
    const errorsObj = {};

    if (touchedFields.first_name && !first_name) {
      errorsObj.first_name = "First name is required";
    }
    if (touchedFields.family_code && (!family_code || family_code.length < 6)) {
      errorsObj.family_code = "Family code must be at least 6 characters";
    }

    setErrors(errorsObj);
  }, [first_name, family_code, touchedFields]);

  if (sessionUser) return <Navigate to="/Events" replace={true} />;

  const handleBlur = (field) => {
    setTouchedFields((prev) => ({ ...prev, [field]: true }));
  };

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
      navigate("/Events");
    }
  };

  // Validate fields on every render

  return (
    <div className="login-page">
      <div className={`login-container ${Object.keys(errors).length > 0 ? "blur-background" : ""}`}>
        <h1>Log In</h1>
        {Object.keys(errors).length > 0 &&
          Object.values(errors).map((message, index) => (
            <p key={index} className="form-error">{message}</p>
          ))}
        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-control">
            <label>
              First Name:
              <input
                type="text"
                value={first_name}
                onChange={(e) => setFirst_name(e.target.value)}
                onBlur={() => handleBlur('first_name')}
                required
              />
            </label>
            {errors.first_name && <p className="form-error">{errors.first_name}</p>}
          </div>
          <div className="form-control">
            <label>
              Family Code:
              <input
                type="text"
                value={family_code}
                onChange={(e) => setFamily_code(e.target.value)}
                onBlur={() => handleBlur('family_code')}
                required
              />
            </label>
            {errors.family_code && <p className="form-error">{errors.family_code}</p>}
          </div>
          <button type="submit" className="form-button">Log In</button>
        </form>
      </div>
    </div>
  );
}
export default LoginFormPage;