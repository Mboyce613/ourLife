const LOAD_FAMILY= 'family/loadFamily'

export const loadFamily =(family)=>({
    type:LOAD_FAMILY,
    family
})

export const getFamiliesByIds = (families) => async (dispatch)=>{
    for(const fam of families){
        // console.log("FAM", fam)
        const res = await fetch(`/api/families/${fam}`)
        // console.log(res, '----------')
        if(res.ok){
            const data = await res.json()
            console.log("DATA", data)
            dispatch(loadFamily(data))
            return data
        }
        return res
    }
}

const familyReducer = (state = {}, action)=>{
    let newState = null
    switch(action.type){
        case LOAD_FAMILY:
            // console.log("ACTION", action, 'line 28')
            newState = {...state}
            // console.log(action.avatar, '-----store')
            if(action.family.family && action.family.family !== undefined){
                console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!")
                action.family.family.forEach(fam => {
                    console.log("33",fam.users)

                    newState[fam.id] = fam
                    newState[fam.id].users.forEach(user=>{
                        newState[fam.id].users[user.id] = user
                    })
                    newState[fam.id].users[0]=null
                })
            }else{
                newState = null
            }
            return newState

        default:return state
    }
}

export default familyReducer