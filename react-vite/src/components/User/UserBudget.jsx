

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
            <button>Update Income</button>
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
            <button>Update Expense</button>
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