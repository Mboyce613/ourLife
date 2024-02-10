import { csrfFetch } from "./csrf";

const CREATE_INCOME= 'income/createincome'
const UPDATE_INCOME= 'income/updateincome'
const DELETE_INCOME= 'income/deleteincome'

export const createIncome =(income)=>({
    type:CREATE_INCOME,
    income
})

export const updateIncome =(income)=>({
    type:UPDATE_INCOME,
    income
})

export const deleteIncome =(income)=>({
  type:DELETE_INCOME,
  income
})

export const createIncomeForUser = (payload) => async (dispatch) => {
    const res = await csrfFetch(`/api/incomes`, {
      method: "POST",
      body: JSON.stringify(payload),
    });
    const data = await res.json();
    if (res.ok) {
      dispatch(createIncome(data));
      return data;
    } else {
      throw res;
    }
  };

  export const updateIncomeForUser = (payload) => async (dispatch) => {
    console.log("PAYLOAD 31", payload)
    const res = await csrfFetch(`/api/incomes/${payload.id}`, {
      method: "PUT",
      body: JSON.stringify(payload),
    });
    const data = await res.json();
    if (res.ok) {
      dispatch(updateIncome(data));
      return data;
    } else {
      throw res;
    }
  };

  export const deleteIncomeForUser = (payload) => async (dispatch) => {
    console.log("PAYLOAD 52", payload)
    const res = await csrfFetch(`/api/incomes/${payload.id}`, {
      method: "DELETE"
    });
    const data = await res.json();
    if (res.ok) {
      dispatch(deleteIncome(data));
      return data;
    } else {
      throw res;
    }
  };

const incomeReducer = (state = {}, action)=>{
    let newState = null
    switch(action.type){
        case CREATE_INCOME:
            newState = {...state}
            console.log("STATE", newState)
            // console.log("ACTION", action, 'line 24')
            // console.log(action.avatar, '-----store')
            if(action.income && action.income !== undefined){
                console.log("LINE 27", action.income)
                    newState[action.income.id] = action.income
            }else{
                newState = null
            }
            return newState
        
        case UPDATE_INCOME:
            newState = {...state}
            console.log("STATE", newState)
            // console.log("ACTION", action, 'line 24')
            // console.log(action.avatar, '-----store')
            if(action.income && action.income !== undefined){
                console.log("LINE 27", action.income)
                    newState[action.income.id] = action.income
            }else{
                newState = null
            }
            return newState
        
        case DELETE_INCOME:
            newState = {...state}
            // console.log("ACTION", action, 'line 96')
            // console.log("STATE", newState)
            // delete newState.user.medications[action.med.id]
            return newState

        default:return state
    }
}

export default incomeReducer