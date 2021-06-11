import { Router } from "@reach/router";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchAccounts, fetchCurrencies } from "../../redux/account/account.actions";
import { getUser } from "../../redux/actions";
import AccountsPage from "../account/AccountsPage";
import Header from "../header/Header";
import NotFoundPage from "../notfound/NotFound";
import TransferMoney from "../transfer/TransferMoney";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchAccounts());
    dispatch(fetchCurrencies());
    dispatch(getUser());
  }, [dispatch]);

  return (
    <>
      <Header />
      <Router>
        <TransferMoney path="transfer"></TransferMoney>
        <AccountsPage path="/"></AccountsPage>
        <AccountsPage path=":id"></AccountsPage>
        <NotFoundPage default />
      </Router>
    </>
  );
}

export default App;
