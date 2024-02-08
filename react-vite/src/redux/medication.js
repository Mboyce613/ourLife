import { csrfFetch } from "./csrf";

const CREATE_MEDICATION= 'medication/createmedication'

export const createMedication =(med)=>({
    type:CREATE_MEDICATION,
    med
})

export const createMedicationForUser = (payload) => async (dispatch) => {
    const res = await csrfFetch(`/api/medications`, {
      method: "POST",
      body: JSON.stringify(payload),
    });
    const data = await res.json();
    if (res.ok) {
      dispatch(createMedication(data));
      return data;
    } else {
      throw res;
    }
  };

const medicationReducer = (state = {}, action)=>{
    let newState = null
    switch(action.type){
        case CREATE_MEDICATION:
            newState = {...state}
            console.log("STATE", newState)
            // console.log("ACTION", action, 'line 24')
            // console.log(action.avatar, '-----store')
            if(action.med && action.med !== undefined){
                console.log("LINE 27", action.med)
                    newState[action.med.id] = action.med
            }else{
                newState = null
            }
            return newState

        default:return state
    }
}

export default medicationReducer