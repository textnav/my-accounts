import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import { initialAccountState } from "./account/account.reducer";
import reducer, { AppState } from "./reducers";
import { initialUserState } from "./user/user.reducer";

export const initialAppState: AppState = {
  user: initialUserState,
  account: initialAccountState,
};

const middleware = [thunk];

const composeEnhancers = composeWithDevTools({
  // options like actionSanitizer, stateSanitizer
});
const store = createStore(
  reducer,
  /* preloadedState, */ composeEnhancers(
    applyMiddleware(...middleware)
    // other store enhancers if any
  )
);

export default store;
