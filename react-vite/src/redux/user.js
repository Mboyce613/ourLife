const LOAD_USER= 'user/loadUser'

export const loadUser =(user)=>({
    type:LOAD_USER,
    user
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

const userReducer = (state = {}, action)=>{
    let newState = null
    switch(action.type){
        case LOAD_USER:
            newState = {...state, user:{}}
            console.log("ACTION", action, 'line 24')
            // console.log(action.avatar, '-----store')
            if(action.user && action.user !== undefined){
                console.log("LINE 27", action.user)
                action.user.forEach(ele => {
                    newState = ele
                })
            }else{
                newState = null
            }
            return newState

        default:return state
    }
}

export default userReducer