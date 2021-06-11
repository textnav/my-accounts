# My Accounts App [`Check Demo`](https://textnav.github.io/my-accounts/)

It's a bank account app which can perform the following tasks.

- Display account balance for the selected account of an user
- Allow transfer of funds from one account to another in a currency of choice

## Main libraries used

- [Create React App](https://github.com/facebook/create-react-app) for bootstrapping
- [Redux](https://redux.js.org/) for state management
- [Reach router](https://reach.tech/router/) for ui routing
- [Material UI](https://material-ui.com/) for ui components and icons
- [Recharts](https://recharts.org/en-US/) for graphs
- [Axios](https://github.com/axios/axios) for api calls
- [Axios mock adapter](https://github.com/ctimmerm/axios-mock-adapter) for mocking api calls
- [React testing library](https://github.com/testing-library/react-testing-library) for unit testing
- [Prettier](https://prettier.io/) for code formatting
- [Husky](https://typicode.github.io/husky/#/) for git hooks

## Project Setup

In the project directory, to install dependencies you can run:

```bash
yarn install
```

## Run the project

```bash
yarn start
```

Runs the app in the development mode and will reload if you make edits.
Open [`http://localhost:3000`](http://localhost:3000) to view it in the browser.

## Run the project's unit tests

```bash
yarn test
```

### Generate test coverage

```bash
yarn test:coverage
```

Coverage will be generated in the `coverage` folder. To view it as an html open coverage/Icov-report/index.html in a browser

## Build the project

```bash
yarn build
```

Builds the app for production to the `build` folder. The build is minified and the filenames include the hashes.

---

## Assumptions

- Accounts only support `US$` as currency
- Money can be `transferred in any configured currency`, but it gets converted to the account supported currency(US$ for now) and then debited and credited in respective accounts.
