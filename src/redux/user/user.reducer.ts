import { ApiData } from "./../reducers";
import { UserActions } from "./user.actions";
import {
  GET_PROFILE,
  GET_PROFILE_FAIL,
  GET_PROFILE_SUCCESS,
} from "./user.types";

export interface UserProfile {
  name: string;
  gender: string;
  age: string;
  address: string;
}

export interface UserState {
  profile: ApiData<UserProfile>;
}
const emptyProfile = {
  name: "",
  gender: "",
  age: "",
  address: "",
};
export const initialUserState: UserState = {
  profile: {
    fetching: false,
    fetched: false,
    error: null,
    data: emptyProfile,
  },
};

export const user = (
  state = initialUserState,
  action: UserActions
): UserState => {
  switch (action.type) {
    case GET_PROFILE: {
      const profile = {
        ...state.profile,
        fetching: true,
        fetched: false,
        error: null,
        data: emptyProfile,
      };
      return { ...state, profile };
    }
    case GET_PROFILE_SUCCESS: {
      const profile = {
        ...state.profile,
        fetching: false,
        fetched: true,
        error: null,
        data: action.profile,
      };
      return { ...state, profile };
    }
    case GET_PROFILE_FAIL: {
      const profile = {
        ...state.profile,
        fetching: false,
        fetched: true,
        error: action.error,
        data: emptyProfile,
      };
      return { ...state, profile };
    }
    default: {
      return state;
    }
  }
};
