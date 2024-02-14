import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFamiliesByIds } from "../../redux/family";
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
    console.log(famIncomes)
    let totalIncome = 0
    for (const income in famIncomes){
        totalIncome += famIncomes[income].amount
    }
    console.log(totalIncome)
    // console.log("ARRAY2", theUsers)
    
    useEffect(()=>{
        console.log("Are you even trying?")
        dispatch(findIncomeForUsers(theUsers))
        .then(()=>{
            setIsLoaded(true)
        }
            )},[newvar])

    return (
        <>
        <div>Hello from Budget</div>
        <section>

        </section>
        </>
    )
}

export default Budget