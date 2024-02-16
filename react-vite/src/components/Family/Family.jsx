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
    const dependent = sessionUser.is_dependent
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
        <div>{sessionUser.first_name}{"'s"} Families</div>
        {theFamilies.map(fam=>{
            return (
            <>
            {!dependent && <p>The {fam.name} Family <OpenModalButton buttonText="Remove Family" modalComponent ={<FamilyDeleteModal user={sessionUser} fam={fam}/>}/></p>}
            <div>{fam.motto}</div>
            {Object.values(fam.users).map(user=>{
                if(user){
                    return (
                        <>
                    {(!dependent || user.id === sessionUser.id) && <div><OpenModalButton buttonText={`${user.first_name} ${user.last_name}`} modalComponent ={<User userId={user.id} fam={fam}/>}/></div>}
                    {dependent && <div><button>{`${user.first_name} ${user.last_name}`}</button></div>}
                    </>
                    )
                }
            })}
            {!dependent && <OpenModalButton buttonText="Add Family Member" modalComponent ={<UserCreateModal fam={fam}/>}/>}
            </>
            )}
        )}
        {!dependent && <div><OpenModalButton buttonText="Add Family" modalComponent ={<FamilyCreateModal userId={sessionUser.id}/>}/></div>}
        <section>

        </section>
        </>
    )
}

export default Family