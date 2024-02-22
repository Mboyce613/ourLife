import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import SignupFormModal from "../SignupFormModal/SignupFormModal";
import OpenModalButton from "../OpenModalButton/OpenModalButton";
import meds from './meds.png'
import money from './money.png'
import time from './time.png'
import food from './food.png'
import ex from './ex.png'
import dread from './dread.png'
const Splash = () => {

    const sessionUser = useSelector((state) => state.session.user);
    // const session = useSelector((state) => state);
    // for(const state in session){
    //     console.log(session[state])
    //     session[state] = {}
    // }
    // console.log("LINE 20",session)
    const navigate = useNavigate();

    // useEffect(()=>{
    //     if(!sessionUser === null){
    //         console.log(sessionUser)
    //         navigate('home')
    //     }
        
    //         },[])

    return (
        <>
        <section className=" p-6 bg-violet-300 size-full">
        <section className="flex self-center content-center items-center justify-center flex-col gap-1  p-2 bg-violet-200 border-solid border-black border-2 rounded-md shadow-md shadow-black">
        <section className=" p-2 gap-4 flex flex-col items-center bg-violet-100 border-solid border-black border-2 rounded-md shadow-md shadow-black p-2">
        <h1 className="text-2xl font-extrabold">Welcome to OurLife</h1>
        <h2 className="text-xl font-bold">Where the most important parts of your life can be managed in one place</h2>
        <h3 className="text-lg font-bold">We are here to help you, because we are all in this life together</h3>
        <h4 className="text-md font-bold">Thats why its called OurLife!</h4>
        </section>

        <section className=" grid grid-cols-3 grid-rows-6 justify-items-center">
        <img src={money} className="self-center content-center items-center justify-center flex col-start-1 col-end-1 row-start-1 row-end-1 bg-amber-200 shadow-md shadow-black p-2  border-solid border-2 border-black rounded-lg hover:bg-amber-50 hover:font-bold w-1/3"/>
        <div className="self-center content-center items-center justify-center flex col-start-2 col-end-2 row-start-1 row-end-1 font-bold bg-amber-200 shadow-md shadow-black p-2  border-solid border-2 border-black rounded-lg hover:bg-amber-50 hover:font-bold w-1/2">Need to manage your families Budget?</div> 
        <div className="self-center content-center items-center justify-center flex col-start-3 col-end-3 row-start-1 row-end-1 bg-amber-200 shadow-md shadow-black p-2  border-solid border-2 border-black rounded-lg hover:bg-amber-50 hover:font-bold w-1/3"><OpenModalButton buttonText="Signup Now" modalComponent ={<SignupFormModal/>}/></div>

        <img src={meds} className="self-center content-center items-center justify-center flex col-start-1 col-end-1 row-start-2 row-end-2 bg-red-200 shadow-md shadow-black p-2  border-solid border-2 border-black rounded-lg hover:bg-red-50 hover:font-bold w-1/3"/>
        <div className="self-center content-center items-center justify-center flex col-start-2 col-end-2 row-start-2 row-end-2 font-bold bg-red-200 shadow-md shadow-black p-2  border-solid border-2 border-black rounded-lg hover:bg-red-50 hover:font-bold w-1/2">Need to manage medications for your kids or parents?</div> 
        <div className="self-center content-center items-center justify-center flex col-start-3 col-end-3 row-start-2 row-end-2 bg-red-200 shadow-md shadow-black p-2  border-solid border-2 border-black rounded-lg hover:bg-red-50 hover:font-bold w-1/3"><OpenModalButton buttonText="Signup Now" modalComponent ={<SignupFormModal/>}/></div>

        <img src={time} className="self-center content-center items-center justify-center flex col-start-1 col-end-1 row-start-3 row-end-3 bg-sky-200 shadow-md shadow-black p-2  border-solid border-2 border-black rounded-lg hover:bg-sky-50 hover:font-bold w-1/3"/>
        <div className="self-center content-center items-center justify-center flex col-start-2 col-end-2 row-start-3 row-end-3 font-bold bg-sky-200 shadow-md shadow-black p-2  border-solid border-2 border-black rounded-lg hover:bg-sky-50 hover:font-bold w-1/2">Is keeping track of everyone's appointments too stressful?</div> 
        <div className="self-center content-center items-center justify-center flex col-start-3 col-end-3 row-start-3 row-end-3 bg-sky-200 shadow-md shadow-black p-2  border-solid border-2 border-black rounded-lg hover:bg-sky-50 hover:font-bold w-1/3"><OpenModalButton buttonText="Signup Now" modalComponent ={<SignupFormModal/>}/></div>

        <img src={food} className="self-center content-center items-center justify-center flex col-start-1 col-end-1 row-start-4 row-end-4 bg-lime-200 shadow-md shadow-black p-2  border-solid border-2 border-black rounded-lg hover:bg-lime-50 hover:font-bold w-1/3"/>
        <div className="self-center content-center items-center justify-center flex col-start-2 col-end-2 row-start-4 row-end-4 font-bold bg-lime-200 shadow-md shadow-black p-2  border-solid border-2 border-black rounded-lg hover:bg-lime-50 hover:font-bold w-1/2">Do you want a central shopping list the whole family can add to?</div> 
        <div className="self-center content-center items-center justify-center flex col-start-3 col-end-3 row-start-4 row-end-4 bg-lime-200 shadow-md shadow-black p-2  border-solid border-2 border-black rounded-lg hover:bg-lime-50 hover:font-bold w-1/3"><OpenModalButton buttonText="Signup Now" modalComponent ={<SignupFormModal/>}/></div>

        <img src={ex} className="self-center content-center items-center justify-center flex col-start-1 col-end-1 row-start-5 row-end-5 bg-red-200 shadow-md shadow-black p-2  border-solid border-2 border-black rounded-lg hover:bg-red-50 hover:font-bold w-1/3"/>
        <div className="self-center content-center items-center justify-center flex col-start-2 col-end-2 row-start-5 row-end-5 font-bold bg-red-200 shadow-md shadow-black p-2  border-solid border-2 border-black rounded-lg hover:bg-red-50 hover:font-bold w-1/2">Do you have split custody and tired of your ex not telling you about appointments?</div> 
        <div className="self-center content-center items-center justify-center flex col-start-3 col-end-3 row-start-5 row-end-5 bg-red-200 shadow-md shadow-black p-2  border-solid border-2 border-black rounded-lg hover:bg-red-50 hover:font-bold w-1/3"><OpenModalButton buttonText="Signup Now" modalComponent ={<SignupFormModal/>}/></div>

        <img src={dread} className="self-center content-center items-center justify-center flex col-start-1 col-end-1 row-start-6 row-end-6 bg-violet-200 shadow-md shadow-black p-2  border-solid border-2 border-black rounded-lg hover:bg-violet-50 hover:font-bold w-1/3"/>
        <div className="self-center content-center items-center justify-center flex col-start-2 col-end-2 row-start-6 row-end-6 font-bold bg-violet-200 shadow-md shadow-black p-2  border-solid border-2 border-black rounded-lg hover:bg-violet-50 hover:font-bold w-1/2">Are you sick of staring into the darkness and howling into the abyss only to be met with the oppressive silence of reality?</div> 
        <div className="self-center content-center items-center justify-center flex col-start-3 col-end-3 row-start-6 row-end-6 bg-violet-200 shadow-md shadow-black p-2  border-solid border-2 border-black rounded-lg hover:bg-violet-50 hover:font-bold w-1/3"><OpenModalButton buttonText="Signup Now" modalComponent ={<SignupFormModal/>}/></div>
        </section>
        </section>
        </section>
        </>
    )
}

export default Splash