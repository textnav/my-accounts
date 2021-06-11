import React from 'react';
import { renderWithRouter } from "../../../utils/test-utils";
import NotFoundPage from './NotFound';

describe("Not found Component", () => {
  test("should show 404 text", () => {
    const { getByText } = renderWithRouter(<NotFoundPage />);
    expect(getByText("404")).toBeInTheDocument();
  });
})