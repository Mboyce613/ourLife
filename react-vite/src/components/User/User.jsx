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
    // console.log("LINE 9", theUser)
    // console.log("THE PROPS", props)
    useEffect(()=>{
        dispatch(getUserById(props.userId))
        .then(()=>{
            setIsLoaded(true)
        }
            )},[])
    return (
        <>
        <section className="p-4 gap-4 flex flex-col items-center shadow-xl shadow-black bg-violet-300 border-solid border-4 border-black">
        <div className="font-bold">{theUser.first_name}</div>
        <div className="shadow-xl shadow-black bg-red-300 border-solid border-4 border-black rounded-xl font-bold self-center hover:bg-red-200 p-2"><OpenModalButton buttonText="Medications" modalComponent ={<UserMedication meds={theUser.medications} name ={theUser.first_name} user ={theUser} dependent={props.dependent} />} /></div>
        <div className="shadow-xl shadow-black bg-sky-300 border-solid border-4 border-black rounded-xl font-bold self-center hover:bg-sky-200 p-2"><OpenModalButton buttonText="Appointments" modalComponent ={<UserAppointments apps={theUser.appointments} name ={theUser.first_name} user ={theUser}/>}/></div>
        <div className="shadow-xl shadow-black bg-amber-300 border-solid border-4 border-black rounded-xl font-bold self-center hover:bg-amber-200 p-2"><OpenModalButton buttonText="Budget" modalComponent ={<UserBudget incomes={theUser.incomes} expenses={theUser.expenses} name ={theUser.first_name} user ={theUser}/>}/></div>
        {!props.dependent && <div className="shadow-xl shadow-black bg-violet-200 border-solid border-4 border-black rounded-xl font-bold self-center hover:bg-violet-100 p-2"><OpenModalButton buttonText={`Change ${theUser.first_name}${"'s"} Info`} modalComponent ={<UserUpdateModal user ={theUser}/>}/></div>}
        {!props.dependent && <div className="shadow-xl shadow-black bg-violet-200 border-solid border-4 border-black rounded-xl font-bold self-center hover:bg-violet-100 p-2"><OpenModalButton buttonText="Remove user from Family" modalComponent ={<UserDeleteModal user ={theUser} fam={props.fam}/>}/></div>}
        </section>
        </>
    )
}

export default User