import { useDispatch } from "react-redux";
import { deleteIncomeForUser } from "../../redux/income";
import { useModal } from "../../context/Modal";

function IncomeDeleteModal(props) {
    const theIncome = props.user.incomes[props.incomeId]
    console.log("THEINCOME", theIncome)
  const dispatch = useDispatch();

  const { closeModal } = useModal();

  console.log("PORPS LINE 14", props)
  // const userId = props.user.id

//   console.log("USERID", userId)


  const handleYes = async (e) => {
    e.preventDefault();

    const serverResponse = await dispatch(
      deleteIncomeForUser({
        id: theIncome.id
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
    <h1>{props.user.first_name} {"'s"}  {theIncome.name}</h1>
    <h2>Are you sure you want to delete it?</h2>
    <button onClick={handleYes}>Yes</button>
    <button onClick={handleNo}>No</button>
    </>
  );
}

export default IncomeDeleteModal
