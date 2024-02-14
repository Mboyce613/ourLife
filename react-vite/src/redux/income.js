import { csrfFetch } from "./csrf";

const CREATE_INCOME= 'income/createincome'
const UPDATE_INCOME= 'income/updateincome'
const DELETE_INCOME= 'income/deleteincome'
const FIND_INCOME= 'income/findincome'

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

export const findIncome =(income)=>({
  type:FIND_INCOME,
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
    // console.log("PAYLOAD 31", payload)
    const res = await csrfFetch(`/api/incomes/${payload.incomeId}`, {
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
    // console.log("PAYLOAD 52", payload)
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

  export const findIncomeForUsers = (users) => async (dispatch) => {
    for(const user of users){
      // console.log("USER LINE 73", user)
      const res = await fetch(`/api/incomes/user/${user}`)
      // console.log(res, '----------')
      if(res.ok){
          const data = await res.json()
          // console.log("DATA LINE 78", data)
          dispatch(findIncome(data))
          // return data
      }
      // return res
  }
}

const incomeReducer = (state = {}, action)=>{
    let newState = null
    switch(action.type){
        case CREATE_INCOME:
            newState = {...state}
            // console.log("STATE", newState)
            // console.log("ACTION", action, 'line 24')
            // console.log(action.avatar, '-----store')
            if(action.income && action.income !== undefined){
                // console.log("LINE 27", action.income)
                    newState[action.income.id] = action.income
            }else{
                newState = null
            }
            return newState
        
        case UPDATE_INCOME:
            newState = {...state}
            // console.log("STATE", newState)
            // console.log("ACTION", action, 'line 24')
            // console.log(action.avatar, '-----store')
            if(action.income && action.income !== undefined){
                // console.log("LINE 27", action.income)
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

        case FIND_INCOME:
            // console.log("ACTION", action, 'line 123')
            newState = {...state}
            // console.log(action.avatar, '-----store')
            if(action.income.incomes && action.income.incomes !== undefined){
                // console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!")
                action.income.incomes.forEach(inc => {
                    // console.log("33",inc)
                    newState[inc.id] = inc
                })
            }else{
                newState = null
            }
            return newState

        default:return state
    }
}

export default incomeReducer