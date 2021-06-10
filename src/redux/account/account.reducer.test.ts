import { AccountActions } from "./account.actions";
import {
  Account,
  account,
  AccountState,
  Transaction,
  TransactionAction,
} from "./account.reducer";
import * as types from "./account.types";

const initialAccountState: AccountState = {
  accounts: {
    fetching: false,
    fetched: false,
    error: null,
    data: [],
  },
  transactions: {
    fetching: false,
    fetched: false,
    error: null,
    data: [],
  },
  currencies: {
    fetching: false,
    fetched: false,
    error: null,
    data: {},
  },
};

describe("account reducer", () => {
  it("should return the initial state", () => {
    expect(account(undefined, {} as AccountActions)).toEqual(
      initialAccountState
    );
  });

  it("should handle fetching accounts", () => {
    expect(
      account(undefined, {
        type: types.FETCH_ACCOUNTS,
      })
    ).toEqual({
      ...initialAccountState,
      accounts: {
        ...initialAccountState.accounts,
        fetching: true,
        fetched: false,
        error: null,
        data: [],
      },
    });
  });

  it("should handle fetching accounts success", () => {
    const accounts: Account[] = [
      {
        id: "test id",
        label: "test label",
        currency: "US$",
        balance: 100,
      },
    ];
    expect(
      account(undefined, {
        type: types.FETCH_ACCOUNTS_SUCCESS,
        accounts,
      })
    ).toEqual({
      ...initialAccountState,
      accounts: {
        ...initialAccountState.accounts,
        fetching: false,
        fetched: true,
        error: null,
        data: accounts,
      },
    });
  });

  it("should handle fetching accounts error", () => {
    const error = "test error";
    expect(
      account(undefined, {
        type: types.FETCH_ACCOUNTS_FAIL,
        error,
      })
    ).toEqual({
      ...initialAccountState,
      accounts: {
        ...initialAccountState.accounts,
        fetching: false,
        fetched: true,
        error,
        data: [],
      },
    });
  });

  it("should handle fetching transactions", () => {
    expect(
      account(undefined, {
        type: types.FETCH_TRANSACTIONS,
      })
    ).toEqual({
      ...initialAccountState,
      transactions: {
        ...initialAccountState.transactions,
        fetching: true,
        fetched: false,
        error: null,
        data: [],
      },
    });
  });

  it("should handle fetching transactions success", () => {
    const transactions: Transaction[] = [
      {
        id: "test id",
        timestamp: Date.now(),
        action: TransactionAction.DEBIT,
        description: "",
        amount: 0,
        currency: "US$",
        balance: 0,
      },
    ];
    expect(
      account(undefined, {
        type: types.FETCH_TRANSACTIONS_SUCCESS,
        transactions,
      })
    ).toEqual({
      ...initialAccountState,
      transactions: {
        ...initialAccountState.accounts,
        fetching: false,
        fetched: true,
        error: null,
        data: transactions,
      },
    });
  });

  it("should handle fetching transactions fail", () => {
    const error = "test error";
    expect(
      account(undefined, {
        type: types.FETCH_TRANSACTIONS_FAIL,
        error,
      })
    ).toEqual({
      ...initialAccountState,
      transactions: {
        ...initialAccountState.accounts,
        fetching: false,
        fetched: true,
        error,
        data: [],
      },
    });
  });

  it("should handle fetching currencies", () => {
    expect(
      account(undefined, {
        type: types.FETCH_CURRENCIES,
      })
    ).toEqual({
      ...initialAccountState,
      currencies: {
        ...initialAccountState.currencies,
        fetching: true,
        fetched: false,
        error: null,
        data: {},
      },
    });
  });

  it("should handle fetching currencies success", () => {
    const currencies = {
      US$: 1,
      HK$: 8,
    };
    expect(
      account(undefined, {
        type: types.FETCH_CURRENCIES_SUCCESS,
        currencies,
      })
    ).toEqual({
      ...initialAccountState,
      currencies: {
        ...initialAccountState.currencies,
        fetching: false,
        fetched: true,
        error: null,
        data: currencies,
      },
    });
  });

  it("should handle fetching currencies fail", () => {
    const error = "test error";
    expect(
      account(undefined, {
        type: types.FETCH_CURRENCIES_FAIL,
        error,
      })
    ).toEqual({
      ...initialAccountState,
      currencies: {
        ...initialAccountState.currencies,
        fetching: false,
        fetched: true,
        error,
        data: {},
      },
    });
  });
});
