import { Account, CurrencyType } from "../../redux/account/account.reducer";
import { Currency } from "./../../redux/account/account.reducer";

export const initialFormValues = {
  fromAccount: "",
  toAccount: "",
  transferAmount: 0,
  currency: "",
  description: "",
  formSubmitted: false,
  formSubmitting: false,
  isFormPristine: true,
  isFormValid: true,
  success: false,
};

export const initialHelperText = {
  fromAccount: "Select account to send money",
  toAccount: "Select account to receive money",
  transferAmount: "Enter amount to send",
  currency: "Select a currency to transfer",
  description: "Enter description for transfer",
};

export const initialErrorsState = {
  fromAccount: false,
  toAccount: false,
  transferAmount: false,
  currency: false,
  description: false,
};

export interface TransferMoneyFormValidityPayload {
  errors: typeof initialErrorsState;
  helperText: typeof initialHelperText;
  values: typeof initialFormValues;
  accounts: Account[];
  currencies: Currency;
  fieldValues: Partial<typeof initialFormValues>;
}

const isFormValid = (
  values: typeof initialFormValues,
  errors: typeof initialErrorsState
): boolean => {
  // this function will check if the form is valid and return a boolean value
  const isValid =
    values.transferAmount > 0 &&
    values.toAccount &&
    values.fromAccount &&
    values.currency &&
    Object.values(errors).every((x) => x === false);
  return !!isValid;
};

export const updateValuesAndValidity = (
  payload: TransferMoneyFormValidityPayload
): {
  errors: typeof initialErrorsState;
  helperText: typeof initialHelperText;
  values: typeof initialFormValues;
} => {
  const { errors, helperText, values, accounts, currencies, fieldValues } =
    payload;
  const accountsBalance: Map<string, { balance: number; currency: string }> =
    new Map();

  if (Array.isArray(accounts)) {
    accounts.forEach((item) => {
      accountsBalance.set(item.id, {
        balance: item.balance,
        currency: item.currency,
      });
    });
  }

  let multiplier = 1;
  if (currencies && currencies.hasOwnProperty(values.currency)) {
    multiplier = currencies[values.currency] ?? 1;
  }

  // this function will check if the form values are valid
  let newErrors = { ...errors };
  let newHelperText = { ...helperText };
  let newValues = { ...values };
  const defaultBalance = { balance: 0, currency: "" };

  if (fieldValues.hasOwnProperty("fromAccount")) {
    const newValue = fieldValues.fromAccount ?? "";
    const { balance, currency } =
      accountsBalance.get(newValue) || defaultBalance;
    if (newValue) {
      if (newValue === values.toAccount) {
        // if from and to account are same then reset one of them and show error
        newValues.toAccount = "";
        newHelperText.toAccount = "From and To account cannot be the same";
        newErrors.toAccount = true;
      }
      newErrors.fromAccount = false;
      // show balance of account in helper text
      newHelperText.fromAccount = `Available amount: ${currency}${balance}`;
    } else if (!newValue) {
      newErrors.fromAccount = true;
      newHelperText.fromAccount = "From Account is required";
    }

    if (currency && values.transferAmount > balance * multiplier) {
      // if amount to send is more than balance then show error
      newHelperText.transferAmount = `Amount cannot exceed balance: ${
        values.currency
      }${balance * multiplier}`;
      newErrors.transferAmount = true;
    } else {
      newHelperText.transferAmount = `Max amount: ${values.currency}${
        balance * multiplier
      }`;
      newErrors.transferAmount = false;
    }
    newValues.fromAccount = newValue;
  }
  if (fieldValues.hasOwnProperty("toAccount")) {
    const newValue = fieldValues.toAccount ?? "";
    if (newValue) {
      if (newValue === values.fromAccount) {
        // if from and to account are same then reset one of them and show error
        newValues.fromAccount = "";
        newHelperText.fromAccount = "From and To account cannot be the same";
        newErrors.fromAccount = true;
      }
      newErrors.toAccount = false;
      // show balance of account in helper text
      const { balance, currency } =
        accountsBalance.get(newValue) || defaultBalance;
      newHelperText.toAccount = `Available amount: ${currency}${balance}`;
    } else if (!newValue) {
      newErrors.toAccount = true;
      newHelperText.toAccount = "To Account is required";
    }
    newValues.toAccount = newValue;
  }
  if (fieldValues.hasOwnProperty("transferAmount")) {
    const newValue = Number(fieldValues.transferAmount);
    newValues.transferAmount = newValue;

    const { balance, currency } =
      accountsBalance.get(values.fromAccount) || defaultBalance;
    if (currency && newValue > balance * multiplier) {
      newHelperText.transferAmount = `Amount cannot exceed balance: ${
        values.currency
      }${balance * multiplier}`;
      newErrors.transferAmount = true;
    } else {
      newHelperText.transferAmount = `Max amount: ${values.currency}${
        balance * multiplier
      }`;
      newErrors.transferAmount = false;
    }
  }

  if (fieldValues.hasOwnProperty("currency")) {
    const newValue = fieldValues.currency as CurrencyType;
    if (currencies && currencies.hasOwnProperty(newValue)) {
      multiplier = currencies[newValue] ?? 1;
    }
    const { balance } =
      accountsBalance.get(values.fromAccount) || defaultBalance;

    if (!newValue) {
      // TODO: fix to check for type
      newHelperText.currency = `Valid currency is required to make transfer`;
      newErrors.currency = true;
    } else {
      newHelperText.currency = "Select a currency to transfer";
      newErrors.transferAmount = false;
      newErrors.currency = false;
    }
    newHelperText.transferAmount = `Max amount: ${newValue}${
      balance * multiplier
    }`;
    newValues.currency = newValue;
  }
  if (fieldValues.hasOwnProperty("description")) {
    const newValue = fieldValues.description ?? "";
    newValues.description = newValue;
  }
  newValues.isFormValid = isFormValid(newValues, newErrors);
  newValues.isFormPristine = false;
  return { errors: newErrors, helperText: newHelperText, values: newValues };
};
