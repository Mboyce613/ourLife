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
        <section className="p-6">
        <div className="text-2xl font-bold underline">{sessionUser.first_name}{"'s"} Families</div>
        <section className="p-2">
        {theFamilies.map(fam=>{
            return (
            <>
            <section className="p-2">
            {!dependent && <p className="text-xl">The {fam.name} Family <OpenModalButton buttonText="Remove Family" modalComponent ={<FamilyDeleteModal user={sessionUser} fam={fam}/>}/></p>}
            <div className="italic">{fam.motto}</div>
            <section className="flex flex-col gap-2 w-1/3 p-2">
            {Object.values(fam.users).map(user=>{
                if(user){
                    return (
                        <>
                        <section className="flex justify-center shadow-md shadow-gray-400 p-2 border-solid border-2 border-black rounded-lg hover:bg-red-50 hover:font-bold">
                    {(!dependent || user.id === sessionUser.id) && <div><OpenModalButton buttonText={`${user.first_name} ${user.last_name}`} modalComponent ={<User userId={user.id} fam={fam} dependent={dependent}/>}/></div>}
                    {dependent && <div ><button>{`${user.first_name} ${user.last_name}`}</button></div>}
                    </section>
                    </>
                    )
                }
            })}
            </section>
            {!dependent && <OpenModalButton buttonText="Add Family Member" modalComponent ={<UserCreateModal fam={fam}/>}/>}
            </section>
            </>
            )}
        )}
        </section>
        {!dependent && <div><OpenModalButton buttonText="Add Family" modalComponent ={<FamilyCreateModal userId={sessionUser.id}/>}/></div>}
        <section>
        </section>

        </section>
        </>
    )
}

export default Family