import { useDispatch } from "react-redux";
import { deleteAppointmentForUser } from "../../redux/appointment"
import { useModal } from "../../context/Modal";

function AppointmentDeleteModal(props) {
    const theAppointment = props.user.appointments[props.appointmentId]
    console.log("THEAPPOINTMENT", theAppointment)
  const dispatch = useDispatch();

  const { closeModal } = useModal();

  console.log("PORPS LINE 14", props)
  const userId = props.user.id

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
    <h1>{props.user.first_name}'s {theAppointment.name}</h1>
    <h2>Are you sure you want to delete it?</h2>
    <button onClick={handleYes}>Yes</button>
    <button onClick={handleNo}>No</button>
    </>
  );
}

export default AppointmentDeleteModal
