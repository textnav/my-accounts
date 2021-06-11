import React from 'react';
import { renderWithRouter } from "../../../utils/test-utils";
import { Transaction, TransactionAction } from '../../redux/account/account.reducer';
import AccountPage from './AccountPage';


const transactions: Transaction[] = [
  {
    "id": "1619677467934",
    "timestamp": 1619677467000,
    "action": TransactionAction.DEBIT,
    "description": "initial deposit",
    "amount": 0,
    "balance": 0,
    "currency": "US$"
  },
]

describe("AccountPage Component", () => {

  test('should not show account data', () => {
    // the default / route shows a account selection text
    const { getByTestId } = renderWithRouter(<AccountPage id="testId" transactions={transactions} />)
    expect(getByTestId('accountsGrid')).toBeInTheDocument();
  })
});