import MockAdapter from "axios-mock-adapter";
import expect from "expect"; // You can use any testing library
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import mockUser from "../../assets/mock-data/user.json";
import { http } from "./../../services/http";
import * as actions from "./user.actions";
import * as types from "./user.types";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const getProfile = () => {
  return [200, mockUser];
};
const mock = new MockAdapter(http);

describe("async actions", () => {
  it("creates GET_PROFILE_SUCCESS when fetching profile has been done", () => {
    mock.onGet("/profile").reply(() => getProfile());

    const expectedActions = [
      { type: types.GET_PROFILE },
      { type: types.GET_PROFILE_SUCCESS, profile: mockUser },
    ];
    const store = mockStore({ profile: {} });

    return store.dispatch(actions.getUser() as any).then(() => {
      // return of async actions
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it("creates GET_PROFILE_FAIL when fetching profile has failed", () => {
    const error = {
      data: "not found",
      status: 400,
    };
    mock.onGet("/profile").reply(error.status, error.data);

    const expectedActions = [
      { type: types.GET_PROFILE },
      {
        type: types.GET_PROFILE_FAIL,
        error,
      },
    ];
    const store = mockStore({ profile: {} });

    return store.dispatch(actions.getUser() as any).then(() => {
      // return of async actions
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
