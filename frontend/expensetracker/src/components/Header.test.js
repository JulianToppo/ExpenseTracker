import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import Header from "./Header";
import { render } from "@testing-library/react";
import store from "../utils/store/centralStore";

describe("header suite", () => {
  test("change theme ", async () => {
    const { getByText } = render(
      <Provider store={store}>
        <BrowserRouter>
          <Header />
        </BrowserRouter>
      </Provider>
    );

    const changeTheme = await getByText("ChangeTheme", { exact: false });
    expect(changeTheme).toBeInTheDocument();
  });

  test('Logoutbutton ', async () => {
    const { getByText } = render(
      <Provider store={store}>
        <BrowserRouter>
          <Header />
        </BrowserRouter>
      </Provider>
    );

    const logout = await getByText("Logout", { exact: false });
    expect(logout).toBeInTheDocument();
  });

});
