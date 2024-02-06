import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserById } from "../../redux/user";
import './Home.css'
import Family from "../Family/Family";
import Budget from "../Budget/Budget";
import Calendar from "../Calendar/Calendar";
import Shopping from "../Shopping/Shopping";

const Home = () => {
    const sessionUser = useSelector((state) => state.session.user);
    console.log(sessionUser)
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
        <h1>Hello {sessionUser.first_name}</h1>
        <section className="homepage">
        {/* <p>{sessionUser.appointments[1]}</p> */}
        <div><Family sessionUser = {sessionUser}/></div>
        <div><Calendar sessionUser = {sessionUser}/></div>
        <div><Budget sessionUser = {sessionUser}/></div>
        <div><Shopping sessionUser = {sessionUser}/></div>
        </section>
        </>
    )
}

export default Home