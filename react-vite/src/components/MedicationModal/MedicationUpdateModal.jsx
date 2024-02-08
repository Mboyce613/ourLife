import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { thunkSignup } from "../../redux/session";
import { createMedicationForUser } from "../../redux/medication";
import { useModal } from "../../context/Modal";

function MedicationUpdateModal(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [dosage, setDosage] = useState("");
  const [time, setTime] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

//   console.log("PORPS LINE 14", props)
  const userId = props.user.id
//   console.log("USERID", userId)


  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name) {
      return setErrors({
        Name:
          "What is the medications name?",
      });
    }

    if (!dosage) {
        return setErrors({
          Dosage:
            "What is the medications dosage?",
        });
      }

      if (!time) {
        return setErrors({
          Dosage:
            "What time of day should the medication be taken?",
        });
      }

    const serverResponse = await dispatch(
        createMedicationForUser({
        name: name,
        dosage: dosage,
        time: time,
        user_id: userId
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
      <h1>Enter a new Medication</h1>
      {errors.server && <p>{errors.server}</p>}
      <form onSubmit={handleSubmit}>
        <label>
          Medication Name
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </label>
        {errors.name && <p>{errors.name}</p>}
        <label>
          Medication Dosage
          <input
            type="text"
            value={dosage}
            onChange={(e) => setDosage(e.target.value)}
            required
          />
        </label>
        {errors.dosage && <p>{errors.dosage}</p>}
        <label>
          Time to take Medication
          <input
            type="text"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            required
          />
        </label>
        {errors.time && <p>{errors.time}</p>}
        <button type="submit">Confirm</button>
      </form>
    </>
  );
}

export default MedicationUpdateModal
