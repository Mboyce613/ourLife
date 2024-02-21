import { useState } from "react";
import { useDispatch } from "react-redux";
import { updateIncomeForUser } from "../../redux/income";
import { useModal } from "../../context/Modal";

function IncomeUpdateModal(props) {
    const theIncome = props.user.incomes[props.incomeId]
    console.log("THEINCOME", theIncome)
  const dispatch = useDispatch();
  const [name, setName] = useState(theIncome.name);
  const [amount, setAmount] = useState(theIncome.amount);
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
            "What do you want this income to be called?",
        });
    }
  
    if (!amount) {
        return setErrors({
        Amount:
            "What is the amount of the income?",
        });
    }

    const serverResponse = await dispatch(
        updateIncomeForUser({
        name: name,
        amount: amount,
        user_id: userId,
        incomeId: theIncome.id
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
      <h1>Enter new Income Info</h1>
      {errors.server && <p>{errors.server}</p>}
      <form onSubmit={handleSubmit}>
        <label>
          Income Name
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </label>
        {errors.name && <p>{errors.name}</p>}
        <label>
          Income Amount
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

export default IncomeUpdateModal
