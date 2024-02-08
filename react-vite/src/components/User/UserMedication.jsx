
const UserMedication = (meds) => {

    return (
        <>
        <div>{meds.name}'s Medications</div>
        {meds.meds.map(med=>{
            return(
                <>
                <p>{med.name}</p>
                <p>{med.dosage}</p>
                <p>{med.time}</p>
                <button>Update Medication</button>
                <button>Remove Medication</button>
                </>
            )
        })}
        <button>Add Medication</button>
        </>
    )
}

export default UserMedication