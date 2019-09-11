// event.js data model
const mongoose = require('mongoose');
const uuid = require('node-uuid');
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/event');


const eventSchema = mongoose.Schema({
  _id: { type: String, default: uuid.v1 }, // UUIDs are more reliable in the long run
  name: { type: String, requried: true },
  dates: [{ type: Date, required: true }],
  votes: [
    { date: { ref: 'Date', people: [String] } }
  ]
});

module.exports = mongoose.model('Event', eventSchema);