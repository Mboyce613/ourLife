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
  const [duration, setDuration] = useState(1);
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  // console.log("PORPS LINE 14", props)
  const userId = props.user.id

//   console.log("USERID", userId)

const handleDrop = async (e) =>{
  e.preventDefault()
  // console.log(e.target.value)
  setDuration(e.target.value)
}

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log("Submit?")


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
    <section className="p-4 gap-4 flex flex-col items-center shadow-xl shadow-black bg-sky-300 border-solid border-4 border-black">
      <h1 className="font-extrabold ">Make a new Appointment</h1>
      {errors.server && <p>{errors.server}</p>}
      <form className="gap-4 flex flex-col" onSubmit={handleSubmit}>
      <section className="bg-sky-200 grid grid-col-2 grid-row-3 p-2 gap-4 shadow-xl shadow-black rounded-lg border-solid border-4 border-black">
        <label className="col-start-1 col-end-1 row-start-1 row-end-1 font-bold p-4 justify-center flex">
          Appointment Name
          </label>
          <input className="col-start-2 col-end-2 row-start-1 row-end-1 rounded-lg border-solid border-4 border-black p-1"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        {errors.name && <p>{errors.name}</p>}
        <label className="col-start-1 col-end-1 row-start-2 row-end-2 font-bold p-4 justify-center flex">
          Appointment Start Date
          </label>
          <input className="col-start-2 col-end-2 row-start-2 row-end-2 rounded-lg border-solid border-4 border-black p-1"
            type="date"
            value={start_date}
            min={currentDate}
            placeholder="MM/DD/YYYY"
            onChange={(e) => setStartDate(e.target.value)}
            required
          />
        {errors.start_date && <p>{errors.start_date}</p>}
        <label className="col-start-1 col-end-1 row-start-3 row-end-3 font-bold p-4 justify-center flex">
          Appointment Duration
          </label>
          <select className="col-start-2 col-end-2 row-start-3 row-end-3 rounded-lg border-solid border-4 border-black p-1"
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
        {errors.duration && <p>{errors.duration}</p>}
        </section>
        <button className="shadow-xl shadow-black bg-sky-200 border-solid border-4 border-black rounded-xl font-bold w-1/3 self-center hover:bg-sky-100" type="submit">Confirm</button>
      </form>
      </section>
    </>
  );
}

export default AppointmentCreateModal
