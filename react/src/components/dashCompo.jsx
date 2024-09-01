import moment from "moment";
import React, { useContext, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { DashContext } from "../context/context";
import TotalTurnover from "./total-turnover";

const DashCompo = ({ oneMonthTransaction ,oneYearTransaction }) => {
 
  const {dash,setDash}=useContext(DashContext)
  useEffect(() => {
    setDash("Monthly")
  
    
  }, [])
  

  let slicedTransaction = oneMonthTransaction.slice(-6);
  console.log(oneMonthTransaction)

  const annualIncome = oneYearTransaction
    .filter((oneYearTransaction) => oneYearTransaction.type == "income")
    .reduce((acc, oneYearTransaction) => acc + oneYearTransaction.amount, 0);
  const annualExpense = oneYearTransaction
    .filter((oneYearTransaction) => oneYearTransaction.type == "expense")
    .reduce((acc, oneYearTransaction) => acc + oneYearTransaction.amount, 0);

  console.log(annualIncome);
  return (
    <>
      <div className="container ">
        <div className="row">
          <div className="col-md-6 flex flex-wrap justify-content-around align-items-center">
            <div className="row flex gap-3 flex-coumn justify-content-center align-items-center">
              <div className="p-4 col-10  text-gray-100 text-center bg-gray-600">
                <h5 className="fs-3 text-gray-100 capitalize ">
                  annual-Income :
                </h5>
                <p className="text-green-500 fs-5"> {annualIncome}</p>
              </div>
              <div className="p-4 col-10  text-gray-100 text-center bg-gray-600">
                <h5 className="fs-3 text-gray-100 capitalize ">
                  annual-Expense :
                </h5>
                <p className="text-red-500 fs-5"> {annualExpense}</p>
              </div>
              <div className="p-0 col-10">
              <TotalTurnover transaction={oneMonthTransaction} />
            </div>
            </div>
          
          </div>
          <div className="col-md-6 ">
            <h2 className="text-capitalize fs-2 text-yellow-500 mt-4 text-center">
              recent transactions
            </h2>
            {slicedTransaction.map((element, index) => {
              return (
                <div
                  className="p-2 rounded flex flex-wrap flex-column mb-2 col-12 bg-gray-600"
                  key={index}
                >
                  <div className="flex justify-content-between">
                    <h4 className="text-gray-100 capitalize">{element.type}</h4>
                    <h5
                      className={`${
                        element.type == "income"
                          ? "text-green-500"
                          : "text-red-500 "
                      } `}
                    >
                      {" "}
                      <span
                        className={`${
                          element.type == "income"
                            ? "text-green-500 pi pi-plus"
                            : "text-red-500 pi pi-minus"
                        }  mx-2`}
                      ></span>
                      {element.amount}
                    </h5>
                  </div>
                  <div className="flex gap-4">
                    <p className="text-yellow-500 mt-1">
                      <span className="mx-2 pi pi-calendar"></span>
                      {moment(element.date).format("DD-MM-YYYY")}
                    </p>
                    <p className="text-yellow-500 mt-1">
                      <span className="mx-2 pi pi-book"></span>
                      {element.description}
                    </p>
                    <p className="text-yellow-500 mt-1">
                      <span className="mx-2 pi pi-tag"></span>
                      {element.category}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default DashCompo;
