// Import library
const server = require('server')
const { get, post } = server.router
const endpoints = require('./routes/events/routes')

const home = get('/', ctx => "Hello there")

//server(home, api)
server({ security: { csrf: false } }, home, endpoints) /** csrf: false for developing purposes */

console.log("Welcome!")