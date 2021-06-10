import { UserState } from "../user/user.reducer";
import { initialAccountState } from "./../account/account.reducer";
import { AppState } from "./../reducers";
import {
  getAccounts,
  getCurrencies,
  getTransactions,
} from "./account.selector";

const emptyProfile = {
  name: "",
  gender: "",
  age: "",
  address: "",
};
const profile = {
  fetching: false,
  fetched: false,
  error: null,
  data: emptyProfile,
};
const initialUserState: UserState = {
  profile,
};

describe("account selector", () => {
  it("should return the user profile from store", () => {
    const store: AppState = {
      user: initialUserState,
      account: initialAccountState,
    };
    expect(getAccounts(store)).toEqual(initialAccountState.accounts);
  });

  it("should return currencies from store", () => {
    const store: AppState = {
      user: initialUserState,
      account: initialAccountState,
    };
    expect(getCurrencies(store)).toEqual(initialAccountState.currencies);
  });

  it("should return transactions from store", () => {
    const store: AppState = {
      user: initialUserState,
      account: initialAccountState,
    };
    expect(getTransactions(store)).toEqual(initialAccountState.transactions);
  });
});
