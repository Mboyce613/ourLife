import { csrfFetch } from "./csrf";

const CREATE_MEDICATION= 'medication/createmedication'
const UPDATE_MEDICATION= 'medication/updatemedication'
const DELETE_MEDICATION= 'medication/deletemedication'

export const createMedication =(med)=>({
    type:CREATE_MEDICATION,
    med
})

export const updateMedication =(med)=>({
    type:UPDATE_MEDICATION,
    med
})

export const deleteMedication =(med)=>({
  type:DELETE_MEDICATION,
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

  export const updateMedicationForUser = (payload) => async (dispatch) => {
    // console.log("PAYLOAD 31", payload)
    const res = await csrfFetch(`/api/medications/${payload.id}`, {
      method: "PUT",
      body: JSON.stringify(payload),
    });
    const data = await res.json();
    if (res.ok) {
      dispatch(updateMedication(data));
      return data;
    } else {
      throw res;
    }
  };

  export const deleteMedicationForUser = (payload) => async (dispatch) => {
    // console.log("PAYLOAD 52", payload)
    const res = await csrfFetch(`/api/medications/${payload.id}`, {
      method: "DELETE"
    });
    const data = await res.json();
    if (res.ok) {
      dispatch(deleteMedication(data));
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
            // console.log("STATE", newState)
            // console.log("ACTION", action, 'line 24')
            // console.log(action.avatar, '-----store')
            if(action.med && action.med !== undefined){
                // console.log("LINE 27", action.med)
                    newState[action.med.id] = action.med
            }else{
                newState = null
            }
            return newState
        
        case UPDATE_MEDICATION:
            newState = {...state}
            // console.log("STATE", newState)
            // console.log("ACTION", action, 'line 24')
            // console.log(action.avatar, '-----store')
            if(action.med && action.med !== undefined){
                // console.log("LINE 27", action.med)
                    newState[action.med.id] = action.med
            }else{
                newState = null
            }
            return newState
        
        case DELETE_MEDICATION:
            newState = {...state}
            // console.log("ACTION", action, 'line 96')
            // console.log("STATE", newState)
            // delete newState.user.medications[action.med.id]
            return newState

        default:return state
    }
}

export default medicationReducer