import { csrfFetch } from "./csrf";

const CREATE_EXPENSE= 'expense/createexpense'
const UPDATE_EXPENSE= 'expense/updateexpense'
const DELETE_EXPENSE= 'expense/deleteexpense'
const FIND_EXPENSE= 'income/findexpense'

export const createExpense =(expense)=>({
    type:CREATE_EXPENSE,
    expense
})

export const updateExpense =(expense)=>({
    type:UPDATE_EXPENSE,
    expense
})

export const deleteExpense =(expense)=>({
  type:DELETE_EXPENSE,
  expense
})

export const findExpense =(expense)=>({
  type:FIND_EXPENSE,
  expense
})

export const createExpenseForUser = (payload) => async (dispatch) => {
    const res = await csrfFetch(`/api/expenses`, {
      method: "POST",
      body: JSON.stringify(payload),
    });
    const data = await res.json();
    if (res.ok) {
      dispatch(createExpense(data));
      return data;
    } else {
      throw res;
    }
  };

  export const updateExpenseForUser = (payload) => async (dispatch) => {
    // console.log("PAYLOAD 31", payload)
    const res = await csrfFetch(`/api/expenses/${payload.expenseId}`, {
      method: "PUT",
      body: JSON.stringify(payload),
    });
    const data = await res.json();
    if (res.ok) {
      dispatch(updateExpense(data));
      return data;
    } else {
      throw res;
    }
  };

  export const deleteExpenseForUser = (payload) => async (dispatch) => {
    // console.log("PAYLOAD 52", payload)
    const res = await csrfFetch(`/api/expenses/${payload.id}`, {
      method: "DELETE"
    });
    const data = await res.json();
    if (res.ok) {
      dispatch(deleteExpense(data));
      return data;
    } else {
      throw res;
    }
  };

  export const findExpenseForUsers = (users) => async (dispatch) => {
    for(const user of users){
      // console.log("USER LINE 73", user)
      const res = await fetch(`/api/expenses/user/${user}`)
      // console.log(res, '----------')
      if(res.ok){
          const data = await res.json()
          // console.log("DATA LINE 78", data)
          dispatch(findExpense(data))
          // return data
      }
      // return res
  }
}

const expenseReducer = (state = {}, action)=>{
    let newState = null
    switch(action.type){
        case CREATE_EXPENSE:
            newState = {...state}
            console.log("STATE", newState)
            // console.log("ACTION", action, 'line 24')
            // console.log(action.avatar, '-----store')
            if(action.expense && action.expense !== undefined){
                // console.log("LINE 27", action.expense)
                    newState[action.expense.id] = action.expense
            }else{
                newState = null
            }
            return newState
        
        case UPDATE_EXPENSE:
            newState = {...state}
            console.log("STATE", newState)
            // console.log("ACTION", action, 'line 24')
            // console.log(action.avatar, '-----store')
            if(action.expense && action.expense !== undefined){
                // console.log("LINE 27", action.expense)
                    newState[action.expense.id] = action.expense
            }else{
                newState = null
            }
            return newState
        
        case DELETE_EXPENSE:
            newState = {...state}
            // console.log("ACTION", action, 'line 96')
            // console.log("STATE", newState)
            // delete newState.user.medications[action.med.id]
            return newState

        case FIND_EXPENSE:
            // console.log("ACTION", action, 'line 123')
            newState = {...state}
            // console.log(action.avatar, '-----store')
            if(action.expense.expenses && action.expense.expenses !== undefined){
                // console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!")
                action.expense.expenses.forEach(exp => {
                    // console.log("33",exp)
                    newState[exp.id] = exp
                })
            }else{
                newState = null
            }
            return newState

        default:return state
    }
}

export default expenseReducer