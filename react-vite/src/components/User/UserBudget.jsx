import IncomeDeleteModal from "../IncomeModal/IncomeDeleteModal"

const UserBudget = (budget) => {

// console.log(budget)
let totalIncome = 0
let totalExpenses = 0

budget.incomes.forEach(income=>{
    totalIncome += income.amount
})

budget.expenses.forEach(expense=>{
    totalExpenses += expense.amount
})

return (
    <>
    <div>{budget.name}'s Finances</div>
    <div>Income</div>
    {budget.incomes.map(income=>{
        return(
            <>
            <p>{income.name}</p>
            <p>${income.amount}</p>
            {/* <OpenModalButton buttonText="Update Income" modalComponent ={<IncomeDeleteModal incomeId ={income.id} user ={props.user}/>}/> */}
            <button>Remove Income</button>
            </>
        )
    })}
    <button>Add Income</button>
    <div>Expenses</div>
{budget.expenses.map(expense=>{
        return(
            <>
            <p>{expense.name}</p>
            <p>${expense.amount}</p>
            {/* <OpenModalButton buttonText="Update Expense" modalComponent ={<MedicationUpdateModal expenseId ={expense.id} user ={props.user}/>}/> */}
            <button>Remove Expense</button>
            </>
        )
    })}
    <button>Add Expense</button>

    <div>Remaining: ${totalIncome - totalExpenses}</div>
    </>
)
}

export default UserBudget