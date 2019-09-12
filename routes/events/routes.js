const { get, post } = require('server/router')
const event = require('../../controllers/event_controller.js')

const apiBasePath = '/api/v1/event'

// API endpoints: METHOD( 'URL', 'MIDDLEWARE FUNCTION' )
const endpoints = [
    get(`${apiBasePath}/list`, event.getAll), // READY
    get(`${apiBasePath}/:id`, event.getById), // READY
    post(`${apiBasePath}`, event.create), // READY
    post(`${apiBasePath}/:id/vote`, event.addVote),
    get(`${apiBasePath}/:id/results`, event.resutls)
]

module.exports = endpoints