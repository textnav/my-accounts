import { Container } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { RouteComponentProps } from "@reach/router";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAccounts } from "../../redux/account/account.actions";
import { CurrencyType } from "../../redux/account/account.reducer";
import { getAccounts, getCurrencies } from "../../redux/account/account.selector";
import { AppState } from "../../redux/reducers";
import { postTransfer } from "../../services/accounts-http.service";
import { initialErrorsState, initialFormValues, initialHelperText, updateValuesAndValidity } from "./TransferMoney.config";
import TransferMoneyContent from "./TransferMoneyContent";

const useStyles = makeStyles((theme) => ({
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: "100vh",
    overflow: "auto",
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  }
}));

export default function TransferMoney(props: RouteComponentProps) {
  const classes = useStyles();
  const dispatch = useDispatch();

  // We'll update "values" as the form updates
  const [values, setValues] = useState(initialFormValues);

  // "errors" is used to check the form for errors
  const [errors, setErrors] = useState(initialErrorsState);

  // "errors" is used to check the form for errors
  const [helperText, setHelperText] = useState(initialHelperText);

  const accounts = useSelector((state: AppState) => getAccounts(state));
  const currencies = useSelector((state: AppState) => getCurrencies(state));

  const handleInputValue = (e: React.ChangeEvent<HTMLInputElement> | React.FocusEvent<HTMLInputElement>) => {
    // this function will be triggered by the text field's onBlur and onChange events
    const { name, value } = e.target;
    const res = updateValuesAndValidity({
      errors,
      helperText,
      values,
      accounts: accounts.data,
      currencies: currencies.data,
      fieldValues: { [name]: value }
    });
    setValues(res.values);
    setErrors(res.errors);
    setHelperText(res.helperText);
  };

  const handleFormSubmit = async (e: Event) => {
    // this function will be triggered by the submit event
    e.preventDefault();
    let success = false;
    if (!values.isFormPristine && values.isFormValid) {
      setValues({ ...values, formSubmitting: true });
      try {
        const res = await postTransfer({
          fromAccount: values.fromAccount,
          toAccount: values.toAccount,
          transferAmount: values.transferAmount,
          currency: values.currency as CurrencyType,
          description: values.description,
        });
        if (res) {
          success = true;
        }
      } finally {
        setValues({ ...initialFormValues, formSubmitting: false, formSubmitted: true, success });
        resetFormValidations();
      }
    }
  };

  const resetForm = () => {
    setValues({ ...initialFormValues });
    resetFormValidations();
  }
  const resetFormValidations = () => {
    setHelperText({ ...initialHelperText });
    setErrors({ ...initialErrorsState });
  }

  useEffect(() => {
    if (values.formSubmitted === true && values.success === true) {
      dispatch(fetchAccounts());
    }
  }, [dispatch, values.formSubmitted, values.success]);

  return (
    <main className={classes.content}>
      <div className={classes.appBarSpacer} />
      <Container data-testid="transferFormContainer" maxWidth="sm" className={classes.container}>
        <TransferMoneyContent
          accounts={accounts}
          currencies={currencies}
          values={values}
          handleInputValue={handleInputValue}
          handleFormSubmit={handleFormSubmit}
          helperText={helperText}
          errors={errors}
          resetForm={resetForm}
        />
      </Container>
    </main>
  );
}
