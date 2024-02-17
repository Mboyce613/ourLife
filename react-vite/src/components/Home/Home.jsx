// import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import './Home.css'
import Family from "../Family/Family";
import Budget from "../Budget/Budget";
import Calendar from "../Calendar/Calendar";
import Shopping from "../Shopping/Shopping";

const Home = () => {
    const sessionUser = useSelector((state) => state.session.user);
    // console.log(sessionUser)
    // const dispatch = useDispatch()
    // const [isLoaded, setIsLoaded] = useState(false)

    // useEffect(()=>{
    //     dispatch(getUserById(userId))
    //     .then(()=>{
    //         setIsLoaded(true)
    //     }
    //         )},[sessionUser])

    return (
        <>
        <h1 className="bg-violet-200">Hello {sessionUser.first_name}</h1>
        <section className="grid grid-cols-2 grid-rows-2 gap-8 p-6 bg-violet-200">
        {/* <p>{sessionUser.appointments[1]}</p> */}
        <div className="shadow-xl shadow-black rounded-lg bg-red-300 border-solid border-4 border-black"><Family sessionUser = {sessionUser}/></div>
        <div className="shadow-xl shadow-black rounded-lg bg-sky-300 border-solid border-4 border-black"><Calendar sessionUser = {sessionUser}/></div>
        <div className="shadow-xl shadow-black rounded-lg bg-amber-300 border-solid border-4 border-black"><Budget sessionUser = {sessionUser}/></div>
        <div className="shadow-xl shadow-black rounded-lg bg-lime-300 border-solid border-4 border-black"><Shopping sessionUser = {sessionUser}/></div>
        </section>
        </>
    )
}

export default Home