import {
  legacy_createStore as createStore,
  applyMiddleware,
  compose,
  combineReducers,
} from "redux";
import thunk from "redux-thunk";
import sessionReducer from "./session";
import familyReducer from "./family";
import userReducer from "./user";
import medicationReducer from "./medication";
import incomeReducer from "./income";
import expenseReducer from "./expense";
import appointmentReducer from "./appointment"

export const rootReducer = combineReducers({
  session: sessionReducer,
  family: familyReducer,
  user: userReducer,
  medication: medicationReducer,
  income: incomeReducer,
  expense: expenseReducer,
  appointment: appointmentReducer
});

let enhancer;
if (import.meta.env.MODE === "production") {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = (await import("redux-logger")).default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
