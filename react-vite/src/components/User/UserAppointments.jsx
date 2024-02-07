import { getUserById } from "../../redux/user"
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const UserAppointments = (apps) => {
    const dispatch = useDispatch()
    const [isLoaded, setIsLoaded] = useState(false)
    // const theUser = useSelector((state) => state.user);
    // console.log("LINE 9", theUser)
    // useEffect(()=>{
    //     dispatch(getUserById(userId.userId))
    //     .then(()=>{
    //         setIsLoaded(true)
    //     }
    //         )},[])
    return (
        <>
        <div>Hello from UserAppointments</div>
        </>
    )
}

export default UserAppointments