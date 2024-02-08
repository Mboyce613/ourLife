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
                    // if(ele.families){
                    //     newState['families'] = {}
                    //     ele.families.forEach(app => {
                    //         newState['families'][app.id] = app
                    //     });
                    //   }
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

        default:return state
    }
}

export default userReducer