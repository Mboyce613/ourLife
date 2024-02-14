import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { findExpenseForUsers } from "../../redux/expense";
import { findIncomeForUsers } from "../../redux/income";
import OpenModalButton from "../OpenModalButton/OpenModalButton";



const Budget = (homeState) => {
    const dispatch = useDispatch()
    const [isLoaded, setIsLoaded] = useState(false)
    const sessionUser = homeState.sessionUser
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
        <div>Hello from Budget</div>
        <div>Total Family Income {totalIncome}</div>
        <div>Total Family Expense {totalExpense}</div>
        <div>Available {totalIncome - totalExpense}</div>
        <section>

        </section>
        </>
    )
}

export default Budget