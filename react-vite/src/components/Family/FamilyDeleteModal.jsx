import { useDispatch } from "react-redux";
import { removeUserFromFamily } from "../../redux/family";
import { useModal } from "../../context/Modal";

function FamilyDeleteModal(props) {
    const theFamily = props.fam
    console.log("THEFAMILY", theFamily)
  const dispatch = useDispatch();
  const { closeModal } = useModal();

//   console.log("PROPS LINE 14", props)
  const userId = props.user.id

  console.log("USERID", userId)


  const handleYes = async (e) => {
    e.preventDefault();

    const serverResponse = await dispatch(
        removeUserFromFamily({
        familyId: theFamily.id,
        userId: userId
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
    <h1>{props.user.first_name} {props.user.last_name}</h1>
    <h2>Are you sure you want to remove this user from the {props.fam.name} family?</h2>
    <button onClick={handleYes}>Yes</button>
    <button onClick={handleNo}>No</button>
    </>
  );
}

export default FamilyDeleteModal
