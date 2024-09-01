import React, { useContext, useEffect, useRef, useState } from "react";
import Layout from "../components/layout";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import "primeflex/primeflex.css"; // flex

import { Dropdown } from "primereact/dropdown";
import { Toast } from "primereact/toast";
import axios from "axios";

import moment from "moment";

import { Calendar } from "primereact/calendar";
import Table from "./table";
import { DashContext, DatesContext, EditContext, MenuContext, ToggleContext, VisibleContext } from "../context/context";
import Analysis from "./analysis";
import DashCompo from "./dashCompo";
import Loader from './loader';
import { io } from "socket.io-client";

const Transaction = () => {
  const { visible, setVisible } = useContext(VisibleContext);

  const { editable, setEditable } = useContext(EditContext);

  const [transaction, setTransaction] = useState([]);
  const [oneYearTransaction, setOneYearTransaction] = useState([]);
  const [oneMonthTransaction, setOneMonthTransaction] = useState([]);
  // console.log(oneMonthTransaction)

  const [deleteVar, setDeleteVar] = useState(false);

  const [submitted, setSubmitted] = useState(false);
const {toggle,setToggle}=useContext(ToggleContext);



  const [selectedDates, setSelectedDates] = useState([]);

  const [type, setType] = useState(null);
  const [typeFilter, setTypeFilter] = useState("all");
const [loader,setLoader]=useState(true);


  const [frequency, setFrequency] = useState("7");
  const [username,setUsername]=useState('');
  useEffect(()=>{
    let user=JSON.parse(localStorage.getItem("user"));
    if(user){
      setUsername(user);
    }
  },[])
  
  const typeFilterOptions = [
    { name: "all", code: "all" },
    { name: "expense", code: "expense" },
    { name: "income", code: "income" },
  ];
const {days,setDays}=useContext(DatesContext)


 // console.log(frequency)
 const typeOptions = [
  { name: "income", code: "I" },
  { name: "expense", code: "E" },
];
// console.log(type.name)
const toast = useRef(null);
const [category, setCategaory] = useState(null);
const categaoryOptions = [
  { name: "salary", code: "salary" },
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
  toast.current.show({
    severity: "success",
    summary: "Success",
    detail: "Message Content",
    life: 3000,
  });
};
  // get all transaction 
  const getAlltransaction = async (dates) => {
    try {
      if (frequency.name === "custom") {
        if (
          selectedDates.length !== 2 ||
          !selectedDates[0] ||
          !selectedDates[1]
        ) {
          // If the date range is not properly selected, clear the transactions or prevent API call
          setTransaction([]);
          return;
        }
      }
      const user = JSON.parse(localStorage.getItem("user"));
      // setLoader(true)
      const res = await axios.post(
        "https://expense-m-s.onrender.com/transaction/get-transaction",
        {
          userId: user._id,
         frequency:frequency.code || "7",
        
          selectedDates,
          type: typeFilter.code || "all",
        }
      );
      setTransaction(res.data);
      setLoader(false)

      // toast.current.show({severity:'success', summary: 'Success', detail:'Message Content', life: 3000});
    } catch (error) {
      toast.current.show({
        severity: "danger",
        summary: "danger",
        detail: "transaction getting failed",
        life: 3000,
      });
      console.log(error);
      setLoader(false)

    }
  };

  // get yearly transaction
  const getOneYearTransactions = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const res = await axios.post("https://expense-m-s.onrender.com/transaction/get-transaction", {
        userId: user._id,
        frequency: "365", 
        type:"all",
        // Fetching 1-year data
        // Or apply any other filter if needed
      });
      setOneYearTransaction(res.data);
    }catch (error) {
      toast.current.show({
        severity: "danger",
        summary: "danger",
        detail: "transaction getting failed",
        life: 3000,
      });
      console.log(error);
    }
  };

  // one month transaction

  const getOneMonthTransactions = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const res = await axios.post("https://expense-m-s.onrender.com/transaction/get-transaction", {
        userId: user._id,
        frequency: "30",
        type:"all",
         // Fetching 1-year data
        // Or apply any other filter if needed
      });
      setOneMonthTransaction(res.data);
    } catch (error) {
      toast.current.show({
        severity: "danger",
        summary: "danger",
        detail: "transaction getting failed",
        life: 3000,
      });
      console.log(error);
    }
  };

//  delete #EAB308

const deleteHandler=async (row)=>{
  try {
    await axios.post("https://expense-m-s.onrender.com/transaction/delete-transaction", {transactionId:row._id })
    
    console.log(row)
    
    toast.current.show({
      severity: "success",
      summary: "Success",
      detail: `transaction deleted successfully`,
      life: 3000,
    });
    setDeleteVar(!deleteVar)
  } catch (error) {
    console.log("Error Response:", error.response);  // Logs the error details
    toast.current.show({
      severity: "error",
      summary: "Error",
      detail: "Transaction deletion failed",
      life: 3000,
    });
  }
  }
  


  const submitHandler = async (value) => {
    try {
      value.preventDefault();
      const user = JSON.parse(localStorage.getItem("user"));
      if(editable){
        await axios.post("https://expense-m-s.onrender.com/transaction/edit-transaction", {
          payload:{
            ...editable,
            userId: user._id,
            
          },
          transactionId:editable._id,
         
        });   
        // setEditable(null);
      
      }else{
        await axios.post("https://expense-m-s.onrender.com/transaction/add-transaction", {
          userId: user._id,
          amount,
          type: type.name,
          category: category.name,
          date,
          description,
          reference,
        });   
      
      }
    
        setVisible(false);
        setEditable(null);

   

      setSubmitted(!submitted);

      setTimeout(()=>{
toast.current.show({
        severity: "success",
        summary: "Success",
        detail: `transaction ${editable ? "edited" : "Added"} successfully`,
        life: 3000,
      });
      },600)
      
    } catch (error) {
      toast.current.show({
        severity: "danger",
        summary: "danger",
        detail: "Transaction Adding failed",
      });
      console.log(error);
    }
  };
  // const socket = io("http://localhost:8080"); // Adjust the URL as needed

  // useEffect(() => {
  //   // Listen for new transactions
  //   socket.on("newTransaction", (transaction) => {
  //     setTransactions((prev) => [...prev, transaction]);
  //   });

  //   return () => {
  //     socket.disconnect();
  //   };
  // }, []);


  const emailRequest=async()=>{
    try {
      await axios.post("https://expense-m-s.onrender.com/transaction/email-transaction");
    } catch (error) {
      toast.current.show({
        severity: "danger",
        summary: "danger",
        detail: "email Transaction Adding failed",
      });
      console.log(error);
      
    }
  }
  
  
  //  console.log(transaction);
  useEffect(() => {
    // Connect to the WebSocket server
    const socket = new WebSocket("ws://https://expense-m-s.onrender.com");

    // Listen for messages from the server
    socket.onmessage = (event) => {
      const message = JSON.parse(event.data);

      if (message.type === "new-email") {
        // Update the state with the new email data
        setTransaction((prevEmails) => [...prevEmails, message.data]);
      }
    };

    // Cleanup the WebSocket connection when the component unmounts
    return () => {
      socket.close();
    };
  }, []);
  useEffect(() => {
    getAlltransaction();
    // emailRequest();
    getOneYearTransactions();
    getOneMonthTransactions();
    <>
    <Analysis />
    <DashCompo />
    </>
    // console.log(frequency.code)
  }, [submitted, frequency, selectedDates, typeFilter,toggle,deleteVar]);
  // datatable functions /elements


  let component;
switch (toggle) {
  case "table":
    component=<Table transaction={transaction} frequency={frequency} deleteHandler={deleteHandler}/>
    break;

    case "analysis":
      component=<Analysis transaction={transaction} />
      break;
  

  default:
    component=<DashCompo oneMonthTransaction={oneMonthTransaction} oneYearTransaction={oneYearTransaction} />

    break;
}
if(loader){
  return <Loader />
}

const {menu,setMenu}=useContext(MenuContext);
  return (
    <div className="bg-gray-800 col-12 col-md-10 h-full py-2 px-4">
      <div className="w-full  flex justify-content-between justify-content-md-end align-items-center mb-4 bg-gray-600 px-4 py-2">
        <span className="pi pi-align-justify d-inline-block d-md-none fs-4 text-white" onClick={()=>setMenu(!menu)}></span>
        <p  className='text-white fs-5 mb-0 text-capitalize'> <span className='pi pi-user  text-white fs-5  mx-2'></span>{username && username.name}</p> 
      </div>
      {/* filters */}
   
      <Toast ref={toast} pt={{ message: "p-2", icon: "mx-4" }} />
      {/* <Button label="Success" severity="success" onClick={showSuccess} />      */}
      <div className={`filters  col-12 col-md 10  rounded-3 flex justify-content-between px-md-6 align-items-center shadow-sm  bg-gray-500 mx-auto py-4 mt-4  ${toggle === "dashboard" ? "d-none" : "inlie-block"}`}>
        <div className="text-capitalize fs-4   me-4">
          <h2  className="text-capitalize fs-4 text-gray-300 ">select frequency</h2>
          <Dropdown
            value={frequency}
            onChange={(e) => setFrequency(e.value)}
            options={frequencyOptions}
            optionLabel="name"
            placeholder="Select a frequency"
            className="w-full md:w-100% p-2 bg-gray-400 border-0 outline-none"
            pt={{
              root:"outline-none",
              input:'text-white',
              wrapper:'bg-gray-200'
            }}
          />
        </div>
         
         {frequency.name == "custom" && (
          <div className="">
          <h2 className="text-capitalize fs-4 text-gray-300 ">select date range</h2>
        <Calendar
          value={selectedDates}
          onChange={(e) => setSelectedDates(e.value)}
          selectionMode="range"
          readOnlyInput
          hideOnRangeSelection
          className="w-full md:w-100%  bg-gray-400 border-0 outline-none"
          pt={{
            root:"outline-none",
            input:'text-white',
            
          }}
          />
          </div>
      )}
        <div className="text-capitalize fs-4 ">
          <h2 className="text-capitalize fs-4   me-4 text-gray-200">select type</h2>
          <Dropdown
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.value)}
            options={typeFilterOptions}
            optionLabel="name"
            placeholder="Select a type"
            className="w-full md:w-100% p-2 bg-gray-400 border-0 outline-none"
            pt={{
              root:"outline-none",
              input:'text-white',
              wrapper:'bg-gray-200'
            }}
          />
        </div>

       
      </div>
      
      {/* dialogue for add transaction  */}

      <div className=" flex justify-content-center">
        <Dialog
          header={editable ? "Edit transaction" : "Add Transaction"}
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
                id="username"
                type="number"
                aria-describedby="username-help"
                className="p-2 fs-5"
                value={editable ? editable.amount:amount}
                onChange={(e) =>{

                ( editable ==null ? setAmount(e.target.value) :
                  setEditable(data=>({
                    ...data,
                    amount:e.target.value,
                  }))
                )
                  
                }

                }
              />
            </div>
            <div className="flex flex-column gap-2 my-4">
              <label htmlFor="username">type</label>
              <Dropdown
               value={editable ? typeOptions.find(option => option.name === editable.type) : type}
                onChange={(e) =>{ editable ==null?  setType(e.value) :
                  setEditable(data=>({
                    ...data,
                    type:e.value.name,
                  }))
                }
                }
                options={typeOptions}
                optionLabel="name"
                placeholder="Select a type"
                className="w-full md:w-100% p-2"
              />
            </div>
            <div className="flex flex-column gap-2 my-4">
              <label htmlFor="username">category</label>
              <Dropdown
                value={editable ? categaoryOptions.find(option => option.name === editable.category) :category}
                onChange={(e) =>{editable ==null? setCategaory(e.value):
                  setEditable(data=>({
                    ...data,
                    category:e.value.name,
                  }))
                }
                }
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
                value={editable ? moment( editable.date).format('YYYY-MM-DD'):date}
                onChange={(e) =>{editable ==null? setDate(e.target.value):

                  setEditable(data=>({
                    ...data,
                    date:e.target.value,
                  }))
                }}
              />
            </div>
            <div className="flex flex-column gap-2 my-4">
              <label htmlFor="username">Reference</label>
              <InputText
                id="Reference"
                aria-describedby="Reference-help"
                className="p-2 fs-5"
                value={editable ? editable.reference:reference}
                onChange={(e) =>{ editable ==null? setReference(e.target.value):
                  setEditable(data=>({
                    ...data,
                    reference:e.target.value,
                  }))
                }}
              />
            </div>
            <div className="flex flex-column gap-2 my-4">
              <label htmlFor="username">Description</label>
              <InputText
                id="Description"
                aria-describedby="Description-help"
                className="p-2 fs-5"
                value={editable ? editable.description:description}
                onChange={(e) => { editable ==null? setDescription(e.target.value):
                  setEditable(data=>({
                    ...data,
                    description:e.target.value,
                  }))
                }}
              />
            </div>
            <div className="flex col-12 justify-content-end">
              <Button type="submit" className="py-1 text-8 rounded px-5   my-2">
                SAVE
              </Button>
            </div>
          </form>
        </Dialog>
      </div>

    
    {component}
      {/* {toggle === "table" ?  <Table transaction={transaction} />
       : toggle === "analysis" ? <Analysis transaction={transaction} 
       : <DashCompo /> } */}
     
    </div>
  );
};

export default Transaction;
