import OpenModalButton from "../OpenModalButton/OpenModalButton"
import MedicationModal from "../MedicationModal/MedicationModal"
import MedicationUpdateModal from "../MedicationModal/MedicationUpdateModal"
import MedicationDeleteModal from "../MedicationModal/MedicationDeleteModal"

const UserMedication = (props) => {
console.log("Line6", props)
    return (
        <>
        <section className="p-4 gap-4 flex flex-col items-center shadow-xl shadow-black bg-red-300 border-solid border-4 border-black">
        <div className="font-bold">{props.name} {"'s"} Medications</div>
        {Object.values(props.meds).map(med=>{
            return(
                <>
                <p className="font-bold">{med.name} {med.dosage} {med.time}</p>
                {!props.dependent && <div className="shadow-xl shadow-black bg-red-200 border-solid border-4 border-black rounded-xl font-bold self-center hover:bg-red-100 p-2"><OpenModalButton buttonText="Update Medication" modalComponent ={<MedicationUpdateModal medId ={med.id} user ={props.user}/>}/></div>}
                {!props.dependent && <div className="shadow-xl shadow-black bg-red-200 border-solid border-4 border-black rounded-xl font-bold self-center hover:bg-red-100 p-2"><OpenModalButton buttonText="Remove Medication" modalComponent ={<MedicationDeleteModal medId ={med.id} user ={props.user}/>}/></div>}
                </>
            )
        })}
        {!props.dependent && <div className="shadow-xl shadow-black bg-red-200 border-solid border-4 border-black rounded-xl font-bold self-center hover:bg-red-100 p-2"><OpenModalButton buttonText="Add Medication" modalComponent ={<MedicationModal user ={props.user}/>}/></div>}
        </section>
        </>
    )
}

export default UserMedication