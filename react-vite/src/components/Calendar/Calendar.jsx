import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserById } from "../../redux/user";

const Calendar = (homeState) => {
    // const sessionUser = useSelector((state) => state.session.user);
    // console.log(sessionUser.appointments)
    // const dispatch = useDispatch()
    // const [isLoaded, setIsLoaded] = useState(false)

    // useEffect(()=>{
    //     dispatch(getUserById(userId))
    //     .then(()=>{
    //         setIsLoaded(true)
    //     }
    //         )},[sessionUser])

    return (
        <>
        <div>Hello from Calendar</div>
        <section>

        </section>
        </>
    )
}

export default Calendar