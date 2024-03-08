
const express = require( 'express' );
const bodyParser = require('body-parser');
const axios=require('axios');
const app = express();
const PORT = process.env.PORT || 3000;
const http=require('http');


// Middleware to parse JSON request bodies
app.use(bodyParser.json());
function sendWhatsAppMessage() {
  const data = JSON.stringify({
     recipient_number: "919122058062",
     integrated_number: "916353450539",
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
  
// Route to handle incoming messages
app.post('/incoming', (req, res) => {
    const message = req.body;
    console.log("Received message:", message);
    
   
    
    res.status(200).send(message);
});



app.post('/outgoing', (req, res) => {
 

  try {

const instruction_id=req.body.instruction_id
if(instruction_id){
  sendWhatsAppMessage();
}

  const  message  = req.body;
   console.log(req.body);
   console.log("hiii");
   console.log(req.body.message_uuid);
   console.log(message.message_uuid);
//  const otherApiUrl='http//localhost:3000/issueRaised';

//  const response=axios.post(otherApiUrl,message);

  
  res.status(200).send(response);
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});



