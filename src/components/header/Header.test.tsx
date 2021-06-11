import { renderWithStore } from "../../../utils/test-utils";
import { AppState } from '../../redux/reducers';
import { initialAppState } from '../../redux/store';
import { initialUserState } from '../../redux/user/user.reducer';
import Header from './Header';

describe("Header Component", () => {
  test('should have form container', async () => {
    const { getByText } = renderWithStore(<Header />);
    expect(getByText('Welcome')).toBeInTheDocument();
  });

  test('user name from redux should be shown in header', async () => {
    const name = "testUser";
    const initialState: AppState = {
      ...initialAppState,
      user: { ...initialUserState, profile: { ...initialUserState.profile, fetched: true, fetching: false, error: null, data: { ...initialUserState.profile.data, name } } }
    }
    const { getByText } = renderWithStore(<Header />, { initialState });

    expect(getByText(`Welcome ${name}`)).toBeInTheDocument();
  });

  test('should show transaction link', async () => {
    const { getByLabelText } = renderWithStore(<Header />);
    expect(getByLabelText('Account Transactions')).toBeInTheDocument();
  });

  test('should show transfer link', async () => {
    const { getByLabelText } = renderWithStore(<Header />);
    expect(getByLabelText('Transfer Money')).toBeInTheDocument();
  });
});