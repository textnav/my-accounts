import { Grid, makeStyles, Paper } from "@material-ui/core";
import clsx from "clsx";
import React from "react";
import { Transaction } from "../../redux/account/account.reducer";
import AccountBalanceChart from "./AccountBalanceChart";
import Balance from "./Balance";
import Transactions from "./Transactions";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },
  fixedHeight: {
    height: 240,
  },
}));

export default function AccountPage(props: { transactions: Transaction[], id: string }) {
  const classes = useStyles();
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  return (
    <Grid data-testid="accountsGrid" container spacing={3}>
      {/* Chart */}
      <Grid item xs={12} md={8} lg={9}>
        <Paper className={fixedHeightPaper}>
          <AccountBalanceChart data={props.transactions} />
        </Paper>
      </Grid>
      {/* Recent Deposits & Balance */}
      <Grid item xs={12} md={4} lg={3}>
        <Paper className={fixedHeightPaper}>
          <Balance transactions={props.transactions} id={props.id} />
        </Paper>
      </Grid>
      {/* Recent Orders */}
      <Grid item xs={12}>
        <Transactions transactions={props.transactions} />
      </Grid>
    </Grid>
  );
}
