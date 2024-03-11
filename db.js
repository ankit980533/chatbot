const mongoose = require('mongoose');

// Define schema for message data
const messageSchema = new mongoose.Schema({
  messageId: { type: String, required: true },
  instructionId: { type: String, required: true },
});

// Create a model from the schema
const Message = mongoose.model('Message', messageSchema);