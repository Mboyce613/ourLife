import OpenModalButton from "../OpenModalButton/OpenModalButton"
import MedicationModal from "../MedicationModal/MedicationModal"

const UserMedication = (props) => {

    return (
        <>
        <div>{props.name}'s Medications</div>
        {props.meds.map(med=>{
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
        <div><OpenModalButton buttonText="Add Medication" modalComponent ={<MedicationModal user ={props.user}/>}/></div>
        </>
    )
}

export default UserMedication