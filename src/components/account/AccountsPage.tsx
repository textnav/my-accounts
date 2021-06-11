import { Container, makeStyles, Paper, Typography } from "@material-ui/core";
import { RouteComponentProps } from "@reach/router";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTransactions } from "../../redux/account/account.actions";
import { getTransactions } from "../../redux/account/account.selector";
import { AppState } from "../../redux/reducers";
import Loader from "../loader/Loader";
import AccountPage from "./AccountPage";
import AccountPicker from "./AccountPicker";

interface AccountPageProps extends RouteComponentProps {
  id?: string;
}

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
  },
  fixedHeight: {
    height: 240,
  },
  info: {
    textAlign: "center",
    padding: theme.spacing(5),
  },
}));

export default function AccountsPage(props: AccountPageProps) {
  const classes = useStyles();
  const dispatch = useDispatch();

  useEffect(() => {
    if (props.id) {
      dispatch(fetchTransactions(props.id));
    }
  }, [dispatch, props.id]);

  const transactions = useSelector((state: AppState) => getTransactions(state));

  return (
    <main className={classes.content}>
      <div className={classes.appBarSpacer} />
      <Container maxWidth="lg" className={classes.container}>
        <AccountPicker id={props.id} />
        {transactions.fetched && transactions.data?.length > 0 && props.id && (
          <AccountPage transactions={transactions.data} id={props.id} />
        )}
        {props.id && transactions.fetched && transactions.data?.length < 1 && (
          <Paper className={classes.info}>
            <Typography
              component="h1"
              variant="h5"
              color="primary"
              gutterBottom
            >
              No transactions found
            </Typography>
          </Paper>
        )}
        {!props.id && (
          <Paper className={classes.info}>
            <Typography
              component="h1"
              variant="h5"
              color="primary"
              gutterBottom
            >
              Please select an account
            </Typography>
          </Paper>
        )}
        {transactions.fetching && (
          <Paper className={classes.info}>
            <Typography
              component="h1"
              variant="h5"
              color="primary"
              gutterBottom
            >
              <Loader height="1rem" />
            </Typography>
          </Paper>
        )}
      </Container>
    </main>
  );
}
