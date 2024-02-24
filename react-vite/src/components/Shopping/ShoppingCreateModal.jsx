import { useState } from "react";
import { useDispatch } from "react-redux";
import { createShopForFamily } from "../../redux/family";
import { useModal } from "../../context/Modal";

function ShoppingCreateModal(props) {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [request, setRequest] = useState("False");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  // console.log("PORPS LINE 14", props)
//   const userId = props.user.id
//   console.log("USERID", userId)


  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name) {
      return setErrors({
        Name:
          "What is the item called?",
      });
    }

    // if (!request) {
    //     return setErrors({
    //       Request:
    //         "Is it a request?",
    //     });
    //   }

    const serverResponse = await dispatch(
        createShopForFamily({
        item_name: name,
        request: request,
        family_id: props.fam.id
      })
    );

    if (serverResponse) {
        // console.log("SERVERRESPONSE", serverResponse)
      setErrors(serverResponse);
      closeModal()
    } else {
        closeModal()
    }
  };
// console.log("I got to line 55")
  return (
    <>
    <section className="p-4 gap-4 flex flex-col items-center shadow-xl shadow-black bg-lime-300 border-solid border-4 border-black">
      <h1 className="font-extrabold ">Add an Item to the Families Shopping List</h1>
      {errors.server && <p>{errors.server}</p>}
      <form className="gap-4 flex flex-col" onSubmit={handleSubmit}>
      <section className="bg-lime-200 grid grid-col-2 grid-row-2 p-2 gap-4 shadow-xl shadow-black rounded-lg border-solid border-4 border-black">
        <label className="col-start-1 col-end-1 row-start-1 row-end-1 font-bold p-4 justify-center flex">
          Item Name
          </label>
          <input className="col-start-2 col-end-2 row-start-1 row-end-1 rounded-lg border-solid border-4 border-black p-1"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        {errors.name && <p>{errors.name}</p>}
        </section>
        <button className="shadow-xl shadow-black bg-lime-200 border-solid border-4 border-black rounded-xl font-bold w-1/3 self-center hover:bg-lime-100" type="submit">Confirm</button>
      </form>
      </section>
    </>
  );
}

export default ShoppingCreateModal
