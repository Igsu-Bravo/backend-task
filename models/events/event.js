// event.js data model
const mongoose = require('mongoose')
const uuidv1 = require('uuid/v1')
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/events', { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })

const eventSchema = mongoose.Schema({
  _id: { type: String, default: uuidv1 }, // UUIDs are more reliable in the long run
  name: { type: String, requried: true },
  dates: [{ type: String, required: true }],
  votes: [
    {
      date: { type: String },
      people: [String]
    }
  ]
});

module.exports = mongoose.model('Event', eventSchema)