import { createSlice } from "@reduxjs/toolkit";

const ExpenseSlice = createSlice({
  name: "expenses",
  initialState: {
    expenses: {},
    totalExpense: 0,
  },
  reducers: {
    addExpenseRedx: (state, action) => {
      const { data, formObj } = action.payload;
      state.totalExpense = state.totalExpense + parseInt(formObj.price);
      state.expenses = { ...state.expenses, [data["name"]]: formObj };
    },
    setExpense: (state, action) => {
      state.expenses = action.payload;
      state.totalExpense = Object.values(action.payload).reduce(
        (total, item) => total + parseInt(item.price),
        0
      );
    },
    deleteExpense: (state, action) => {
      let {id}=action.payload
      state.expenses = Object.fromEntries(
        Object.entries(state.expenses).filter(([key, value]) => {
          return id != key;
        })
      );

      state.totalExpense = Object.values(state.expenses).reduce(
        (total, item) => total + parseInt(item.price),
        0
      );
    },

    downloadExpenses: (state) => {
      let values = Object.values(state.expenses)
        .map((item) => {
          return Object.values(item).join(" ");
        })
        .join("\n");

      const downloadBlob = (content, filename, contentType) => {
        var blob = new Blob([content], { type: contentType });
        var url = URL.createObjectURL(blob);

        var pom = document.createElement("a");
        pom.href = url;
        pom.setAttribute("download", filename);
        pom.click();
      };

      downloadBlob(values, "export.csv", "text/csv;charset=utf-8;");
    },
  },
});

export const { addExpenseRedx, setExpense, downloadExpenses,deleteExpense } =
  ExpenseSlice.actions;
export default ExpenseSlice.reducer;
