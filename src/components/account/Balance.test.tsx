import { screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { renderWithStore } from "../../../utils/test-utils";
import { Account, Currency, initialAccountState, Transaction, TransactionAction } from '../../redux/account/account.reducer';
import { ApiData, AppState } from '../../redux/reducers';
import { initialAppState } from '../../redux/store';
import Balance from './Balance';

const testAccounts: ApiData<Account[]> = {
  fetched: true,
  fetching: false,
  error: null,
  data: [{
    id: '001',
    balance: 100,
    currency: 'US$',
    label: 'first test account'
  }, {
    id: '002',
    balance: 200,
    currency: 'US$',
    label: 'second test account'
  }]
};
const testCurrencies: ApiData<Currency> = {
  fetched: true,
  fetching: false,
  error: null,
  data: {
    "US$": 1,
    "HK$": 8,
  }
};

const transactions: Transaction[] = [
  {
    "id": "1619677467934",
    "timestamp": 1619677467000,
    "action": TransactionAction.DEBIT,
    "description": "initial deposit",
    "amount": 0,
    "balance": 0,
    "currency": "US$"
  },
]

describe("Balance Component", () => {
  test('should show loader', async () => {
    const initialState: AppState = {
      ...initialAppState,
      account: {
        ...initialAccountState, accounts: {
          ...initialAccountState.accounts, fetching: true
        }
      }
    }

    act(() => {
      renderWithStore(<Balance transactions={transactions} id="001" />, { initialState });
    });
    expect(screen.getByTestId('loader')).toBeInTheDocument();
  });

  test('should error if there is any error while fetching data', async () => {
    const initialState: AppState = {
      ...initialAppState,
      account: {
        ...initialAccountState, accounts: {
          ...initialAccountState.accounts, error: true
        }
      }
    }

    act(() => {
      renderWithStore(<Balance transactions={transactions} id="001" />, { initialState });
    });
    expect(screen.getByText('Error while fetching accounts')).toBeInTheDocument();
  });

  test('should show error if data is null', async () => {
    const initialState: AppState = {
      ...initialAppState,
      account: {
        ...initialAccountState, accounts: {
          ...initialAccountState.accounts, data: (null as any)
        }
      }
    }

    act(() => {
      renderWithStore(<Balance transactions={transactions} id="001" />, { initialState });
    });
    expect(screen.getByText('Error with account data')).toBeInTheDocument();
  });

  test('should show data when fetched', async () => {
    const initialState: AppState = {
      ...initialAppState,
      account: {
        ...initialAccountState, accounts: {
          ...initialAccountState.accounts,
          fetched: true,
          data: [{
            id: '001',
            label: 'test-label',
            currency: "US$",
            balance: 100
          }]
        }
      }
    }

    act(() => {
      renderWithStore(<Balance transactions={transactions} id="001" />, { initialState });
    });
    expect(screen.getByText('Balance')).toBeInTheDocument();

    expect(screen.getByText(`Recent ${TransactionAction.DEBIT}`)).toBeInTheDocument();
  });

  test('should show error when account does not match', async () => {
    const initialState: AppState = {
      ...initialAppState,
      account: {
        ...initialAccountState, accounts: {
          ...initialAccountState.accounts,
          fetched: true,
          data: [{
            id: '001',
            label: 'test-label',
            currency: "US$",
            balance: 100
          }]
        }
      }
    }

    act(() => {
      renderWithStore(<Balance transactions={transactions} id="002" />, { initialState });
    });

    expect(screen.getByText('Error with account data')).toBeInTheDocument();
  });

});