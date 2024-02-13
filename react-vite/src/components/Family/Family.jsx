import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFamiliesByIds } from "../../redux/family";
import OpenModalButton from "../OpenModalButton/OpenModalButton";
import UserCreateModal from "../User/UserCreateModal";
import User from "../User/User";

const Family = (homeState) => {
    const dispatch = useDispatch()
    const [isLoaded, setIsLoaded] = useState(false)
    const sessionUser = homeState.sessionUser
    const userFamiliesIds = []
    
    if( sessionUser.families ){
        Object.values(sessionUser.families).forEach(fam => {
            userFamiliesIds.push(fam.id)
        });
    }
    // console.log("sessionUser from family", sessionUser)
    const userFamilies = useSelector((state) => state.family);
    const theFamilies = []
    for (const family in userFamilies){
        // console.log(userFamilies[family])
        theFamilies.push(userFamilies[family])
    }
    // console.log("ARRAY", theFamilies)
    
    useEffect(()=>{
        dispatch(getFamiliesByIds(userFamiliesIds))
        .then(()=>{
            setIsLoaded(true)
        }
            )},[])

    return (
        <>
        <div>Hello from Family</div>
        <button>Add Family</button>
        {theFamilies.map(fam=>{
            return (
            <>
            <p>{fam.name} <button>Remove Family</button></p>
            <div>{fam.motto}</div>
            {Object.values(fam.users).map(user=>{
                if(user){
                    return <div><OpenModalButton buttonText={`${user.first_name} ${user.last_name}`} modalComponent ={<User userId={user.id} fam={fam}/>}/></div>
                }
            })}
            <OpenModalButton buttonText="Add Family Member" modalComponent ={<UserCreateModal fam={fam}/>}/>
            </>
            )}
         )}
        <section>

        </section>
        </>
    )
}

export default Family