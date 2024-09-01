import React, { useEffect, useRef, useState } from "react";
import Layout from "../components/layout";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import 'primeflex/primeflex.css'; // flex

import { Dropdown } from "primereact/dropdown";
import { Toast } from "primereact/toast";
import axios from "axios";

import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import moment from "moment";

import { Calendar } from 'primereact/calendar';
        
        
const Home = () => {
  // get all transaction 
  
   const [transaction,setTransaction]=useState([]);
   const [submitted,setSubmitted]=useState(false);

  const [selectedDates, setSelectedDates] = useState([]);
  

  const [visible, setVisible] = useState(false);
  const [type, setType] = useState(null);
  const [typeFilter, setTypeFilter] = useState('all');

  const [frequency,setFrequency]=useState('7');
 

  const typeFilterOptions = [
    { name: "all", code: "all" },
    { name: "expense", code: "expense" },
    { name: "income", code: "income" },
   
  ];
   const getAlltransaction=async()=>{
    try {
         

      if (frequency.name === "custom") {
        if (selectedDates.length !== 2 || !selectedDates[0] || !selectedDates[1]) {
          // If the date range is not properly selected, clear the transactions or prevent API call
          setTransaction([]);
          return;
        }
      }
        const user = JSON.parse(localStorage.getItem("user"));
     const res=await axios.post("https://expense-m-s.onrender.com/transaction/get-transaction",{
      userId: user._id,
      frequency:frequency.code || '7',
      selectedDates,
      type:typeFilter.code || 'all'
    })
   setTransaction(res.data);
     
         // toast.current.show({severity:'success', summary: 'Success', detail:'Message Content', life: 3000});
   
       } catch (error) {
         toast.current.show({  severity: "danger",  summary: "danger",  detail: "transaction getting failed",});
         console.log(error)
       }
     }




// console.log(frequency)
  const typeOptions = [
    { name: "income", code: "I" },
    { name: "expense", code: "E" },
  ];
  // console.log(type.name)
  const toast = useRef(null);
  const [category, setCategaory] = useState(null);
  const categaoryOptions = [
    { name: "salary of", code: "salary" },
    { name: "food", code: "food" },
    { name: "tip", code: "tip" },
    { name: "project", code: "project" },
    { name: "customer", code: "customer" },
    { name: "recharge", code: "recharge" },
    { name: "bills", code: "bills" },
    { name: "medical", code: "medical" },
    { name: "fees", code: "fees" },
    { name: "others", code: "others" },
  ];

  // frequency option s
 


  const [amount, setAmount] = useState();
  const [date, setDate] = useState();
  const [description, setDescription] = useState();
  const [reference, setReference] = useState();
  
  const frequencyOptions = [
    { name: "Last 1 week", code: "7" },
    { name: "Last 1 month", code: "30" },
    { name: "Last 1 year", code: "365" },
    { name: "custom", code: "custom" },
   
  ];





  const showSuccess = () => {
    toast.current.show({severity:'success', summary: 'Success', detail:'Message Content', life: 3000});
}
  const submitHandler = async (value) => {
    try {  
      
      value.preventDefault();
      const user = JSON.parse(localStorage.getItem("user"));
     await axios.post(
        "https://expense-m-s.onrender.com/transaction/add-transaction",{
          userId: user._id,
          amount,
          type:type.name,
          category:category.name,
          date,
          description,
          reference,
        }
      );
      setVisible(false)
      setSubmitted(!submitted)

  
      toast.current.show({severity:'success', summary: 'Success', detail:'Message Content', life: 3000});

    } catch (error) {
      toast.current.show({  severity: "danger",  summary: "danger",  detail: "Transaction Adding failed",});
      console.log(error)
    }
   
  };

  //  console.log(transaction);
 

  useEffect(()=>{
  getAlltransaction()
  // console.log(frequency.code)

  },[submitted,frequency,selectedDates,typeFilter])
  // datatable functions /elements 

  const header=<h1 className="text-8 text-center  py-4 capitalize">your transactions </h1>
  const actionElements=(
    <div className="">
      <button className="pi pi-pencil border-1 border-gray-200 p-2 rounded-5 mx-1 text-info"></button>
      <button className="pi pi-trash border-1 border-gray-200 p-2 rounded-5 mx-1 text-danger"></button>

    </div>
  );

  const formatDate=(value)=>{
return moment(value.date).format('DD-MM-YYYY')
  }
  return (
    <>
      <Layout>
      
      { frequency.name == "custom" && <Calendar value={selectedDates} onChange={(e) => setSelectedDates(e.value)} selectionMode="range" readOnlyInput hideOnRangeSelection className="mt-5 h-4rem" />
    }
            <Toast ref={toast} pt={{message:'p-2',icon:'mx-4'}}/>
            {/* <Button label="Success" severity="success" onClick={showSuccess} />      */}
        <div className="filters col-10 d-flex justify-content-between px-2 align-align-items-center shadow-sm border-1 border-gray-200 bg-light mx-auto py-4 mt-4">
          <div className="text-capitalize fs-4 ">
            <h2>select frequency</h2>
            <Dropdown
                  value={frequency}
                  onChange={(e) => setFrequency(e.value)}
                  options={frequencyOptions}
                  optionLabel="name"
                  placeholder="Select a frequency"
                  className="w-full md:w-100% p-2"
                />
          </div>  
          <div className="text-capitalize fs-4 ">
            <h2>select type</h2>
            <Dropdown
                  value={typeFilter}
                  onChange={(e) => setTypeFilter(e.value)}
                  options={typeFilterOptions}
                  optionLabel="name"
                  placeholder="Select a type"
                  className="w-full md:w-100% p-2"
                />
          </div>
       
          <Button
            onClick={() => { 
              setVisible(true);
            }}
            className="bg-primary py-2 px-3 rounded-5"
          >
            Add New{" "}
          </Button>
        </div>
        <div className="content">
        <DataTable value={transaction} tableStyle={{ width: '90vw',margin:'0 auto' }}
        showGridlines stripedRows header={header} paginator rows={3} rowsPerPageOptions={[3, 6, 12, 15]}
        paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
                    currentPageReportTemplate="{first} to {last} of {totalRecords}"
        pt={{bodyRow:'h-3rem'}}
        >
                <Column field="date" header="date" body={formatDate}></Column>
                <Column field="amount" header="amount"></Column>
                <Column field="type" header="type"></Column>
                <Column field="category" header="category"></Column>
                <Column field="description" header="description"></Column>
                <Column field="" header="actions" body={actionElements}></Column>

            </DataTable>
            </div>
        <div className=" flex justify-content-center">
          <Dialog
            header="Add New Transaction"
            modal
            className="w-11 md:w-6"
            visible={visible}
            style={{ paddingTop: "40px", backgroundColor: "white" }}
            onHide={() => setVisible(false)}
            pt={{ headerTitle: "text-center fs-4", footer: "col-12 px-6 py-4" }}
          >
            <form action="" className="col-12 p-4" onSubmit={submitHandler}>
              <div className="flex flex-column gap-2 my-4">
                <label htmlFor="username">Amount</label>
                <InputText
                  id="username" type="number"
                  aria-describedby="username-help"
                  className="p-2 fs-5"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
              </div>
              <div className="flex flex-column gap-2 my-4">
                <label htmlFor="username">type</label>
                <Dropdown
                  value={type}
                  onChange={(e) => setType(e.value)}
                  options={typeOptions}
                  optionLabel="name"
                  placeholder="Select a type"
                  className="w-full md:w-100% p-2"
                />
              </div>
              <div className="flex flex-column gap-2 my-4">
                <label htmlFor="username">category</label>
                <Dropdown
                  value={category}
                  onChange={(e) => setCategaory(e.value)}
                  options={categaoryOptions}
                  optionLabel="name"
                  placeholder="Select a Category"
                  className="w-full md:w-100% p-2"
                  pt={{ wrapper: "p-1", item: "p-1" }}
                />
              </div>
              <div className="flex flex-column gap-2 my-4">
                <label htmlFor="username">date</label>
                <InputText
                  type="date"
                  id="date"
                  aria-describedby="date-help"
                  className="p-2 fs-5"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                />
              </div>
              <div className="flex flex-column gap-2 my-4">
                <label htmlFor="username">Reference</label>
                <InputText
                  id="Reference"
                  aria-describedby="Reference-help"
                  className="p-2 fs-5"
                  value={reference}
                  onChange={(e) => setReference(e.target.value)}
                />
              </div>
              <div className="flex flex-column gap-2 my-4">
                <label htmlFor="username">Description</label>
                <InputText
                  id="Description"
                  aria-describedby="Description-help"
                  className="p-2 fs-5"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
              <div className="flex col-12 justify-content-end">
                <Button
                  type="submit"
                  className="py-1 text-8 rounded px-5  my-2"
                >
                  SAVE
                </Button>
              </div>
            </form>
          </Dialog>
        </div>
      </Layout>
    
        

    </>
  );
};

export default Home;
