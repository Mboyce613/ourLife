import { useState } from "react";
import { useDispatch } from "react-redux";
import { createExpenseForUser } from "../../redux/expense";
import { useModal } from "../../context/Modal";

function ExpenseCreateModal(props) {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

//   console.log("PORPS LINE 14", props)
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
          Dosage:
            "What is the amount of the expense?",
        });
      }

    const serverResponse = await dispatch(
        createExpenseForUser({
        name: name,
        amount: amount,
        user_id: userId
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
    <section className="p-4 gap-4 flex flex-col items-center shadow-xl shadow-black bg-violet-300 border-solid border-4 border-black">
      <h1>Enter a new Expense</h1>
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
      </section>
    </>
  );
}

export default ExpenseCreateModal
