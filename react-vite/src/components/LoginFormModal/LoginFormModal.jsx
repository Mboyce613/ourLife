import { useState } from "react";
import { thunkLogin } from "../../redux/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { useNavigate } from "react-router-dom";
import "./LoginForm.css";

function LoginFormModal() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const serverResponse = await dispatch(
      thunkLogin({
        email,
        password,
      })
    );

    if (serverResponse) {
      setErrors(serverResponse);
    } else {
      navigate("home");
      closeModal();
    }
  };

  const handleDemoUser = async (e)=>{
    e.preventDefault();
    const demoEmail = 'demoadult@aa.io'
    const demoPassword = 'password'
    setErrors({});
    setEmail(demoEmail)
    setPassword(demoPassword)


    const serverResponse = await dispatch(
      thunkLogin({
        'email':demoEmail,
        'password':demoPassword,
      })
    );
    if (serverResponse) {
      setErrors(serverResponse);
    } else {
      navigate("home");
      closeModal();
    }
  };

  return (
    <>
      <h1>Log In</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Email
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        {errors.email && <p>{errors.email}</p>}
        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        {errors.password && <p>{errors.password}</p>}
        <button type="submit">Log In</button>
        <button onClick={handleDemoUser}>Demo User</button>
      </form>
    </>
  );
}

export default LoginFormModal;
