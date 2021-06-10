import { UserActions } from "./user.actions";
import { user, UserState } from "./user.reducer";
import * as types from "./user.types";

const emptyProfile = {
  name: "",
  gender: "",
  age: "",
  address: "",
};
const initialUserState: UserState = {
  profile: {
    fetching: false,
    fetched: false,
    error: null,
    data: emptyProfile,
  },
};

describe("user reducer", () => {
  it("should return the initial state", () => {
    expect(user(undefined, {} as UserActions)).toEqual(initialUserState);
  });

  it("should handle fetching profile", () => {
    expect(
      user(undefined, {
        type: types.GET_PROFILE,
      })
    ).toEqual({
      ...initialUserState,
      profile: {
        ...initialUserState.profile,
        fetching: true,
        fetched: false,
        error: null,
        data: emptyProfile,
      },
    });
  });
  it("should handle fetching profile success", () => {
    expect(
      user(undefined, {
        type: types.GET_PROFILE_SUCCESS,
        profile: { ...emptyProfile, name: "testUser" },
      })
    ).toEqual({
      ...initialUserState,
      profile: {
        ...initialUserState.profile,
        fetching: false,
        fetched: true,
        error: null,
        data: { ...emptyProfile, name: "testUser" },
      },
    });
  });
  it("should handle fetching profile error", () => {
    expect(
      user(undefined, {
        type: types.GET_PROFILE_FAIL,
        error: "not found",
      })
    ).toEqual({
      ...initialUserState,
      profile: {
        ...initialUserState.profile,
        fetching: false,
        fetched: true,
        data: emptyProfile,
        error: "not found",
      },
    });
  });
});
