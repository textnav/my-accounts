import { AxiosInstance } from "axios";
import MockAdapter from "axios-mock-adapter";
import mockAccounts from "../assets/mock-data/accounts.json";
import mockCurrencies from "../assets/mock-data/currencies.json";
import mockTransactions from "../assets/mock-data/transactions.json";
import mockUser from "../assets/mock-data/user.json"
import {
  Account,
  CurrencyType,
  Transaction,
  TransactionAction
} from "../redux/account/account.reducer";

export const isMockEnabled = () => {
  return process.env.REACT_APP_MOCK_ENABLED === "true";
};

const mockOptions = () => {
  const mockOptions: any = {};
  if (process.env.REACT_APP_MOCK_TIME) {
    mockOptions.delayResponse = parseInt(process.env.REACT_APP_MOCK_TIME);
  }
  return mockOptions;
};

export const initializeAxiosMockAdapter = (
  instance: AxiosInstance
): MockAdapter => {
  const mock = new MockAdapter(instance, mockOptions());

  mock.onGet("/accounts").reply(() => getAccounts());

  mock.onGet("/profile").reply(() => getProfile());

  mock.onGet("/currencies").reply(() => getCurrencies());

  mock.onGet(/\/transactions\/[sS]*/).reply((config) => {
    const url = config.url;
    let id = null;
    if (url) {
      id = url.substring(url.lastIndexOf("/") + 1);
    }
    return getTransactions(id);
  });

  mock.onPost("/transfer").reply((config) => {
    const { fromAccount, toAccount, transferAmount, currency, description } =
      JSON.parse(config?.data);

    return postTransfer(
      fromAccount,
      toAccount,
      transferAmount,
      currency,
      description
    );
  });

  return mock;
};

const transactions = { ...mockTransactions } as { [id: string]: Transaction[] };
const accounts = [...mockAccounts] as Account[];

const getAccounts = () => {
  return [200, accounts];
};
const getProfile = () => {
  return [200, mockUser];
};

const getTransactions = (id: string | null) => {
  if (id === null) {
    return [400];
  }
  return [200, (transactions as any)[id] ?? []];
};

const getCurrencies = () => {
  return [200, mockCurrencies];
};

const postTransfer = (
  fromAccountId: string,
  toAccountId: string,
  transferAmount: number,
  currency: CurrencyType,
  description = ""
) => {
  const multiplier = mockCurrencies[currency];
  if (multiplier === null || multiplier === undefined) {
    return [400, "Bad Request"];
  }

  const actualAmount = transferAmount / multiplier;

  if (validateTransfer(fromAccountId, toAccountId, actualAmount)) {
    const fromAccount = getMockAccount(fromAccountId) as Account;
    const toAccount = getMockAccount(toAccountId) as Account;

    fromAccount.balance -= actualAmount;
    toAccount.balance += actualAmount;
    const timestamp = Date.now();
    const transactionFrom: Transaction = {
      id: generateUUID(),
      timestamp: timestamp,
      action: TransactionAction.DEBIT,
      amount: transferAmount,
      currency,
      description,
      balance: fromAccount.balance,
    };
    transactions[fromAccountId].push(transactionFrom);
    const transactionTo: Transaction = {
      id: generateUUID(),
      timestamp: timestamp,
      action: TransactionAction.CREDIT,
      amount: transferAmount,
      currency,
      description,
      balance: toAccount.balance,
    };
    if (!Array.isArray(transactions[toAccountId])) {
      transactions[toAccountId] = [];
    }
    transactions[toAccountId].push(transactionTo);
    return [200];
  }
  return [400, "Bad Request"];
};

function getMockAccount(accountId: string): Account | undefined {
  return accounts.find((item) => item.id === accountId);
}

const validateTransfer = (
  fromAccountId: string,
  toAccountId: string,
  transferAmount: number
): boolean => {
  if (fromAccountId?.trim() && toAccountId?.trim() && transferAmount > 0) {
    // only process if from account id & to account id are passed and amount > 0
    if (getMockAccount(fromAccountId) && getMockAccount(toAccountId)) {
      // only process if accounts exist
      const fromAccount = getMockAccount(fromAccountId) as Account;
      if (fromAccount.balance > transferAmount) {
        // only process if from account has balance more than transfer amount
        return true;
      }
      return false;
    }
  }
  return false;
};

export function generateUUID() {
  // Public Domain/MIT
  var d = new Date().getTime(); //Timestamp
  var d2 = (performance && performance.now && performance.now() * 1000) || 0; //Time in microseconds since page-load or 0 if unsupported
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    var r = Math.random() * 16; //random number between 0 and 16
    if (d > 0) {
      //Use timestamp until depleted
      r = (d + r) % 16 | 0;
      d = Math.floor(d / 16);
    } else {
      //Use microseconds since page-load if supported
      r = (d2 + r) % 16 | 0;
      d2 = Math.floor(d2 / 16);
    }
    return (c === "x" ? r : (r & 0x3) | 0x8).toString(16);
  });
}