import { useState } from "react";
import { useDispatch } from "react-redux";
import { createUserForFamily } from "../../redux/family";
import { useModal } from "../../context/Modal";

function UserCreateModal(props) {
  // console.log("USER PROPS", props)
  const dispatch = useDispatch();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [isDependent, setIsDependent] = useState('True');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();


const handleDrop = async (e) =>{
    e.preventDefault()
    setIsDependent(e.target.value)
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log("Im trying")
    if (!firstName) {
        return setErrors({
          firstName:
            "What do you want this user to be called?",
        });
    }

    if (!lastName) {
        return setErrors({
          lastName:
            "What do you want this user to be called?",
        });
    }
  
    if (!email) {
        return setErrors({
        Email:
            "What is the users email?",
        });
    }

    if (!isDependent) {
        return setErrors({
        isDependent:
            "Is the user a dependent?",
        });
    }
    const serverResponse = await dispatch(
        createUserForFamily({
        first_name: firstName,
        last_name: lastName,
        email: email,
        is_dependent: isDependent,
        password: password,
        id: props.fam.id
      })
    );

    if (serverResponse) {
        // console.log("SERVERRESPONSE", serverResponse)
      setErrors(serverResponse);
      closeModal()
    } else {
        closeModal()
    }
  };
// console.log("I got to line 55")
return (
    <>
    <section className="p-4 gap-4 flex flex-col items-center shadow-xl shadow-black bg-violet-300 border-solid border-4 border-black">
      <h1 className="font-extrabold ">Enter the Users New Info</h1>
      {errors.server && <p>{errors.server}</p>}
      <form className="gap-4 flex flex-col" onSubmit={handleSubmit}>
      <section className="grid grid-col-2 grid-row-8 p-2 gap-4 shadow-xl shadow-black rounded-lg border-solid border-4 border-black">
        <label className="col-start-1 col-end-1 row-start-1 row-end-1 font-bold p-4 justify-center flex">
          First Name
          </label>
          <input className="col-start-2 col-end-2 row-start-1 row-end-1 rounded-lg border-solid border-4 border-black p-1"
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        {errors.lastName && <p>{errors.lastName}</p>}
        <label className="col-start-1 col-end-1 row-start-2 row-end-2 font-bold p-4 justify-center flex">
          Last Name
          </label>
          <input className="col-start-2 col-end-2 row-start-2 row-end-2 rounded-lg border-solid border-4 border-black p-1"
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        {errors.firstName && <p>{errors.firstName}</p>}
        <label className="col-start-1 col-end-1 row-start-3 row-end-3 font-bold p-4 justify-center flex">
          Email
          </label>
          <input className="col-start-2 col-end-2 row-start-3 row-end-3 rounded-lg border-solid border-4 border-black p-1"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        {errors.email && <p>{errors.email}</p>}
        <label className="col-start-1 col-end-1 row-start-4 row-end-4 font-bold p-4 justify-center flex">
          Is a Dependent
          </label>
          <select className="col-start-2 col-end-2 row-start-4 row-end-4 rounded-lg border-solid border-4 border-black p-1"
            type="dropdown"
            onChange={handleDrop}
            defaultValue={'True'}
            required>
            <option value='True'>Yes</option>
            <option value='False'>No</option>
          </select>
        {errors.duration && <p>{errors.duration}</p>}
        <label className="col-start-1 col-end-1 row-start-5 row-end-5 font-bold p-4 justify-center flex">
          Password
          </label>
          <input className="col-start-2 col-end-2 row-start-5 row-end-5 rounded-lg border-solid border-4 border-black p-1"
            type="text"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        {errors.password && <p>{errors.password}</p>}
        </section>
        <button className="shadow-xl shadow-black bg-violet-200 border-solid border-4 border-black rounded-xl font-bold w-1/3 self-center hover:bg-violet-100" type="submit">Confirm</button>
      </form>
      </section>
    </>
  );
}
export default UserCreateModal
