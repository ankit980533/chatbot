// const express=require('express');
// const bodyParser=require('body-parser');
// const PORT=3000;
// const app=express();
// //417530Amng7w9J65e6a3d4P1
// app.use(bodyParser.json());
// //app.use(bodyParser.urlencoded({extended:false}));


// app.post('/webhook',(req,res)=>{
// console.log("called");
// try {
// //     if (req.body.event == 'incoming_message') {
// //         var content = req.body.content;
// //         var from_number = req.body.from_number;
// //         var phone_id = req.body.phone_id;
// // console.log("hdfihs");
// //         console.log(content + from_number +phone_id);
// //         // do something with the message, e.g. send an autoreply
// //         res.json({
// //           messages: [
// //             { content: "Thanks for your message!" }
// //           ]
// //         });
// //       }
// console.log("hii");
// console.log(req.body);

//       res.status(200).send("ok");
// } catch (error) {
//     console.log(error);
//     res.status(500).send("server error");
// }
    
  
// });


// app.listen(PORT,()=>{
//     console.log(`app is running on ${PORT}`);
// })
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON request bodies
app.use(bodyParser.json());

// Route to handle incoming messages
app.post('/incoming', (req, res) => {
    const message = req.body;
    console.log("Received message:", message);
    
    // You can access individual fields of the message like this
    const {
        account_manager_email_id,
        campaign_name,
        campaign_request_id,
        company_id,
        content,
        customer_number,
        submitted_at,
        read_at,
        delivered_at,
        direction,
        email_id,
        integrated_number,
        message_type,
        message_uuid,
        pluginsource,
        request_id,
        status,
        template_language,
        template_name,
        conversation_expiration_timestamp
    } = message;

    // Example: Logging specific fields
    console.log("Account Manager Email ID:", account_manager_email_id);
    console.log("Campaign Name:", campaign_name);
    // Add more logging or processing logic as needed
    
    res.status(200).send('Message received');
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
