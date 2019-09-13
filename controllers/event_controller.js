const { status, json } = require('server/reply')
const Event = require('../models/event')
const moment = require('moment')

/** getAll returns object with all events */
exports.getAll = async ctx => {

  let query = await Event.find().lean().exec(), response = { events: [] }

  if (Array.isArray(query) && query.length) {
    query.forEach(event => {
      response.events.push({ name: event.name, id: event._id })
    })
    return status(200).json(response)
  }
  console.log(query)
  return status(200).json({ message: "no events found!" })
}

/**  */
exports.getById = async ctx => {
  // TODO: do something in case id is not found
  return Event.findById(ctx.params.id).lean().exec()
}

/**  */
exports.create = async ctx => {
  // TODO: check on input, use ifs and elses, make sure errors are handled
  const item = new Event({
    name: ctx.data.name,
    dates: ctx.data.dates
  })

  await item.save() // We kindly wait for this to return something

  return status(201).json({ "id": item.id })
}

/**  */
exports.addVote = async ctx => {
  let { name } = ctx.data,
    { id } = ctx.params,
    event = await Event.findById(ctx.params.id).lean().exec(),
    usableDates = Array.from(event.dates, date => moment(date)),
    paramsDates = Array.from(ctx.data.votes, vote => moment(vote))

  // TODO: finish logic

  //const set = { $set: { name: ctx.data.name,  } }
  //await Event.findByIdAndUpdate(ctx.params.id, set).exec()
  //return Event.find().lean().exec()
  return status(200)
}

/**  */
exports.results = async ctx => {
  // TODO: results logic
}