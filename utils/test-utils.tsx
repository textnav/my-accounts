import { createHistory, createMemorySource, LocationProvider } from '@reach/router'
import { render, RenderResult } from '@testing-library/react'
import React, { FC, ReactElement } from 'react'
import { Provider } from 'react-redux'
import { Action, AnyAction, applyMiddleware, createStore, Store } from 'redux'
import thunk from 'redux-thunk'
import reducer from "../src/redux/reducers"
import { initialAppState } from '../src/redux/store'

const middleware = [thunk];

interface RenderWithRedux<
  S = any,
  A extends Action = AnyAction,
  I extends S = any
  > {
  (
    ui: ReactElement,
    reduxOptions?: {
      store?: Store<S, A>
      initialState?: I
    }
  ): RenderResult
}

const renderWithStore: RenderWithRedux = (
  ui,
  {
    initialState = initialAppState,
    store = createStore(reducer, initialState, applyMiddleware(...middleware)),
    ...renderOptions
  } = {}
) => {
  const Wrapper: FC = ({ children }) => <Provider store={store}>{children}</Provider>

  return render(ui, { wrapper: Wrapper, ...renderOptions });
}

const renderWithRouter = (
  ui: ReactElement,
  { route = '/', history = createHistory(createMemorySource(route)) } = {}
) => ({
  ...renderWithStore(<LocationProvider history={history}>{ui}</LocationProvider>),
  history,
});

export { renderWithStore, renderWithRouter }
