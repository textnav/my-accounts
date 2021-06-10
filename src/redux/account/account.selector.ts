import { AppState } from "../reducers";

const getAccountState = (store: AppState) => store.account;

export const getAccounts = (store: AppState) =>
  getAccountState(store)?.accounts;

export const getCurrencies = (store: AppState) =>
  getAccountState(store)?.currencies;

export const getTransactions = (store: AppState) =>
  getAccountState(store)?.transactions;
