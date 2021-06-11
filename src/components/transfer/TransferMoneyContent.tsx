import { Button, IconButton, Typography } from "@material-ui/core";
import MenuItem from "@material-ui/core/MenuItem";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { ArrowForward, SendOutlined } from "@material-ui/icons";
import { Account, Currency } from "../../redux/account/account.reducer";
import { ApiData } from "../../redux/reducers";
import Loader from "../loader/Loader";
import { initialErrorsState, initialFormValues, initialHelperText } from "./TransferMoney.config";

const useStyles = makeStyles((theme) => ({
  row: {
    display: "grid",
    gridGap: "1rem",
    alignItems: "start",
    gridTemplateColumns: "1fr auto 1fr",
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(4),
  },
  title: {
    textAlign: "center",
    paddingBottom: theme.spacing(4),
  },
  centerContainer: {
    width: "100%",
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(4),
    textAlign: "center",
  },
}));

export interface TransferMoneyContentProps {
  accounts: ApiData<Account[]>,
  currencies: ApiData<Currency>,
  values: typeof initialFormValues;
  handleInputValue: (e: any) => void;
  handleFormSubmit: (e: any) => Promise<void>;
  helperText: typeof initialHelperText;
  errors: typeof initialErrorsState;
  resetForm: () => void;
}

export default function TransferMoneyContent(props: TransferMoneyContentProps) {
  const classes = useStyles();

  if (props.accounts?.fetched && props.currencies.fetched) {
    if (props.values.formSubmitted) {
      return <>
        <Typography
          className={classes.title}
          component="h1"
          variant="h3"
          color="primary"
          gutterBottom
          data-testid="postTransferMoneyFormSubmit"
        >
          Money Transfer {props.values.success === true ? 'Successful' : 'Failed'}
        </Typography>
        <div className={classes.centerContainer}>
          <Button
            variant="contained"
            color="primary"
            onClick={props.resetForm} data-testid="transferMoneyAgain"
          >Transfer Again</Button>
        </div>
      </>
    }
    if (props.values.formSubmitting !== true) {
      return (<>
        <Typography
          className={classes.title}
          component="h1"
          variant="h3"
          color="primary"
          gutterBottom
        >
          Transfer Money
      </Typography>
        <form data-testid="transferMoneyForm" autoComplete="off" onSubmit={props.handleFormSubmit}>
          <div className={classes.row}>
            <TextField
              name="currency"
              required={true}
              select
              fullWidth={true}
              label="Transfer Currency"
              value={props.values.currency}
              onBlur={props.handleInputValue}
              onChange={props.handleInputValue}
              variant="outlined"
              helperText={props.helperText.currency}
              error={props.errors.currency}
              data-testid="transferMoneyFormCurrencySelector"
            >
              {Object.entries(props.currencies.data).map(([key, value]) => (
                <MenuItem key={key} value={key}>
                  {key}
                </MenuItem>
              ))}
            </TextField>&nbsp;
          <TextField
              name="transferAmount"
              fullWidth={true}
              required={true}
              label="Amount"
              type="number"
              variant="outlined"
              value={props.values.transferAmount}
              onBlur={props.handleInputValue}
              onChange={props.handleInputValue}
              helperText={props.helperText["transferAmount"]}
              error={props.errors["transferAmount"]}
              data-testid="transferMoneyFormAmount"
            />
          </div>
          <div className={classes.row}>
            <TextField
              name="fromAccount"
              fullWidth={true}
              required={true}
              select
              label="Transfer From"
              value={props.values.fromAccount}
              onBlur={props.handleInputValue}
              onChange={props.handleInputValue}
              variant="outlined"
              helperText={props.helperText.fromAccount}
              error={props.errors.fromAccount}
              data-testid="transferMoneyFormFromSelector"
            >
              {props.accounts.data.map((option) => (
                <MenuItem key={option.id} value={option.id}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
            <IconButton aria-label="Send Money" color="primary">
              <ArrowForward />
            </IconButton>
            <TextField
              name="toAccount"
              required={true}
              fullWidth={true}
              select
              label="Transfer To"
              value={props.values.toAccount}
              onBlur={props.handleInputValue}
              onChange={props.handleInputValue}
              variant="outlined"
              helperText={props.helperText.toAccount}
              error={props.errors.toAccount}
              data-testid="transferMoneyFormToSelector"
            >
              {props.accounts.data.map((option) => (
                <MenuItem key={option.id} value={option.id}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </div>
          <div className={classes.centerContainer}>
            <TextField
              name="description"
              fullWidth={true}
              label="Description"
              type="text"
              variant="outlined"
              value={props.values.description}
              onBlur={props.handleInputValue}
              onChange={props.handleInputValue}
              helperText={props.helperText["description"]}
              error={props.errors["description"]}
              data-testid="transferMoneyFormDescription"
            />
          </div>
          <div className={classes.centerContainer}>
            <Button
              disabled={props.values.isFormPristine || !props.values.isFormValid || props.values.formSubmitting}
              variant="contained"
              color="primary"
              type="submit"
              data-testid="transferMoneyFormSubmitButton"
            >
              <SendOutlined /> &nbsp;&nbsp;Transfer
          </Button>
          </div>
        </form>
      </>)
    }
  }
  return <Loader height="1rem" />
}