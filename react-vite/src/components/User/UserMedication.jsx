import OpenModalButton from "../OpenModalButton/OpenModalButton"
import MedicationModal from "../MedicationModal/MedicationModal"
import MedicationUpdateModal from "../MedicationModal/MedicationUpdateModal"
import MedicationDeleteModal from "../MedicationModal/MedicationDeleteModal"

const UserMedication = (props) => {
console.log("Line6", props)
    return (
        <>
        <div>{props.name} {"'s"} Medications</div>
        {Object.values(props.meds).map(med=>{
            return(
                <>
                <p>{med.name} {med.dosage} {med.time}</p>
                {props.dependent && <OpenModalButton buttonText="Update Medication" modalComponent ={<MedicationUpdateModal medId ={med.id} user ={props.user}/>}/>}
                {props.dependent && <OpenModalButton buttonText="Remove Medication" modalComponent ={<MedicationDeleteModal medId ={med.id} user ={props.user}/>}/>}
                </>
            )
        })}
        {props.dependent && <div><OpenModalButton buttonText="Add Medication" modalComponent ={<MedicationModal user ={props.user}/>}/></div>}
        </>
    )
}

export default UserMedication