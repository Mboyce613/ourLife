import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import SignupFormModal from "../SignupFormModal/SignupFormModal";
import OpenModalButton from "../OpenModalButton/OpenModalButton";
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
        <h1>Welcome to OurLife</h1>
        <h2>Where the most important parts of your life can be managed in one place</h2>
        <h3>We are here to help you, because we are all in this life together</h3>
        <h4>Thats why its called OurLife!</h4>

        <div>Need to manage your families Budget?</div> 
        <OpenModalButton buttonText="Signup Now" modalComponent ={<SignupFormModal/>}/>

        <div>Need to manage medications for your kids or parents?</div> 
        <OpenModalButton buttonText="Signup Now" modalComponent ={<SignupFormModal/>}/>

        <div>Is keeping track of everyone's appointments too stressful?</div> 
        <OpenModalButton buttonText="Signup Now" modalComponent ={<SignupFormModal/>}/>

        <div>Do you want a central shopping list the whole family can add to?</div> 
        <OpenModalButton buttonText="Signup Now" modalComponent ={<SignupFormModal/>}/>

        <div>Do you have split custody and tired of your ex not telling you about appointments?</div> 
        <OpenModalButton buttonText="Signup Now" modalComponent ={<SignupFormModal/>}/>

        <div>Are you sick of staring into the darkness and howling into the abyss only to be met with the oppressive silence of reality?</div> 
        <OpenModalButton buttonText="Signup Now" modalComponent ={<SignupFormModal/>}/>
        </>
    )
}

export default Splash