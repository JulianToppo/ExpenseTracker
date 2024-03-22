import { createSlice } from "@reduxjs/toolkit";

const ExpenseSlice = createSlice({
  name: "expenses",
  initialState: {
    expenses: {},
    totalExpense: 0,
    paginationValues:{},
  },
  reducers: {
    addExpenseRedx: (state, action) => {
      const { data } = action.payload;
      state.totalExpense = data.totalExpense;
      state.expenses = { [data.NewExpenseEntry._id]: data.NewExpenseEntry, ...state.expenses};
     
    },
    setExpense: (state, action) => {
      const {pagination,entries}=action.payload;
      state.expenses = entries.map((item)=>{
        return {[item._id]:item}
      }).reduce((acc,item)=>{
        return {...acc,...item}
      },{});
      state.totalExpense = Object.values(entries).reduce(
        (total, item) => total + parseInt(item.expenseAmount),
        0
      );
      state.paginationValues=pagination
    },
    deleteExpense: (state, action) => {
      let {id}=action.payload
      state.expenses = Object.fromEntries(
        Object.entries(state.expenses).filter(([key, value]) => {
          return id != key;
        })
      );

      state.totalExpense = Object.values(state.expenses).reduce(
        (total, item) => total + parseInt(item.expenseAmount),
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
