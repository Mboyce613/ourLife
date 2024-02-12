import IncomeDeleteModal from "../IncomeModal/IncomeDeleteModal"
import IncomeCreateModal from "../IncomeModal/IncomeCreateModal"
import IncomeUpdateModal from "../IncomeModal/IncomeUpdateModal"
import ExpenseCreateModal from "../ExpenseModal/ExpenseCreateModal"
import ExpenseUpdateModal from "../ExpenseModal/ExpenseUpdateModal"
import ExpenseDeleteModal from "../ExpenseModal/ExpenseDeleteModal"
import OpenModalButton from "../OpenModalButton/OpenModalButton"


const UserBudget = (budget) => {

console.log(budget)
let totalIncome = 0
let totalExpenses = 0

Object.values(budget.incomes).forEach(income=>{
    totalIncome += income.amount
})

Object.values(budget.expenses).forEach(expense=>{
    totalExpenses += expense.amount
})

return (
    <>
    <div>{budget.name} {"'s"} Finances</div>
    <div>Income</div>
    {Object.values(budget.incomes).map(income=>{
        return(
            <>
            <p>{income.name}</p>
            <p>${income.amount}</p>
            <OpenModalButton buttonText="Update Income" modalComponent ={<IncomeUpdateModal incomeId ={income.id} user ={budget.user}/>}/>
            <OpenModalButton buttonText="Remove Income" modalComponent ={<IncomeDeleteModal incomeId ={income.id} user ={budget.user}/>}/>
            </>
        )
    })}
    <OpenModalButton buttonText="Add Income" modalComponent ={<IncomeCreateModal incomeId ={budget.incomes.id} user ={budget.user}/>}/>
    <div>Expenses</div>
{Object.values(budget.expenses).map(expense=>{
        return(
            <>
            <p>{expense.name}</p>
            <p>${expense.amount}</p>
            <OpenModalButton buttonText="Update Expense" modalComponent ={<ExpenseUpdateModal expenseId ={expense.id} user ={budget.user}/>}/>
            <OpenModalButton buttonText="Remove Expense" modalComponent ={<ExpenseDeleteModal expenseId ={expense.id} user ={budget.user}/>}/>
            </>
        )
    })}
    <OpenModalButton buttonText="Add Expense" modalComponent ={<ExpenseCreateModal expenseId ={budget.expenses.id} user ={budget.user}/>}/>

    <div>Remaining: ${totalIncome - totalExpenses}</div>
    </>
)
}

export default UserBudget