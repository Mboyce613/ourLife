import { useState } from "react";
import { useDispatch } from "react-redux";
import { createFamilyThunk } from "../../redux/family";
import { useModal } from "../../context/Modal";

function FamilyCreateModal(props) {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [motto, setMotto] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  // console.log("PORPS LINE 14", props)
  const userId = props.userId
//   console.log("USERID", userId)


  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name) {
      return setErrors({
        Name:
          "What do you want this family to be called?",
      });
    }

    if (!motto) {
        return setErrors({
          Dosage:
            "What is the family motto?",
        });
      }

    const serverResponse = await dispatch(
        createFamilyThunk({
        name: name,
        motto: motto,
        userId: userId
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
      <h1 className="font-extrabold ">Create a New Family</h1>
      {errors.server && <p>{errors.server}</p>}
      <form className="gap-4 flex flex-col" onSubmit={handleSubmit}>
      <section className="bg-violet-200 grid grid-col-2 grid-row-2 p-2 gap-4 shadow-xl shadow-black rounded-lg border-solid border-4 border-black p-4">
        <label className="col-start-1 col-end-1 row-start-1 row-end-1 font-bold p-4 justify-center flex">
          Family Name
          </label>
          <input className="col-start-2 col-end-2 row-start-1 row-end-1 rounded-lg border-solid border-4 border-black p-1"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        {errors.name && <p>{errors.name}</p>}
        <label className="col-start-1 col-end-1 row-start-2 row-end-2 font-bold p-4 justify-center flex">
          Motto
          </label>
          <input className="col-start-2 col-end-2 row-start-2 row-end-2 rounded-lg border-solid border-4 border-black p-1"
            type="text"
            value={motto}
            onChange={(e) => setMotto(e.target.value)}
            required
          />
        {errors.motto && <p>{errors.motto}</p>}
        
        </section>
        <button className="shadow-xl shadow-black bg-violet-200 border-solid border-4 border-black rounded-xl font-bold w-1/3 self-center hover:bg-violet-100" type="submit">Confirm</button>
      </form>
      </section>
    </>
  );
}

export default FamilyCreateModal
