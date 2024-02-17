import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { findExpenseForUsers } from "../../redux/expense";
import { findIncomeForUsers } from "../../redux/income";
import OpenModalButton from "../OpenModalButton/OpenModalButton";



const Budget = (homeState) => {
    const dispatch = useDispatch()
    const [isLoaded, setIsLoaded] = useState(false)
    const sessionUser = homeState.sessionUser
    const dependent = sessionUser.is_dependent
    // console.log("LINE 13",sessionUser)
    const userFamiliesIds = []
    
    // if( sessionUser.families ){
    //     Object.values(sessionUser.families).forEach(fam => {
    //         userFamiliesIds.push(fam.id)
    //     });
    // }
    // console.log("sessionUser from family", sessionUser)
    const userFamilies = useSelector((state) => state.family);
    let newvar = 0
    const theUsers = []
    // console.log("ARRAY", userFamilies)
    for (const family in userFamilies){
        // console.log("FAMILY", userFamilies[family])
        for (const user in userFamilies[family].users){
            // console.log("USER", user)
            if(!theUsers.includes(user)){
                theUsers.push(user)
                newvar += 1
            } 
        }
    }
    
    // const famIncomes = useSelector((state) => state.income);
    // dispatch(findIncomeForUsers(theUsers))
    const famIncomes = useSelector((state) => state.income);
    const famExpenses = useSelector((state) => state.expense);
    // console.log(famIncomes)
    // console.log(famExpenses)
    let totalIncome = 0
    for (const income in famIncomes){
        totalIncome += famIncomes[income].amount
    }

    let totalExpense = 0
    for (const expense in famExpenses){
        totalExpense += famExpenses[expense].amount
    }
    // console.log(totalIncome)
    // console.log("ARRAY2", theUsers)
    
    useEffect(()=>{
        // console.log("Are you even trying?")
        dispatch(findIncomeForUsers(theUsers))
        .then(()=>{
            setIsLoaded(true)
        }
            )},[newvar])

    useEffect(()=>{
        // console.log("Are you even trying?")
        dispatch(findExpenseForUsers(theUsers))
        .then(()=>{
            setIsLoaded(true)
        }
            )},[newvar])

    return (
        <>
        
        <section className="p-6">
        <div className="text-2xl font-bold underline">Hello from Budget</div>

        <section className="p-2 grid grid-col-2 grid-row-3 gap-4">
        <section className="col-start-1 col-end-1 row-start-1 row-end-1 text-xl bg-amber-200 shadow-md shadow-black p-2 border-solid border-2 border-black rounded-lg w-2/3">
        <div className="flex justify-center">Total Family Income</div>
        </section>

        <section className="col-start-2 col-end-2 row-start-1 row-end-1 text-xl font-bold bg-amber-200 shadow-md shadow-black p-2 border-solid border-2 border-black rounded-lg w-1/3">
        <div className="flex justify-center">{totalIncome}</div>
        </section>

        <section className="col-start-1 col-end-1 row-start-2 row-end-2 text-xl bg-amber-200 shadow-md shadow-black p-2 border-solid border-2 border-black rounded-lg w-2/3">
        <div className="flex justify-center">Total Family Expense </div>
        </section>

        <section className="col-start-2 col-end-2 row-start-2 row-end-2 text-xl font-bold bg-amber-200 shadow-md shadow-black p-2 border-solid border-2 border-black rounded-lg w-1/3">
        <div className="flex justify-center">{totalExpense}</div>
        </section>

        <section className="col-start-1 col-end-3 row-start-3 row-end-3 text-xl font-bold bg-amber-200 shadow-md shadow-black p-2 border-solid border-2 border-black rounded-lg content-center justify-center">
        <div className="flex justify-center ">Available {totalIncome - totalExpense}</div>
        </section>
        </section>
        </section>
        </>
    )
}

export default Budget