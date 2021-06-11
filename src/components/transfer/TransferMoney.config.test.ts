import { Account } from "./../../redux/account/account.reducer";
import {
  initialErrorsState,
  initialFormValues,
  initialHelperText,
  TransferMoneyFormValidityPayload,
  updateValuesAndValidity,
} from "./TransferMoney.config";

const accounts: Account[] = [
  {
    id: "testId",
    label: "test label",
    currency: "US$",
    balance: 100,
  },
];

const testPayload: TransferMoneyFormValidityPayload = {
  errors: initialErrorsState,
  helperText: initialHelperText,
  values: initialFormValues,
  accounts,
  currencies: {
    US$: 1,
    HK$: 8,
  },
  fieldValues: {
    fromAccount: "123456",
  },
};

describe("transfer money form validation", () => {
  it("if any value is changed then the form should not be pristine", () => {
    const res = updateValuesAndValidity({
      ...testPayload,
      errors: { ...initialErrorsState },
      fieldValues: { description: "test" },
    });
    expect(res.values.isFormPristine).toBe(false);
  });

  it("from account should show error & reset if to account is same", () => {
    const res = updateValuesAndValidity(testPayload);

    const res1 = updateValuesAndValidity({
      ...testPayload,
      ...res,
      fieldValues: { toAccount: "123456" },
    });
    expect(res1.errors.fromAccount).toBe(true);
    expect(res1.values.fromAccount).toBe("");
  });

  it("to account show show error & rest if from account is same", () => {
    const res = updateValuesAndValidity({
      ...testPayload,
      fieldValues: { toAccount: "123456" },
    });

    const res1 = updateValuesAndValidity({
      ...testPayload,
      ...res,
      fieldValues: { fromAccount: "123456" },
    });
    expect(res1.errors.toAccount).toBe(true);
    expect(res1.values.toAccount).toBe("");
  });

  it("transfer amount should not exceed from account balance in same currency", () => {
    const res = updateValuesAndValidity({
      ...testPayload,
      accounts: [{ ...accounts[0], balance: 99 }],
      values: {
        ...initialFormValues,
        currency: "US$",
        fromAccount: accounts[0].id,
      },
      fieldValues: { transferAmount: 100 },
    });

    expect(res.errors.transferAmount).toBe(true);
    expect(res.values.isFormValid).toBe(false);
  });

  it("transfer amount should not exceed from account balance in a different currency", () => {
    const res = updateValuesAndValidity({
      ...testPayload,
      accounts: [{ ...accounts[0], balance: 100 }],
      values: {
        ...initialFormValues,
        currency: "HK$",
        fromAccount: accounts[0].id,
      },
      fieldValues: { transferAmount: 801 },
    });

    expect(res.errors.transferAmount).toBe(true);
    expect(res.values.isFormValid).toBe(false);
  });
});
