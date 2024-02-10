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
        duration: duration,
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
          <input
            type="text"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            required
          />
        </label>
        {errors.duration && <p>{errors.duration}</p>}
        <button type="submit">Confirm</button>
      </form>
    </>
  );
}

export default AppointmentUpdateModal
