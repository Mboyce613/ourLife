import { useState } from "react";
import { useDispatch } from "react-redux";
import { updateExpenseForUser } from "../../redux/expense";
import { useModal } from "../../context/Modal";

function ExpenseUpdateModal(props) {
  console.log("EXPENSES PROPS", props)
    const theExpense = props.user.expenses[props.expenseId]
    console.log("THEEXPENSE", theExpense)
  const dispatch = useDispatch();
  const [name, setName] = useState(theExpense.name);
  const [amount, setAmount] = useState(theExpense.amount);
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  console.log("PORPS LINE 14", props)
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
      <h1>Enter new Expense Info</h1>
      {errors.server && <p>{errors.server}</p>}
      <form onSubmit={handleSubmit}>
        <label>
          Expense Name
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </label>
        {errors.name && <p>{errors.name}</p>}
        <label>
          Expense Amount
          <input
            type="text"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
        </label>
        {errors.amount && <p>{errors.amount}</p>}
        
        <button type="submit">Confirm</button>
      </form>
    </>
  );
}

export default ExpenseUpdateModal
