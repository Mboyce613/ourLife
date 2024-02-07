import { getUserById } from "../../redux/user"
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const UserMedication = (meds) => {
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
        <div>Hello from UserMedications</div>
        </>
    )
}

export default UserMedication