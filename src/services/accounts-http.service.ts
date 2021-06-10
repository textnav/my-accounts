import {
  Account,
  Currency,
  CurrencyType,
  Transaction,
} from "./../redux/account/account.reducer";
import { http } from "./http";

export const getAccounts = () => {
  return http.get<Account[]>("/accounts");
};

export const getTransactions = (id: string) => {
  return http.get<Transaction[]>(`/transactions/${id}`);
};

export const getCurrencies = () => {
  return http.get<Currency>(`/currencies`);
};

export interface TransferMoneyPayload {
  fromAccount: string;
  toAccount: string;
  transferAmount: number;
  currency: CurrencyType;
  description: string;
}

export const postTransfer = (data: TransferMoneyPayload) => {
  return http.post("/transfer", data);
};
