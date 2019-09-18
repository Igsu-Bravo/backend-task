const { status } = require('server/reply')
const Event = require('../../models/events/event')
const dateRegex = /^\d{4}-\d{2}-\d{2}$/

/** Returns all events' ids and names */
exports.getAll = async () => {

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

/** Returns a single event with all its data */
exports.getById = async ctx => {
  let event = await Event.findById(ctx.params.id).lean().exec()
  if (event != null) return event
  else return status(404).send('Event not found')
}

/** Creates a new event with dates */
exports.create = async ctx => {
  let { dates } = ctx.data,
    validDates = true

  if (dates.length == 0) validDates = false
  dates.forEach(date => {
    if (!date.match(dateRegex)) validDates = false
  })

  if (validDates) {
    const item = new Event({
      name: ctx.data.name,
      dates: ctx.data.dates
    })
    await item.save()
    return status(201).json({ "id": item.id })
  } else return status(400).send('Invalid date input: dates should not be empty and should match this format: yyyy-mm-dd')
}

/** Adds a vote to an existing event */
exports.addVote = async ctx => {
  let { name, votes: params } = ctx.data,
    { id } = ctx.params,
    { votes, dates } = await Event.findById(id).lean().exec(),
    data, validDates = true

  if (params.length < 0) validDates = false
  params.forEach(param => {
    if (!param.match(dateRegex)) validDates = false
  })

  if (validDates) {
    data = buildVotes(params, votes, dates, name)
    if (data.length && Array.isArray(data)) await Event.findByIdAndUpdate(id, { votes: data }).exec()
    let event = await Event.findById(id).lean().exec()
    return status(200).json({ event })
  } else return status(400).send('Invalid date input: votes should not be empty and should match this format: yyyy-mm-dd')
}

/** Shows a list of dates that are suitable for all participants */
exports.results = async ctx => {
  let { id } = ctx.params,
    event = await Event.findById(id).lean().exec()

  if (event != null) {
    let results = buildResults(id, event)
    return status(200).json({ results })
  } else return status(404).send('Invalid id')
}

/** ----- Functions ----- */

const buildResults = (id, event) => {

  let results = { id, name: event.name, suitableDates: [] },
    allParticipants = []

  event.votes.forEach(vote => {
    vote.people.forEach(participant => {
      if (!allParticipants.includes(participant)) allParticipants.push(participant)
    })
  })

  if (allParticipants.length) {
    for (let x = 0; x < event.votes.length; x++) {
      for (let ix = 0; ix < allParticipants.length; ix++) {
        if (!event.votes[x].people.includes(allParticipants[ix]) || event.votes[x].people.length < allParticipants.length) break
        else {
          if (results.suitableDates.filter(r => r.date === event.votes[x].date).length <= 0) {
            results.suitableDates.push({ date: event.votes[x].date, people: allParticipants })
          }
        }
      }
    }
  }
  return results
}

const buildVotes = (params, votes, usableDates, name) => {
  let _votes = [], referenceArray = Array.from(votes, vote => vote.date)

  params.forEach(param => {
    if (usableDates.includes(param)) {
      if (Array.isArray(votes) && votes.length) {
        if (_votes.length < votes.length) _votes = [...votes]
        _votes.forEach(vote => {
          if (vote.date === param && !vote.people.includes(name)) {
            vote.people.push(name)
          }
          else if (!referenceArray.includes(param)) {
            referenceArray.push(param)
            _votes.push({ date: param, people: [name] })
          }
        })
      } else {
        _votes.push({ date: param, people: [name] })
      }
    }
  })

  return _votes
}