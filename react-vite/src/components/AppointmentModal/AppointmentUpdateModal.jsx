import { useState } from "react";
import { useDispatch } from "react-redux";
import { updateAppointmentForUser } from "../../redux/appointment"
import { useModal } from "../../context/Modal";

function AppointmentUpdateModal(props) {
    const theAppointment = props.user.appointments[props.appointmentId]
    console.log("THEAPPOINTMENT", theAppointment)
  const dispatch = useDispatch();
  const [name, setName] = useState(theAppointment.name);
  const [start_date, setStartDate] = useState(theAppointment.start_date);
  const [duration, setDuration] = useState(theAppointment.duration);
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  console.log("PORPS LINE 14", props)
  const userId = props.user.id

//   console.log("USERID", userId)
const handleDrop = async (e) =>{
  e.preventDefault()
  // console.log(e.target.value)
  setDuration(e.target.value)
}

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name) {
        return setErrors({
          Name:
            "What do you want this appointment to be called?",
        });
    }
  
    if (!start_date) {
        return setErrors({
        Amount:
            "What is the start date of the appointment?",
        });
    }

    if (!duration) {
        return setErrors({
          Duration:
            "How many hours will the appointment take?",
        });
    }

    const serverResponse = await dispatch(
        updateAppointmentForUser({
        name: name,
        request: 'False',
        start_date: start_date,
        duration: parseInt(duration),
        user_id: userId,
        appointmentId: theAppointment.id
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
      <h1>Enter new Appointment Info</h1>
      {errors.server && <p>{errors.server}</p>}
      <form onSubmit={handleSubmit}>
        <label>
          Appointment Name
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </label>
        {errors.name && <p>{errors.name}</p>}
        <label>
          Appointment Start Date
          <input
            type="text"
            value={start_date}
            onChange={(e) => setStartDate(e.target.value)}
            required
          />
        </label>
        {errors.start_date && <p>{errors.start_date}</p>}
        <label>
          Appointment Duration
          <select
            type="dropdown"
            onChange={handleDrop}
            required>
            <option value={1}>1 Hour</option>
            <option value={2}>2 Hours</option>
            <option value={3}>3 Hours</option>
            <option value={4}>4 Hours</option>
            <option value={5}>5 Hours</option>
            <option value={6}>6 Hours</option>
            <option value={7}>7 Hours</option>
            <option value={8}>8 Hours</option>
            <option value={9}>9 Hours</option>
            <option value={10}>10 Hours</option>
            <option value={11}>11 Hours</option>
            <option value={12}>12 Hours</option>
            <option value={13}>13 Hours</option>
            <option value={14}>14 Hours</option>
            <option value={15}>15 Hours</option>
            <option value={16}>16 Hours</option>
            <option value={17}>17 Hours</option>
            <option value={18}>18 Hours</option>
            <option value={19}>19 Hours</option>
            <option value={20}>20 Hours</option>
            <option value={21}>21 Hours</option>
            <option value={22}>22 Hours</option>
            <option value={23}>23 Hours</option>
            <option value={24}>24 Hours</option>
          </select>
        </label>
        {errors.duration && <p>{errors.duration}</p>}
        <button type="submit">Confirm</button>
      </form>
      </section>
    </>
  );
}

export default AppointmentUpdateModal
