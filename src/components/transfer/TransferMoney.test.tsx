import { screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { renderWithStore } from "../../../utils/test-utils";
import { Account, Currency, initialAccountState } from '../../redux/account/account.reducer';
import { ApiData, AppState } from '../../redux/reducers';
import { initialAppState } from '../../redux/store';
import TransferMoney from './TransferMoney';

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

describe("TransferMoney Component", () => {
  test('should have form container', async () => {
    act(() => {
      renderWithStore(<TransferMoney />);
    });
    expect(screen.getByTestId('transferFormContainer')).toBeInTheDocument();
  });

  test('should not show transfer money form if accounts and currencies are not fetched', async () => {
    renderWithStore(<TransferMoney />);
    expect(screen.getByTestId('loader')).toBeInTheDocument();
    expect(screen.queryByTestId(/transferMoneyForm/i)).toBeNull();
  });

  test('should show transfer money form with all form elements if accounts and currencies are fetched', async () => {
    const initialState: AppState = {
      ...initialAppState,
      account: { ...initialAccountState, accounts: testAccounts, currencies: testCurrencies }
    }
    renderWithStore(<TransferMoney />, { initialState });
    expect(screen.getByTestId('transferMoneyForm')).toBeInTheDocument();
    expect(screen.getByTestId('transferMoneyFormCurrencySelector')).toBeInTheDocument();
    expect(screen.getByTestId('transferMoneyFormAmount')).toBeInTheDocument();
    expect(screen.getByTestId('transferMoneyFormFromSelector')).toBeInTheDocument();
    expect(screen.getByTestId('transferMoneyFormToSelector')).toBeInTheDocument();
    expect(screen.getByTestId('transferMoneyFormDescription')).toBeInTheDocument();
    expect(screen.getByTestId('transferMoneyFormSubmitButton')).toBeInTheDocument();

    // shown after submitting the form
    expect(screen.queryByTestId(/postTransferMoneyFormSubmit/i)).toBeNull();
  });

});