import { Dispatch } from "react";
import {
  getAccounts,
  getCurrencies,
} from "../../services/accounts-http.service";
import { getTransactions } from "./../../services/accounts-http.service";
import { Account, Currency, Transaction } from "./account.reducer";
import {
  FETCH_ACCOUNTS,
  FETCH_ACCOUNTS_FAIL,
  FETCH_ACCOUNTS_SUCCESS,
  FETCH_CURRENCIES,
  FETCH_CURRENCIES_FAIL,
  FETCH_CURRENCIES_SUCCESS,
  FETCH_TRANSACTIONS,
  FETCH_TRANSACTIONS_FAIL,
  FETCH_TRANSACTIONS_SUCCESS,
} from "./account.types";

type FetchAccountsAction = {
  type: typeof FETCH_ACCOUNTS;
};
type FetchAccountsSuccessAction = {
  type: typeof FETCH_ACCOUNTS_SUCCESS;
  accounts: Account[];
};
type FetchAccountsFailAction = {
  type: typeof FETCH_ACCOUNTS_FAIL;
  error: any;
};

type FetchTransactionsAction = {
  type: typeof FETCH_TRANSACTIONS;
};
type FetchTransactionsSuccessAction = {
  type: typeof FETCH_TRANSACTIONS_SUCCESS;
  transactions: Transaction[];
};
type FetchTransactionsFailAction = {
  type: typeof FETCH_TRANSACTIONS_FAIL;
  error: any;
};

type FetchCurrenciesAction = {
  type: typeof FETCH_CURRENCIES;
};
type FetchCurrenciesSuccessAction = {
  type: typeof FETCH_CURRENCIES_SUCCESS;
  currencies: Currency;
};
type FetchCurrenciesFailAction = {
  type: typeof FETCH_CURRENCIES_FAIL;
  error: any;
};

export type AccountActions =
  | FetchAccountsAction
  | FetchAccountsSuccessAction
  | FetchAccountsFailAction
  | FetchTransactionsAction
  | FetchTransactionsSuccessAction
  | FetchTransactionsFailAction
  | FetchCurrenciesAction
  | FetchCurrenciesSuccessAction
  | FetchCurrenciesFailAction;

export const fetchAccounts = () => (dispatch: Dispatch<AccountActions>) => {
  dispatch({ type: FETCH_ACCOUNTS });

  return getAccounts()
    .then((res) =>
      dispatch({ type: FETCH_ACCOUNTS_SUCCESS, accounts: res.data })
    )
    .catch((error) =>
      dispatch({
        type: FETCH_ACCOUNTS_FAIL,
        error: {
          data: error.response?.data,
          status: error.response?.status,
        },
      })
    );
};

export const fetchTransactions =
  (id: string) => (dispatch: Dispatch<AccountActions>) => {
    dispatch({ type: FETCH_TRANSACTIONS });

    return getTransactions(id)
      .then((res) =>
        dispatch({
          type: FETCH_TRANSACTIONS_SUCCESS,
          transactions: res.data,
        })
      )
      .catch((error) =>
        dispatch({
          type: FETCH_TRANSACTIONS_FAIL,
          error: {
            data: error.response?.data,
            status: error.response?.status,
          },
        })
      );
  };

export const fetchCurrencies = () => (dispatch: Dispatch<AccountActions>) => {
  dispatch({ type: FETCH_CURRENCIES });

  return getCurrencies()
    .then((res) =>
      dispatch({
        type: FETCH_CURRENCIES_SUCCESS,
        currencies: res.data,
      })
    )
    .catch((error) =>
      dispatch({
        type: FETCH_CURRENCIES_FAIL,
        error: {
          data: error.response?.data,
          status: error.response?.status,
        },
      })
    );
};
