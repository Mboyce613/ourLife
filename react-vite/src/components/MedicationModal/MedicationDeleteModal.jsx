import { useDispatch } from "react-redux";
import { deleteMedicationForUser } from "../../redux/medication";
import { useModal } from "../../context/Modal";

function MedicationDeleteModal(props) {
    const theMed = props.user.medications[props.medId]
    console.log("THEMED", theMed)
  const dispatch = useDispatch();

  const { closeModal } = useModal();

  console.log("PORPS LINE 14", props)
  // const userId = props.user.id

//   console.log("USERID", userId)


  const handleYes = async (e) => {
    e.preventDefault();

    const serverResponse = await dispatch(
        deleteMedicationForUser({
        id: theMed.id
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
    <section className="p-4 gap-4 flex flex-col items-center shadow-xl shadow-black bg-violet-300 border-solid border-4 border-black">
    <h1>{props.user.first_name} {"'s"} {theMed.name}</h1>
    <h2>Are you sure you want to delete it?</h2>
    <button onClick={handleYes}>Yes</button>
    <button onClick={handleNo}>No</button>
    </section>
    </>
  );
}

export default MedicationDeleteModal
