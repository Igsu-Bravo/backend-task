const { status, json } = require('server/reply');
const Event = require('./models/event');

exports.read = async ctx => {
  return Event.find().lean().exec();
};

exports.create = async ctx => {
  const item = new Event({ name: ctx.data.name })
};
//export.update = async ctx => { };
//export.delete = async ctx => { };