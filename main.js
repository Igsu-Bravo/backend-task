// Import library
const server = require('server')
const { get, post } = server.router
const event = require('./controllers/event_controller.js')



// Render something? maybe not...
const home = get('/', ctx => "Hello there")

// API endpoints: METHOD( 'URL', 'MIDDLEWARE FUNCTION' )
const api = [
    get('/api/v1/event/list', event.getAll), // READY
    get('/api/v1/event/:id', event.getById), // READY
    post('/api/v1/event', event.create), // READY
    post('/api/v1/event/:id/vote', event.addVote),
    get('/api/v1/event/:id/results', event.resutls)
]

//server(home, api)
server({ security: { csrf: false } }, home, api)

console.log("Welcome!")