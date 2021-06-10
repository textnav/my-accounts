import MockAdapter from "axios-mock-adapter";
import expect from "expect"; // You can use any testing library
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import mockAccounts from "../../assets/mock-data/accounts.json";
import mockCurrencies from "../../assets/mock-data/currencies.json";
import mockTransactions from "../../assets/mock-data/transactions.json";
import { http } from "./../../services/http";
import * as actions from "./account.actions";
import * as types from "./account.types";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const mock = new MockAdapter(http);

describe("account async actions", () => {
  it("creates GET_ACCOUNTS_SUCCESS when accounts are fetched", () => {
    mock.onGet("/accounts").reply(200, mockAccounts);

    const expectedActions = [
      { type: types.FETCH_ACCOUNTS },
      { type: types.FETCH_ACCOUNTS_SUCCESS, accounts: mockAccounts },
    ];
    const store = mockStore({ accounts: [] });

    return store
      .dispatch(actions.fetchAccounts() as any)
      .then(() => expect(store.getActions()).toEqual(expectedActions));
  });

  it("creates GET_ACCOUNTS_FAIL when accounts are not fetched", () => {
    const error = {
      status: 400,
      data: "accounts not found",
    };
    mock.onGet("/accounts").reply(error.status, error.data);

    const expectedActions = [
      { type: types.FETCH_ACCOUNTS },
      { type: types.FETCH_ACCOUNTS_FAIL, error },
    ];
    const store = mockStore({ error: [] });

    return store
      .dispatch(actions.fetchAccounts() as any)
      .then(() => expect(store.getActions()).toEqual(expectedActions));
  });

  it("creates FETCH_TRANSACTIONS_SUCCESS when transactions are fetched", () => {
    mock
      .onGet("/transactions/021000021")
      .reply(200, mockTransactions["021000021"]);

    const expectedActions = [
      { type: types.FETCH_TRANSACTIONS },
      {
        type: types.FETCH_TRANSACTIONS_SUCCESS,
        transactions: mockTransactions["021000021"],
      },
    ];
    const store = mockStore({ transactions: [] });

    return store
      .dispatch(actions.fetchTransactions("021000021") as any)
      .then(() => expect(store.getActions()).toEqual(expectedActions));
  });

  it("creates FETCH_TRANSACTIONS_FAIL when transactions are fetched", () => {
    const error = {
      status: 400,
      data: "transactions not found",
    };
    mock.onGet("/transactions/021000021").reply(error.status, error.data);

    const expectedActions = [
      { type: types.FETCH_TRANSACTIONS },
      {
        type: types.FETCH_TRANSACTIONS_FAIL,
        error,
      },
    ];
    const store = mockStore({ error: "" });

    return store
      .dispatch(actions.fetchTransactions("021000021") as any)
      .then(() => expect(store.getActions()).toEqual(expectedActions));
  });

  it("creates FETCH_CURRENCIES_SUCCESS when transactions are fetched", () => {
    mock.onGet("/currencies").reply(200, mockCurrencies);

    const expectedActions = [
      { type: types.FETCH_CURRENCIES },
      {
        type: types.FETCH_CURRENCIES_SUCCESS,
        currencies: mockCurrencies,
      },
    ];
    const store = mockStore({ currencies: {} });

    return store
      .dispatch(actions.fetchCurrencies() as any)
      .then(() => expect(store.getActions()).toEqual(expectedActions));
  });

  it("creates FETCH_CURRENCIES_FAIL when currencies are fetched", () => {
    const error = {
      status: 400,
      data: "currencies not found",
    };
    mock.onGet("/currencies").reply(error.status, error.data);

    const expectedActions = [
      { type: types.FETCH_CURRENCIES },
      {
        type: types.FETCH_CURRENCIES_FAIL,
        error,
      },
    ];
    const store = mockStore({ error: "" });

    return store
      .dispatch(actions.fetchCurrencies() as any)
      .then(() => expect(store.getActions()).toEqual(expectedActions));
  });
});
