const LOAD_USER= 'user/loadUser'
const UPDATE_USER= 'user/updateuser'
const DELETE_USER= 'user/deleteuser'
const CREATE_USER= 'user/createuser'

export const loadUser =(user)=>({
    type:LOAD_USER,
    user
})

export const updateUser =(user)=>({
    type:UPDATE_USER,
    user
})

export const deleteUser =(payload)=>({
    type:DELETE_USER,
    payload
})

export const createUser =(payload)=>({
    type:CREATE_USER,
    payload
})

export const getUserById = (userId) => async (dispatch)=>{
    const res = await fetch(`/api/users/${userId}`)
    // console.log(res, '----------')
    if(res.ok){
        const data = await res.json()
        dispatch(loadUser([data]))
        return data
    }
    return res
}

export const updateUserById = (payload) => async (dispatch)=>{
    const res = await fetch(`/api/users/${payload.id}`,{
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
    })
    // console.log(res, '----------')
    if(res.ok){
        const data = await res.json()
        dispatch(updateUser([data]))
        return data
    }
    return res
}

export const createUserForFamily = (payload) => async (dispatch)=>{
    const res = await fetch(`/api/users/family/${payload.id}`,{
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
    })
    // console.log(res, '----------')
    if(res.ok){
        const data = await res.json()
        dispatch(createUser([data]))
        return data
    }
    return res
}

export const removeUserFromFamily = (payload) => async (dispatch)=>{
    const res = await fetch(`/api/users/family/${payload.userId}`,{
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
    })
    // console.log(res, '----------')
    if(res.ok){
        const data = await res.json()
        dispatch(createUser([data]))
        return data
    }
    return res
}


const userReducer = (state = {}, action)=>{
    let newState = null
    switch(action.type){
        case LOAD_USER:
            newState = {...state}
            // console.log("ACTION", action, 'line 24')
            // console.log(action.avatar, '-----store')
            if(action.user && action.user !== undefined){
                console.log("LINE 27", action.user)
                action.user.forEach(ele => {
                    newState['id'] = ele.id
                    newState['first_name'] = ele.first_name
                    newState['last_name'] = ele.last_name
                    newState['email'] = ele.email
                    newState['is_dependent'] = ele.is_dependent
                    if(ele.appointments){
                        newState['appointments'] = {}
                        ele.appointments.forEach(app => {
                            newState['appointments'][app.id] = app
                        });
                      }
                    if(ele.expenses){
                        newState['expenses'] = {}
                        ele.expenses.forEach(app => {
                            newState['expenses'][app.id] = app
                        });
                      }
                    if(ele.incomes){
                        newState['incomes'] = {}
                        ele.incomes.forEach(app => {
                            newState['incomes'][app.id] = app
                        });
                      }
                    if(ele.medications){
                        newState['medications'] = {}
                        ele.medications.forEach(app => {
                            newState['medications'][app.id] = app
                        });
                      }
                    if(ele.families){
                        newState['families'] = {}
                        ele.families.forEach(family => {
                          const newList = {}
                          // console.log("SHOPP", family.shopping_lists)
                          family.shopping_lists.forEach(list=>{
                            newList[list.id] = list
                          })
                          // console.log("NEWSHOPP", newList)
                          family.shopping_lists = newList
                          newState['families'][family.id] = family
                        });
                      }
                })
            }else{
                newState = null
            }
            return newState

            case CREATE_USER:
            newState = {...state, user:{}}
            console.log("ACTION", action, 'line 143')
            console.log(newState)
            newState.user[action.payload[0].id] = action.payload[0]
            // console.log("STATE", newState)
            // delete newState.user.medications[action.med.id]
            return newState

            case DELETE_USER:
            newState = {...state}
            console.log("ACTION", action, 'line 122')
            // newState.user[action.user.id] = action.user
            // console.log("STATE", newState)
            // delete newState.user.medications[action.med.id]
            return newState

        default:return state
    }
}

export default userReducer