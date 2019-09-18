/** Import libraries */
const server = require('server')
const { get, error } = server.router
const { status } = require('server/reply')

const endpoints = require('./routes/events/routes')

const home = get('/', () => "Hello there")

//server(home, api)
server({ security: { csrf: false } }, home, endpoints, error(ctx => status(500).send(ctx.error.message))) /** csrf: false for developing purposes */

console.log("Welcome!")