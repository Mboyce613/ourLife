import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { getUserById } from "../../redux/user";
import { getFamiliesByIds } from "../../redux/family";
import OpenModalButton from "../OpenModalButton/OpenModalButton";
import User from "../User/User";

const Family = (homeState) => {
    const dispatch = useDispatch()
    const [isLoaded, setIsLoaded] = useState(false)
    const sessionUser = homeState.sessionUser
    const userFamiliesIds = []
    
    if( sessionUser.families ){
        sessionUser.families.forEach(fam => {
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
        {theFamilies.map(fam=>{
            return (
            <>
            <p>{fam.name}</p>
            {Object.values(fam.users).map(user=>{
                if(user){
                    return <div><OpenModalButton buttonText={`${user.first_name} ${user.last_name}`} modalComponent={User}/></div>

                }
            })}
            </>
            )}
         )}
        <section>

        </section>
        </>
    )
}

export default Family