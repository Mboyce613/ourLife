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

  console.log("PORPS LINE 14", props)
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
    <section className="p-4 gap-4 flex flex-col items-center shadow-xl shadow-black bg-violet-300 border-solid border-4 border-black">
      <h1>Add an Item to the Families Shopping List</h1>
      {errors.server && <p>{errors.server}</p>}
      <form onSubmit={handleSubmit}>
        <label>
          Item Name
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </label>
        {errors.name && <p>{errors.name}</p>}
        <button type="submit">Confirm</button>
      </form>
      </section>
    </>
  );
}

export default ShoppingCreateModal
