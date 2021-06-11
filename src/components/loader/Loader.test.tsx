import React from 'react';
import { renderWithRouter } from "../../../utils/test-utils";
import Loader from './Loader';

describe("Loader Component", () => {
  test("should show loading icon", () => {
    const { getByTestId } = renderWithRouter(<Loader height="1rem" />);
    expect(getByTestId("loader")).toBeInTheDocument();
  });
})