import { useState } from "react";
import { useDispatch } from "react-redux";
import { createAppointmentForUser } from "../../redux/appointment";
import { useModal } from "../../context/Modal";

function AppointmentCreateModal(props) {

  const date = new Date();
  let newMonth
  let day = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();
  String(month).length ===1?newMonth = `0${date.getMonth()+1}`:newMonth=month
  let currentDate = `${year}-${newMonth}-${day}`;

  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [start_date, setStartDate] = useState(currentDate);
  const [duration, setDuration] = useState("");
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
    console.log("Submit?")


    if (!name) {
      // console.log("no name")
        return setErrors({
          Name:
            "What do you want this appointment to be called?",
        });
    }
  
    if (!start_date) {
      // console.log("no start date")
        return setErrors({
        Amount:
            "What is the start date of the appointment?",
        });
    }

    if (!duration) {
      // console.log("no duration")
        return setErrors({
          Duration:
            "How many hours will the appointment take?",
        });
    }
    // console.log("made to line 53?")
    const serverResponse = await dispatch(
        createAppointmentForUser({
        name: name,
        request: 'False',
        start_date: start_date,
        duration: parseInt(duration),
        user_id: userId,
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
      <h1>Make a new Appointment</h1>
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
            type="date"
            value={start_date}
            min={currentDate}
            placeholder="MM/DD/YYYY"
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
    </>
  );
}

export default AppointmentCreateModal
