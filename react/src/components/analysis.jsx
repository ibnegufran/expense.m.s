import { Chart } from 'primereact/chart';
import React, { useEffect, useState } from 'react'
import TotalTransaction from './total-transaction';
import TotalTurnover from './total-turnover';
import CategoryTransaction from './categoryTransaction';

const Analysis = ({transaction}) => {
 

  return (
    <div>
<div className="row my-4 flex flex-wrap gap-3 justify-content-center ">
  <div className="col-12 col-md-5">
   
<TotalTransaction transaction={transaction}/>
    
  </div>
  <div className=" col-12 col-md-5">

<TotalTurnover transaction={transaction}/>
  </div>
 


</div>
<div className="row my-4  flex flex-wrap gap-4  justify-content-center ">

<CategoryTransaction transaction={transaction}/>
  </div>

    </div>
  )
}

export default Analysis