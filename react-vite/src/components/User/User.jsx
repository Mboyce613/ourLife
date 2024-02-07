import { getUserById } from "../../redux/user"
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import UserMedication from "./UserMedication";
import OpenModalButton from "../OpenModalButton/OpenModalButton";

const User = (userId) => {
    const dispatch = useDispatch()
    const [isLoaded, setIsLoaded] = useState(false)
    const theUser = useSelector((state) => state.user);
    console.log("LINE 9", theUser)
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
        <div><OpenModalButton buttonText="Medications" modalComponent ={<UserMedication meds={theUser.medications}/>}/></div>
        <div>Placeholder for appointments</div>
        <div>Placeholder for Budgets</div>
        </>
    )
}

export default User