import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { getUserById } from "../../redux/user";

const Shopping = (homeState) => {
    // const sessionUser = useSelector((state) => state.session.user);
    
    const userFamilies = useSelector((state) => state.family);
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
        <div>Shopping Lists</div>
        <section>
        {Object.values(userFamilies).map(fam=>{
            return(
            <>
            <div>{fam.name}{' '}Family</div>
            {Object.values(fam.shopping_lists).map(shop=>{
                return(
                    <>
                    <li>{shop.item_name} <button>x</button></li>
                    </>
                )
            })}
            </>
            )
        })}
        </section>
        </>
    )
}

export default Shopping