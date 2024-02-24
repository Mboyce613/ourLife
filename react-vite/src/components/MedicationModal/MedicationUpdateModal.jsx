import { useState } from "react";
import { useDispatch } from "react-redux";
import { updateMedicationForUser } from "../../redux/medication";
import { useModal } from "../../context/Modal";

function MedicationUpdateModal(props) {
    const theMed = props.user.medications[props.medId]
    // console.log("THEMED", theMed)
  const dispatch = useDispatch();
  const [name, setName] = useState(theMed.name);
  const [dosage, setDosage] = useState(theMed.dosage);
  const [time, setTime] = useState(theMed.time);
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  // console.log("PORPS LINE 14", props)
  // const userId = props.user.id

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
        updateMedicationForUser({
        name: name,
        dosage: dosage,
        time: time,
        id: theMed.id
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
    <section className="p-4 gap-4 flex flex-col items-center shadow-xl shadow-black bg-red-300 border-solid border-4 border-black">
      <h1 className="font-extrabold">Enter new Medication Info</h1>
      {errors.server && <p>{errors.server}</p>}
      <form className="gap-4 flex flex-col" onSubmit={handleSubmit}>
      <section className="bg-red-200 grid grid-col-2 grid-row-3 p-2 gap-4 shadow-xl shadow-black rounded-lg border-solid border-4 border-black">
        <label className="col-start-1 col-end-1 row-start-1 row-end-1 font-bold p-4 justify-center flex">
          Medication Name
          </label>
          <input className="col-start-2 col-end-2 row-start-1 row-end-1 rounded-lg border-solid border-4 border-black p-1"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        {errors.name && <p>{errors.name}</p>}
        <label className="col-start-1 col-end-1 row-start-2 row-end-2 font-bold p-4 justify-center flex">
          Medication Dosage
          </label>
          <input className="col-start-2 col-end-2 row-start-2 row-end-2 rounded-lg border-solid border-4 border-black p-1"
            type="text"
            value={dosage}
            onChange={(e) => setDosage(e.target.value)}
            required
          />
        {errors.dosage && <p>{errors.dosage}</p>}
        <label className="col-start-1 col-end-1 row-start-3 row-end-3 font-bold p-4 justify-center flex">
          Time to take Medication
          </label>
          <input className="col-start-2 col-end-2 row-start-3 row-end-3 rounded-lg border-solid border-4 border-black p-1"
            type="text"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            required
          />
        {errors.time && <p>{errors.time}</p>}
        </section>
        <button className="shadow-xl shadow-black bg-red-200 border-solid border-4 border-black rounded-xl font-bold w-1/3 self-center hover:bg-red-100" type="submit">Confirm</button>
      </form>
      </section>
    </>
  );
}

export default MedicationUpdateModal
