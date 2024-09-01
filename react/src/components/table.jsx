import React, { useContext, useRef } from 'react'

import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import moment from 'moment';
import { EditContext, VisibleContext } from '../context/context';
import axios from 'axios';
import { Toast } from 'primereact/toast';
const Table = ({transaction,deleteHandler}) => {
  const { visible, setVisible } = useContext(VisibleContext);
  const { editable, setEditable } = useContext(EditContext);
  let toast=useRef(null)

    
  const header=<h1 className="text-8 text-center  py-2 capitalize">your transactions </h1>
  const actionElements=(rowData)=>{
    return(
   <div className="">
     <button className="pi pi-pencil border-1 border-gray-200 p-2 rounded-5 mx-1 text-info" onClick={()=>{
      setVisible(true)
      setEditable(rowData)
      
      
      }}></button>
     <button className="pi pi-trash border-1 border-gray-200 p-2 rounded-5 mx-1 text-danger" onClick={()=>deleteHandler(rowData)}></button>
  
   </div>
    )
  }
  ;
  
  const formatDate=(value)=>{
  return moment(value.date).format('DD-MM-YYYY')
  }
  
  return (
    <div>
       <Toast ref={toast} pt={{ message: "p-2", icon: "mx-4" }} />
         <DataTable unstyled={false} value={transaction} className='my-8 ' tableStyle={{ width: '80vw', textAlign:'center'}} rowHover stripedRows
     showGridlines  header={header} paginator rows={6} rowsPerPageOptions={[ 6, 12, 15,18,21,24,30]}  
     paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
                 currentPageReportTemplate="{first} to {last} of {totalRecords}" 
     pt={
        {
            
            bodyRow:'h-3rem',
           
      
       

     }}
     >
         
             <Column field="date" header="date" body={formatDate} ></Column>
             <Column field="amount" header="amount" ></Column>
             <Column field="type" header="type" ></Column>
             <Column field="category" header="category" ></Column>
             <Column field="description" header="description" ></Column>
             <Column field="" header="actions" body={actionElements} ></Column>

         </DataTable>
    </div>
  )
}

export default Table