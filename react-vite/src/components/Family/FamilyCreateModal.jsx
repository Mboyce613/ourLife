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

  console.log("PORPS LINE 14", props)
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
      <h1>Create a New Family</h1>
      {errors.server && <p>{errors.server}</p>}
      <form onSubmit={handleSubmit}>
        <label>
          Family Name
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </label>
        {errors.name && <p>{errors.name}</p>}
        <label>
          Motto
          <input
            type="text"
            value={motto}
            onChange={(e) => setMotto(e.target.value)}
            required
          />
        </label>
        {errors.motto && <p>{errors.motto}</p>}
        
        <button type="submit">Confirm</button>
      </form>
      </section>
    </>
  );
}

export default FamilyCreateModal
