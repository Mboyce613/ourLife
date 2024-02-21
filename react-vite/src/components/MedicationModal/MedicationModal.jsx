import { useState } from "react";
import { useDispatch } from "react-redux";
import { createMedicationForUser } from "../../redux/medication";
import { useModal } from "../../context/Modal";

function MedicationModal(props) {
  const dispatch = useDispatch();
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
    <section className="p-4 gap-4 flex flex-col items-center shadow-xl shadow-black bg-violet-300 border-solid border-4 border-black">
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
      </section>
    </>
  );
}

export default MedicationModal
