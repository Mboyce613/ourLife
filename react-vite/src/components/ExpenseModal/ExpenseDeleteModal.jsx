import { useDispatch } from "react-redux";
import { deleteExpenseForUser } from "../../redux/expense";
import { useModal } from "../../context/Modal";

function IncomeDeleteModal(props) {
    const theExpense = props.user.expenses[props.expenseId]
    console.log("THEEXPENSE", theExpense)
  const dispatch = useDispatch();
  const { closeModal } = useModal();

  console.log("PORPS LINE 14", props)
  // const userId = props.user.id

//   console.log("USERID", userId)


  const handleYes = async (e) => {
    e.preventDefault();

    const serverResponse = await dispatch(
        deleteExpenseForUser({
        id: theExpense.id
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
    <section className="p-4 gap-4 flex flex-col items-center shadow-xl shadow-black bg-amber-300 border-solid border-4 border-black">
    <h1 className="font-extrabold">{props.user.first_name} {"'s"} {theExpense.name}</h1>
    <h2 className="font-bold">Are you sure you want to delete it?</h2>
    <section className="flex flex-row gap-6">
    <button className="shadow-xl shadow-black bg-amber-200 border-solid border-4 border-black rounded-xl font-bold p-2 self-center hover:bg-amber-100" onClick={handleYes}>Yes</button>
    <button className="shadow-xl shadow-black bg-amber-200 border-solid border-4 border-black rounded-xl font-bold p-2 self-center hover:bg-amber-100" onClick={handleNo}>No</button>
    </section>
    </section>
    </>
  );
}

export default IncomeDeleteModal
