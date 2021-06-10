import { combineReducers } from "redux";
import { account, AccountState } from "./account/account.reducer";
import { user, UserState } from "./user/user.reducer";

export interface ApiData<T> {
  fetching: boolean;
  fetched: boolean;
  error: any;
  data: T;
}
export interface AppState {
  user: UserState;
  account: AccountState;
}

// export the combined reducer
export default combineReducers({ user, account });
