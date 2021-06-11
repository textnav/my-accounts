import { Button } from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { AccountBalance, AttachMoney } from "@material-ui/icons";
import { Link } from "@reach/router";
import React from "react";
import { useSelector } from "react-redux";
import { AppState } from "../../redux/reducers";
import { getUser } from "../../redux/selectors";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    flexCenter: {
      display: "flex",
      alignItems: "center",
    },
    grow: {
      flexGrow: 1,
    },
    justifyBetween: {
      justifyContent: "space-between",
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      display: "none",
      textAlign: "left",
      flexGrow: 1,
      [theme.breakpoints.up("sm")]: {
        display: "block",
      },
    },
    link: {
      color: "unset",
    },
  })
);

export default function Header() {
  const classes = useStyles();
  const profile = useSelector((state: AppState) => getUser(state));

  return (
    <div className={classes.grow}>
      <AppBar position="fixed">
        <Toolbar className={classes.justifyBetween}>
          <Typography className={classes.title} variant="h6" noWrap>
            Welcome {profile.fetched ? ` ${profile.data.name}` : ''}
          </Typography>
          <div className={classes.flexCenter}>
            <Link to="/" className={classes.link}>
              <Button color="inherit" aria-label="Account Transactions">
                <AccountBalance />
                &nbsp;Transactions
              </Button>
            </Link>
            <Link to="/transfer" className={classes.link}>
              <Button color="inherit" aria-label="Transfer Money">
                <AttachMoney />
                Transfer
              </Button>
            </Link>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}
