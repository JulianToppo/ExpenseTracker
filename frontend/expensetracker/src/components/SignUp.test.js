import {
  findAllByTestId,
  fireEvent,
  getAllByText,
  getByText,
  render,
  screen,
} from "@testing-library/react";
import SignUp from "./SignUp";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "../utils/store/centralStore";
import ForgotPassword from "./ForgotPassword";

describe("SignUp component", () => {
  //1
  test("renders Signup text", async () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <SignUp />
        </BrowserRouter>
      </Provider>
    );
    const signupHeader = await screen.getAllByText("SignUp");
    expect(signupHeader[0]).toBeInTheDocument();
  });

  //2
  test("renders Login text", async () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <SignUp />
        </BrowserRouter>
      </Provider>
    );
    const loginHeader = await screen.getByText("Login", { exact: false });

    expect(loginHeader).toBeInTheDocument();
  });

  //3
  test("renders placeholder text", async () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <SignUp />
        </BrowserRouter>
      </Provider>
    );
    const emailPlaceholder = await screen.getByPlaceholderText("Enter Email");
    // console.log(emailPlaceholder)
    expect(emailPlaceholder).toBeInTheDocument();
  });

  //4
  test("renders label text", async () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <SignUp />
        </BrowserRouter>
      </Provider>
    );
    const emaillabel = await screen.getByText("Email");
    expect(emaillabel).toBeInTheDocument();
  });

  //5
  test("renders label passwordtext", async () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <SignUp />
        </BrowserRouter>
      </Provider>
    );
    const password = await screen.getByText("Password");
    expect(password).toBeInTheDocument();
  });

  //6
  test("renders forgot password", async () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <SignUp />
        </BrowserRouter>
      </Provider>
    );
    const password = await screen.queryByText("Forgot Password ?", {
      exact: false,
    });
    expect(password).toBeNull();
  });

  //7
  test("renders forgot password", async () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <SignUp />
        </BrowserRouter>
      </Provider>
    );
    const loginPrompt = await screen.getByText("Have an account? Login");
    expect(loginPrompt).toBeInTheDocument();
  });

  // 8
});

describe("onlick operations", () => {
  //1
  test("on Login Page Change", async () => {
    const { getByText } = render(
      <Provider store={store}>
        <BrowserRouter>
          <SignUp />
        </BrowserRouter>
      </Provider>
    );

    const button = await getByText("Have an account? Login");
    fireEvent.click(button);

    const login = await screen.getByRole(
      "button",
      { value: "Login" },
      { exact: false }
    );
    expect(login).toBeInTheDocument();
  });

  //2
  test("on Login Page Heading", async () => {
    const { getByText } = render(
      <Provider store={store}>
        <BrowserRouter>
          <SignUp />
        </BrowserRouter>
      </Provider>
    );

    const button = await getByText("Have an account? Login");
    fireEvent.click(button);

    const login = screen.getByRole("heading", { name: /login/i });
    expect(login).toBeInTheDocument();
  });

  //3
  test("on Login Click Forgot Password text appears", async () => {
    const { getByText } = render(
      <Provider store={store}>
        <BrowserRouter>
          <SignUp />
        </BrowserRouter>
      </Provider>
    );

    const button = await getByText("Have an account? Login");
    fireEvent.click(button);

    const forgotpassoword = screen.getByText('Forgot Password',{exact:false})
    expect(forgotpassoword).toBeInTheDocument();
  });

  
  //4
  test("on Login Click Forgot Password text appears", async () => {
    const { getByText } = render(
      <Provider store={store}>
        <BrowserRouter>
          <SignUp />
          <ForgotPassword/>
        </BrowserRouter>
      </Provider>
    );

    const button = await getByText("Have an account? Login");
    fireEvent.click(button);

    const ForgotPasswordLink= await getByText("Forgot Password ?",{exact:true})
    fireEvent.click(ForgotPasswordLink)

    const forgotpassowordPage = screen.getByText('Enter the mail which you have registered',{exact:false})
    expect(forgotpassowordPage).toBeInTheDocument();
  });

    
  //5
  test("on Login Click Forgot Password text appears", async () => {
    const { getByText } = render(
      <Provider store={store}>
        <BrowserRouter>
          <SignUp />
          <ForgotPassword/>
        </BrowserRouter>
      </Provider>
    );

    const button = await getByText("Have an account? Login");
    fireEvent.click(button);

    const ForgotPasswordLink= await getByText("Forgot Password ?",{exact:true})
    fireEvent.click(ForgotPasswordLink)

    const sendLink = screen.getByText('Send Link',{exact:false})
    expect(sendLink).toBeInTheDocument();
  });
});
