import OpenModalButton from "../OpenModalButton/OpenModalButton"
import MedicationModal from "../MedicationModal/MedicationModal"
import MedicationUpdateModal from "../MedicationModal/MedicationUpdateModal"
import MedicationDeleteModal from "../MedicationModal/MedicationDeleteModal"

const UserMedication = (props) => {
// console.log("Line6", props)
    return (
        <>
        <div>{props.name}'s Medications</div>
        {Object.values(props.meds).map(med=>{
            return(
                <>
                <p>{med.name}</p>
                <p>{med.dosage}</p>
                <p>{med.time}</p>
                <OpenModalButton buttonText="Update Medication" modalComponent ={<MedicationUpdateModal medId ={med.id} user ={props.user}/>}/>
                <OpenModalButton buttonText="Remove Medication" modalComponent ={<MedicationDeleteModal medId ={med.id} user ={props.user}/>}/>
                </>
            )
        })}
        <div><OpenModalButton buttonText="Add Medication" modalComponent ={<MedicationModal user ={props.user}/>}/></div>
        </>
    )
}

export default UserMedication