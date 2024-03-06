
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
