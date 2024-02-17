import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { findAppointmentForUsers } from "../../redux/appointment";

const Calendar = (homeState) => {
    const dispatch = useDispatch()
    const [isLoaded, setIsLoaded] = useState(false)
    const sessionUser = homeState.sessionUser
    const dependent = sessionUser.is_dependent
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
        <section className="flex flex-col p-6 ">
        {!dependent && <div className="p-2 text-2xl font-bold underline">Appointments From All Families</div>}
        {dependent && <div className="p-2 text-2xl font-bold underline">Your Appointments</div>}
        {!dependent && <section className="p-4 flex flex-col bg-sky-200 p-2 shadow-md shadow-black p-2 border-solid border-2 border-black rounded-lg w-2/3">
        {Object.values(famAppointments).map(app=>{
            return(
            <>
            <ul>
            <li className="gap-4 text-lg">
            {app.name } {`  `}
            {app.start_date} {` `}
            {app.duration === 1 && <>{app.duration} Hour </>}
            {app.duration > 1 && <>{app.duration} Hours </>}
            </li>
            </ul>
            </>
            )
        })}
        </section>}

        {dependent && <section className="p-4 flex flex-col bg-sky-200 p-2 shadow-md shadow-black p-2 border-solid border-2 border-black rounded-lg w-2/3">
        {Object.values(famAppointments).map(app=>{
            // console.log("LINE 60", app)
            if(app.user_id === sessionUser.id){
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
            }
        })}
        </section>}
        </section>
        </>
    )
}
export default Calendar