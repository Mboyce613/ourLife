import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserById } from "../../redux/user";
import './Home.css'

const Home = () => {
    const sessionUser = useSelector((state) => state.session.user);
    console.log(sessionUser.appointments)
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
        <p>Placeholder Families</p>
        <p>Placeholder Calendar</p>
        <p>Placeholder Budget</p>
        <p>Placeholder Shopping</p>
        </section>
        </>
    )
}

export default Home