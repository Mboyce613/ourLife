import { useDispatch } from "react-redux";
import { deleteExpenseForUser } from "../../redux/expense";
import { removeUserFromFamily } from "../../redux/user";
import { useModal } from "../../context/Modal";

function UserDeleteModal(props) {
    const theUser = props.user
    console.log("THEUSER", theUser)
  const dispatch = useDispatch();
  const { closeModal } = useModal();

  console.log("PORPS LINE 14", props)
  // const userId = props.user.id

//   console.log("USERID", userId)


  const handleYes = async (e) => {
    e.preventDefault();

    const serverResponse = await dispatch(
        removeUserFromFamily({
        userId: theUser.id,
        familyId: props.fam.id
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

export default UserDeleteModal
