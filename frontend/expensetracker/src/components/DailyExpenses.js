import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DatabaseFunctions from "../utils/storefunctions/DatabaseFunctions";
import { downloadExpenses } from "../utils/store/ExpenseSlice";
import UserFunctions from "../utils/storefunctions/UserFunctions";
import DownloadedFiles from "./DownloadedFiles";

const DailyExpenses = () => {
  const { getExpenses, addExpenseFunc, deleteExpenseFunc, editExpenseFunc } =
    DatabaseFunctions();

  const { buyPremiumMembership,downloadFile } = UserFunctions();
  const expensesStr = useSelector((store) => store.expenses);
  const auth = useSelector((store) => store.auth);
  const dispatch = useDispatch();

  const [expenses, setExpenses] = useState({});
  const [isUpdate, setIsUpdate] = useState({
    id: "",
    status: false,
  });

  const [totalExpense, settotalExpense] = useState(0);
  const desc = useRef();
  const price = useRef();
  const category = useRef();
  const pageNo = useRef();
  const [rowCount, setRowCount] = useState(3);
  const [currpage, setCurrPage] = useState(1);

  const expenseCategories = [
    "Housing",
    "Transportation",
    "Food and Dining",
    "Utilities",
    "Healthcare",
    "Entertainment",
    "Personal Care",
    "Debt Payments",
    "Insurance",
    "Savings",
    "Clothing and Accessories",
    "Education",
    "Gifts and Donations",
    "Travel",
    "Miscellaneous",
  ];
  useEffect(() => {
    console.log("changes in expenseslice", expensesStr.expenses);
    setExpenses(expensesStr.expenses);
    settotalExpense(expensesStr.totalExpense);
  }, [expensesStr.expenses]);

  useEffect(() => {
    if (auth.idToken && rowCount) {
      getExpenses(1, rowCount);
    }
  }, [auth.idToken, rowCount]);

  const addNewEntry = async () => {
    const formObj = {
      description: desc.current.value,
      expenseAmount: price.current.value,
      category: category.current.value,
    };

    await addExpenseFunc(formObj);
    await getExpenses(1, rowCount);
    // Clear input fields after submission
    desc.current.value = "";
    price.current.value = "";
    category.current.value = "";
  };

  const updateEntry = () => {
    const formObj = {
      description: desc.current.value,
      expenseAmount: price.current.value,
      category: category.current.value,
    };

    editExpenseFunc(isUpdate.id, formObj);

    // Clear input fields after submission
    desc.current.value = "";
    price.current.value = "";
    category.current.value = "";

    setIsUpdate({
      id: "",
      status: false,
    });
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();

    if (isUpdate.status) {
      updateEntry();
    } else {
      addNewEntry();
    }
  };

  const onDeleteHandler = async (e) => {
    e.preventDefault();

    // setIsUpdate(!isUpdate);
    // console.log(e);
    const id = e.target.parentElement.parentElement.attributes.id.value;
    await deleteExpenseFunc(id);
    await getExpenses(currpage, rowCount);
  };

  const onEditHandler = (e) => {
    e.preventDefault();
    console.log(e);
    const id = e.target.parentElement.parentElement.attributes.id.value;

    desc.current.value =
      e.target.parentElement.parentElement.children[0].innerText;
    price.current.value =
      e.target.parentElement.parentElement.children[1].innerText;
    category.current.value =
      e.target.parentElement.parentElement.children[2].innerText;

    setIsUpdate({
      status: true,
      id: id,
    });
  };

  const onDownloadClick = (e) => {
    e.preventDefault();
    // dispatch(downloadExpenses());
    downloadFile();
  };

  const onPageChange = (e) => {
    getExpenses(e.target.value, rowCount);
    setCurrPage(e.target.value);
  };

  const onAddPremiumHandler = async () => {
    buyPremiumMembership();
  };

  return (
    <div className="flex flex-col items-center justify-center w-5/6 mx-auto p-4 rounded-xl bg-slate-400">
      <div className="p-2 bg-slate-500 w-full rounded-md">
        {/* form */}

        <form
          onSubmit={onSubmitHandler}
          className="flex rounded-lg flex-row space-x-3 "
        >
          <label>Description:</label>
          <input type="text" ref={desc} className="mb-1" required></input>

          <label>Price:</label>
          <input type="number" ref={price} className="mb-1" required></input>

          <label>Category:</label>
          <select type="text" ref={category} className="mb-1" required>
            {expenseCategories.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>

          <button type="submit" className="p-1 bg-red-200 mb-2">
            {isUpdate.status ? "Update Expense" : "Add Expenses"}
          </button>
        </form>
      </div>
      {/* No of expenses */}
      <div className="bg-blue-200 m-2 p-2 self-center flex w-full rounded-md justify-center">
        <h1>No of expense rows:</h1>
        <select
          defaultValue="3"
          onChange={(e) => setRowCount(e.target.value)}
          required
        >
          <option key="3" value="3">
            3
          </option>
          <option key="5" value="5">
            5
          </option>
          <option key="10" value="10">
            10
          </option>
        </select>
      </div>
      {/* Show Expenses */}
      <div className="bg-slate-400   flex flex-col items-center justify-center w-full rounded-md">
        <table className="table-auto w-full p-4 text-center">
          <thead>
            <tr>
              <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                Description
              </th>
              <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                Price
              </th>
              <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                Category
              </th>
              <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
              <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                Total
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            <tr>
              <td /> <td />{" "}
              <td>
                {auth.ispremium && (
                  <button
                    className="bg-blue-300 p-4 rounded-lg"
                    onClick={onDownloadClick}
                  >
                    Export CSV{" "}
                  </button>
                )}
              </td>{" "}
              <td />
              <td>
                {auth.ispremium == true ? (
                  <div>
                    <p className="bg-green-200">You are a premium member:</p>
                    <p>{totalExpense}</p>
                  </div>
                ) : totalExpense > 10000 ? (
                  <button
                    className="bg-blue-300 p-4 rounded-lg"
                    onClick={onAddPremiumHandler}
                  >
                    Add Premium
                  </button>
                ) : (
                  totalExpense
                )}
              </td>
            </tr>
            {Object.entries(expenses).map(([key, value]) => (
              <tr id={value._id} key={value._id}>
                <td>{value.description}</td>
                <td>{value.expenseAmount}</td>
                <td>{value.category}</td>

                <td>
                  <button
                    className="text-indigo-600 hover:text-indigo-900"
                    onClick={onDeleteHandler}
                  >
                    Delete
                  </button>
                  <button
                    className="text-indigo-600 hover:text-indigo-900 ml-2"
                    onClick={onEditHandler}
                  >
                    Edit
                  </button>
                </td>
                <td></td>
              </tr>
            ))}
          </tbody>
        </table>{" "}
        {/* Pagination 
          currpage: pageNo,
                hasNext: Number(pageNo) < lastPage,
                next: Number(pageNo) + 1,
                hasPrevious: pageNo > 1,
                previous: pageNo - 1,
                last: lastPage*/}
        <div className="m-2">
          {expensesStr.paginationValues.hasPrevious && (
            <button
              className="p-2 border border-2"
              value={expensesStr.paginationValues.previous}
              onClick={onPageChange}
            >
              {expensesStr.paginationValues.previous}
            </button>
          )}
          {expensesStr.paginationValues.currpage && (
            <button
              className="p-2 border border-2 bg-green-400 text-2xl"
              value={expensesStr.paginationValues.currpage}
              onClick={onPageChange}
            >
              {expensesStr.paginationValues.currpage}
            </button>
          )}
          {expensesStr.paginationValues.hasNext && (
            <button
              className="p-2 border border-2"
              value={expensesStr.paginationValues.next}
              onClick={onPageChange}
            >
              {expensesStr.paginationValues.next}
            </button>
          )}
          {expensesStr.paginationValues.last > 1 &&
            expensesStr.paginationValues.last !=
              expensesStr.paginationValues.next &&
            expensesStr.paginationValues.last !=
              expensesStr.paginationValues.currpage && (
              <button
                value={expensesStr.paginationValues.last}
                className="p-2 border border-2"
                onClick={onPageChange}
              >
                {expensesStr.paginationValues.last}
              </button>
            )}
        </div>
      </div>
      {/* Downloaded Files */}
      {
        auth.ispremium && <DownloadedFiles/>
      } 
    </div>
  );
};

export default DailyExpenses;
