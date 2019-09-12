// event.js data model
const mongoose = require('mongoose')
const uuidv1 = require('uuid/v1')
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/events', { useNewUrlParser: true, useUnifiedTopology: true })

const date = { type: Date, required: true }

const eventSchema = mongoose.Schema({
  _id: { type: String, default: uuidv1 }, // UUIDs are more reliable in the long run
  name: { type: String, requried: true },
  dates: [date],
  votes: [
    {
      date: date,
      people: [String]
    }
  ]
});

module.exports = mongoose.model('Event', eventSchema)