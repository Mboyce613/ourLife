import { getUserById } from "../../redux/user"
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import UserMedication from "./UserMedication";
import UserAppointments from "./UserAppointments";
import UserBudget from "./UserBudget";
import OpenModalButton from "../OpenModalButton/OpenModalButton";


const User = (userId) => {
    const dispatch = useDispatch()
    const [isLoaded, setIsLoaded] = useState(false)
    const theUser = useSelector((state) => state.user);
    // console.log("LINE 9", theUser)
    useEffect(()=>{
        dispatch(getUserById(userId.userId))
        .then(()=>{
            setIsLoaded(true)
        }
            )},[])
    return (
        <>
        <div>{theUser.first_name}</div>
        <div>Hello from User {userId.userId}</div>
        <div><OpenModalButton buttonText="Medications" modalComponent ={<UserMedication meds={theUser.medications} name ={theUser.first_name} user ={theUser}/>}/></div>
        <div><OpenModalButton buttonText="Appointments" modalComponent ={<UserAppointments apps={theUser.appointments} name ={theUser.first_name} user ={theUser}/>}/></div>
        <div><OpenModalButton buttonText="Budget" modalComponent ={<UserBudget incomes={theUser.incomes} expenses={theUser.expenses} name ={theUser.first_name} user ={theUser}/>}/></div>
        </>
    )
}

export default User