import { Dispatch } from "react";
import { getUserProfile } from "../../services/users-http.service";
import { UserProfile } from "./user.reducer";
import {
  GET_PROFILE,
  GET_PROFILE_FAIL,
  GET_PROFILE_SUCCESS,
} from "./user.types";

type GetUser = {
  type: typeof GET_PROFILE;
};
type GetUserSuccess = {
  type: typeof GET_PROFILE_SUCCESS;
  profile: UserProfile;
};
type GetUserFail = {
  type: typeof GET_PROFILE_FAIL;
  error: any;
};

export type UserActions = GetUser | GetUserSuccess | GetUserFail;

export const getUser = () => (dispatch: Dispatch<UserActions>) => {
  dispatch({ type: GET_PROFILE });

  return getUserProfile()
    .then((res) => dispatch({ type: GET_PROFILE_SUCCESS, profile: res.data }))
    .catch((error) =>
      dispatch({
        type: GET_PROFILE_FAIL,
        error: {
          data: error.response?.data,
          status: error.response?.status,
        },
      })
    );
};
