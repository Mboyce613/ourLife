

const UserAppointments = (apps) => {

// console.log(apps)
return (
    <>
    <div>{apps.name}'s Appointments</div>
    {apps.apps.map(app=>{
        return(
            <>
            <p>{app.name}</p>
            <p>{app.start_date}</p>
            {app.duration === 1 && <p>{app.duration} Hour</p>}
            {app.duration > 1 && <p>{app.duration} Hours</p>}
            <button>Update Appointment</button>
            <button>Remove Appointment</button>
            </>
        )
    })}
    <button>Add Appointment</button>
    </>
)
}

export default UserAppointments