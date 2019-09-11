const { status, json } = require('server/reply')
const Event = require('../models/event')

exports.getAll = async ctx => {
  return Event.find().lean().exec()
}

exports.getById = async ctx => {
    return Event.findById(ctx.params.id).lean().exec()
}

exports.create = async ctx => {
// TODO: check on input, use ifs and elses, make sure errors are handles and stuff
  const item = new Event({
    name: ctx.data.name,
    dates: ctx.data.dates 
  })

  await item.save() // We kindly wait for this to return something

  return status(201).json({"id": item.id})
}

exports.addVote = async ctx => {
  const set = { $set: { date: ctx.data.date } }
  await Event.findByIdAndUpdate(ctx.params.id, set).exec()
  return Event.find().lean().exec()
}

exports.results = async ctx => {
  // TODO: results logic
}