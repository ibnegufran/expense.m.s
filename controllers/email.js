// // emailController.js
// const Imap = require("imap");
// const { simpleParser } = require("mailparser");

// const customerNames = [
//   "VISHAL ENGINEERING C",
//   "MARUTI ENGINEERING WORKS",
//   "MAHAVIR ENTERPRISE",
//   "OUTWARD CLG MAHARASHTRA",
//   "HARMEET ENTERPRISES",
//   "MAX MACHINERY AUTOMA",
//   "INDOMAX ENGINEERS",
//   "HALSTON GLOBAL AHMEDABAD MERCA",
//   "AEROSELL HYDRAULICS PNE HDFC",
//   "SHOAIB ISMAIL KOJAR PUNJAB NAT",
//   "UNIQUE HYDRAULIC SALES",
//   "PREMIER AUTO INDUSTRIES",
//   "INNOVATIVE TECHNOLOG",
// ];

// function extractAmount(text) {
//   const regex = /Rs\. ([0-9,]+\.[0-9]{2})/i;
//   const match = regex.exec(text);

//   if (match) {
//     const amountString = match[1];
//     const amount = parseFloat(amountString.replace(/,/g, ""));
//     return amount;
//   } else {
//     return null;
//   }
// }

// const emailController = () => {
//   const date1 = new Date("2024-06-01");
//   const date2 = new Date();

//   return new Promise((resolve, reject) => {
//     const imap = new Imap({
//       user: "i.t.hydrolic@gmail.com",
//       password: "elxnsutajxdtarvd", // Replace with your app-specific password
//       host: "imap.gmail.com",
//       port: 993,
//       tls: true,
//       tlsOptions: { rejectUnauthorized: false },
//     });

//     imap.once("ready", () => {
//       imap.openBox("INBOX", true, (err, box) => {
//         if (err) return reject(err);

//         // Search for all messages between the date range
//         imap.search(
//           ["ALL", ["SINCE", date1], ["BEFORE", date2]],
//           (err, results) => {
//             if (err) return reject(err);

//             if (results.length === 0) {
//               console.log("No new emails in the inbox");
//               imap.end();
//               return resolve("No new emails");
//             }

//             // Fetch the messages
//             const f = imap.fetch(results, { bodies: "" });

//             const emailsFromSender = [];

//             f.on("message", (msg) => {
//               msg.on("body", (stream) => {
//                 simpleParser(stream,async (err, email) => {
//                   if (err) return reject(err);

//                   // Check if the email is from the specified sender
//                   const senderEmail = "noreply.transaction.alert@bharatbank.co.in";
//                   if (
//                     email.from.value.some(
//                       (from) => from.address === senderEmail
//                     )
//                   ) {
//                     if (email.text) {
//                       const emailText = email.text
//                         .replace(/\s+/g, " ")
//                         .toLowerCase();
//                         // let excepPara=emailText.find(name=>name.include("outward "))
//                       // console.log(emailText);

//                       // Find matching customer name
//                       const matchedCustomer = customerNames.find((name) =>
//                         emailText.includes(name.toLowerCase())
//                       );
//                       let amount=null;
//                       let exceptionMatch=null;

                   

//                       const amountRegex = /rs\.? (\d{1,3}(?:,\d{3})*\.?\d{0,2})/g;
                      
//                       const amountMatch = emailText.match(amountRegex);
//                       if(matchedCustomer== "OUTWARD CLG MAHARASHTRA"){
//                         const keyPhraseIndex = emailText.indexOf("cheque for credit of rs.");

//                         // If the key phrase is not found, return null
//                         if (keyPhraseIndex === -1) {
//                           return null;
//                         }
                      
//                         // Find the index of the next occurrence of "rs." after the key phrase
//                         const amountIndex = emailText.indexOf("rs.", keyPhraseIndex + 1);
                      
//                         // If the next occurrence of "rs." is not found, return null
//                         if (amountIndex === -1) {
//                           return null;
//                         }
                      
//                         // Extract the digits following the second "rs."
//                         const amountString = emailText.substring(amountIndex + 3).match(/\d+/)[0];
                      
//                         // Convert the extracted string to a number
//                          amount = parseFloat(amountString);
                      
                        
//                       }
                      

                      
                      
//                       if (amountMatch) {
                        
//                         amount = amountMatch[0].replace('rs. ', '');
//                       } 
                      
                     
//                       //                                         const amount=match  ? match[0].replace('rs. ', '') : 'n/a';
//                       //                                         amount = exceptionMatch ? exceptionMatch[0].replace('cheque for credit of rs. ', ''):'e-n/a';

//                       // Extract available balance
//                       const balanceMatch = emailText.match(
//                         /rs\.\s*([\d,]+\.\d{2})/gi
//                       );
//                       const availableBalance =
//                         balanceMatch && balanceMatch.length > 1
//                           ? balanceMatch[1].replace(/,/g, "")
//                           : "N/A";

//                       // Determine if the email indicates an income or expense
//                       let transactionType = "Unknown";
//                       if (emailText.includes("credited")) {
//                         transactionType = "Income";
//                       } else if (emailText.includes("received")) {
//                         transactionType = "Income";
//                       } else if (emailText.includes("debited")) {
//                         transactionType = "Expense";
//                       }

//                       if (matchedCustomer) {
//                         console.log(`Customer: ${matchedCustomer}`);
//                         console.log(`Amount: Rs. ${amount}`);
//                         console.log(
//                           `Available Balance: Rs. ${availableBalance}`
//                         );
//                         console.log(`Transaction Type: ${transactionType}`);
//                         // console.log("---------text-----------")
//                         // console.log(`Text: ${email.text}`);

//                         console.log("---text end------------------");
//                       }
//                       if (matchedCustomer && amount) {
//                         const newTransaction = new transactionModel({
//                             userId: "66cf1e5968f36a9508ee1a1f", // Replace with dynamic user ID
//                             amount,
//                             type: transactionType,
//                             category: matchedCustomer,
//                             date: email.date,
//                             description: `Transaction with ${amount}`,
//                             reference: email.subject || 'N/A'
//                         });
                
//                         try {
//                             await newTransaction.save();
//                             console.log(`Transaction saved: Amount Rs. ${amount}, Type: ${transactionType}`);
//                         } catch (saveError) {
//                             console.error(`Error saving transaction: ${saveError.message}`);
//                         }
//                     }
//                     } else {
//                       console.log(
//                         `Skipping email with subject "${email.subject}" as it has no text content.`
//                       );
//                     }
//                   }
//                 });
//               });
//             });

//             f.once("end", () => {
//               imap.end();
//               if (emailsFromSender.length === 0) {
//                 resolve("No unseen emails from the specified sender");
//               } else {
//                 resolve(
//                   `Fetched ${emailsFromSender.length} unseen emails from ${senderEmail}`
//                 );
//               }
//             });
//           }
//         );
//       });
//     });

//     imap.once("error", (err) => {
//       reject(err);
//     });

//     imap.connect();
//   });
// };

// // Usage
// const senderEmail = "noreply.transaction.alert@bharatbank.co.in"; // Replace with the sender's email address you want to filter by
// emailController(senderEmail)
//   .then((message) => console.log(message))
//   .catch((error) => console.error(error));

// module.exports = emailController;

// // Connect to MongoDB and fetch emails between specific dates

// // user: 'i.t.hydrolic@gmail.com',
// // password: 'elxnsutajxdtarvd',
