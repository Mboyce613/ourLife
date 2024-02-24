const LOAD_FAMILY= 'family/loadFamily'
const CREATE_FAMILY= 'family/createFamily'
const CREATE_USER= 'family/createuser'
const DELETE_USER= 'family/deleteuser'
const CREATE_SHOP= 'usefamily/createshop'
const DELETE_SHOP= 'family/deleteshop'


export const loadFamily =(family)=>({
    type:LOAD_FAMILY,
    family
})

export const createFamily =(family)=>({
    type:CREATE_FAMILY,
    family
})

export const createUser =(payload)=>({
    type:CREATE_USER,
    payload
})

export const deleteUser =(payload)=>({
    type:DELETE_USER,
    payload
})

export const createShop =(payload)=>({
    type:CREATE_SHOP,
    payload
})

export const deleteShop =(payload)=>({
    type:DELETE_SHOP,
    payload
})

export const getFamiliesByIds = (families) => async (dispatch)=>{
    for(const fam of families){
        // console.log("FAM", fam)
        const res = await fetch(`/api/families/${fam}`)
        // console.log(res, '----------')
        if(res.ok){
            const data = await res.json()
            // console.log("DATA LINE 15", data)
            dispatch(loadFamily(data))
            // return data
        }
        // return res
    }
}

export const createFamilyThunk = (payload) => async (dispatch)=>{
    // console.log("PAYLOAD",payload)
    const res = await fetch(`/api/families/`,{
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
    })
    // console.log(res, '----------')
    if(res.ok){
        const data = await res.json()
        dispatch(createFamily(data))
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
        dispatch(createUser({user:data, family:payload.id}))
        return data
    }
    return res
}

export const createShopForFamily = (payload) => async (dispatch)=>{
    // console.log("LINE 80", payload)
    const res = await fetch(`/api/shopping_lists/`,{
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
    })
    // console.log(res, '----------')
    if(res.ok){
        const data = await res.json()
        dispatch(createShop({item:data, family:payload.id}))
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
        dispatch(deleteUser({user:data, family:payload.familyId}))
        return data
    }
    return res
}

export const removeShopFromFamily = (id) => async (dispatch)=>{
    const res = await fetch(`/api/shopping_lists/${id}`,{
        method: "DELETE"
    })
    // console.log(res, '----------')
    if(res.ok){
        const data = await res.json()
        dispatch(deleteShop(data))
        return data
    }
    return res
}


const familyReducer = (state = {}, action)=>{
    let newState = null
    switch(action.type){
        case LOAD_FAMILY:
            // console.log("ACTION", action, 'line 28')
            newState = {...state}
            // console.log(action.avatar, '-----store')
            if(action.family.family && action.family.family !== undefined){
                // console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!")
                action.family.family.forEach(fam => {
                    // console.log("33",fam.users)
                    const userObj = {}
                    const shopObj = {}
                    newState[fam.id] = fam
                    fam.users.forEach(user=>{
                        // console.log("LINE37", fam.user)
                        // console.log("LINE38", user)
                        // userArray.push({[user.id]:user})
                        userObj[user.id] = user
                    })
                    // console.log("array on 41", userObj)
                    newState[fam.id].users = userObj

                    fam.shopping_lists.forEach(item=>{
                        // console.log("LINE37", fam.item)
                        // console.log("LINE38", item)
                        // itemArray.push({[item.id]:item})
                        shopObj[item.id] = item
                    })
                    // console.log("array on 41", userObj)
                    newState[fam.id].shopping_lists = shopObj
                    // newState[fam.id].users.forEach(user=>{
                    //     console.log("LINE 37", user)
                    //     console.log("LINE 38", newState[fam.id].users[user.id])
                        // newState[fam.id].users[user.id] = user
                        
                    // })
                    // newState[fam.id].users[0]=null
                })
            }else{
                newState = null
            }
            return newState
        
        case CREATE_FAMILY:
            newState = {...state}
            // console.log("ACTION", action, 'line 124')
            // console.log(newState)
            // delete newState[1].users[action.user.id];
            newState[action.family.id] = action.family
            // console.log("STATE", newState)
            // delete newState.user.medications[action.med.id]
            return newState
        
        case CREATE_USER:
            newState = {...state}
            // console.log("ACTION", action, 'line 102')
            // console.log(newState)
            // delete newState[1].users[action.user.id];
            newState[action.payload.family].users[action.payload.user.id] = action.payload.user
            // console.log("STATE", newState)
            // delete newState.user.medications[action.med.id]
            return newState
    
        case DELETE_USER:
            newState = {...state}
            // console.log("ACTION", action, 'line 112')
            delete newState[action.payload.family].users[action.payload.user.id];
            // newState.user[action.user.id] = action.user
            // console.log("STATE", newState)
            // delete newState.user.medications[action.med.id]
            return newState

        case CREATE_SHOP:
            newState = {...state}
            // console.log("ACTION", action, 'line 102')
            // console.log(newState)
            // delete newState[1].users[action.user.id];
            newState[action.payload.item.family_id].shopping_lists[action.payload.item.id] = action.payload.item
            // console.log("STATE", newState)
            // delete newState.user.medications[action.med.id]
            return newState

        case DELETE_SHOP:
            newState = {...state}
            // console.log("ACTION", action, 'line 112')
            delete newState[action.payload.family_id].shopping_lists[action.payload.id];
            // newState.user[action.user.id] = action.user
            // console.log("STATE", newState)
            // delete newState.user.medications[action.med.id]
            return newState

        default:return state
    }
}

export default familyReducer