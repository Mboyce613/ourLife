import { useState } from "react";
import { useDispatch } from "react-redux";
import { updateExpenseForUser } from "../../redux/expense";
import { useModal } from "../../context/Modal";

function ExpenseUpdateModal(props) {
  // console.log("EXPENSES PROPS", props)
    const theExpense = props.user.expenses[props.expenseId]
    // console.log("THEEXPENSE", theExpense)
  const dispatch = useDispatch();
  const [name, setName] = useState(theExpense.name);
  const [amount, setAmount] = useState(theExpense.amount);
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  // console.log("PORPS LINE 14", props)
  const userId = props.user.id

//   console.log("USERID", userId)


  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name) {
        return setErrors({
          Name:
            "What do you want this expense to be called?",
        });
    }
  
    if (!amount) {
        return setErrors({
        Amount:
            "What is the amount of the expense?",
        });
    }

    const serverResponse = await dispatch(
        updateExpenseForUser({
        name: name,
        amount: amount,
        user_id: userId,
        expenseId: theExpense.id
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
    <section className="p-4 gap-4 flex flex-col items-center shadow-xl shadow-black bg-amber-300 border-solid border-4 border-black">
      <h1 className="font-extrabold ">Enter new Expense Info</h1>
      {errors.server && <p>{errors.server}</p>}
      <form className="gap-4 flex flex-col" onSubmit={handleSubmit}>
      <section className="bg-amber-200 grid grid-col-2 grid-row-2 p-2 gap-4 shadow-xl shadow-black rounded-lg border-solid border-4 border-black">
        <label className="col-start-1 col-end-1 row-start-1 row-end-1 font-bold p-4 justify-center flex">
          Expense Name
          </label>
          <input className="col-start-2 col-end-2 row-start-1 row-end-1 rounded-lg border-solid border-4 border-black p-1"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        {errors.name && <p>{errors.name}</p>}
        <label className="col-start-1 col-end-1 row-start-2 row-end-2 font-bold p-4 justify-center flex">
          Expense Amount
          </label>
          <input className="col-start-2 col-end-2 row-start-2 row-end-2 rounded-lg border-solid border-4 border-black p-1"
            type="text"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
        {errors.amount && <p>{errors.amount}</p>}
        </section>
        <button className="shadow-xl shadow-black bg-amber-200 border-solid border-4 border-black rounded-xl font-bold w-1/3 self-center hover:bg-amber-100" type="submit">Confirm</button>
      </form>
      </section>
    </>
  );
}

export default ExpenseUpdateModal
