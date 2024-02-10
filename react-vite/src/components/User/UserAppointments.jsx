import AppointmentCreateModal from "../AppointmentModal/AppointmentCreateModal"
import AppointmentUpdateModal from "../AppointmentModal/AppointmentUpdateModal"
import AppointmentDeleteModal from "../AppointmentModal/AppointmentDeleteModal"
import OpenModalButton from "../OpenModalButton/OpenModalButton"

const UserAppointments = (props) => {

console.log(props)
return (
    <>
    <div>{props.name}'s Appointments</div>
    {Object.values(props.apps).map(app=>{
        return(
            <>
            <p>{app.name}</p>
            <p>{app.start_date}</p>
            {app.duration === 1 && <p>{app.duration} Hour</p>}
            {app.duration > 1 && <p>{app.duration} Hours</p>}
            <OpenModalButton buttonText="Update Appointment" modalComponent ={<AppointmentUpdateModal appointmentId ={app.id} user ={props.user}/>}/>
            <OpenModalButton buttonText="Remove Appointment" modalComponent ={<AppointmentDeleteModal appointmentId ={app.id} user ={props.user}/>}/>
            </>
        )
    })}
    <OpenModalButton buttonText="Add Appointment" modalComponent ={<AppointmentCreateModal  user ={props.user}/>}/>
    </>
)
}

export default UserAppointments