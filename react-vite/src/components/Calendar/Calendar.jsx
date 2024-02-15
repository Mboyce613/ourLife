import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { findAppointmentForUsers } from "../../redux/appointment";

const Calendar = (homeState) => {
    const dispatch = useDispatch()
    const [isLoaded, setIsLoaded] = useState(false)
    // console.log("LINE 13",sessionUser)
    
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
    
    const famAppointments = useSelector((state) => state.appointment);
    // console.log("LINE37", Object.values(famAppointments))
    
    useEffect(()=>{
        // console.log("Are you even trying?")
        dispatch(findAppointmentForUsers(theUsers))
        .then(()=>{
            setIsLoaded(true)
        }
            )},[newvar])

    return (
        <>
        <div>Appointments From All Families</div>
        <section>
        {Object.values(famAppointments).map(app=>{
            return(
            <>
            <ul>
            <li>
            {app.name } {`  `}
            {app.start_date} {` `}
            {app.duration === 1 && <>{app.duration} Hour </>}
            {app.duration > 1 && <>{app.duration} Hours </>}
            </li>
            </ul>
            </>
            )
        })}
        </section>
        </>
    )
}
export default Calendar