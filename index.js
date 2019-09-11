// Import library
const server = require('server');
const { get, post, put, del } = server.router;
const { render } = server.reply;
const event = require('./event_controller.js');



// Launch dumbly
server(ctx => 'Hola mundo');
