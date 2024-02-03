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
      let newState = {...state}
      console.log("ACTION.PAYLOAD", action.payload)
      newState['id'] = action.payload.id
      newState['first_name'] = action.payload.first_name
      newState['last_name'] = action.payload.last_name
      newState['email'] = action.payload.email
      newState['is_dependent'] = action.payload.is_dependent

      if(action.payload.appointments){
        newState['appointments'] = []
        action.payload.appointments.forEach(app => {
          newState['appointments'][app.id] = app
        });
      }
      if(action.payload.expenses){
        newState['expenses'] = []
        action.payload.expenses.forEach(exp => {
          newState['expenses'][exp.id] = exp
        });
      }
      if(action.payload.incomes){
        newState['incomes'] = []
        action.payload.incomes.forEach(income => {
          newState['incomes'][income.id] = income
        });
      }
      if(action.payload.medications){
        newState['medications'] = []
        action.payload.medications.forEach(med => {
          newState['medications'][med.id] = med
        });
      }
      if(action.payload.families){
        newState['families'] = []
        action.payload.families.forEach(family => {
          const newList = []
          console.log("SHOPP", family.shopping_lists)
          family.shopping_lists.forEach(list=>{
            newList[list.id] = list
          })
          console.log("NEWSHOPP", newList)
          family.shopping_lists = newList
          newState['families'][family.id] = family
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
