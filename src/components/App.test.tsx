import React from "react";
import { render } from "@testing-library/react";
import App from "./App";

test("renders app", () => {
  const { getByText } = render(<App />);
  const linkElement = getByText(/Welcome to/);
  expect(linkElement).toBeInTheDocument();
});
