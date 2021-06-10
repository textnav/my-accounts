import { AppState } from "../reducers";

const getUserState = (store: AppState) => store.user;

export const getUser = (store: AppState) => getUserState(store)?.profile;
