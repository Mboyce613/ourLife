import { csrfFetch } from "./csrf";

const CREATE_APPOINTMENT= 'appointment/createappointment'
const UPDATE_APPOINTMENT= 'appointment/updateappointment'
const DELETE_APPOINTMENT= 'appointment/deleteappointment'

export const createAppointment =(appointment)=>({
    type:CREATE_APPOINTMENT,
    appointment
})

export const updateAppointment =(appointment)=>({
    type:UPDATE_APPOINTMENT,
    appointment
})

export const deleteAppointment =(appointment)=>({
  type:DELETE_APPOINTMENT,
  appointment
})

export const createAppointmentForUser = (payload) => async (dispatch) => {
  console.log("In Thunk?")  
  const res = await csrfFetch(`/api/appointments/`, {
      method: "POST",
      body: JSON.stringify(payload),
    });
    const data = await res.json();
    if (res.ok) {
      dispatch(createAppointment(data));
      return data;
    } else {
      throw res;
    }
  };

  export const updateAppointmentForUser = (payload) => async (dispatch) => {
    console.log("PAYLOAD 31", payload)
    const res = await csrfFetch(`/api/appointments/${payload.appointmentId}`, {
      method: "PUT",
      body: JSON.stringify(payload),
    });
    const data = await res.json();
    if (res.ok) {
      dispatch(updateAppointment(data));
      return data;
    } else {
      throw res;
    }
  };

  export const deleteAppointmentForUser = (payload) => async (dispatch) => {
    console.log("PAYLOAD 52", payload)
    const res = await csrfFetch(`/api/appointments/${payload.id}`, {
      method: "DELETE"
    });
    const data = await res.json();
    if (res.ok) {
      dispatch(deleteAppointment(data));
      return data;
    } else {
      throw res;
    }
  };

const appointmentReducer = (state = {}, action)=>{
    let newState = null
    switch(action.type){
        case CREATE_APPOINTMENT:
            newState = {...state}
            console.log("STATE", newState)
            // console.log("ACTION", action, 'line 24')
            // console.log(action.avatar, '-----store')
            if(action.appointment && action.appointment !== undefined){
                console.log("LINE 27", action.appointment)
                    newState[action.appointment.id] = action.appointment
            }else{
                newState = null
            }
            return newState
        
        case UPDATE_APPOINTMENT:
            newState = {...state}
            console.log("STATE", newState)
            // console.log("ACTION", action, 'line 24')
            // console.log(action.avatar, '-----store')
            if(action.appointment && action.appointment !== undefined){
                console.log("LINE 27", action.appointment)
                    newState[action.appointment.id] = action.appointment
            }else{
                newState = null
            }
            return newState
        
        case DELETE_APPOINTMENT:
            newState = {...state}
            // console.log("ACTION", action, 'line 96')
            // console.log("STATE", newState)
            // delete newState.user.medications[action.med.id]
            return newState

        default:return state
    }
}

export default appointmentReducer