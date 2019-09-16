const { status, json } = require('server/reply')
const Event = require('../models/event')

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

  await item.save()

  return status(201).json({ "id": item.id })
}

/**  */
exports.addVote = async ctx => {
  let { name, votes: params } = ctx.data,
    { id } = ctx.params,
    { votes, dates } = await Event.findById(id).lean().exec(),
    data = buildVotes(params, votes, dates, name)

  if (data.length && Array.isArray(data)) await Event.findByIdAndUpdate(id, {votes: data}).exec()

  let event = await Event.find().lean().exec()
  return status(200).json({ event })
}

/**  */
exports.results = async ctx => {
  let { id }  = ctx.params,
    { votes } = await Event.findById(id).lean().exec()

    console.log(votes)

    return status(200).json({ votes })
}

/** Functions */

const buildVotes = (params, votes, usableDates, name) => {
  let _votes = [], referenceArray = Array.from(votes, vote => vote.date)

  params.forEach(param => {
    if (usableDates.includes(param)) {
      if (Array.isArray(votes) && votes.length) {
        _votes = votes
        _votes.forEach(vote => {
          if (vote.date === param && !vote.people.includes(name)) {
            vote.people.push(name)
            return _votes
          }
          else if (!referenceArray.includes(param)) {
            referenceArray.push(param)
            _votes.push({ date: param, people: [name] })
            return _votes
          }
        })
      } else {
        _votes.push({ date: param, people: [name] })
        return _votes
      }
    }
  })

  return _votes
}