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
    <section className="p-4 gap-4 flex flex-col items-center shadow-xl shadow-black bg-amber-300 border-solid border-4 border-black">
    <div className="font-extrabold">{budget.name} {"'s"} Finances</div>
    <section className="p-4 gap-4 flex flex-row items-center shadow-xl shadow-black bg-amber-200 border-solid border-4 border-black">
    <section className="flex flex-col gap-2 items-center">
    <div className="font-bold">Income</div>
    {Object.values(budget.incomes).map(income=>{
        return(
            <>
            <section className="flex flex-row gap-2 font-bold">
            <p>{income.name}</p>
            <p>${income.amount}</p>
            </section>
            <section className="flex flex-row gap-2">
            <div className="shadow-xl shadow-black bg-amber-150 border-solid border-4 border-black rounded-xl font-bold self-center hover:bg-amber-100 p-2"><OpenModalButton buttonText="Update Income" modalComponent ={<IncomeUpdateModal incomeId ={income.id} user ={budget.user}/>}/></div>
            <div className="shadow-xl shadow-black bg-amber-150 border-solid border-4 border-black rounded-xl font-bold self-center hover:bg-amber-100 p-2"><OpenModalButton buttonText="Remove Income" modalComponent ={<IncomeDeleteModal incomeId ={income.id} user ={budget.user}/>}/></div>
            </section>
            </>
        )
    })}
    <div className="shadow-xl shadow-black bg-amber-150 border-solid border-4 border-black rounded-xl font-bold self-center hover:bg-amber-100 p-2 w-1/2"><OpenModalButton buttonText="Add Income" modalComponent ={<IncomeCreateModal incomeId ={budget.incomes.id} user ={budget.user}/>}/></div>
    </section>
    <section>
    <section className="flex flex-col gap-2 items-center">
    <div>Expenses</div>
{Object.values(budget.expenses).map(expense=>{
        return(
            <>
            <section className="flex flex-row gap-2 font-bold">
            <p>{expense.name}</p>
            <p>${expense.amount}</p>
            </section>
            <section className="flex flex-row gap-2">
            <div className="shadow-xl shadow-black bg-amber-150 border-solid border-4 border-black rounded-xl font-bold self-center hover:bg-amber-100 p-2"><OpenModalButton buttonText="Update Expense" modalComponent ={<ExpenseUpdateModal expenseId ={expense.id} user ={budget.user}/>}/></div>
            <div className="shadow-xl shadow-black bg-amber-150 border-solid border-4 border-black rounded-xl font-bold self-center hover:bg-amber-100 p-2"><OpenModalButton buttonText="Remove Expense" modalComponent ={<ExpenseDeleteModal expenseId ={expense.id} user ={budget.user}/>}/></div>
            </section>
            </>
        )
    })}
    <div className="shadow-xl shadow-black bg-amber-150 border-solid border-4 border-black rounded-xl font-bold self-center hover:bg-amber-100 p-2"><OpenModalButton buttonText="Add Expense" modalComponent ={<ExpenseCreateModal expenseId ={budget.expenses.id} user ={budget.user}/>}/></div>
    </section>
    </section>
    </section>
    <div className="font-bold">Remaining: ${totalIncome - totalExpenses}</div>
    </section>
    </>
)
}

export default UserBudget