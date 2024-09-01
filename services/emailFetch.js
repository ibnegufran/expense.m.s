const Imap = require("imap");
const { simpleParser } = require("mailparser");
const transactionModel = require("../models/transactionModel");
const WebSocket = require("ws");

// Create a WebSocket server on a specific port (e.g., 8080)
// const wss = new WebSocket.Server({ port: 8080 });

// wss.on("connection", (ws) => {
//   console.log("New client connected");

//   ws.on("close", () => {
//     console.log("Client disconnected");
//   });
// });

// // Function to send updates to all connected clients
// const notifyClients = (message) => {
//   wss.clients.forEach((client) => {
//     if (client.readyState === WebSocket.OPEN) {
//       client.send(JSON.stringify(message));
//     }
//   });
// };
const customerNames = [
  "VISHAL ENGINEERING C",
  "MARUTI ENGINEERING WORKS",
  "MAHAVIR ENTERPRISE",
  "OUTWARD CLG MAHARASHTRA",
  "TRF-NEXA:HARMEET ENTERPRISES",
  "MAX MACHINERY AUTOMA",
  "INDOMAX ENGINEERS",
  "HALSTON GLOBAL AHMEDABAD MERCA",
  "AEROSELL HYDRAULICS PNE HDFC",
  "SHOAIB ISMAIL KOJAR PUNJAB NAT",
  "UNIQUE HYDRAULIC SALES",
  "PREMIER AUTO INDUSTRIES",
  "INNOVATIVE TECHNOLOG",
];

const fetchEmailsWithinDateRange = (imap, date1, date2) => {
  console.log(`Fetching emails between ${date1} and ${date2}...`);
  // Search for all emails between the specified date range
  const nextDay = new Date(date2);
  nextDay.setDate(date2.getDate() + 1);
  imap.search(["ALL", ["SINCE", date1], ["BEFORE", nextDay]], (err, results) => {
    if (err) {
      console.error("Error searching emails:", err);
      return;
    }
    console.log(`Total emails fetched: ${results.length}`);
    if (!results.length) {
      console.log("No emails found in the specified date range.");
      return;
    }

    // console.log(`Found ${results.length} emails within the date range.`);
    const f = imap.fetch(results, { bodies: "" });

    f.on("message", (msg, seqno) => {
      // console.log(`Processing message #${seqno}`);
      msg.on("body", (stream) => {
        simpleParser(stream, async (err, email) => {
          if (err) {
            console.error("Error parsing email:", err);
            return;
          }

          // console.log(`Parsed email from: ${email.from.text}, Subject: ${email.subject}`);
          const senderEmail = "noreply.transaction.alert@bharatbank.co.in";
          const senderEmail2="ibnegufran75074@gmail.com";


          if (email.from.value.some((from) => (from.address === senderEmail) || (from.address === senderEmail2) )) {
            // console.log("Email matches sender criteria.");
            const emailText = email.text.replace(/\s+/g, " ").toLowerCase();
          

            
         
            
            
            const matchedCustomer = customerNames.find((name) =>
              emailText.includes(name.toLowerCase())
            );
           

            let amount = null;
            const amountRegex = /rs\.? (\d{1,3}(?:,\d{3})*\.?\d{0,2})/g;
            const amountMatch = emailText.match(amountRegex);

            if (matchedCustomer === "OUTWARD CLG MAHARASHTRA") {
              const keyPhraseIndex = emailText.indexOf("cheque for credit of rs.");
              if (keyPhraseIndex !== -1) {
                const amountIndex = emailText.indexOf("rs.", keyPhraseIndex + 1);
                if (amountIndex !== -1) {
                  const amountString = emailText.substring(amountIndex + 3).match(/\d+/)[0];
                  amount = parseFloat(amountString);
                }
              }
            } else if (amountMatch) {
              amount = amountMatch[0].replace("rs. ", "");
            }
            const balanceMatch = emailText.match(
                                      /rs\.\s*([\d,]+\.\d{2})/gi
                                    );
                                    const availableBalance =
                                      balanceMatch && balanceMatch.length > 1
                                        ? balanceMatch[1].replace(/,/g, "")
                                        : "N/A";

            if (matchedCustomer) {
             
              let transactionType = "Unknown";
              if (emailText.includes("credited") || emailText.includes("received")) {
                transactionType = "income";
              } else if (emailText.includes("debited")) {
                transactionType = "expense";
              }
              const customer=await transactionModel.findOne({
                category:matchedCustomer,
                date:email.date,
                amount
              });
              
              if (!customer) {
                const newTransaction = new transactionModel({
                  userId: "66cf1e5968f36a9508ee1a1f", // Replace with dynamic user ID
                  amount,
                  type: transactionType,
                  category: matchedCustomer,
                  date: email.date,
                  description: `Available balance : ${availableBalance}`,
                  reference: email.subject || "N/A",

                });
                console.log("------------------start--------------")
                console.log(`customer: ${matchedCustomer}`);
                console.log(`Transaction Type: ${transactionType}`);
                console.log(`Extracted Amount: Rs. ${amount}`);
                console.log(`Date ${email.date}`)
                console.log("------------------end--------------")





                try {
                  await newTransaction.save();
                  console.log(`Transaction saved: Amount Rs. ${amount}, Type: ${transactionType}`);
                } catch (saveError) {
                  console.error(`Error saving transaction: ${saveError.message}`);
                }
              }else{
                console.log(`this customer transaction already added ${matchedCustomer}, Type: ${transactionType} and ${amount}`);
              }
            } else {
              console.log("No matching customer found in email text.");
            }
          } 
        });
      });
    });

    f.once("end", () => {
      console.log("Finished processing all emails within date range.");
    });
  });
};

const startEmailListener = () => {
  const imap = new Imap({
    user: "i.t.hydrolic@gmail.com",
    password: "elxnsutajxdtarvd", // Replace with your app-specific password
    host: "imap.gmail.com",
    port: 993,
    tls: true,
    tlsOptions: { rejectUnauthorized: false },
  });

  imap.once("ready", () => {
    imap.openBox("INBOX", true, (err, box) => {
      if (err) {
        console.error("Error opening inbox:", err);
        return;
      }

      console.log("IMAP connection ready. Fetching emails...");
      const date1 = new Date("2024-03-31"); // Replace with your desired start date
      const date2 = new Date(); // Replace with your desired end date

      // Fetch all emails within the date range (seen and unseen)
      fetchEmailsWithinDateRange(imap, date1, date2);
      imap.on("mail", () => {
        console.log("New email detected. Fetching...");
        fetchEmailsWithinDateRange(imap,date1,date2);
      });
    });
  });

  imap.once("error", (err) => {
    console.error("IMAP Error:", err);
  });

  imap.once("end", () => {
    console.log("IMAP Connection ended");
  });

  imap.connect();
};

// Start the email listener
// setTimeout(startEmailListener,60000)
startEmailListener();
