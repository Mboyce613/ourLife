import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createShopForFamily } from "../../redux/family";
import ShoppingCreateModal from "./ShoppingCreateModal";
import OpenModalButton from "../OpenModalButton/OpenModalButton";
import { removeShopFromFamily } from "../../redux/family";

const Shopping = (homeState) => {
    // const sessionUser = useSelector((state) => state.session.user);
    
    const userFamilies = useSelector((state) => state.family);
    const dispatch = useDispatch()
    const [item, setItem] = useState("")

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
        <div>Shopping Lists</div>
        <section>
        {Object.values(userFamilies).map(fam=>{
            return(
            <>
            <div>{fam.name}{' '}Family</div>
            {Object.values(fam.shopping_lists).map(shop=>{
                return(
                    <>
                    <li>{shop.item_name} <button onClick={()=>handleDelete(shop)}>x</button></li>
                    </>
                )
            })}
        <div><OpenModalButton buttonText="Add Item" modalComponent ={<ShoppingCreateModal fam={fam}/>}/></div>
            </>
            )
        })}
        </section>
        </>
    )
}

export default Shopping