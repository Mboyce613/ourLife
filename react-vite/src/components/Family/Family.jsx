import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFamiliesByIds } from "../../redux/family";
import OpenModalButton from "../OpenModalButton/OpenModalButton";
import UserCreateModal from "../User/UserCreateModal";
import FamilyCreateModal from "./FamilyCreateModal";
import FamilyDeleteModal from "./FamilyDeleteModal";
import User from "../User/User";

const Family = (homeState) => {
    const dispatch = useDispatch()
    const [isLoaded, setIsLoaded] = useState(false)
    const sessionUser = homeState.sessionUser
    // console.log("LINE 13",sessionUser)
    const userFamiliesIds = []
    
    if( sessionUser.families ){
        Object.values(sessionUser.families).forEach(fam => {
            userFamiliesIds.push(fam.id)
        });
    }
    // console.log("sessionUser from family", sessionUser)
    const userFamilies = useSelector((state) => state.family);
    const theFamilies = []
    // console.log("ARRAY", userFamiliesIds)
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
        <OpenModalButton buttonText="Add Family" modalComponent ={<FamilyCreateModal userId={sessionUser.id}/>}/>
        {theFamilies.map(fam=>{
            return (
            <>
            <p>{fam.name} <OpenModalButton buttonText="Remove Family" modalComponent ={<FamilyDeleteModal user={sessionUser} fam={fam}/>}/></p>
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