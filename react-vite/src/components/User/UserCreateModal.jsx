import { useState } from "react";
import { useDispatch } from "react-redux";
import { createUserForFamily } from "../../redux/family";
import { useModal } from "../../context/Modal";

function UserCreateModal(props) {
  console.log("USER PROPS", props)
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
    console.log("Im trying")
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
      <h1>Enter the Users New Info</h1>
      {errors.server && <p>{errors.server}</p>}
      <form onSubmit={handleSubmit}>
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
            defaultValue={'True'}
            required>
            <option value='True'>Yes</option>
            <option value='False'>No</option>
          </select>
        </label>
        {errors.duration && <p>{errors.duration}</p>}
        <label>
          Password
          <input
            type="text"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        {errors.password && <p>{errors.password}</p>}
        <button type="submit">Confirm</button>
      </form>
    </>
  );
}
export default UserCreateModal
