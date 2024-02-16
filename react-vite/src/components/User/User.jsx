import { getUserById } from "../../redux/user"
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import UserMedication from "./UserMedication";
import UserAppointments from "./UserAppointments";
import UserBudget from "./UserBudget";
import OpenModalButton from "../OpenModalButton/OpenModalButton";
import UserUpdateModal from './UserUpdateModal';
import UserDeleteModal from "./UserDeleteModal";


const User = (props) => {
    const dispatch = useDispatch()
    const [isLoaded, setIsLoaded] = useState(false)
    const theUser = useSelector((state) => state.user);
    console.log("LINE 9", theUser)
    console.log("THE PROPS", props)
    useEffect(()=>{
        dispatch(getUserById(props.userId))
        .then(()=>{
            setIsLoaded(true)
        }
            )},[])
    return (
        <>
        <div>{theUser.first_name}</div>
        <div>Hello from User {props.userId}</div>
        <div><OpenModalButton buttonText="Medications" modalComponent ={<UserMedication meds={theUser.medications} name ={theUser.first_name} user ={theUser}/>} dependent={props.dependent}/></div>
        <div><OpenModalButton buttonText="Appointments" modalComponent ={<UserAppointments apps={theUser.appointments} name ={theUser.first_name} user ={theUser}/>}/></div>
        <div><OpenModalButton buttonText="Budget" modalComponent ={<UserBudget incomes={theUser.incomes} expenses={theUser.expenses} name ={theUser.first_name} user ={theUser}/>}/></div>
        {!props.dependent && <div><OpenModalButton buttonText={`Change ${theUser.first_name}${"'s"} Info`} modalComponent ={<UserUpdateModal user ={theUser}/>}/></div>}
        {!props.dependent && <div><OpenModalButton buttonText="Remove user from Family" modalComponent ={<UserDeleteModal user ={theUser} fam={props.fam}/>}/></div>}
        </>
    )
}

export default User