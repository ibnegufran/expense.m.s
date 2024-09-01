import { Chart } from 'primereact/chart';
import React, { useContext, useEffect, useState } from 'react'
import { DashContext } from '../context/context';

const TotalTransaction = ({transaction}) => {
    const allTransaction=transaction.length;
    const allIncomeTransaction=transaction.filter(transactions=>transactions.type == 'income').length;
    const allExpenseTransaction=transaction.filter(transactions=>transactions.type == 'expense').length;
  
    const incomeTransactionPercent=Math.round((allIncomeTransaction/allTransaction) * 100);
    const expenseTransactionPercent=Math.round((allExpenseTransaction/allTransaction) * 100);
  
    // console.log(allTransaction)
    // console.log(allIncomeTransaction)
    // console.log(incomeTransactionPercent)
    // console.log(expenseTransactionPercent)
  
  const [chartData,setChartData]=useState({});
  const [chartOptions,setChartOptions]=useState({});
  
  useEffect(() => {
    const documentStyle = getComputedStyle(document.documentElement);
    const data = {
        labels: ['Income %', 'Expense %',],
        datasets: [
            {
                data: [incomeTransactionPercent,expenseTransactionPercent],
                backgroundColor: [
                    documentStyle.getPropertyValue('--green-500'), 
                    documentStyle.getPropertyValue('--red-500'), 
                    
                ],
                hoverBackgroundColor: [
                  documentStyle.getPropertyValue('--green-400'), 
                  documentStyle.getPropertyValue('--red-400'), 
                  
                ]
            }
        ]
    };
    const options = {
        cutout: '65%',
        plugins: {
          legend: {
              display: true,
              labels: {
                color: 'white', // Color of legend labels
            }
          }
      }
    };
  
    setChartData(data);
    setChartOptions(options);
  }, [allTransaction]);
  





  return (
    <div className="card py-4 px-4 bg-gray-700 flex flex-column justify-content-center align-items-center">
    <h2 className='fs-5 text-capitalize text-white'>total transactions : {allTransaction}</h2>

    <p className=' mb-0 text-capitalize text-green-500'>income : {allIncomeTransaction}</p>
    <p  className=' mb-0 text-capitalize text-red-500'>Expense : {allExpenseTransaction}</p>
    <Chart type="doughnut" data={chartData} options={chartOptions} className="w-full md:w-18rem text-center mt-4" />

  </div>
  
)
}

export default TotalTransaction