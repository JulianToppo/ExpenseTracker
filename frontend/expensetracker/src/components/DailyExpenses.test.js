import { render, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import store from "../utils/store/centralStore";
import { BrowserRouter } from "react-router-dom";
import DailyExpenses from "./DailyExpenses";

describe("Daily Expense test cases", () => {
  test("description ", async () => {
    const { getByText } = render(
      <Provider store={store}>
        <BrowserRouter>
          <DailyExpenses />
        </BrowserRouter>
      </Provider>
    );

    const Description = await getByText("Description:", { exact: false });
    expect(Description).toBeInTheDocument();
  });

  //Price
  test("price ", async () => {
    const { getByText } = render(
      <Provider store={store}>
        <BrowserRouter>
          <DailyExpenses />
        </BrowserRouter>
      </Provider>
    );

    const price = await getByText("Price:", { exact: false });
    expect(price).toBeInTheDocument();
  });

  //category
  test("category ", async () => {
    const { getByText } = render(
      <Provider store={store}>
        <BrowserRouter>
          <DailyExpenses />
        </BrowserRouter>
      </Provider>
    );

    const category = await getByText("Category:", { exact: false });
    expect(category).toBeInTheDocument();
  });

  //add expense
  test("add expense ", async () => {
    const { getByText } = render(
      <Provider store={store}>
        <BrowserRouter>
          <DailyExpenses />
        </BrowserRouter>
      </Provider>
    );

    const addexpense = await getByText("Add Expense", { exact: false });
    expect(addexpense).toBeInTheDocument();
  });
});


describe('async operations', () => { 
  test('fetch expenses',async () => {
    
    window.fetch= jest.fn();
    window.fetch.mockResolvedValueOnce({
      json: async () => ({
        sdsaf: {
          category: 'Housing',
          description: 'Something',
          price: 1000
        }
      })
    });
    

    const { getByText } = render(
      <Provider store={store}>
        <BrowserRouter>
          <DailyExpenses />
        </BrowserRouter>
      </Provider>
    );


    await waitFor(async() => {

    const housing= await getByText('Housing')
    expect(housing).toBeInTheDocument()

    })

  })
  
 })
