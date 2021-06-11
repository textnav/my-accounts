import {
  createStyles,
  Divider,
  makeStyles,
  Theme,
  Typography
} from "@material-ui/core";
import { ErrorOutline } from "@material-ui/icons";
import React from "react";
import { useSelector } from "react-redux";
import { Transaction } from "../../redux/account/account.reducer";
import { getAccounts } from "../../redux/account/account.selector";
import { AppState } from "../../redux/reducers";
import Loader from "../loader/Loader";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    depositContext: {
      flex: 1,
    },
  })
);

export default function Balance(props: { transactions: Transaction[], id: string }) {
  const classes = useStyles();
  const accounts = useSelector((state: AppState) => getAccounts(state));

  const lastTransaction: Transaction = props.transactions[props.transactions.length - 1]

  if (accounts.fetching) {
    return <Loader height="0.3rem" />
  }
  if (accounts.error || props.id === null) {
    return <>
      <ErrorOutline />
      <Typography
        component="h1"
        variant="h5"
        color="secondary"
        gutterBottom
      >Error while fetching accounts</Typography>
    </>
  }

  const account = accounts.data?.find(item => item.id === props.id);

  if (account === null || account === undefined) {
    return <>
      <ErrorOutline />
      <Typography
        component="h1"
        variant="h5"
        color="secondary"
        gutterBottom
      >Error with account data</Typography>
    </>
  }

  return (
    <>
      <Typography component="p" variant="h4">
        {account.currency + account.balance}
      </Typography>
      <Typography component="h1" variant="h5" color="primary" gutterBottom>
        Balance
          </Typography>
      <span className={classes.depositContext} />
      <Divider />
      <span className={classes.depositContext} />
      <Typography component="p" variant="h4">
        {lastTransaction.currency + lastTransaction.amount}
      </Typography>
      <Typography color="textSecondary">
        {new Date(lastTransaction.timestamp).toLocaleString()}
      </Typography>
      <Typography component="h2" variant="h6" color="primary" gutterBottom>
        Recent {lastTransaction.action}
      </Typography>
    </>
  );
}
