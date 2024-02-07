import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserById } from "../../redux/user";
import { getFamiliesByIds } from "../../redux/family";

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
    console.log("sessionUser from family", sessionUser)
    // console.log("Ids from families", userFamiliesIds)
    // const sessionUser = useSelector((state) => state.session.user);
    // console.log(sessionUser.appointments)
    // const dispatch = useDispatch()
    // const [isLoaded, setIsLoaded] = useState(false)

    useEffect(()=>{
        dispatch(getFamiliesByIds(userFamiliesIds))
        .then(()=>{
            setIsLoaded(true)
        }
            )},[])

    return (
        <>
        <div>Hello from Family</div>
        <section>

        </section>
        </>
    )
}

export default Family