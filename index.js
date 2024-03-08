
const express = require( 'express' );
const bodyParser = require('body-parser');
const axios=require('axios');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON request bodies
app.use(bodyParser.json());

// Route to handle incoming messages
app.post('/incoming', (req, res) => {
    const message = req.body;
    console.log("Received message:", message);
    
   
    
    res.status(200).send(message);
});

let receivedData;

app.post('/outgoing', (req, res) => {

  try {
  const  message  = req.body;
   receivedData=message;
   console.log(req.body);
   console.log("hiii");
   console.log(req.body.message_uuid);
   console.log(receivedData.message_uuid);
   res.status(200).send(receivedData);
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
});
app.post('/issueRaised',async(req,res)=>{
  try {
    const instructionId= req.body.id;
   if(instructionId){
   sendWhatsAppMessage();
   }
  
    while (receivedData === null) {
        await new Promise(resolve => setTimeout(resolve, 1000)); 
    }
    const data = receivedData;
    receivedData = null;
    console.log('Data received:', data);
    
    res.status(200).send('Data received and processed successfully');
} catch (error) {
    console.error('Error receiving or processing data:', error);
    res.status(500).send('Error receiving or processing data');
}
  
  })
  


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});



