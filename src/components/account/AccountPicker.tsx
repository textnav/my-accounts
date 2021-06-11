import {
  Button,
  createStyles,
  makeStyles,
  Theme,
  Tooltip,
  Typography
} from "@material-ui/core";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { ArrowDropDown, ErrorOutline } from "@material-ui/icons";
import { Link } from "@reach/router";
import React from "react";
import { useSelector } from "react-redux";
import { getAccounts } from "../../redux/account/account.selector";
import { AppState } from "../../redux/reducers";
import Loader from "../loader/Loader";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    disabled: {
      opacity: 0.5,
    },
    active: {
      color: theme.palette.primary.main,
      fontWeight: "bold",
    },
  })
);

function AccountPicker(props: { id: string | undefined }) {
  const classes = useStyles();

  const account = props.id;
  const accounts = useSelector((state: AppState) => getAccounts(state));

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const isMenuOpen = Boolean(anchorEl);

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = (account: string) => {
    setAnchorEl(null);
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      {accounts.data.map(({ id, label }) => (
        <Link key={id} to={`/${id}`}>
          <MenuItem
            className={id === account ? classes.active : ""}
            onClick={() => handleMenuClose(id)}
          >
            {label}
          </MenuItem>
        </Link>
      ))}
    </Menu>
  );

  return (
    <Typography component="h1" variant="h5" color="primary" gutterBottom>
      Transactions for account
      {accounts.fetched && accounts.error && (
        <Tooltip title="Error while fetching accounts">
          <ErrorOutline />
        </Tooltip>
      )}
      <Button
        aria-label="account of current user"
        aria-controls={menuId}
        aria-haspopup="true"
        onClick={handleProfileMenuOpen}
        color="inherit"
        className={accounts.data.length < 1 ? classes.disabled : ""}
      >
        {accounts.fetching ? <Loader height="0.3rem" /> : account || "............"}
        {accounts.fetched && accounts.data?.length > 0 && <ArrowDropDown />}
      </Button>
      {accounts.fetched && accounts.data?.length > 0 && renderMenu}
    </Typography>
  );
}

export default AccountPicker;
