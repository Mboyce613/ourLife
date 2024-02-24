// import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { createShopForFamily } from "../../redux/family";
import ShoppingCreateModal from "./ShoppingCreateModal";
import OpenModalButton from "../OpenModalButton/OpenModalButton";
import { removeShopFromFamily } from "../../redux/family";

const Shopping = (homeState) => {
    // const sessionUser = useSelector((state) => state.session.user);
    const sessionUser = homeState.sessionUser
    const dependent = sessionUser.is_dependent
    const userFamilies = useSelector((state) => state.family);
    const dispatch = useDispatch()
    // const [item, setItem] = useState("")

    // useEffect(()=>{
    //     dispatch(getUserById(userId))
    //     .then(()=>{
    //         setIsLoaded(true)
    //     }
    //         )},[sessionUser])
    const handleDelete = async(shop)=>{
        console.log(shop)
        dispatch(removeShopFromFamily(shop.id))
    }

    return (
        <>
        <section className="flex flex-col p-6 ">
        <div className="text-2xl font-bold underline">Shopping Lists</div>
        <section className="p-2 flex flex-row ">
        {Object.values(userFamilies).map(fam=>{
            return(
            <>
            <section className="bg-lime-200 p-2 shadow-md shadow-black p-2 border-solid border-2 border-black rounded-lg w-1/2">
            <div className="text-xl">{fam.name}{' '}Family</div>
            {Object.values(fam.shopping_lists).map(shop=>{
                return(
                    <>
                    <section className="gap-4">
                    {/* <li>{shop.item_name} {!dependent && <button className="flex justify-center bg-lime-100 shadow-md shadow-black p-2 border-solid border-2 border-black rounded-lg hover:bg-lime-50 hover:font-bold text-xs opacity-75" onClick={()=>handleDelete(shop)}>x</button>}</li> */}
                    {!dependent && <div><button className="flex justify-center bg-lime-100 shadow-md shadow-black p-2 border-solid border-2 border-black rounded-lg hover:bg-lime-50 hover:font-bold" onClick={()=>handleDelete(shop)}>{shop.item_name}</button></div>}
                    {dependent && <div>{shop.item_name}</div>}
                    </section>
                    </>
                )
            })}
        <div className="flex justify-center bg-lime-100 shadow-md shadow-black p-2 border-solid border-2  border-black rounded-lg hover:bg-lime-50 hover:font-bold text-xs opacity-75 w-1/2"><OpenModalButton buttonText="Add Item" modalComponent ={<ShoppingCreateModal fam={fam}/>}/></div>
            </section>
            </>
            )
        })}
        </section>
        </section>
        </>
    )
}

export default Shopping