import { createStore } from "redux";

const globalState = {
  user: "",
};

//Reducer
const rootReducer = (state = globalState, action) => {
  // console.log("aksi", action);

  if (action.type === "SET_USER") {
    return {
      ...state,
      user: action.userData,
    };
  }

  return state;
};

//Store
export const storeRedux = createStore(rootReducer);

// Subscription
storeRedux.subscribe(() => {
  console.log("Redux : ", storeRedux.getState());
});
