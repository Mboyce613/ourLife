import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Splash = () => {

    const sessionUser = useSelector((state) => state.session.user);
    const navigate = useNavigate();

    // useEffect(()=>{
    //     if(!sessionUser === null){
    //         console.log(sessionUser)
    //         navigate('home')
    //     }
        
    //         },[])

    return (
        <>
        <h1>Hello from Splash</h1>
        </>
    )
}

export default Splash