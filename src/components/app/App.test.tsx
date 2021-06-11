import { screen } from '@testing-library/react';
import MockAdapter from 'axios-mock-adapter';
import React from 'react';
import { renderWithRouter } from "../../../utils/test-utils";
import { http } from '../../services/http';
import App from './App';

const mock = new MockAdapter(http);

describe("App Component", () => {

  test('should not show account data', () => {
    // the default / route shows a account selection text
    renderWithRouter(<App />)
    expect(screen.getByText('Please select an account')).toBeInTheDocument();
  })

  test('should show account dropdown', () => {
    // the default / route shows a account selection dropdown
    renderWithRouter(<App />)
    expect(screen.getByText('Transactions for account')).toBeInTheDocument();
  })

  test('should show account page with account selected', async () => {
    // the route /accountId should show the selected account
    mock
      .onGet("/account/testAccountId")
      .reply(200, {});
    const {
      queryByText, getByText, history: { navigate },
    } = renderWithRouter(<App />)
    await navigate('/testAccountId')
    expect(queryByText('Please select an account')).toBeNull();
    expect(getByText('testAccountId')).toBeInTheDocument();
  })

  test('should show transfer page', async () => {
    // should render transfer page on navigating to /transfer
    const {
      history: { navigate },
    } = renderWithRouter(<App />)
    await navigate('/transfer')
    expect(screen.getByTestId('transferFormContainer')).toBeInTheDocument();
  })
});