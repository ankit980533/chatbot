
const express = require( 'express' );
const bodyParser = require('body-parser');
const axios=require('axios');
const app = express();
const PORT = process.env.PORT || 3000;
const mongoose=require('mongoose');
const Message=require('./db');
const http=require('http');
// Middleware to parse JSON request bodies
app.use(bodyParser.json());
mongoose.connect("mongodb+srv://user:ankitraj@cluster0.ky8l28e.mongodb.net/")
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Error connecting to MongoDB:', err));
  
  async function sendWhatsAppMessage() {
  const data = JSON.stringify({
     recipient_number: "919122058062",
     integrated_number: "918287227230",
     content_type: "interactive",
     interactive: {
       type: "button",
       header: {
         type: "image",
         image: {
           link: "https://digiqc-prod-public.s3.ap-south-1.amazonaws.com/Certificate-for-NICMAR-Workshop.png"
         }
       },
       body: {
         text: "BODY_TEXT"
       },
       footer: {
         text: "FOOTER_TEXT"
       },
       action: {
         buttons: [
           {
             type: "reply",
             reply: {
               id: "BUTTON_ID_1",
               title: "Title1"
             }
           },
           {
             type: "reply",
             reply: {
               id: "BUTTON_ID_2",
               title: "Title2"
             }
           }
         ]
       }
     }
   });
   
  const options = {
  method: "POST",
   hostname: "control.msg91.com",
   port: null,
   path: "/api/v5/whatsapp/whatsapp-outbound-message/",
   headers: {
     authkey : "417530Amng7w9J65e6a3d4P1",
     "content-type": "application/json",
     accept: "application/json"
   }
  };
  
  const req = http.request(options, function (res) {
   const chunks = [];
  
   res.on("data", function (chunk) {
     chunks.push(chunk);
   });
  
   res.on("end", function () {
     const body = Buffer.concat(chunks);
     console.log(body.toString());
   });
  });
  
  req.write(data);
  req.end()
  }


app.post('/incoming', (req, res) => {
    const message = req.body;
    console.log("Received message:", message);
    
     
    
    res.status(200).send(message);
});

 let receivedData=null;
let receivedDataPromise = null;
app.post('/outgoing', (req, res) => {

  try {
  const  message  = req.body;
  // receivedDataPromise = Promise.resolve(message);
  receivedData=message;
   console.log(req.body);
   console.log("hiii");
   console.log(req.body.message_uuid);
  //  console.log(receivedData.message_uuid);
   res.status(200).send(message);
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
});
app.post('/issueRaised',async(req,res)=>{
  try 
  {
const instruction_id=req.body.instruction_id;

    console.log(req.body.instruction_id);

  await sendWhatsAppMessage();
   console.log("done");
    while (receivedData === null) {
        await new Promise(resolve => setTimeout(resolve, 1000)); 
      }
    //const receivedData = await receivedDataPromise; // Wait for data to be received

    //console.log("hello" + receivedData);

    // if (!receivedData) {
    //   console.log('No data received yet');
    //   res.status(400).send('No data received yet');
    //   return;
    // }
    

    console.log("hiii");
    console.log("hello"+ receivedData);
    const data = receivedData;
    
    
    // // receivedData = null;
    console.log('Data received:', data);
    // const message_id=receivedData.message_uuid;
    // console.log(message_id +" terst ");
    // const { rows } = await pool.query('INSERT INTO whatsapp(message_id, instruction_id) VALUES($1, $2) RETURNING *', [
    //   message_id,
    //   instruction_id
    // ]);
    // console.log(rows[0]);
    const newMessage = new Message({
      messageId: data.message_uuid,
      instructionId: req.body.instruction_id
    });

    // Save the new message to MongoDB
    await newMessage.save();

    console.log('Message saved to MongoDB:', newMessage);

    res.status(200).send('Data received and processed successfully');
} catch (error) {
    console.error('Error receiving or processing data:', error);
    res.status(500).send(error +'errpr');
}
  
  })
  


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});



