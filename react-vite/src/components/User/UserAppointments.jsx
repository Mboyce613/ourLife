import AppointmentCreateModal from "../AppointmentModal/AppointmentCreateModal"
import AppointmentUpdateModal from "../AppointmentModal/AppointmentUpdateModal"
import AppointmentDeleteModal from "../AppointmentModal/AppointmentDeleteModal"
import OpenModalButton from "../OpenModalButton/OpenModalButton"

const UserAppointments = (props) => {

// console.log(props)
return (
    <>
    <section className="p-4 gap-4 flex flex-col items-center shadow-xl shadow-black bg-sky-300 border-solid border-4 border-black">
    <div className="font-bold">{props.name} {"'s"} Appointments</div>
    {Object.values(props.apps).map(app=>{
        return(
            <>
            <section className="flex flex-row gap-4 font-bold">
            <p>{app.name}</p>
            <p>{app.start_date}</p>
            {app.duration === 1 && <p>{app.duration} Hour</p>}
            {app.duration > 1 && <p>{app.duration} Hours</p>}
            </section>
            <section className="flex flex-row gap-4">
            <div className="shadow-xl shadow-black bg-sky-200 border-solid border-4 border-black rounded-xl font-bold self-center hover:bg-sky-100 p-2"><OpenModalButton buttonText="Update Appointment" modalComponent ={<AppointmentUpdateModal appointmentId ={app.id} user ={props.user}/>}/></div>
            <div className="shadow-xl shadow-black bg-sky-200 border-solid border-4 border-black rounded-xl font-bold self-center hover:bg-sky-100 p-2"><OpenModalButton buttonText="Remove Appointment" modalComponent ={<AppointmentDeleteModal appointmentId ={app.id} user ={props.user}/>}/></div>
            </section>
            </>
        )
    })}
    <div className="shadow-xl shadow-black bg-sky-200 border-solid border-4 border-black rounded-xl font-bold self-center hover:bg-sky-100 p-2"><OpenModalButton buttonText="Add Appointment" modalComponent ={<AppointmentCreateModal  user ={props.user}/>}/></div>
    </section>
    </>
)
}

export default UserAppointments