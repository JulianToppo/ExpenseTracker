import React, { Fragment, useEffect, useState } from "react";
import UserFunctions from "../utils/storefunctions/UserFunctions";
import { useSelector } from "react-redux";

const DownloadedFiles = () => {
  const { loadDownloadedFiles } = UserFunctions();
  const expense = useSelector((store) => store.expenses);

  useEffect(() => {
    const callfun = async () => {
      await loadDownloadedFiles();
      console.log(expense.downloadedExpenseLinks)
    };
    callfun();
  }, []);

  return (
    <div className="w-full rounded-lg ">
      <div className="text-xl self-center w-full">DownloadedFiles</div>
      <table className="w-full bg-amber-100 rounded-md">
        <thead>
          <tr>
            <th className="w-1/6">S.no</th>
            <th className="w-5/6">Link</th>
          </tr>
        </thead>
        <tbody className="w-full">
          {expense.downloadedExpenseLinks &&
            expense.downloadedExpenseLinks.map((item, index) => (
              <tr key={index} className="w-full">
                <td>{index + 1}</td>
                <td className="flex flex-wrap w-full">
                  <a
                    href={item.fileDownloadedId.fileURL}
                    download="expense.csv"
                  >
                    {item.fileDownloadedId.fileURL.slice(0, 100)}
                  </a>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default DownloadedFiles;