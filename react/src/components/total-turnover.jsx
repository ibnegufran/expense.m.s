import React, { useContext, useEffect, useState } from 'react'
import { Chart } from 'primereact/chart';
import { DashContext } from '../context/context';



const TotalTurnover = ({transaction}) => {
    const totalTurnover=transaction.reduce((acc,transaction)=>acc+transaction.amount,0);
    const totalIncomeTurnover=transaction.filter(transaction=>transaction.type == 'income').reduce((acc,transaction)=>acc+transaction.amount,0);
    const totalExpenseTurnover=transaction.filter(transaction=>transaction.type == 'expense').reduce((acc,transaction)=>acc+transaction.amount,0);
    const incomeTurnoverPercent=Math.round((totalIncomeTurnover/totalTurnover) * 100);
    const expenseTurnoverPercent=Math.round((totalExpenseTurnover/totalTurnover) * 100);


    
  const [chartData,setChartData]=useState({});
  const [chartOptions,setChartOptions]=useState({});
  const {dash,setDash}=useContext(DashContext)
  

  
  useEffect(() => {
    setDash("Total")
    const documentStyle = getComputedStyle(document.documentElement);
    const data = {
        labels: ['Income %', 'Expense %',],
        datasets: [
            {
                data: [incomeTurnoverPercent,expenseTurnoverPercent],
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
  }, [transaction]);
  





console.log(totalTurnover)
  return (
    <div className="card py-4 px-4 bg-gray-700 flex flex-column justify-content-center align-items-center">
    <h2 className='fs-5 text-capitalize text-white'>{dash} turnover : {totalTurnover}</h2>

    <p className=' mb-0 text-capitalize text-green-500'>income : {totalIncomeTurnover}</p>
    <p  className=' mb-0 text-capitalize text-red-500'>Expense : {totalExpenseTurnover}</p>
    <p  className=' mb-0 text-capitalize text-white'>difference: {(totalIncomeTurnover - totalExpenseTurnover)}</p>

    <Chart type="doughnut" data={chartData} options={chartOptions} className=" w-15rem md:w-18rem text-center mt-4" />

  </div>
    )
}

export default TotalTurnover