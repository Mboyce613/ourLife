import { useState } from "react";
import { useDispatch } from "react-redux";
import { updateExpenseForUser } from "../../redux/expense";
import { updateUserById } from '../../redux/user'
import { useModal } from "../../context/Modal";

function UserUpdateModal(props) {
  console.log("USER PROPS", props)
    const theUser = props.user
    console.log("THEUSER", theUser)
  const dispatch = useDispatch();
  const [firstName, setFirstName] = useState(theUser.first_name);
  const [lastName, setLastName] = useState(theUser.last_name);
  const [email, setEmail] = useState(theUser.email);
  const [isDependent, setIsDependent] = useState(theUser.is_dependent);
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

//   console.log("PORPS LINE 14", props)
  const userId = props.user.id

//   console.log("USERID", userId)
const handleDrop = async (e) =>{
    e.preventDefault()
    setIsDependent(e.target.value)
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

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
        updateUserById({
        first_name: firstName,
        last_name: lastName,
        email: email,
        is_dependent: isDependent,
        id: userId
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
      <h1>Enter the Users New Info</h1>
      {errors.server && <p>{errors.server}</p>}
      <form className="gap-4 flex flex-col" onSubmit={handleSubmit}>
      <section className="grid grid-col-2 grid-row-8 p-2 gap-4 shadow-xl shadow-black rounded-lg border-solid border-4 border-black p-4">
        <label>
          First Name
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </label>
        {errors.lastName && <p>{errors.lastName}</p>}
        <label>
          Last Name
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </label>
        {errors.firstName && <p>{errors.firstName}</p>}
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
          Is a Dependent
          <select
            type="dropdown"
            onChange={handleDrop}
            required>
            <option value='True'>Yes</option>
            <option value='False'>No</option>
          </select>
        </label>
        {errors.duration && <p>{errors.duration}</p>}
        <button type="submit">Confirm</button>
      </section>
      </form>
      </section>
    </>
  );
}

export default UserUpdateModal
