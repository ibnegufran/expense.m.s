import React, { useEffect } from "react";

import { ProgressBar } from "primereact/progressbar";

const CategoryTransaction = ({ transaction }) => {
  const categories = [
    "salary",
    "food",
    "tip",
    "project",
    "customer",
    "recharge",
    "bills",
    "medical",
    "fees",
    "others",
    "VISHAL ENGINEERING C",
    "MARUTI ENGINEERING WORKS",
    "MAHAVIR ENTERPRISE",
    "OUTWARD CLG MAHARASHTRA",
    "HARMEET ENTERPRISES",
    "MAX MACHINERY AUTOMA",
    "INDOMAX ENGINEERS",
    "HALSTON GLOBAL AHMEDABAD MERCA",
    "AEROSELL HYDRAULICS PNE HDFC",
    "SHOAIB ISMAIL KOJAR PUNJAB NAT",
    "UNIQUE HYDRAULIC SALES",
    "PREMIER AUTO INDUSTRIES",
    "INNOVATIVE TECHNOLOG",
  ];
  console.log(transaction)
  const totalIncomeTurnover=transaction.filter(transaction=>transaction.type == 'income').reduce((acc,transaction)=>acc+transaction.amount,0);
  // console.log(totalIncomeTurnover)
  const totalExpenseTurnover=transaction.filter(transaction=>transaction.type == 'expense').reduce((acc,transaction)=>acc+transaction.amount,0);
useEffect(()=>{
<CategoryTransaction />
},[transaction,totalIncomeTurnover])
  return (
    <>
  <div className="col-12 col-md-5">
    <div className="card  py-4 px-0 bg-gray-700 flex flex-column justify-content-center align-items-center min-h-full" >
      <h2 className="fs-5 text-capitalize text-white">Categorywise Income</h2>
      {categories.map((category,index) => {
        const amount = transaction.filter(
            (transaction) =>
              transaction.type === "income" && transaction.category === category
          ) .reduce((acc, transaction) => acc + transaction.amount, 0);
          const amountPercent=Math.round((amount/totalIncomeTurnover)*100);
          // console.log(amountPercent ,'Income')
          return(
            amount > 0 && (
            <div className="my-2 flex flex-column justify-content-between align-items-start " key={index}>
                <h5 className="text-white text-capitalize">{category}</h5>
                <div className="col-12 w-full">
                <ProgressBar value={amountPercent} color="#EAB308"  unstyled={false} className="" pt={{
                    root:'w-18rem md:w-25rem',
                    value:'text-white',
                    label:'text-gray-900 fw-bold'
                   
                }}></ProgressBar>
                </div>
            </div> 
            )
          )
      })}
    </div>
    </div>

<div className="col-12 col-md-5">
    <div className="card py-4  px-0 bg-gray-700 flex flex-column justify-content-center align-items-center">
      <h2 className="fs-5 text-capitalize text-white">Categorywise expense</h2>
      {categories.map((category,index) => {
        const amount = transaction.filter(
            (transaction) =>
              transaction.type === "expense" && transaction.category === category
          ) .reduce((acc, transaction) => acc + transaction.amount, 0);
          const amountPercent=Math.round((amount/totalExpenseTurnover)*100);
          // console.log(amount)
          return(
            amount > 0 && (
            <div className="my-2" key={index}>
                <h5 className="text-white text-capitalize">{category}</h5>
                <div className="col-12 w-full">
                <ProgressBar value={amountPercent} color="#EAB308"  unstyled={false} className="" pt={{
                    root:'w-18rem md:w-25rem',
                    value:'text-white',
                    label:'text-gray-900 fw-bold'
                   
                }}></ProgressBar>
                </div>
            </div> 
            )
          )
      })}
    </div>
    </div>
    </>
  );
};

export default CategoryTransaction;
