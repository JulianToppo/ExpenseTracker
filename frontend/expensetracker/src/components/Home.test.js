import { BrowserRouter } from "react-router-dom";
import Home from "./Home";
import store from "../utils/store/centralStore";
import { Provider } from "react-redux";
import { render } from "@testing-library/react";

describe("home page tests", () => {
  test("welcome text ", async () => {
    const { getByText } = render(
      <Provider store={store}>
        <BrowserRouter>
          <Home />
        </BrowserRouter>
      </Provider>
    );

    const welcometext = await getByText("Welcome to Expense Tracker!", {
      exact: false,
    });
    expect(welcometext).toBeInTheDocument();
  });

  test("incomplete profile text ", async () => {
    const { getByText } = render(
      <Provider store={store}>
        <BrowserRouter>
          <Home />
        </BrowserRouter>
      </Provider>
    );

    const profileincomplete = await getByText("Your profile is incomplete", {
      exact: false,
    });
    expect(profileincomplete).toBeInTheDocument();
  });
});
