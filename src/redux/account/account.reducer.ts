import { ApiData } from "../reducers";
import { AccountActions } from "./account.actions";
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

export type CurrencyType = "US$" | "HK$";

/**
 * the value of Currency is the exchange rate compared to US$
 */
export interface Currency {
  [id: string]: number;
}

export enum TransactionAction {
  DEBIT = "debit",
  CREDIT = "credit",
}
export interface Transaction {
  id: string;
  timestamp: number;
  action: TransactionAction;
  description: string;
  amount: number;
  currency: CurrencyType;
  balance: number;
}
export interface Account {
  id: string;
  label: string;
  currency: CurrencyType;
  balance: number;
}
export interface AccountState {
  accounts: ApiData<Account[]>;
  transactions: ApiData<Transaction[]>;
  currencies: ApiData<Currency>;
}

export const initialAccountState: AccountState = {
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

export const account = (
  state = initialAccountState,
  action: AccountActions
): AccountState => {
  switch (action.type) {
    case FETCH_ACCOUNTS: {
      const accounts = {
        ...state.accounts,
        fetching: true,
        fetched: false,
        error: null,
        data: [],
      };
      return {
        ...state,
        accounts,
      };
    }
    case FETCH_ACCOUNTS_SUCCESS: {
      const accounts = {
        ...state.accounts,
        fetching: false,
        fetched: true,
        data: action.accounts,
      };
      return {
        ...state,
        accounts,
      };
    }
    case FETCH_ACCOUNTS_FAIL: {
      const accounts = {
        ...state.accounts,
        fetching: false,
        fetched: true,
        data: [],
        error: action.error,
      };
      return {
        ...state,
        accounts,
      };
    }
    case FETCH_TRANSACTIONS: {
      const transactions = {
        ...state.transactions,
        fetching: true,
        fetched: false,
        error: null,
        data: [],
      };
      return {
        ...state,
        transactions,
      };
    }
    case FETCH_TRANSACTIONS_SUCCESS: {
      const transactions = {
        ...state.transactions,
        fetching: false,
        fetched: true,
        data: action.transactions,
      };
      return {
        ...state,
        transactions,
      };
    }
    case FETCH_TRANSACTIONS_FAIL: {
      const transactions = {
        ...state.transactions,
        fetching: false,
        fetched: true,
        data: [],
        error: action.error,
      };
      return {
        ...state,
        transactions,
      };
    }
    case FETCH_CURRENCIES: {
      const currencies = {
        ...state.currencies,
        fetching: true,
        fetched: false,
        error: null,
        data: {},
      };
      return {
        ...state,
        currencies,
      };
    }
    case FETCH_CURRENCIES_SUCCESS: {
      const currencies = {
        ...state.currencies,
        fetching: false,
        fetched: true,
        data: action.currencies,
      };
      return {
        ...state,
        currencies,
      };
    }
    case FETCH_CURRENCIES_FAIL: {
      const currencies = {
        ...state.currencies,
        fetching: false,
        fetched: true,
        data: {},
        error: action.error,
      };
      return {
        ...state,
        currencies,
      };
    }
    default: {
      return state;
    }
  }
};
