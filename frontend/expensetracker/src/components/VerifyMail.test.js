import { render, screen } from "@testing-library/react";
import VerifyMail from "./VerifyMail";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import store from "../utils/store/centralStore";

describe("Verify mail suite ", () => {
  test("verify button ", async () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <VerifyMail />
        </BrowserRouter>
      </Provider>
    );

    const verify = await screen.getByText("Verify Mail");
    expect(verify).toBeInTheDocument();
  });
});
