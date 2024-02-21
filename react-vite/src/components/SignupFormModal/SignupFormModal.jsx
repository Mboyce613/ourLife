import { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { thunkSignup } from "../../redux/session";
import { useNavigate } from "react-router-dom";
import "./SignupForm.css";

function SignupFormModal() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [familyName, setFamilyName] = useState("");
  const [familyMotto, setFamilyMotto] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      return setErrors({
        confirmPassword:
          "Confirm Password field must be the same as the Password field",
      });
    }

    const serverResponse = await dispatch(
      thunkSignup({
        email: email,
        first_name: firstName,
        last_name: lastName,
        password: password,
        family_name: familyName,
        family_motto: familyMotto
      })
    );

    if (serverResponse) {
      setErrors(serverResponse);
    } else {
      closeModal();
      navigate('home')
    }
  };

  return (
    <>
    <section className="p-4 gap-4 flex flex-col items-center shadow-xl shadow-black bg-violet-300 border-solid border-4 border-black">
      <h1 className="font-extrabold ">Fill in the fields to Sign Up</h1>
      {errors.server && <p>{errors.server}</p>}
      <form className="gap-4 flex flex-col" onSubmit={handleSubmit}>
        <section className="grid grid-col-2 grid-row-8 p-2 gap-4 shadow-xl shadow-black rounded-lg border-solid border-4 border-black p-4">
        <label className="col-start-1 col-end-1 row-start-1 row-end-1 font-bold p-4 justify-center flex">
          Email
          </label>
          <input className="col-start-2 col-end-2 row-start-1 row-end-1 rounded-lg border-solid border-4 border-black p-1"
            type="text"
            value={email}
            placeholder="drizzt@forgottenrelms.com"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        {errors.email && <p>{errors.email}</p>}
        <label className="col-start-1 col-end-1 row-start-2 row-end-2 font-bold p-4 justify-center flex">
          First Name
          </label>
          <input className="col-start-2 col-end-2 row-start-2 row-end-2 rounded-lg border-solid border-4 border-black p-1"
            type="text"
            value={firstName}
            placeholder="Drizzt"
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        {errors.firstName && <p>{errors.firstName}</p>}
        <label className="col-start-1 col-end-1 row-start-3 row-end-3 font-bold p-4 justify-center flex">
          Last Name
          </label>
          <input className="col-start-2 col-end-2 row-start-3 row-end-3 rounded-lg border-solid border-4 border-black p-1"
            type="text"
            value={lastName}
            placeholder="Do'Urden"
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        {errors.lastName && <p>{errors.lastName}</p>}
        <label className="col-start-1 col-end-1 row-start-4 row-end-4 font-bold p-4 justify-center flex">
          Family Name
          </label>
          <input className="col-start-2 col-end-2 row-start-4 row-end-4 rounded-lg border-solid border-4 border-black p-1"
            type="text"
            value={familyName}
            placeholder="House Do'Urden"
            onChange={(e) => setFamilyName(e.target.value)}
            required
          />
        {errors.familyName && <p>{errors.familyName}</p>}
        <label className="col-start-1 col-end-1 row-start-5 row-end-5 font-bold p-4 justify-center flex">
          Family Motto
          </label>
          <input className="col-start-2 col-end-2 row-start-5 row-end-5 rounded-lg border-solid border-4 border-black p-1"
            type="text"
            value={familyMotto}
            placeholder="Dont judge a book by its cover!"
            onChange={(e) => setFamilyMotto(e.target.value)}
            required
          />
        {errors.familyMotto && <p>{errors.familyMotto}</p>}
        <label className="col-start-1 col-end-1 row-start-6 row-end-6 font-bold p-4 justify-center flex">
          Password
          </label>
          <input className="col-start-2 col-end-2 row-start-6 row-end-6 rounded-lg border-solid border-4 border-black p-1"
            type="password"
            value={password}
            placeholder="Make a good one"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        {errors.password && <p>{errors.password}</p>}
        <label className="col-start-1 col-end-1 row-start-7 row-end-7 font-bold p-4 justify-center flex">
          Confirm Password 
          </label>
          <input className="col-start-2 col-end-2 row-start-7 row-end-7 rounded-lg border-solid border-4 border-black p-1"
            type="password"
            value={confirmPassword}
            placeholder="Enter it again"
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        {errors.confirmPassword && <p>{errors.confirmPassword}</p>}
         </section>
        <button className="shadow-xl shadow-black bg-violet-300 border-solid border-4 border-black rounded-xl font-bold w-1/3 self-center hover:bg-violet-200"
         type="submit">Sign Up</button>
      </form>
      </section>
    </>
  );
}

export default SignupFormModal;
