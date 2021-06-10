import { AccountState } from "./../account/account.reducer";
import { AppState } from "./../reducers";
import { initialUserState } from "./user.reducer";
import { getUser } from "./user.selector";

describe("user selector", () => {
  it("should return the user profile from store", () => {
    const store: AppState = {
      user: initialUserState,
      account: {} as AccountState,
    };
    expect(getUser(store)).toEqual(initialUserState.profile);
  });
});
