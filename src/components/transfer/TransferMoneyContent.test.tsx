import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import { Account, Currency } from '../../redux/account/account.reducer';
import { ApiData } from '../../redux/reducers';
import { initialErrorsState, initialFormValues, initialHelperText } from './TransferMoney.config';
import TransferMoneyContent, { TransferMoneyContentProps } from './TransferMoneyContent';

const errorClass = 'Mui-error';
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

const defaultProps: TransferMoneyContentProps = {
  accounts: testAccounts,
  currencies: testCurrencies,
  values: initialFormValues,
  handleInputValue: () => true,
  handleFormSubmit: (e: Event) => new Promise((res, rej) => res()),
  helperText: initialHelperText,
  errors: initialErrorsState,
  resetForm: () => true
}

describe("TransferMoneyContent Component", () => {
  test('should show loader if accounts are not fetched', async () => {
    const accounts = { ...defaultProps.accounts, fetched: false }
    act(() => {
      render(<TransferMoneyContent
        accounts={accounts}
        currencies={defaultProps.currencies}
        values={defaultProps.values}
        handleInputValue={defaultProps.handleInputValue}
        handleFormSubmit={defaultProps.handleFormSubmit}
        helperText={defaultProps.helperText}
        errors={defaultProps.errors}
        resetForm={defaultProps.resetForm}
      />);
    });
    expect(screen.getByTestId('loader')).toBeInTheDocument();
  });

  test('should show loader if currencies are not fetched', async () => {
    const currencies = { ...defaultProps.currencies, fetched: false }
    act(() => {
      render(<TransferMoneyContent
        accounts={defaultProps.accounts}
        currencies={currencies}
        values={defaultProps.values}
        handleInputValue={defaultProps.handleInputValue}
        handleFormSubmit={defaultProps.handleFormSubmit}
        helperText={defaultProps.helperText}
        errors={defaultProps.errors}
        resetForm={defaultProps.resetForm}
      />);
    });
    expect(screen.getByTestId('loader')).toBeInTheDocument();
  });

  test('should show loading if form is being submitted', async () => {
    const values = { ...defaultProps.values, formSubmitting: true }
    act(() => {
      render(<TransferMoneyContent
        accounts={defaultProps.accounts}
        currencies={defaultProps.currencies}
        values={values}
        handleInputValue={defaultProps.handleInputValue}
        handleFormSubmit={defaultProps.handleFormSubmit}
        helperText={defaultProps.helperText}
        errors={defaultProps.errors}
        resetForm={defaultProps.resetForm}
      />);
    });
    expect(screen.getByTestId('loader')).toBeInTheDocument();
  });

  test('should show transfer again if form is submitted', async () => {
    const values = { ...defaultProps.values, formSubmitted: true }
    act(() => {
      render(<TransferMoneyContent
        accounts={defaultProps.accounts}
        currencies={defaultProps.currencies}
        values={values}
        handleInputValue={defaultProps.handleInputValue}
        handleFormSubmit={defaultProps.handleFormSubmit}
        helperText={defaultProps.helperText}
        errors={defaultProps.errors}
        resetForm={defaultProps.resetForm}
      />);
    });
    expect(screen.getByTestId('postTransferMoneyFormSubmit')).toBeInTheDocument();

    expect(screen.getByTestId('transferMoneyAgain')).toBeInTheDocument();
  });

  test('should show success if transfer is successful', async () => {
    const values = { ...defaultProps.values, formSubmitted: true, success: true }
    act(() => {
      render(<TransferMoneyContent
        accounts={defaultProps.accounts}
        currencies={defaultProps.currencies}
        values={values}
        handleInputValue={defaultProps.handleInputValue}
        handleFormSubmit={defaultProps.handleFormSubmit}
        helperText={defaultProps.helperText}
        errors={defaultProps.errors}
        resetForm={defaultProps.resetForm}
      />);
    });
    expect(screen.getByText('Money Transfer Successful')).toBeInTheDocument();
  });

  test('should show error if transfer is not successful', async () => {
    const values = { ...defaultProps.values, formSubmitted: true, success: false }
    act(() => {
      render(<TransferMoneyContent
        accounts={defaultProps.accounts}
        currencies={defaultProps.currencies}
        values={values}
        handleInputValue={defaultProps.handleInputValue}
        handleFormSubmit={defaultProps.handleFormSubmit}
        helperText={defaultProps.helperText}
        errors={defaultProps.errors}
        resetForm={defaultProps.resetForm}
      />);
    });
    expect(screen.getByText('Money Transfer Failed')).toBeInTheDocument();
  });

  test('should only show transfer money form is form is not being submitted or form is not submitted', async () => {
    const values = { ...defaultProps.values, formSubmitted: false, formSubmitting: false };

    act(() => {
      render(<TransferMoneyContent
        accounts={defaultProps.accounts}
        currencies={defaultProps.currencies}
        values={values}
        handleInputValue={defaultProps.handleInputValue}
        handleFormSubmit={defaultProps.handleFormSubmit}
        helperText={defaultProps.helperText}
        errors={defaultProps.errors}
        resetForm={defaultProps.resetForm}
      />);
    });
    expect(screen.getByTestId('transferMoneyForm')).toBeInTheDocument();
  });

  test('should show error if from account is not valid', async () => {
    const errors = { ...defaultProps.errors, fromAccount: true };

    act(() => {
      render(<TransferMoneyContent
        accounts={defaultProps.accounts}
        currencies={defaultProps.currencies}
        values={defaultProps.values}
        handleInputValue={defaultProps.handleInputValue}
        handleFormSubmit={defaultProps.handleFormSubmit}
        helperText={defaultProps.helperText}
        errors={errors}
        resetForm={defaultProps.resetForm}
      />);
    });
    const node = await screen.findByTestId("transferMoneyFormFromSelector");
    const label = node?.querySelector('label');
    expect(node).toBeInTheDocument();
    expect(label).toBeInTheDocument();
    expect(label?.classList).toContain(errorClass);
  });

  test('should show error if to account is not valid', async () => {
    const errors = { ...defaultProps.errors, toAccount: true };

    act(() => {
      render(<TransferMoneyContent
        accounts={defaultProps.accounts}
        currencies={defaultProps.currencies}
        values={defaultProps.values}
        handleInputValue={defaultProps.handleInputValue}
        handleFormSubmit={defaultProps.handleFormSubmit}
        helperText={defaultProps.helperText}
        errors={errors}
        resetForm={defaultProps.resetForm}
      />);
    });
    const node = await screen.findByTestId("transferMoneyFormToSelector");
    const label = node?.querySelector('label');
    expect(node).toBeInTheDocument();
    expect(label).toBeInTheDocument();
    expect(label?.classList).toContain(errorClass);
  });

  test('should show error if currency selector is not valid', async () => {
    const errors = { ...defaultProps.errors, currency: true };

    act(() => {
      render(<TransferMoneyContent
        accounts={defaultProps.accounts}
        currencies={defaultProps.currencies}
        values={defaultProps.values}
        handleInputValue={defaultProps.handleInputValue}
        handleFormSubmit={defaultProps.handleFormSubmit}
        helperText={defaultProps.helperText}
        errors={errors}
        resetForm={defaultProps.resetForm}
      />);
    });
    const node = await screen.findByTestId("transferMoneyFormCurrencySelector");
    const label = node?.querySelector('label');
    expect(node).toBeInTheDocument();
    expect(label).toBeInTheDocument();
    expect(label?.classList).toContain(errorClass);
  });

  test('should show error if transfer amount is not valid', async () => {
    const errors = { ...defaultProps.errors, transferAmount: true };

    act(() => {
      render(<TransferMoneyContent
        accounts={defaultProps.accounts}
        currencies={defaultProps.currencies}
        values={defaultProps.values}
        handleInputValue={defaultProps.handleInputValue}
        handleFormSubmit={defaultProps.handleFormSubmit}
        helperText={defaultProps.helperText}
        errors={errors}
        resetForm={defaultProps.resetForm}
      />);
    });
    const node = await screen.findByTestId("transferMoneyFormAmount");
    const label = node?.querySelector('label');
    expect(node).toBeInTheDocument();
    expect(label).toBeInTheDocument();
    expect(label?.classList).toContain(errorClass);
  });

  test('should show error if description is not valid', async () => {
    const errors = { ...defaultProps.errors, description: true };

    act(() => {
      render(<TransferMoneyContent
        accounts={defaultProps.accounts}
        currencies={defaultProps.currencies}
        values={defaultProps.values}
        handleInputValue={defaultProps.handleInputValue}
        handleFormSubmit={defaultProps.handleFormSubmit}
        helperText={defaultProps.helperText}
        errors={errors}
        resetForm={defaultProps.resetForm}
      />);
    });
    const node = await screen.findByTestId("transferMoneyFormDescription");
    const label = node?.querySelector('label');
    expect(node).toBeInTheDocument();
    expect(label).toBeInTheDocument();
    expect(label?.classList).toContain(errorClass);
  });

  test('submit should be disabled if form is pristine', async () => {
    const errors = { ...defaultProps.errors };
    const values = { ...defaultProps.values, isFormPristine: true };

    act(() => {
      render(<TransferMoneyContent
        accounts={defaultProps.accounts}
        currencies={defaultProps.currencies}
        values={values}
        handleInputValue={defaultProps.handleInputValue}
        handleFormSubmit={defaultProps.handleFormSubmit}
        helperText={defaultProps.helperText}
        errors={errors}
        resetForm={defaultProps.resetForm}
      />);
    });
    const node = await screen.findByTestId("transferMoneyFormSubmitButton");
    expect(node).toBeInTheDocument();
    expect(node?.hasAttribute('disabled')).toBe(true);
  });

  test('submit should be disabled if form has errors', async () => {
    const values = { ...defaultProps.values, isFormValid: false };

    act(() => {
      render(<TransferMoneyContent
        accounts={defaultProps.accounts}
        currencies={defaultProps.currencies}
        values={values}
        handleInputValue={defaultProps.handleInputValue}
        handleFormSubmit={defaultProps.handleFormSubmit}
        helperText={defaultProps.helperText}
        errors={defaultProps.errors}
        resetForm={defaultProps.resetForm}
      />);
    });
    const node = await screen.findByTestId("transferMoneyFormSubmitButton");
    expect(node).toBeInTheDocument();
    expect(node?.hasAttribute('disabled')).toBe(true);
  });

  test('submit should be disabled if form is submitting', async () => {
    const values = { ...defaultProps.values, isFormSubmitting: true };

    act(() => {
      render(<TransferMoneyContent
        accounts={defaultProps.accounts}
        currencies={defaultProps.currencies}
        values={values}
        handleInputValue={defaultProps.handleInputValue}
        handleFormSubmit={defaultProps.handleFormSubmit}
        helperText={defaultProps.helperText}
        errors={defaultProps.errors}
        resetForm={defaultProps.resetForm}
      />);
    });
    const node = await screen.findByTestId("transferMoneyFormSubmitButton");
    expect(node).toBeInTheDocument();
    expect(node?.hasAttribute('disabled')).toBe(true);
  });

  test('submit should not be disabled if form is valid, not submitting and not pristine', async () => {
    const values = { ...defaultProps.values, isFormSubmitting: false, isFormPristine: false, isFormValid: true };

    act(() => {
      render(<TransferMoneyContent
        accounts={defaultProps.accounts}
        currencies={defaultProps.currencies}
        values={values}
        handleInputValue={defaultProps.handleInputValue}
        handleFormSubmit={defaultProps.handleFormSubmit}
        helperText={defaultProps.helperText}
        errors={defaultProps.errors}
        resetForm={defaultProps.resetForm}
      />);
    });
    const node = await screen.findByTestId("transferMoneyFormSubmitButton");
    expect(node).toBeInTheDocument();
    expect(node?.hasAttribute('disabled')).toBe(false);
  });

  test('should call submit props on form submit', async () => {
    const values = {
      ...defaultProps.values,
      fromAccount: "001",
      toAccount: "002",
      transferAmount: 10,
      currency: "US$",
      description: "",
      formSubmitted: false,
      formSubmitting: false,
      isFormPristine: false,
      isFormValid: true,
      success: false,
    };

    const handleFormSubmit = jest.fn(e => e.preventDefault());

    act(() => {
      render(<TransferMoneyContent
        accounts={defaultProps.accounts}
        currencies={defaultProps.currencies}
        values={values}
        handleInputValue={defaultProps.handleInputValue}
        handleFormSubmit={handleFormSubmit}
        helperText={defaultProps.helperText}
        errors={defaultProps.errors}
        resetForm={defaultProps.resetForm}
      />);
    });
    const node = await screen.findByTestId("transferMoneyFormSubmitButton");
    expect(node).toBeInTheDocument();
    userEvent.click(node);
    expect(handleFormSubmit).toHaveBeenCalledTimes(1);
  });
});