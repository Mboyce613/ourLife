const SET_USER = 'session/setUser';
const REMOVE_USER = 'session/removeUser';

const setUser = (user) => ({
  type: SET_USER,
  payload: user
});

const removeUser = () => ({
  type: REMOVE_USER
});

export const thunkAuthenticate = () => async (dispatch) => {
	const response = await fetch("/api/auth/");
	if (response.ok) {
		const data = await response.json();
		if (data.errors) {
			return;
		}

		dispatch(setUser(data));
	}
};

export const thunkLogin = (credentials) => async dispatch => {
  const response = await fetch("/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials)
  });

  if(response.ok) {
    const data = await response.json();
    dispatch(setUser(data));
  } else if (response.status < 500) {
    const errorMessages = await response.json();
    return errorMessages
  } else {
    return { server: "Something went wrong. Please try again" }
  }
};

export const thunkSignup = (user) => async (dispatch) => {
  console.log("USER", user)
  const response = await fetch("/api/auth/signup", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user)
  });

  if(response.ok) {
    const data = await response.json();
    dispatch(setUser(data));
  } else if (response.status < 500) {
    const errorMessages = await response.json();
    return errorMessages
  } else {
    return { server: "Something went wrong. Please try again" }
  }
};

export const thunkLogout = () => async (dispatch) => {
  await fetch("/api/auth/logout");
  dispatch(removeUser());
};

const initialState = { user: null };

function sessionReducer(state = initialState, action) {
  switch (action.type) {
    case SET_USER:
      let newState = {...state, user:{}}
      // console.log("ACTION.PAYLOAD", action.payload)
      newState.user['id'] = action.payload.id
      newState.user['first_name'] = action.payload.first_name
      newState.user['last_name'] = action.payload.last_name
      newState.user['email'] = action.payload.email
      newState.user['is_dependent'] = action.payload.is_dependent
      // newState.user.id = action.payload.id

      if(action.payload.appointments){
        newState.user['appointments'] = {}
        action.payload.appointments.forEach(app => {
          newState.user['appointments'][app.id] = app
        });
      }
      if(action.payload.expenses){
        newState.user['expenses'] = {}
        action.payload.expenses.forEach(exp => {
          newState.user['expenses'][exp.id] = exp
        });
      }
      if(action.payload.incomes){
        newState.user['incomes'] = {}
        action.payload.incomes.forEach(income => {
          newState.user['incomes'][income.id] = income
        });
      }
      if(action.payload.medications){
        newState.user['medications'] = {}
        action.payload.medications.forEach(med => {
          newState.user['medications'][med.id] = med
        });
      }
      if(action.payload.families){
        newState.user['families'] = {}
        action.payload.families.forEach(family => {
          const newList = []
          // console.log("SHOPP", family.shopping_lists)
          family.shopping_lists.forEach(list=>{
            newList[list.id] = list
          })
          // console.log("NEWSHOPP", newList)
          family.shopping_lists = newList
          newState.user['families'][family.id] = family
        });
      }

      return {...newState}
      // return { ...state, user: action.payload };
    case REMOVE_USER:
      return { ...state, user: null };
    default:
      return state;
  }
}

export default sessionReducer;
