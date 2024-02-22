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

  const handleDemoChild = async (e)=>{
    e.preventDefault();
    const demoEmail = 'demo9@aa.io'
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
    <section className="p-4 gap-4 flex flex-col items-center shadow-xl shadow-black bg-violet-300 border-solid border-4 border-black">
      <h1 className="font-extrabold ">Log In</h1>
      <form className="gap-4 flex flex-col" onSubmit={handleSubmit}>
        <section className="grid grid-col-2 grid-row-2 p-2 gap-4 shadow-xl shadow-black rounded-lg border-solid border-4 border-black p-4">
        <label className="col-start-1 col-end-1 row-start-1 row-end-1 font-bold p-4 justify-center flex">
          Email
          </label>
          <input className="col-start-2 col-end-2 row-start-1 row-end-1 rounded-lg border-solid border-4 border-black p-1"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        {errors.email && <p>{errors.email}</p>}
        <label className="col-start-1 col-end-1 row-start-2 row-end-2 font-bold p-4 justify-center flex">
          Password
          </label>
          <input className="col-start-2 col-end-2 row-start-2 row-end-2 rounded-lg border-solid border-4 border-black p-1"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        {errors.password && <p>{errors.password}</p>}
        </section>
        <button className="shadow-xl shadow-black bg-violet-300 border-solid border-4 border-black rounded-xl font-bold w-1/3 self-center hover:bg-violet-200" type="submit">Log In</button>
        <section className="flex justify-around">
        <button className="shadow-xl shadow-black bg-violet-300 border-solid border-4 border-black rounded-xl font-bold w-1/3 self-center hover:bg-violet-200" onClick={handleDemoUser}>Demo Adult</button>
        <button className="shadow-xl shadow-black bg-violet-300 border-solid border-4 border-black rounded-xl font-bold w-1/3 self-center hover:bg-violet-200" onClick={handleDemoChild}>Demo Child</button>
        </section>
      </form>
      </section>
    </>
  );
}

export default LoginFormModal;
