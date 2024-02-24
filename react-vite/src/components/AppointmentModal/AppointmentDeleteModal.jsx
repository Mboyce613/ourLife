import { useDispatch } from "react-redux";
import { deleteAppointmentForUser } from "../../redux/appointment"
import { useModal } from "../../context/Modal";

function AppointmentDeleteModal(props) {
    const theAppointment = props.user.appointments[props.appointmentId]
    // console.log("THEAPPOINTMENT", theAppointment)
  const dispatch = useDispatch();

  const { closeModal } = useModal();

  // console.log("PORPS LINE 14", props)
  // const userId = props.user.id

//   console.log("USERID", userId)


  const handleYes = async (e) => {
    e.preventDefault();

    const serverResponse = await dispatch(
        deleteAppointmentForUser({
        id: theAppointment.id
      })
    );

    if (serverResponse) {
        // alert saying it was deleted
      closeModal()
    } else {
        closeModal()
    }
  };

  const handleNo = async (e) => {
    e.preventDefault();
    closeModal()
  };
// console.log("I got to line 55")
  return (
    <>
    <section className="p-4 gap-4 flex flex-col items-center shadow-xl shadow-black bg-sky-300 border-solid border-4 border-black">
    <h1 className="font-extrabold">{props.user.first_name} {"'s"} {theAppointment.name}</h1>
    <h2 className="font-bold">Are you sure you want to delete it?</h2>
    <section className="flex flex-row gap-6">
    <button className="shadow-xl shadow-black bg-sky-200 border-solid border-4 border-black rounded-xl font-bold p-2 self-center hover:bg-sky-100" onClick={handleYes}>Yes</button>
    <button className="shadow-xl shadow-black bg-sky-200 border-solid border-4 border-black rounded-xl font-bold p-2 self-center hover:bg-sky-100" onClick={handleNo}>No</button>
    </section>
    </section>
    </>
  );
}

export default AppointmentDeleteModal
